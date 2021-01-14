import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOptionsPsComplexCifIdTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-id-types/ps-complex-cif-id-types.component.interface';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { ICustPatternVal, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-complex-cif-id-types',
  templateUrl: './ps-complex-cif-id-types.component.html',
  styleUrls: ['./ps-complex-cif-id-types.component.scss'],
})
export class PsComplexCifIdTypesComponent extends PsBaseFieldComponent implements OnInit {
  @Input() options: IOptionsPsComplexCifIdTypesExposed;
  defaultOptions: IOptionsPsComplexCifIdTypesExposed = {
    cifTypeOptions: {
      labelKey: 'cif_key',
      placeHolder: 'select_cif_type_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    complexIdDetailsOptions: {
      dropdownIdTypesOptions: {
        fcName: 'idType1',
        labelKey: 'national_id_type_key',
        placeHolder: 'enter_national_id_type_key',
      },
      idNumberOptions: {
        labelKey: 'id_number_key',
        placeHolder: 'enter_id_number_key',
        fcName: 'idNumber1',
      },
      dateExpiryOptions: {
        labelKey: 'expiry_date_key',
        placeHolder: 'enter_expiry_date_key',
        fcName: 'expiryDate1',
      },
      countriesOptions: {
        labelKey: 'country_of_issuance_key',
        placeHolder: 'select_country_of_issuance_key',
        fcName: 'issuanceCountry1',
        iconOptions: {
          iconName: 'clipboard'
        },

      },
      issueDateOptions: {
        labelKey: 'issue_date_key',
        placeHolder: 'issue_date_key',
        fcName: 'issueDate1',

      }
    },
    complexIdDetailsOptions1: {
      dropdownIdTypesOptions: {
        fcName: 'idType1',
        labelKey: 'national_id_type_key',
        placeHolder: 'enter_national_id_type_key',
      },
      idNumberOptions: {
        labelKey: 'id_number_key',
        placeHolder: 'enter_id_number_key',
        fcName: 'idNumber1',
      },
      dateExpiryOptions: {
        labelKey: 'expiry_date_key',
        placeHolder: 'enter_expiry_date_key',
        fcName: 'expiryDate1',
      },
      countriesOptions: {
        labelKey: 'country_of_issuance_key',
        placeHolder: 'select_country_of_issuance_key',
        fcName: 'issuanceCountry1',
        iconOptions: {
          iconName: 'clipboard'
        },
      },
      issueDateOptions: {
        labelKey: 'issue_date_key',
        placeHolder: 'issue_date_key',
        fcName: 'issueDate1',
      }

    },
    showCifType: true
  };
  showBG = false;
  mandatoryIdTypes: IOptionsPsComplexIdDetailsExposed[] = [];
  optionalIdTypes: any[] = [];
  showIdDropDown = false;
  mandatoryIdThere = false;
  constructor(commonService: PsCommonService, logger: LoggerService, private omniPull: OmniPullService) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options);
    super.init();
    if (this.defaultOptions.showCifType == false) {
      this.returnIDTypes(null);
    }
    // PsCommonSettings.oper_ID = 1481;
  }

  onChange(event) {
    if (event && event.selectedObj) {
      this.returnIDTypes(event.selectedObj);
      this.onPsChange.emit(event);
    }
  }
  private async returnIDTypes(selectedObj) {
    const paramData: any = {
      cifType: {
        selectedObj
      }
    };
    this.omniPull.returnIdTypesList(paramData).then((result) => {
      this.mandatoryIdTypes = [];
      this.optionalIdTypes = [];
      let optionalIdType;

      if (result && result.gridModel && result.gridModel.length > 0) {
        this.showIdDropDown = false;
        let num = 1;
        /*
          #DN GilbertAndary #BUG 1096926
        */
        const mandatoryList = result.gridModel.filter((val => val.mandatory === true));
        this.mandatoryIdThere = mandatoryList.length > 0 ? true : false;
        for (const iterator of result.gridModel) {
          const obj: IOptionsPsComplexIdDetailsExposed = {
            group: this.options.group,
            dropdownIdTypesOptions: {
              labelKey: 'national_id_type_key',
              placeHolder: 'enter_national_id_type_key',
              group: this.options.group
            },
            idNumberOptions: {
              labelKey: 'id_number_key',
              placeHolder: 'enter_id_number_key',
              group: this.options.group
            },
            dateExpiryOptions: {
              labelKey: 'expiry_date_key',
              placeHolder: 'enter_expiry_date_key',
              group: this.options.group
            },
            countriesOptions: {
              labelKey: 'country_of_issuance_key',
              placeHolder: 'select_country_of_issuance_key',
              iconOptions: {
                iconName: 'clipboard'
              },
              group: this.options.group
            },
            issueDateOptions: {
              labelKey: 'issue_date_key',
              placeHolder: 'issue_date_key',
              group: this.options.group
            }
          };

          if (iterator.mandatory === true) {
            obj.dropdownIdTypesOptions.fcName = 'idType' + num;
            obj.idNumberOptions.fcName = 'idNumber' + num;
            obj.dateExpiryOptions.fcName = 'expiryDate' + num;
            obj.countriesOptions.fcName = 'issuanceCountry' + num;
            obj.issueDateOptions.fcName = 'issueDate' + num;
            this.showBG = true;
            const list: IPsSelect[] = [{
              itemValue: iterator.CODE.toString(),
              description: iterator.briefDesc,
              selectedObj: iterator
            }];
            obj.dropdownIdTypesOptions.listOfOptions = list;
            this.mandatoryIdTypes.push(obj);
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [obj.dropdownIdTypesOptions.fcName], 1);
            this.options.group.addControl(obj.dropdownIdTypesOptions.fcName, new FormControl());
            this.commonProv.setValInsideNestedObj(obj.dropdownIdTypesOptions.fcName, iterator.CODE.toString(), this.options.requestObject);
            if (iterator.fromLen) {
              this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINLENGTH, [obj.idNumberOptions.fcName], iterator.fromLen);
            }
            if (iterator.toLen) {
              this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXLENGTH, [obj.idNumberOptions.fcName], iterator.toLen);
            }
            if (iterator.DATA_TYPE) {
              this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_PATTERN, [obj.idNumberOptions.fcName], this.getDataType(iterator.DATA_TYPE));
            }
            num = num + 1;
          } else if (iterator.mandatory === false && !this.mandatoryIdThere) {
            this.showBG = true;
            const list: IPsSelect = {
              itemValue: iterator.CODE.toString(),
              description: iterator.briefDesc,
              selectedObj: iterator
            };
            optionalIdType = '';
            optionalIdType = iterator.CODE.toString();
            this.optionalIdTypes.push(list);
          }

        }
        if (this.optionalIdTypes && this.optionalIdTypes.length > 0 /* #DN GilbertAndary #BUG 1096926*/ && !this.mandatoryIdThere) {
          this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.listOfOptions = this.optionalIdTypes;
          this.options.group.controls[this.defaultOptions.complexIdDetailsOptions1.idNumberOptions.fcName].reset();
          if (this.optionalIdTypes.length === 1) {
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.fcName], 1);
            this.options.group.addControl(this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.fcName, new FormControl());
            this.commonProv.setValInsideNestedObj(this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.fcName, optionalIdType, this.options.requestObject);
          } else {
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.fcName], 0);
            this.commonProv.setValInsideNestedObj(this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.fcName, null, this.options.requestObject);
          }
        }
      } else {
        this.showIdDropDown = true;
        this.showBG = true;
        this.mandatoryIdTypes = [];
        this.optionalIdTypes = [];
        this.defaultOptions.complexIdDetailsOptions1.dropdownIdTypesOptions.listOfOptions = [];
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.defaultOptions.complexIdDetailsOptions.dropdownIdTypesOptions.fcName], 0);
        //   this.options.group.controls[this.defaultOptions.complexIdDetailsOptions.idNumberOptions.fcName].reset();
        
        if(this.defaultOptions.group.controls[this.defaultOptions.complexIdDetailsOptions.dropdownIdTypesOptions.fcName]) {
          this.commonProv.setValInsideNestedObj(this.defaultOptions.complexIdDetailsOptions.dropdownIdTypesOptions.fcName, null, this.options.requestObject);
        }
      }
    }, (err) => {
      this.logger.error('Error: While fetching data : ', err);
    });
  }

  getDataType(val): ICustPatternVal {
    let patrn: ICustPatternVal;
    switch (val) {
      case CommonBussinessConstant.DEFAULT_DATA_TYPE:
        return patrn = { expression: ConstantCommon.numericRegex, errorMsg: 'field_should_contain_numeric_characters_key' };
      case CommonBussinessConstant.ALPHA_DATA_TYPE:
        return patrn = { expression: ConstantCommon.alphaRegex, errorMsg: 'field_should_contain_alphabetic_characters_key' };
      case CommonBussinessConstant.NUMERIC_DATA_TYPE:
        return patrn = { expression: ConstantCommon.numericRegex, errorMsg: 'field_should_contain_numeric_characters_key' };
      case CommonBussinessConstant.ALPHA_NUMERIC_DATA_TYPE:
        return patrn = { expression: ConstantCommon.alphaNumericRegex, errorMsg: 'field_should_contain_alpha_numeric_characters_key' };
      default:
        return patrn = { expression: ConstantCommon.numericRegex, errorMsg: 'field_should_contain_numeric_characters_key' };
    }
  }

  onItemChange(values: any) {
    //this.options.group.controls[this.defaultOptions.complexIdDetailsOptions.idNumberOptions.fcName].reset();
    if (values && values.selectedObj) {
      const patrn = this.getDataType(values.selectedObj.DATA_TYPE);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_PATTERN, [this.defaultOptions.complexIdDetailsOptions.idNumberOptions.fcName], patrn);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINLENGTH, [this.defaultOptions.complexIdDetailsOptions.idNumberOptions.fcName], values.selectedObj.FROM_LEN);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXLENGTH, [this.defaultOptions.complexIdDetailsOptions.idNumberOptions.fcName], values.selectedObj.TO_LEN);
    }
  }
}
