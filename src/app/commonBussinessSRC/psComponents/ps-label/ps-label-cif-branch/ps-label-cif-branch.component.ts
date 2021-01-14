import { Component, Input, OnInit } from '@angular/core';
import { IOcBranchesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsLabelComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-label/ps-label/ps-label.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsLabelCifBranchExposed } from './ps-label-cif-branch.component.interface';

@Component({
  selector: 'ps-label-cif-branch',
  templateUrl: './ps-label-cif-branch.component.html',
  styleUrls: ['./ps-label-cif-branch.component.scss'],
})
export class PsLabelCifBranchComponent extends PsLabelComponent implements OnInit {
  @Input() options: IOptionsPsLabelCifBranchExposed = {
    labelKey: 'cif_branch_key'
  };
  cifBranchName: any;
  cifBranchCode: any = 1;
  
  constructor(public commonService: PsCommonService, public logger: LoggerService, private omniPull: OmniPullService) {
    super(commonService, logger);
  }

  ngOnInit() {
    const cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    try {
    const paramData: IOcBranchesRequest = {
      branchesIdList: cifInfo.cifBranch
    };
    this.omniPull.returnBranchesList(paramData).then((result) => {

      if (result && result.gridModel != null && result.gridModel.length > 0) {
        this.options.labelKey = cifInfo.cifBranch ? cifInfo.cifBranch : '' + ' - ' + result.gridModel[0].longDesc;
        } else { this.logger.warn(result, 'empty response'); }
    }).catch((error) => { });
  } catch (error) {}
  }

}
