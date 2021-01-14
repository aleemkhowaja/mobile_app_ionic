import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'card-request',
  templateUrl: './card-request.page.html',
  styleUrls: ['./card-request.page.scss'],
})
export class CardRequestPage extends OmniBasePage implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'card_req_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['card_req_step1', 'card_req_step2'],
    group: this.formGroup,
    // submitServiceUrl: PsCommonSettings.serviceUrl.checkbook-request,
  };
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  cardNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'card_name_key',
    placeHolder: 'card_name_key',
    group: this.formGroup,
    fcName: 'cardName'
  };

  OptionsExchangeRateOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'exchange_rate_key',
    placeHolder: 'exchange_rate_key',
    group: this.formGroup,
    fcName: 'exchangesRate'
  };
  lienAccountOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'lien_account_key',
    placeHolder: 'lien_account_key',
    group: this.formGroup,
    fcName: 'lienAccount'
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_request_key',
    iconName: 'document',
    expanded: true
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };
  selectedBranchObj = {};
  enableCifBranch = false;
  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };
  constructor(private omniPull: OmniPullService) {
    super();
  }
  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'mapAtmBranches',
      labelKey: 'map_atm-branch_key',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: false,
      mapTypesInclude: 'B',
      branchIds: '1,3,5'
    };
  }


  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
    }
  }
}
