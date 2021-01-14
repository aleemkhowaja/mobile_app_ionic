import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IchangeValues, IOptionsCategorySubCategory, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsComplexEcoSectorsExposed } from './ps-complex-eco-sector.component.interface';

@Component({
  selector: 'ps-complex-eco-sector',
  templateUrl: './ps-complex-eco-sector.component.html',
  styleUrls: ['./ps-complex-eco-sector.component.scss'],
})
export class PsComplexEcoSectorComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() public options: IOptionsComplexEcoSectorsExposed;
  formGorup: FormGroup = new FormGroup({});
  selectedEcoSectors: any = null;
  ecoSectors: IOptionsPsSelectDropdown = {};
  subEcoSectors: IOptionsPsSelectDropdown = {};
  subEcoSectorShow = false;
  ecoSectorShow = false;
  ecoCategoryOptions: IOptionsCategorySubCategory = {};


  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull?: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.loadOptions(null);
    this.loadEcoSectorsData();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.subEcoSectors.fcName], 0)
  }

  onChangeEcoSectors(value: IchangeValues) {
    this.subEcoSectorShow = true;
    this.selectedEcoSectors = value;
    if (this.selectedEcoSectors.obj) {
      this.subEcoSectors = {
        fcName: 'sub' + this.options.fcName,
        group: this.options.group,
        labelKey: 'sub_eco_sectors_key',
        placeHolder: 'select_sub_eco_sectors_key',
        listOfOptions: this.selectedEcoSectors.obj
      };
    }
    this.onPsChange.emit(value);
  }

  onChangeSubSectors(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  private async loadEcoSectorsData() {

    const result = await this.omniPull.returnEcoSector({}).catch(error => {
      this.logger.error('Error ! while fetching eco sector in PsComplexEcoSectorComponent');
    });

    if (result && result.gridModel && result.gridModel.length > 0) {
      this.loadOptions(result.gridModel);
    }
  }

  /**
   * load option for eco sector categories
   */
  private loadOptions(list: Array<any>) {
    this.ecoCategoryOptions = {
      customMappring: {
        categoryId: 'ecoSectorCode',
        categoryDescription: 'briefDesc',
        subCategoryId: 'subSectorCode',
        subCategoryDescription: 'briefDesc',
        categoryTagName: '',
        subCategoryTagName: 'ecoSubSectorsList',
      },
      listOfOptions: list !== null && list !== undefined && list.length > 0 ? list : [],
      defaultLoad: false,
      category: {
        labelKey: 'eco_sector_key',
        placeHolder: 'select_eco_sector_key',
        fcName: this.options.fcName,
        group: this.options.group
      },
      subCategory: {
        labelKey: 'sub_echo_sectors_key',
        placeHolder: 'select_sub_eco_sector_key',
        fcName: 'sub' + this.options.fcName,
        group: this.options.group
      }
    };
  }


}
