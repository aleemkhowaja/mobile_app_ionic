import { Component, Input, OnInit } from '@angular/core';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsCommonBusinessSettings } from '../../../psServices/models/ps-commonBusiness.settings';
import { IOptionsPsOptionSecurityExposed } from './ps-option-expired-security.component.interface';

@Component({
  selector: 'ps-option-expired-security',
  templateUrl: './ps-option-expired-security.component.html',
  styleUrls: ['./ps-option-expired-security.component.scss'],
})
export class PsOptionExpiredSecurityComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsOptionSecurityExposed;
  securityListOptions: IOptionsPsContainerLookupOptionComponentExposed;
  securityLabelValuesMap = new Map<string, IMapKeyValue>();
  securityHeaderMap = new Map<string, IMapKeyValue>();

  constructor(commonProv: PsCommonService) {
    super(commonProv, commonProv.logger);
    this.populateHeaderValueMap();
  }

  ngOnInit() {
    super.init();
    this.securityListOptions = {
      bottomPadding: true,
      labelsValueMap: this.securityLabelValuesMap,
      headerMap: this.securityHeaderMap,
      showTemplateCard: false,
      isEditable: this.options.isEditable !== null && this.options.isEditable !== undefined ? this.options.isEditable : true,
      actionDetailsOptions: [

        {
          label: 'renewal_Liquidation_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'keypad'
            },
            route: 'security-renewal',
            pageOptions: {
              operId: 1462,
              iconName: 'keypad',
              title: 'renewal_Liquidation_key'
            }
          }

        }
      ]
    };
    this.securityListOptions.itemList = [this.options.securityInformation];
  }

  private populateHeaderValueMap() {

    let portfolioCifMap: IMapKeyValue = {};
    let portfolioNameMap: IMapKeyValue = {};
    let issueDateMap: IMapKeyValue = {};
    let balanceMap: IMapKeyValue = {};
    let totalNbrOfSukukMap: IMapKeyValue = {};
    let maturityDateMap: IMapKeyValue = {};
    let marketPriceMap: IMapKeyValue = {};
    let profitRateMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};
    portfolioCifMap = {
      key: 'portfolioCif',
      value: '--- --- --- ---'
    };
    portfolioNameMap = {
      key: 'portfolioName',
      value: ''
    };

    balanceMap = {
      key: 'balanceStr',
      value: '0'
    };
    totalNbrOfSukukMap = {
      key: 'totalNumberOfSukukStr',
      value: '0'
    };
    maturityDateMap = {
      key: 'maturityDate',
      value: ''
    };
    issueDateMap = {
      key: 'issueDate',
      value: ''
    };
    marketPriceMap = {
      key: 'marketPrice',
      value: '0'
    };
    profitRateMap = {
      key: 'profitRate',
      value: '0'
    };
    headerTitleMap = {
      key: 'title',
      value: 'title',
      isEdit: false,
      formGroupMap: {
        labelKey: '',
        placeHolder: '',
        fcName: 'title',
      }
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'subTitle',
      isEdit: false,
      formGroupMap: {
        labelKey: '',
        placeHolder: '',
        fcName: 'subTitle',
      }
    };
    this.securityLabelValuesMap.set('balance_key', balanceMap);
    if (!PsCommonBusinessSettings.isAgent) {
    	this.securityLabelValuesMap.set('sukuk_balance_key', totalNbrOfSukukMap); 
    } else {
      	this.securityLabelValuesMap.set('available_balance_key', totalNbrOfSukukMap);
    }
    this.securityLabelValuesMap.set('maturity_date_key', maturityDateMap);
    this.securityLabelValuesMap.set('issue_date_key', issueDateMap);
    this.securityLabelValuesMap.set('market_price_key', marketPriceMap);
    this.securityLabelValuesMap.set('profit_rate_key', profitRateMap);

    this.securityHeaderMap.set('title', headerTitleMap);
    this.securityHeaderMap.set('subTitle', headerSubtitleMap);
  }

  updateCard(event) {
    // console.log(event);
  }

}
