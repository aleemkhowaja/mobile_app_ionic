import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOmniAccountRequest, IOptionsPsActionButton, IOptionsPsActionImage, IOptionsPsSelectCheckboxExposed, IOptionsPsTemplateForm, IOptionsPsTemplateView, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { PsCommonService } from '../../commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'national-pooling',
  templateUrl: './national-pooling.page.html',
  styleUrls: ['./national-pooling.page.scss'],
})
export class NationalPoolingPage extends OmniBasePage implements OnInit {
  public parameters;
  totalBalance = 0;
  cifInfo: any;
  accountsList: any[] = [];
  selectedAccounts: string;
  formGroup: FormGroup = new FormGroup({});

  othersCheckBoxOptions: IOptionsPsSelectCheckboxExposed = {
    group: this.formGroup,
    fcName: 'otherChecked',
    labelKey: 'other_key'
  };
  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.FacilityRequest,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.navigateToReport(response));
          });
        },
        params: [this],
        executionClass: this
      },
    }
  };

  reportOptions = {
    fileName: 'report.html',
  };

  simulateButtonOptions: IOptionsPsActionButton = {
    labelKey: 'simulate_key',
    group: this.formGroup
  };
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  totalBalanceReadOnlyOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'totalBalance',
    labelKey: 'total_balance_key',
    placeHolder: '0',
    group: this.formGroup
  };
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'nationa_pooling_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['nationa_pooling_stepper_1', 'nationa_pooling_stepper_2'],
    group: this.formGroup,
    // submitOptions: {
    //   group: this.formGroup,
    //   submitServiceUrl: PsCommonBusinessSettings.serviceUrl.onlineRegistration,
    // },
    requestObject: {},
  };
  actionImageOptions: IOptionsPsActionImage = {
    imageName: CommonUtils.getCssVariableValue('--ps-loader-image-name')
  };
  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService,
    public navService?: PsNavigatorService
  ) {
    super();
  }

  openReportPage() {
    PsCommonSettings.oper_ID = CommonBussinessConstant.ACCOUNT_POOLING_REPORT;
    let cif = this.cifInfo.omniUserVO.CIF_NO;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        userCifNo: cif, accountList: this.selectedAccounts, totalBalance: this.totalBalance,
      }
    };
    this.navService.navigateForward('pooling-report-page', navigationExtras);
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    const requestData: IOmniAccountRequest = this.prepareRequestData(this.cifInfo);
    this.returnAccountList(requestData);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.totalBalanceReadOnlyOptions.fcName], 1);
  }

  onAccountChecked(value: any, accountNo, balance) {
    if (value.newValue === true) {
      this.totalBalance += balance;
      if (this.selectedAccounts) {

        this.selectedAccounts += accountNo;
      } else {

        this.selectedAccounts = accountNo;
      }

      this.formGroup.controls[this.totalBalanceReadOnlyOptions.fcName].setValue(this.totalBalance);
    } else {
      if (this.totalBalance > 0) {
        this.totalBalance -= balance;
        this.formGroup.controls[this.totalBalanceReadOnlyOptions.fcName].setValue(this.totalBalance);
        this.selectedAccounts.replace(accountNo, '');
      }
    }
  }

  /**
   * preparing request data
   * @param cifInfo: any
   */
  private prepareRequestData(cifInfo: any): IOmniAccountRequest {
    let requestData: IOmniAccountRequest = {};

    if (cifInfo && cifInfo.omniUserVO) {
      requestData = {
        // vsBranchCode: cifInfo.branchCode,
        userCifNo: cifInfo.omniUserVO.CIF_NO,
        type: 'A'
      };
    }

    requestData.accountType = 'G';
    requestData.permittedGls = 'G';
    requestData.fromTo = 'from';
    requestData.accountAllowedCurrencies = '';
    return requestData;
  }


  /**
   * fetching account list from server
   * @param requestData IOmniAccountRequest
   */
  private async returnAccountList(requestData: IOmniAccountRequest) {
    this.commonProv.presentLoading();
    const result = await this.omniPull.returnAccounts(requestData).catch(error => {
      this.logger.error('Error: While fetching accounts in PsComplexOwnAccountComponent :', error);
    });
    this.commonProv.dismissLoading();
    if (result && result.gridModel.length > 0) {
      for (const iterator of result.gridModel) {
        if (iterator.availableBalance > 0) {
          const fcNAME = iterator.accountNumber + ',' + iterator.availableBalance;
          this.accountsList.push({
            checkBoxOptions: {
              group: this.options.group,
              fcName: fcNAME,
              labelKey: 'Account No.: ' + iterator.accountNumber + ' ' + 'Available balance: ' + iterator.availableBalance
            }, accountNo: iterator.accountNumber, balance: iterator.availableBalance
          });
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [fcNAME], 0);
        }
      }
    } else {
    }
  }


}
