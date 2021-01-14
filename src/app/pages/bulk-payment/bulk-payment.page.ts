import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsLovFileTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-file-types/ps-lov-file-types.component.interface';
import { IOptionsPsTemplateForm } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from 'src/app/pages/omni-base/omni-base.page';

import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';

@Component({
  selector: 'app-bulk-payment',
  templateUrl: './bulk-payment.page.html',
  styleUrls: ['./bulk-payment.page.scss'],
})
export class BulkPaymentPage extends OmniBasePage implements OnInit {
  bulkPaymentForm: FormGroup = new FormGroup({});
  defaultVO: any = {};
  public options: IOptionsPsTemplateForm = {
    group: this.bulkPaymentForm

  };
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['bulk_payment_step1'],
    group: this.bulkPaymentForm,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.bulkPaymentEndPoint,
      group: this.bulkPaymentForm,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.serviceRes(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.defaultVO
  };

  panelOptionsStep1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'bulk_salary_upload_key',
    iconName: 'document',
    expanded: true
  };
  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: false,
    fcName: 'selectedFileData',
    group: this.bulkPaymentForm

  };
  public accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'from_account_key',
    placeHolder: 'select_from_account_key',
    component: PsAccountsListComponent,
    currency: 'USD',
    group: this.bulkPaymentForm,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.defaultVO,
  };
  fileTypesOptions: IOptionsPsLovFileTypesExposed = {
    group: this.bulkPaymentForm,
    fcName: 'fileType'
  };
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, private navService: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.bulkPaymentForm;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountListOptions.fcName], 0);
  }

}
