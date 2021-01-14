import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownProductTypesExposed } from './ps-dropdown-product-types.component.interfaces';
import { IOptionsPsSelectDropdown, IchangeValues, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IProductClass } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

/**
 * @author Aftab.Ali
 * @since 07/11/2019
 *
 * <p> PsDropdownProductTypesComponent will fetch the list of product types from server</p>
 */
@Component({
  selector: 'ps-dropdown-product-types',
  templateUrl: './ps-dropdown-product-types.component.html',
  styleUrls: ['./ps-dropdown-product-types.component.scss'],
})
export class PsDropdownProductTypesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownProductTypesExposed = {};
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
    this.loadProductTypes();
  }

  /**
   * populating product types fetched from server
   */
  private async loadProductTypes() {

    const productTypes = await this.omniPullService.returnProductClasses({}).catch(error => {
      this.logger.error('Error: While fetching Product types in PsDropdownProductTypesComponent : ', error);
    });

    if (productTypes && productTypes.gridModel && productTypes.gridModel.length > 0) {
      for (const iterator of productTypes.gridModel) {
        const productType: IPsSelect = {
          itemValue: iterator.productClassCode,
          description: iterator.briefName,
          /* noOfPayments: iterator.noOfPayment,
          downPayment: iterator.downPayment,
          periodicityNumber: iterator.periodicityNumber,
          periodicityPosition: iterator.periodicityPosition,
          periodicityType: iterator.periodicityType,
          productType: iterator.productType, */
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(productType);
      }
    }
  }

  selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
