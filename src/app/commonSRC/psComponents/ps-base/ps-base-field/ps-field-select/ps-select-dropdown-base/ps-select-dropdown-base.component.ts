import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsActionIcon, IOptionsPsFieldLabel, IOptionsPsLabelInput, IOptionsPsSelectDropdown, IPsSelect } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsFieldSelectComponent } from '../ps-field-select.component';


@Component({
  selector: 'ps-select-dropdown-base',
  templateUrl: './ps-select-dropdown-base.component.html',
})
export class PsSelectDropdownBaseComponent extends PsFieldSelectComponent implements OnInit {

  @Input() options: IOptionsPsSelectDropdown;

  interface = PsCommonSettings.psSelectDropdownInterface;
  public _selectedItem: IPsSelect = {};
  get labelOptions(): IOptionsPsLabelInput {
    return {
      required: this.required,
      labelKey: this.options.labelKey,
      previewMode: this.previewMode
    };
  }
  valueOptions: IOptionsPsLabelInput = {};
  enableEmptyOpt: boolean;
  wordpressIconOptions: IOptionsPsActionIcon = {
    iconName: 'logo-wordpress',
  };
  buildIconOptions: IOptionsPsActionIcon = {
    iconName: 'build',
  };
  outerIcon = '';
  loaderUrl;
  showExtraInfo: boolean;
  emptyArrayOptions: PsSelect = [{ itemValue: null, description: '' }];
  @ViewChild('matSelect', { static: false }) matSelect: MatSelect;

  public get selectData(): Array<IPsSelect> {
    if (this.options && this.options.listOfOptions && this.options.listOfOptions.length > 0) {
      if (this.enableEmptyOpt) {
        return [...this.emptyArrayOptions, ...this.options.listOfOptions];
      } else {
        return this.options.listOfOptions as IPsSelect[];
      }
    } else {
      return new Array<IPsSelect>();
    }
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
      labelKey: this.fcValueDesc,
      psClass: 'ps-value-preview',
      previewMode: true
    };
  }
  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.custIconOptions.component = PsSelectDropdownBaseComponent;
    super.init();
    this.loaderUrl = PsApplicationSettings.CLIENT_ASSETS_CONFIG.SVG_URL + 'loading.svg';

    if (this.options.labelKey !== undefined) {
      this.labelOptions.labelKey = this.options.labelKey;
    } else {
      // this.labelOptions.labelKey = this.options.placeHolder;
    }
    //  this.options.isMultiple = true;
    // adding the checking PsCommonSettings.enableEmptyOpt here for the case if the dropdown is mandatory then still the empty option is added since the flag this.enableEmptyOpt was set to true from this property on the constructor
    if (PsCommonSettings.enableEmptyOpt && !this.required && (this.enableEmptyOpt !== false)) {
      this.enableEmptyOpt = true;
    }

    if (this.options && (this.options.iconOptions || this.options.imageOptions)) {
      this.itemOptions = { ...this.options };
    }

    /* if (this.options.selectDefaultItem !== undefined) {
      this.selectedItem = this.options.selectDefaultItem;
    } */
    this.labelOptions.required = this.required;
  }

  onSelectChange(event) {
    const item = this.selectData.filter((item) => item.itemValue === event.value);
    super.writeValue(item[0]);
    this.selectedItem = item[0];
    this.outerIcon = item[0].iconUrl;
    this.options.placeHolder = '';
    this.onPsChange.emit(item[0]);
    this.showExtraInfo = true;
  }

  onSelectOpened() {
    this.showExtraInfo = true;
    if (this.options.forcePanelClose) {
      this.matSelect.close();
    }
  }


  get fcValueDesc(): string {
    const value: any = this.fcValue;
    // modified by Richie for #BUG 766112
    if (value) {
      const selectedOption = this.selectData.find(item => item.itemValue === value.itemValue);
      if (selectedOption) {
        return selectedOption.description;
      } else {
        return value;
      }
    }
  }

  get selectedItem(): any {
    const obj = super.returnValue(true);
    if (obj instanceof Object) {
      this.outerIcon = obj.iconUrl;
      // this.options.placeHolder = '';
      return obj.itemValue;
    } else if (obj !== undefined) {
      const selectItem = this.selectData.filter((item) => item.itemValue === obj || String(item.itemValue) === String(obj));
      if (selectItem.length > 0) {
        this.outerIcon = selectItem[0].iconUrl;
        // this.options.placeHolder = '';
        this.showExtraInfo = true;
        /**
         * #BUG 1077331
         * in case the dropdown was set to a value thus the innerValue will be the selected object from the list.
         * thus if for any reason we set the value of the dropdown to the same itemvalue from the vo,
         * then the value in the vo remains as the itemValue and not the selected obj
         * since the selectedValue here & the innerValue will be equal in this case
         * and thus it will not set the selected option again in the VO instead of the itemValue.
         * That's why we need to set the innerValue back to the itemValue that is set in the vo
         * in order to be able to reset it to the selected object inside the vo as it should be.
         */
        if (this.innerValue === selectItem[0]) {
          this.innerValue = obj;
        }
        super.writeValue(selectItem[0]);
      } else {
        return null;
      }
      return obj;
    }
    return obj;
  }

  set selectedItem(value: any) {
    const selectItem = this.selectData.filter((item) => item.itemValue === value || String(item.itemValue) === String(value));
    if (selectItem.length > 0) {
      super.writeValue(selectItem[0], true);
      this.outerIcon = selectItem[0].iconUrl;
      this._selectedItem = selectItem[0];
      // Commented by Richie for #TP 1082495 since the change event will be called from the subscribe as all other components
      // this.onPsChange.emit(selectItem[0]);
    }
    // this.options.placeHolder = '';
    this.showExtraInfo = true;
  }

  getPlaceHolder() {
    if (this.selectedItem) {
      return '';
    } else {
      return this.options.placeHolder;
    }
  }

  protected setCustIconOptions() {
    this.custIconOptions.componentOptions = this.options;
    this.componentName = 'PsSelectDropdownComponent';
    super.setCustIconOptions();
  }

}
