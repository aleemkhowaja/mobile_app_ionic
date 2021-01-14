import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IPsSelect } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropdownAllowedLanguagesExposed } from './ps-dropdown-allowed-languages.component.interfaces';


@Component({
  selector: 'ps-dropdown-allowed-languages',
  templateUrl: './ps-dropdown-allowed-languages.component.html',
  styleUrls: ['./ps-dropdown-allowed-languages.component.scss'],
})
export class PsDropdownAllowedLanguagesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownAllowedLanguagesExposed;
  @Output() public languageChange: EventEmitter<any> = new EventEmitter<any>();

  defaultSelectOptions: IOptionsPsSelectDropdown = {
    listOfOptions: [],
  };
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private navigationService: PsNavigatorService,
    private omniCommon: OmniCommonService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, true);
    this.defaultSelectOptions.listOfOptions = [];
    this.omniCommon.returnLanguageList().then((result) => {
      if (result && result.gridModel) {
        result.gridModel.forEach((item) => {
          const language: IPsSelect = {
            itemValue: item.itemValue,
            description: item.description,
            iconUrl: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'countries/' + item.iconName,
            selectedObj: item,
            shortDescription: item.itemValue
          };
          this.defaultSelectOptions.listOfOptions.push(language);
        });
      }
    }).catch((error) => {
      this.logger.error(error);
    });
  }
  /**
   * With some cases of calling change language with many threads like emit events,
   * async keyword must be added to force consumers await until the language changes.
   */
  async onLanguageChange(event) {
    if (this.options.changeSystemLanguage === true) {
      if (event && event.itemValue) {
        await this.commonProv.language.changeLanguage(event.itemValue);
        this.commonProv.languageChanged.next(true);
        // condition added by Richie for #TP 997475: in order not to redirect to home page after opening the screen from OADM
        if (!PsCommonSettings.custMode) {
          this.navigationService.navigateToMain();
        }
      }
    }
    this.languageChange.emit(event);
  }

}
