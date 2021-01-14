import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsCategorySubCategory } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsPurposeExposed } from './ps-purpose.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 14/03/2020
 *
 * <p> PsPurposeComponent will be using ps-category-sub-category component and pass type as Purpose</p>
 */
@Component({
  selector: 'ps-purpose',
  templateUrl: './ps-purpose.component.html',
  styleUrls: ['./ps-purpose.component.scss'],
})
export class PsPurposeComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsPurposeExposed = {};
  public categoriesOptions: IOptionsCategorySubCategory = {};

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.categoriesOptions = {
      type: CommonBussinessConstant.CATEGORY_PURPSE,
      defaultLoad: true,
      category: {
        labelKey: this.options.categoryLabelKey,
        placeHolder: this.options.categoryPlaceholderKey,
        fcName: this.options.categoryFcName,
        group: this.options.group
      },
      subCategory: {
        labelKey: this.options.subCategoryLabelKey,
        placeHolder: this.options.subCategoryPlaceholderKey,
        fcName: this.options.subCategoryFcName,
        group: this.options.group
      },
      requestObject : this.options.requestObject,
    };
  }

}

