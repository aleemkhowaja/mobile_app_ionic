import { Component, Input, OnInit } from '@angular/core';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionButton, IOptionsPsContainerList, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsComplexFindCIFComponentExposed } from './ps-complex-find-CIF.component.interfaces';


/**
 * @author Zunair.Zakir
 * @since 03/02/2020
 *
 * <p> PsComplexFindCIFComponent is a complex component for finding CIF for Agents</p>
 */
@Component({
  selector: 'ps-complex-find-CIF',
  templateUrl: './ps-complex-find-CIF.component.html',
  styleUrls: ['./ps-complex-find-CIF.component.scss'],
})
export class PsComplexFindCIFComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexFindCIFComponentExposed = {};

  cifList: Array<any>;
  emptyFields: boolean;
  searchByCifNumber: boolean;
  searchByCifLongName: boolean;
  searchByIdNumber: boolean;
  cifListOptions: IOptionsPsContainerList = {};
  isVerified: boolean;
  cifNumberOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'cifNumber',
    labelKey: 'cif_no_key',
    placeHolder: 'cif_no_key',
  };
  cifLongNameOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'cifLongName',
    labelKey: 'cif_long_name_key',
    placeHolder: 'cif_long_name_key',
  };
  idNumberOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'idNumber',
    labelKey: 'id_number_key',
    placeHolder: 'id_number_key',
  };
  searchCIFOptions: IOptionsPsActionButton = {
    psClass: 'ps-find-CIF-search',
    labelKey: 'verify_key',
    iconName: 'checkmark',
    group: this.options.group
  };
  resetCIFOptions: IOptionsPsActionButton = {
    psClass: 'ps-find-CIF-reset',
    labelKey: 'reset_key',
    iconName: 'refresh',
    group: this.options.group
  };
  noCifFound: boolean;
  public noCifAvailableLabelOptions: IOptionsPsLabel = {
    labelKey: 'no_cif_available_key',
    previewMode: false
  };

  hintMessageLabelOptions: IOptionsPsLabel = { labelKey: 'cif_hint_message_key' };
  constructor(
    public navigatorProv: PsNavigatorService,
    public commonService: PsCommonService,
    logger: LoggerService,
    private ommniCommon: OmniCommonService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.cifNumberOptions.group = this.options.group;
    this.cifLongNameOptions.group = this.options.group;
    this.idNumberOptions.group = this.options.group;
    this.cifList = [];
    this.noCifFound = false;
    this.isVerified = false;
    this.emptyFields = true;
    this.setNotMandatoryControl();
   }

  onChange(values) {
    console.log(values);
  }

  resetCif() {
    this.options.group.controls[this.cifNumberOptions.fcName].reset();
    this.options.group.controls[this.cifLongNameOptions.fcName].reset();
    this.options.group.controls[this.idNumberOptions.fcName].reset();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifNumberOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifLongNameOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.idNumberOptions.fcName], 0);
    this.setNotMandatoryControl();
    this.isVerified = false;
    this.noCifFound = false;
    this.emptyFields = true;
    this.ommniCommon.common.session.remove(ConstantCommon.WORKINGCIF);
  }

  searchCif() {
    this.cifList = [];
    this.searchByCifNumber = false;
    this.searchByCifLongName = false;
    this.searchByIdNumber = false;

    const cifNumbers = this.options.group.controls[this.cifNumberOptions.fcName].value;
    const cifLongNames = this.options.group.controls[this.cifLongNameOptions.fcName].value;
    const idNumbers = this.options.group.controls[this.idNumberOptions.fcName].value;

    if (cifNumbers !== undefined) {
      this.searchByCifNumber = true;
    }
    if (cifLongNames !== undefined) {
      this.searchByCifLongName = true;
    }
    if (idNumbers !== undefined) {
      this.searchByIdNumber = true;
    }
    const requestData = {
      // userCifNo: cifNumbers,
      cifNumber: cifNumbers,
      cifName: cifLongNames,
      idNo: idNumbers
    };

    if (!requestData.cifName && !requestData.cifNumber && !requestData.idNo) {
      CommonUtils.presentFailureAlert(this.commonProv.translate('enter_value_before_proceed_key'), { autoHide: true });
      return;
    }


    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifNumberOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifLongNameOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.idNumberOptions.fcName], 1);

    this.omniPull.returnCIF(requestData).then((result) => {
      if (result && result.gridModel.length > 0) {
        result.gridModel.forEach((values) => {
          if (values.cifNo === requestData.cifNumber || values.idNo === requestData.idNo || values.name === requestData.cifName) {
            this.navigatorProv.navigateToMain();
            const data = {
              cifNumber: values.cifNo,
              cifLongName: values.name,
              idNumber: values.idNo
            };
            this.options.group.controls[this.cifNumberOptions.fcName].setValue(data.cifNumber);
            this.options.group.controls[this.cifLongNameOptions.fcName].setValue(data.cifLongName);
            this.options.group.controls[this.idNumberOptions.fcName].setValue(data.idNumber);
            this.ommniCommon.common.session.append(ConstantCommon.WORKINGCIF, data.cifNumber);
            CommonUtils.presentSuccessAlert(this.commonProv.translate('working_cif_applied_succ_key'), { autoHide: true });
            this.isVerified = true;
            this.emptyFields = false;
          }
        });
        if (!this.options.group.controls[this.cifNumberOptions.fcName].value) {
          this.noCifFoundAction();
        }
        this.noCifFound = false;
      } else {
        this.noCifFoundAction();
      }
    }).catch(error => {
      this.logger.error('Error: While fetching CIF in PsComplexFindCIFComponent :', error);
    });
  }

  noCifFoundAction() {
    CommonUtils.presentFailureAlert(this.commonProv.translate('no_cif_found_key'), { autoHide: true });
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifNumberOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.cifLongNameOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.idNumberOptions.fcName], 0);
    this.noCifFound = true;
    this.isVerified = false;
  }

  setNotMandatoryControl() {
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.cifNumberOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.cifLongNameOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.idNumberOptions.fcName], 0);
  }

}
