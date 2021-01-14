import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsComplexPurposeExposed } from './ps-complex-purpose.component.interfaces';

/**
 * @author Ammar.Ahmed
 * @since 30/01/2020
 *
 * <p> PsComplexPurposeComponent is a complex component base on ps-dropdown-purpose component</p>
 */

@Component({
  selector: 'ps-complex-purpose',
  templateUrl: './ps-complex-purpose.component.html',
  styleUrls: ['./ps-complex-purpose.component.scss'],
})

export class PsComplexPurposeComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() public options: IOptionsComplexPurposeExposed;
  selectedPurpose: any = null;
  purpose: IOptionsPsSelectDropdown = {};
  subPurpose: IOptionsPsSelectDropdown = {};
  subPurposeShow:boolean = false;


  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull?: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.purpose = {
      fcName: this.options.fcName,
      group: this.options.group,
      labelKey: 'purpose_key',
      placeHolder: 'purpose_key',
      listOfOptions: []
    };
    this.subPurpose = {
      fcName: 'sub' + this.options.fcName,
      group: this.options.group,
      labelKey: 'sub_purpose_key',
      placeHolder: 'sub_purpose_key',
      listOfOptions: []
    };
    this.loadPurposeData();
  }

  onChangePurpose(value: IchangeValues) {
    if (value !== undefined) {
      this.subPurposeShow = true;
      this.selectedPurpose = value;
      this.subPurpose = {
        fcName: 'sub' + this.options.fcName,
        group: this.options.group,
        labelKey: 'sub_purpose_key',
        placeHolder: 'sub_purpose_key',
        listOfOptions: this.selectedPurpose.selectedObj
      };
      this.onPsChange.emit(value);
    }
  }

  onChangeSubPurpose(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  async loadPurposeData() {
    await this.omniPull.returnCategorySubCategory({ type: 'Purpose' }).then((result) => {
      if (result && result.gridModel && result.gridModel.length > 0) {
        const resultList = [];
        result.gridModel.forEach((values, ind) => {
        console.log(values);
        const obj = {};
        obj['itemValue'] = values.categoriesId;
        obj['description'] = values.categoriesDescription;
        obj['selectedObj'] = [];
        values.subCategories.forEach(element => {
          const subObj = {};
          subObj['itemValue'] = element.subCategoriesId;
          subObj['description'] = element.subCategoriesDescription;
          obj['selectedObj'].push(subObj);
        });
        resultList.push(obj);
            
        // const purposeDropdown: IPsSelect = {
        //   itemValue: values.categoriesId,
        //   description: values.categoriesDescription,
        //   selectedObj: values
        // };
        // resultList.push(purposeDropdown);

        });
        this.purpose = {
          fcName: 'purpose',
          group: this.options.group,
          labelKey: 'purpose_key',
          placeHolder: 'purpose_key',
          listOfOptions: resultList
        };

      } else {
        this.logger.info('info_key', 'purpose_not_available_key');
      }
    }, (err) => {
      this.logger.error('error_key', 'network_problem_key');
    });
    // const                                                                                                                                                                                                                             result = [
    //   {
    //     itemValue: 'Purpose One', description: 'Purpose One',
    //     selectedObj: [{ itemValue: 'Sub One Purpose One', description: 'Sub One Purpose One' }, { itemValue: 'Sub One Purpose Two', description: 'Sub One Purpose Two' }, { itemValue: 'Sub One Purpose Three', description: 'Sub One Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Two', description: 'Purpose Two',
    //     selectedObj: [{ itemValue: 'Sub Two Purpose One', description: 'Sub Two Purpose One' }, { itemValue: 'Sub Two Purpose Two', description: 'Sub Two Purpose Two' }, { itemValue: 'Sub Two Purpose Three', description: 'Sub Two Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Three', description: 'Purpose Three',
    //     selectedObj: [{ itemValue: 'Sub Three Purpose One', description: 'Sub Three Purpose One' }, { itemValue: 'Sub Three Purpose Two', description: 'Sub Three Purpose Two' }, { itemValue: 'Sub Three Purpose Three', description: 'Sub Three Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Four', description: 'Purpose Four',
    //     selectedObj: [{ itemValue: 'Sub Four Purpose One', description: 'Sub Four Purpose One' }, { itemValue: 'Sub Four Purpose Two', description: 'Sub Four Purpose Two' }, { itemValue: 'Sub Four Purpose Three', description: 'Sub Four Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Five', description: 'Purpose Five',
    //     selectedObj: [{ itemValue: 'Sub Five Purpose One', description: 'Sub Five Purpose One' }, { itemValue: 'Sub Five Purpose Two', description: 'Sub Five Purpose Two' }, { itemValue: 'Sub Five Purpose Three', description: 'Sub Five Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Six', description: 'Purpose Six',
    //     selectedObj: [{ itemValue: 'Sub Six Purpose One', description: 'Sub Six Purpose One' }, { itemValue: 'Sub Six Purpose Two', description: 'Sub Six Purpose Two' }, { itemValue: 'Sub Six Purpose Three', description: 'Sub Six Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Seven', description: 'Purpose Seven',
    //     selectedObj: [{ itemValue: 'Sub Seven Purpose One', description: 'Sub Seven Purpose One' }, { itemValue: 'Sub Seven Purpose Two', description: 'Sub Seven Purpose Two' }, { itemValue: 'Sub Seven Purpose Three', description: 'Sub Seven Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Eight', description: 'Purpose Eight',
    //     selectedObj: [{ itemValue: 'Sub Eight Purpose One', description: 'Sub Eight Purpose One' }, { itemValue: 'Sub Eight Purpose Two', description: 'Sub Eight Purpose Two' }, { itemValue: 'Sub Eight Purpose Three', description: 'Sub Eight Purpose Three' }]
    //   }, {
    //     itemValue: 'Purpose Nine', description: 'Purpose Nine',
    //     selectedObj: [{ itemValue: 'Sub Nine Purpose One', description: 'Sub Nine Purpose One' }, { itemValue: 'Sub Nine Purpose Two', description: 'Sub Nine Purpose Two' }, { itemValue: 'Sub Nine Purpose Three', description: 'Sub Nine Purpose Three' }]
    //   }
    // ];
    // this.purpose.listOfOptions = result;

    
  }

}
