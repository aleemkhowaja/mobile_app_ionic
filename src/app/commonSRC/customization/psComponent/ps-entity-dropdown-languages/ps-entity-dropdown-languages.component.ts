import { Component, Input, OnInit } from '@angular/core';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { PsFieldEntityComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-entity/ps-field-entity.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IdefaultValidators, IOptionsPsEntityDropdownLanguagesExposed, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-entity-dropdown-languages',
  templateUrl: './ps-entity-dropdown-languages.component.html',
  styleUrls: ['./ps-entity-dropdown-languages.component.scss'],
})
export class PsEntityDropdownLanguagesComponent extends PsFieldEntityComponent implements OnInit {

  @Input() options: IOptionsPsEntityDropdownLanguagesExposed;

  public languages: any[] = [];
  public custLangLableOptions: IOptionsPsSelectDropdown[] = [];

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService,
    private omniCommon: OmniCommonService,
  ) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.options.childComponent = PsEntityDropdownLanguagesComponent;
    this.setEntityFormGroup();
    this.loadAllowedLanguages();
  }


  private async loadAllowedLanguages() {
    const allowedLangResponse = await this.omniCommon.returnLanguageList().catch(error => {
      this.logger.error('Error: While fetching allowed languages in PsEntityDropdownLanguagesComponent :', error);
    });

    if (allowedLangResponse && allowedLangResponse.gridModel) {
      this.languages = allowedLangResponse.gridModel;
    }
    const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
    if (this.languages && this.languages.length > 0) {
      for (const iterator of this.languages) {
        const eachLangLabelOptions: IOptionsPsSelectDropdown = {};
        eachLangLabelOptions.listOfOptions = [];
        eachLangLabelOptions.labelKey = iterator.description;
        eachLangLabelOptions.placeHolder = this.options.placeHolder;
        eachLangLabelOptions.group = this.entityFormGroup;
        eachLangLabelOptions.fcName = 'custLabel_' + iterator.itemValue;
        eachLangLabelOptions.asyncURL = this.options.asyncURL;
        eachLangLabelOptions.allowCust = false;
        eachLangLabelOptions.serviceRequestObj = { selectedLangCode: iterator.itemValue, labelKeyId: this.returnValue() };
        defaultValidations.set(eachLangLabelOptions.fcName, this.commonProv.prepareValidation(false, false, false));
        this.commonProv.setDefaultValidators(defaultValidations, this.entityFormGroup);
        this.custLangLableOptions.push(eachLangLabelOptions);
      }
    }

  }

  public onLanguageChange(lang) {
    if (lang) {
      for (let i = 0; i < this.languages.length; i++) {
        this.entityVO[this.custLangLableOptions[i].fcName] = lang.itemValue;
      }
      this.setEntityValue(lang.itemValue);
    }
  }

  public onServiceDataChange(data: any) {
    if (data && data.commonResponseList) {
      for (let i = 0; i < this.languages.length; i++) {
        if (data.triggeredByScroll) {
          const newList = data.commonResponseList[this.languages[i].itemValue];
          const oldList = this.custLangLableOptions[i].listOfOptions;
          const updatedListOfOptions = oldList.concat(newList);
          this.custLangLableOptions[i].listOfOptions = updatedListOfOptions;
        } else {
          this.custLangLableOptions[i].listOfOptions = data.commonResponseList[this.languages[i].itemValue];
        }
      }
    }
  }

  public onEmptyLanguage(event) {
    this.setEntityValue(null);
  }

  get defaultOptions(): IOptionsPsEntityDropdownLanguagesExposed {
    const val = super.returnValue();
    if (val) {
      this.entityVO[this.custLangLableOptions[0].fcName] = val;
    }
    return this.options;
  };

}
