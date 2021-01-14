import { Component, OnInit, Input } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropdownPortfolioExposed } from './ps-dropdown-portfolio.component.interface';
import { IOptionsPsSelectDropdown, IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOcPortfolioRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';

@Component({
  selector: 'ps-dropdown-portfolio',
  templateUrl: './ps-dropdown-portfolio.component.html',
  styleUrls: ['./ps-dropdown-portfolio.component.scss'],
})
export class PsDropdownPortfolioComponent  extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownPortfolioExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'portfolio_key',
    placeHolder: 'portfolio_key'
  };
  public portfolio: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) { 
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.getPortfolio();
  }

  getPortfolio() {
    const paramData: IOcPortfolioRequest = { };
    this.omniPull.returnPortfolioList(paramData).then((result) => {
      this.portfolio = [];
      if (result && result.gridModel != null && result.gridModel.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.gridModel.length; i++) {
          const prtfolio = { itemValue: result.gridModel[i].portfolioSeq, 
          description: result.gridModel[i].longName, selectedObj: result.gridModel[i] };
          this.portfolio.push(prtfolio);
        }
      } else { this.logger.warn(result, 'empty response'); }
      this.defaultSelectOptions.listOfOptions =  this.portfolio;
    }).catch((error) => { console.log(error); });
  }

  onPortfolioChange(values: IchangeValues) {
    this.loggerP.log('onPortfolioChange' , values);
    this.onPsChange.emit(values);
    }

}
