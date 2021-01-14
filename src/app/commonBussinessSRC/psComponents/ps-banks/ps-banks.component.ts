import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsCategorySubCategory } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsBanksExposed } from './ps-banks.component.interfaces';

@Component({
  selector: 'ps-banks',
  templateUrl: './ps-banks.component.html',
  styleUrls: ['./ps-banks.component.scss'],
})
export class PsBanksComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsBanksExposed = {};
  public categoriesOptions: IOptionsCategorySubCategory = {};

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.categoriesOptions = {
      type: CommonBussinessConstant.CATEGORY_BANK,
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
      requestObject: this.options.requestObject
    };
  }

}
