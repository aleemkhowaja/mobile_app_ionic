import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ISukukSecuritiesCO, ISukukSecuritiesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsTemplateView } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsIpoSecuritiesListExposed } from './../../commonBussinessSRC/psComponents/ps-ipo-securities-list/ps-ipo-securities-list.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> IpoSecuritiesListPage </p>
 */
@Component({
  selector: 'app-ipo-securities-list',
  templateUrl: './ipo-securities-list.page.html',
  styleUrls: ['./ipo-securities-list.page.scss'],
})
export class IpoSecuritiesListPage extends OmniBasePage {

  public ipoSecuritiesOptions: IOptionsPsIpoSecuritiesListExposed = {};
  private usercifINo: any;
  private formGroup = new FormGroup({});
  public ipoSecuritiesList: Array<ISukukSecuritiesCO> = [];
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };
  public noIpoSecuritiesListFound = false;
  private dateFormat = 'DD/MM/YYYY';
  private psDatePipe = new PsDateFormatPipe();
  public noIpoListFound = false;

  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService) {
    super();
  }

  ionViewWillEnter() {
    super.init();
    super.viewWillEnter();
    this.usercifINo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    this.ipoSecuritiesOptions = {
      isEditable: true
    };
    const paramData: ISukukSecuritiesRequest = {
      eligibleIPO: CommonBussinessConstant.YS,
      byBroker: CommonBussinessConstant.NO,
      securityPriceDetails: CommonBussinessConstant.NO,
      linkToSecurityDetails: CommonBussinessConstant.YS,
      workingCifNumber: this.usercifINo.omniUserVO.CIF_NO,
      allowNegative: 'false',
      serverDate: new Date()
    };
    this.getDateFormat();
    this.loadIpoSecurities(paramData);
  }

  async getDateFormat() {
    const res = await this.omniPull.getParamValOf('DefaultDateFormat').catch(err => this.logger.log(err));
    if (res) {
      this.dateFormat = res.DefaultDateFormat ? res.DefaultDateFormat : 'DD/MM/YYYY';
    }
  }

  /**
   * 
   * @param paramData
   */
  private loadIpoSecurities(paramData: ISukukSecuritiesRequest) {
    this.returnIpoSecuritiesList(paramData);
  }

  /**
   * fetching ipo securities from server
   */
  private async returnIpoSecuritiesList(requestData: ISukukSecuritiesRequest) {
    const result = await this.omniPull.returnIPOSecurities(requestData).catch(error => {
      this.logger.error('Error: While fetching ipo scruities in IpoSecuritiesListPage :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.noIpoListFound = false;
      this.ipoSecuritiesOptions.listOfOptions = this.populateCustomIpoSecurities(result.gridModel);
    } else {
      this.noIpoListFound = true;
      this.ipoSecuritiesOptions.listOfOptions = [];
    }
  }

  /**
   *
   * @param ipoSecurities
   */
  private populateCustomIpoSecurities(ipoSecurities: Array<any>): ISukukSecuritiesCO[] {
    this.ipoSecuritiesList = [];
    for (const iterator of ipoSecurities) {
      const internalBeneficiary: ISukukSecuritiesCO = {
        title: iterator.isdaraNumber,
        subTitle: iterator.isdaraNumber + ' - ' + iterator.issueDate, // iterator.isdaraNumber + ' - ' + this.psDatePipe.transform(iterator.issueDate, this.dateFormat),
        bondLife: iterator.bondLife,
        calculatedSukukPrice: iterator.calculatedSukukPrice,
        isdaraNumber: iterator.isdaraNumber,
        issueDate: iterator.issueDate, // issueDate: this.psDatePipe.transform(iterator.issueDate, this.dateFormat),
        longName: iterator.longName,
        maturityDate: iterator.maturityDate, // maturityDate: this.psDatePipe.transform(iterator.maturityDate, this.dateFormat),
        profitRate: iterator.profitRate,
        progReference: iterator.progReference,
        remainingLimit: iterator.remainingLimit,
        securityCode1: iterator.securityCode1,
        securityCode2: iterator.securityCode2,
        status: iterator.status && String(iterator.status).toLocaleLowerCase() === CommonBussinessConstant.APPROVED ? '' : iterator.status,
        sukukPrice: iterator.sukukPrice,
        sukukType: iterator.sukukType,
        tradingCurrency: iterator.tradingCurrency,
        tradingCurrencyCode: iterator.tradingCurrencyCode,
        transactionNumberDetails: iterator.transactionNumberDetails,
        applicationName: CommonBussinessConstant.PMS,
        years: iterator.issueDate && iterator.maturityDate ? this.diff_years(new Date(iterator.issueDate), new Date(iterator.maturityDate)) ? this.diff_years(new Date(iterator.issueDate), new Date(iterator.maturityDate)) : '-' : '-',
        ipoEndDate: iterator.iPOEndDate, // ipoEndDate: this.psDatePipe.transform(iterator.iPOEndDate, this.dateFormat),
        ipoStartDate: iterator.iPOStartDate, // this.psDatePipe.transform(iterator.iPOStartDate, this.dateFormat),
      };
      this.ipoSecuritiesList.push(internalBeneficiary);
    }
    return this.ipoSecuritiesList;
  }

  private diff_years(dt2, dt1) {

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    if (diff !== NaN) {
      diff /= (60 * 60 * 24);
      return Math.abs(Math.round(diff / 365.25));
    } else {
      return null;
    }

  }

}
