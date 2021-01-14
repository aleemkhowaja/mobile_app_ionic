import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsOptionSecurityExposed, ISecurityListRequest } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-expired-security/ps-option-expired-security.component.interface';
import { ILoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsCurrencyPipe } from 'src/app/commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsTemplateView } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';



@Component({
  selector: 'expired-securities-list',
  templateUrl: './expired-securities-list.page.html',
  styleUrls: ['./expired-securities-list.page.scss'],
})
export class ExpiredSecuritiesListPage extends OmniBasePage {

  private formGroup = new FormGroup({});
  security: IOptionsPsOptionSecurityExposed = {};
  securityOptions: IOptionsPsOptionSecurityExposed[] = [];
  showList = false;
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };
  userInformation: ILoginResponse;
  private psCurrency = new PsCurrencyPipe();
  private psDatePipe = new PsDateFormatPipe();
  private prevFormat = 'DD/MM/YYYY';
  constructor(public commonService: PsCommonService, private omniPull: OmniPullService, public navService?: PsNavigatorService) {
    super();
  }

  ionViewWillEnter() {
    super.init();
    super.viewWillEnter();
    this.userInformation = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    const workingCif = this.commonService.session.getValueOf(ConstantCommon.WORKINGCIF);
    let securityListRequest: ISecurityListRequest = {};
    securityListRequest = {
      inRenewalPeriod: 'Y',
      securityPriceDetails: 'N',
      portfolioCif: workingCif ? workingCif : this.userInformation.omniUserVO.CIF_NO,
      nbRec: '0',
      recToskip: '0',
    };

    this.loadExpiredHoldingList(securityListRequest);
  }

  /**
   * 
   * @param securityListRequest
   */
  private async loadExpiredHoldingList(securityListRequest: ISecurityListRequest) {
    this.securityOptions = [];

    const result = await this.omniPull.returnExpiredHoldingList(securityListRequest).catch(error => {
      this.commonProv.logger.error('Error: While fetching returnExpiredHoldingList in expired securites page :', error);
    });

    if (result && result.gridModel.length > 0) {
      for (const security of result.gridModel) {

        const eachSecurity: IOptionsPsOptionSecurityExposed = {
          securityInformation: security

        };
        eachSecurity.securityInformation.title = eachSecurity.securityInformation.portfolioCif + ' - ' + eachSecurity.securityInformation.sukukType;
        eachSecurity.securityInformation.subTitle = eachSecurity.securityInformation.isdaraNumber;
        eachSecurity.securityInformation.balanceStr = this.psCurrency.transform(eachSecurity.securityInformation.balance === null || eachSecurity.securityInformation.balance === undefined ? '0.0' : eachSecurity.securityInformation.balance.toString(), 0);
        eachSecurity.securityInformation.totalNumberOfSukukStr = this.psCurrency.transform(eachSecurity.securityInformation.totalNumberOfSukuk === null || eachSecurity.securityInformation.totalNumberOfSukuk === undefined ? '0.0' : eachSecurity.securityInformation.totalNumberOfSukuk.toString(), 0);
        eachSecurity.securityInformation.maturityDate = eachSecurity.securityInformation.maturityDate ? eachSecurity.securityInformation.maturityDate : '--/--/----';
        eachSecurity.securityInformation.issueDate = eachSecurity.securityInformation.issueDate ? eachSecurity.securityInformation.issueDate : '--/--/----';
        this.securityOptions.push(eachSecurity);
      }
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

}

