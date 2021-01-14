import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsCategorySubCategory, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';


/**
 * @author Aftab.Ali
 * @since 14/03/2020
 *
 * <p> PsCategorySubCategoryComponent is responsile for fetching categories and sub-categories based on provided type like Purpose, Bank etc</p>
 */
@Component({
  selector: 'ps-category-sub-category',
  templateUrl: './ps-category-sub-category.component.html',
  styleUrls: ['./ps-category-sub-category.component.scss'],
})
export class PsCategorySubCategoryComponent extends PsBaseFieldComponent implements OnInit, OnChanges {
  load = true;

  get defaultOptions(): IOptionsCategorySubCategory {
    if (this.options.requestObject && this.options.requestObject[this.options.subCategory.fcName]
      && this.options.category.listOfOptions !== undefined && this.load) {
      this.load = false;
      const category = this.options.category.listOfOptions.filter((val, index) => {
        return val.itemValue === this.options.requestObject[this.options.category.fcName];
      }).shift();
      if (category) {
        this.options.requestObject[this.options.category.fcName] = category.itemValue;
        this.onChangeCategory({ newValue: category.itemValue });
        const subCategory = this.options.subCategory.listOfOptions.filter((val, index) => {
          return val.itemValue === this.options.requestObject[this.options.subCategory.fcName];
        }).shift();
        this.options.requestObject[this.options.subCategory.fcName] = subCategory.itemValue;
        this.onChangeSubCategory(subCategory);
      }
    }
    return {
      category: this.options.category,
      subCategory: this.options.subCategory,
      requestObject: this.options.requestObject,
      listOfOptions: this.options.listOfOptions,
      group: this.options.group,
    };
  }
  @Input() options: IOptionsCategorySubCategory = {};
  public selectedCategory: any = null;
  public subCategoryShow = false;
  public showCategory = false;
  categoryListById = [];

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.custIconOptions.component = PsCategorySubCategoryComponent;
    this.custIconOptions.componentOptions = this.options;
    super.init();
    this.loadCategories();
    this.options.category = {
      labelKey: this.options.category.labelKey,
      placeHolder: this.options.category.placeHolder,
      fcName: this.options.category.fcName,
      group: this.options.category.group
    };
    this.options.subCategory = {
      labelKey: this.options.subCategory.labelKey,
      placeHolder: this.options.subCategory.placeHolder,
      fcName: this.options.subCategory.fcName,
      group: this.options.subCategory.group
    };
  }


  private async loadCategories() {
    this.options.category.listOfOptions = [];

    if (this.options.defaultLoad) {
      const categories = await this.omniPull.returnCategorySubCategory({ type: this.options.type }).catch(error => {
        this.logger.error('Error ! while fetching categories [returnCategorySubCategory] in PsCategorySubCategoryComponent', error);
      });

      if (categories && categories.gridModel && categories.gridModel.length > 0) {
        this.loadDefaultCategories(categories.gridModel);
      }

    } else if (this.options.listOfOptions !== undefined && this.options.listOfOptions.length > 0) {
      this.loadCustomCategories(this.options.listOfOptions);
    }

    if (this.options.category.listOfOptions && this.options.category.listOfOptions.length > 0) {
      if (this.selectedCategory !== null && this.selectedCategory !== undefined && this.options.category.listOfOptions !== undefined) {
        const catList = this.options.category.listOfOptions.filter(cat => cat.itemValue === this.selectedCategory).shift();
        this.options.subCategory.listOfOptions = catList.subCategoryList;
      }
    }
  }

  public onChangeCategory(value) {
    let category = null;
    let filteredCategory = null;
    const selectedValue = (value.newValue || value.itemValue);

    if (value && selectedValue) {
      filteredCategory = this.categoryListById.filter((val, index) => {
        return val.id.toString() === selectedValue.toString();
      }).shift();

      if (this.options.category && this.options.category.listOfOptions) {
        category = this.options.category.listOfOptions.filter((val, index) => {
          return val.itemValue.toString() === selectedValue.toString();
        }).shift();
      }
    }

    if (value !== undefined && filteredCategory && filteredCategory.subCategoryList !== undefined) {
      this.subCategoryShow = true;
      this.selectedCategory = category.itemValue;
      this.options.subCategory.listOfOptions = filteredCategory.subCategoryList;
      // this.defaultOptions.subCategory.listOfOptions = filteredCategory.subCategoryList;
      this.onPsChange.emit(value);
    } else if (value !== undefined && selectedValue !== undefined) {
      category = value;
      this.selectedCategory = selectedValue;
      this.onPsChange.emit(value);
    }
  }

  public onChangeSubCategory(value) {
    this.onPsChange.emit(value);
  }

  private loadDefaultCategories(categories: Array<any>) {
    this.options.category.listOfOptions = [];
    for (const iterator of categories) {
      const category: IPsSelect = {};
      const categoryObj = { id: '', subCategoryList: [] };
      category.itemValue = iterator.categoriesId.toString();
      categoryObj.id = iterator.categoriesId;
      category.description = iterator.categoriesDescription;
      category.selectedObj = iterator;
      if (iterator.subCategories !== undefined) {
        iterator.subCategories.forEach(element => {
          const subCategory: IPsSelect = {};
          subCategory.itemValue = element.subCategoriesId.toString();
          subCategory.description = element.subCategoriesDescription;
          subCategory.selectedObj = element;
          categoryObj.subCategoryList.push(subCategory);
        });
      }
      delete (category.selectedObj.subCategories);
      if (this.options.category.listOfOptions == undefined) {
        this.options.category.listOfOptions = [];
      }
      this.options.category.listOfOptions.push(category);
      this.categoryListById.push(categoryObj);
    }
  }

  private loadCustomCategories(categories: Array<any>) {
    this.options.category.listOfOptions = [];
    if (this.options.customMappring && categories !== undefined) {
      for (const iterator of categories) {
        const category: IPsSelect = {};
        const categoryObj = { id: '', subCategoryList: [] };
        category.itemValue = iterator[this.options.customMappring.categoryId].toString();
        categoryObj.id = iterator[this.options.customMappring.categoryId];
        category.description = iterator[this.options.customMappring.categoryDescription];
        category.selectedObj = iterator;
        if (iterator[this.options.customMappring.subCategoryTagName] !== undefined) {
          for (const subIterator of iterator[this.options.customMappring.subCategoryTagName]) {
            const subCategory: IPsSelect = {};
            subCategory.itemValue = subIterator[this.options.customMappring.subCategoryId].toString();
            subCategory.description = subIterator[this.options.customMappring.subCategoryDescription];
            subCategory.selectedObj = subIterator;
            categoryObj.subCategoryList.push(subCategory);
          }
        }
        delete (category.selectedObj.subCategories);
        this.options.category.listOfOptions.push(category);
        this.categoryListById.push(categoryObj);
      }
    }
  }

  public ngOnChanges(values: SimpleChanges) {
    if (this.options.listOfOptions !== undefined && this.options.listOfOptions.length > 0) {
      this.loadCustomCategories(this.options.listOfOptions);
    }
  }

}
