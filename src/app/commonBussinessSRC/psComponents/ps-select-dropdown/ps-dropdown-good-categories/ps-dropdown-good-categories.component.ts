import { IOptionsPsDropdownGoodCategoriesExposed } from './ps-dropdown-good-categories.component.interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsSelectDropdown, IchangeValues, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';

/**
 * @author Ahmed.Ragab
 * @since 14/06/2019
 *
 * <p> PsDropdownProductTypesComponent will fetch the list of product types from server</p>
 */
@Component({
  selector: 'ps-dropdown-good-categories',
  templateUrl: './ps-dropdown-good-categories.component.html',
  styleUrls: ['./ps-dropdown-good-categories.component.scss'],
})
export class PsDropdownGoodCategoriesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownGoodCategoriesExposed = {};
  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: [],
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPullService?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.loadGoodCategories();
  }

  /**
   * populating Good Categories fetched from server
   */
  private async loadGoodCategories() {

    const GoodCategories = await this.omniPullService.returnGoodCategories({}).catch(error => {
      this.logger.error('Error: While fetching Good Categories in PsDropdownGoodCategoriesComponent : ', error);
    });

    if (GoodCategories && GoodCategories.gridModel && GoodCategories.gridModel.length > 0) {
      for (const iterator of GoodCategories.gridModel) {
        const GoodCategory: IPsSelect = {
          itemValue: iterator.goodsCategoryId,
          description: iterator.goodsCategoryName,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(GoodCategory);
      }
    }
  }

  selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
