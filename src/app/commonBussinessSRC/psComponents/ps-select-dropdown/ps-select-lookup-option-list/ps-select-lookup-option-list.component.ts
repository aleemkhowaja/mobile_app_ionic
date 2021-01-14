import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDynamicComponentLoaderExposed, IOptionsPsKeyinInput } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsSelectLookupOptionListComponentExposed } from './ps-select-lookup-option-list.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 09/12/2019
 *
 * <p> PsSelectLookupOptionListComponent </p>
 */
@Component({
  selector: 'ps-select-lookup-option-list',
  templateUrl: './ps-select-lookup-option-list.component.html',
  styleUrls: ['./ps-select-lookup-option-list.component.scss'],
})
export class PsSelectLookupOptionListComponent extends PsBaseFieldComponent implements OnInit, OnChanges {

  @Input() public options: IOptionsPsSelectLookupOptionListComponentExposed = {};
  @Output() public changeItem: EventEmitter<any> = new EventEmitter<any>();
  public dynamicComponentOptions: IOptionsPsDynamicComponentLoaderExposed = {};
  public templateOptions: IMapKeyValue[] = [];
  public cardContentOptions: IMapKeyValue[] = [];
  public itemArraySize: number;
  public disableSelectDropdownOptions: IOptionsPsKeyinInput = {};
  enableEmptyOpt = PsCommonSettings.enableEmptyOpt;

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private cdRef?: ChangeDetectorRef
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.disableSelectDropdownOptions = {
      labelKey: '',
      placeHolder: '',
      fcName: this.options.fcName,
      group: new FormGroup({}),
      disablePreview: true
    };

    this.dynamicComponentOptions.labelKey = this.options.labelKey;
    this.dynamicComponentOptions.component = this.options.component;
    this.dynamicComponentOptions.listOfOptions = this.options.listOfOptions;
    this.dynamicComponentOptions.group = this.options.group;
    this.dynamicComponentOptions = this.options;
    this.loadLabelsValueMap();
    if (this.options.itemList === null || this.options.itemList === undefined) {
      this.itemArraySize = 2;
    }
    // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.disableSelectDropdownOptions.fcName], 0);
    // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.disableSelectDropdownOptions.fcName], 1);
  }

  onClickCard(event) {
    if (event && event.itemList) {
      this.options.itemList = event.itemList;
      this.options.showSelectedCard = true;
    }
    if (event && event.itemList && event.itemList.length === 1) {
      this.itemArraySize = 1;
      this.options.showDefaultTemplate = false;
    } else if (event && event.itemList && event.itemList.length > 1) {
      this.itemArraySize = 2;
    }
    this.changeItem.emit(event);
  }
  /**
   * preparing list for template card and content card from the map passed in options
   */
  private loadLabelsValueMap() {
    Array.from(this.options.labelsValueMap).forEach((element) => {
      const tempOption: IMapKeyValue = {
        key: element[0],
        value: element[1].value
      };
      this.templateOptions.push(tempOption);
    });
  }

  ngOnChanges() {
    this.dynamicComponentOptions.component = this.options.component;
    this.dynamicComponentOptions.listOfOptions = this.options.listOfOptions;
    this.dynamicComponentOptions.showItemPopUp = this.options.showItemPopUp;
    this.dynamicComponentOptions.group = this.options.group;
    if (this.options.itemList === null || this.options.itemList === undefined) {
      this.itemArraySize = 2;
    } else if (this.options.itemList.length > 0) {
      this.itemArraySize = 2;
    }
  }
}
