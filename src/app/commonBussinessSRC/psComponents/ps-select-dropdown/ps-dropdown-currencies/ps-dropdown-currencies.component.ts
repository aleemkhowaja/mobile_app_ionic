import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownCurrenciesExposed } from './ps-dropdown-currencies.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 07/11/2019
 *
 * <p> PsDropdownCurrenciesComponent will fetch the list of currencies from server</p>
 */
@Component({
  selector: 'ps-dropdown-currencies',
  templateUrl: './ps-dropdown-currencies.component.html',
  styleUrls: ['./ps-dropdown-currencies.component.scss'],
})
export class PsDropdownCurrenciesComponent extends PsSelectDropdownComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsDropdownCurrenciesExposed = {};
  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
  public countryFlagLocation;
  languageChangedSubscription: Subscription;
  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPullService?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.countryFlagLocation = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'currencies/';
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.loadCurrencies();
    this.languageChangedSubscription = this.commonProv.languageChanged.subscribe(isChanged => {
      if (isChanged) {
        this.loadCurrencies();
      }
    });
  }

  /**
   * populating currencies
   */
  private async loadCurrencies() {

    const currenciesList = await this.omniPullService.returnCurrencyList({}).catch(error => {
      this.logger.error('Error: While fetching Currencies list in PsDropdownCurrenciesComponent : ', error);
    });

    if (currenciesList && currenciesList.gridModel && currenciesList.gridModel.length > 0) {
      this.defaultOptions.listOfOptions = [];
      for (const iterator of currenciesList.gridModel) {
        const lovDropDown: IPsSelect = {
          itemValue: iterator.currencyCode,
          description: iterator.description,
          iconUrl: this.countryFlagLocation.concat((iterator.engBriefDesc).toLowerCase() + PsCommonBusinessSettings.IMG_CURRENCY_EXTENSION),
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(lovDropDown);
      }
    }
  }

  public selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }

  ngOnDestroy() {
    this.languageChangedSubscription.unsubscribe();
  }
}
