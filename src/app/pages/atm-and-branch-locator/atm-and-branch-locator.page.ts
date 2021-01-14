import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsTemplateView } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'atm-and-branch-locator',
  templateUrl: './atm-and-branch-locator.page.html',
  styleUrls: ['./atm-and-branch-locator.page.scss'],
})
export class AtmAndBranchLocatorPage extends OmniBasePage implements OnInit {
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super();
  }

  private formGroup = new FormGroup({});
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  ngOnInit() {
    super.init();
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'mapAtmBranches',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: true,
      mapTypesInclude: '\'A\',\'B\',\'C\''
    };
  }


}
