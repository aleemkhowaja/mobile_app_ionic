import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOmniLovTypeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsLabelComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-label/ps-label/ps-label.component';
import { IOptionsPsLabel } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { OmniCommonService } from './../../../psServices/omni-common/omni-common.service';
import { IOptionsPsLabelUserLastLoginExposed } from './ps-label-user-last-login.component.interfaces';


@Component({
  selector: 'ps-label-user-last-login',
  templateUrl: './ps-label-user-last-login.component.html',
  styleUrls: ['./ps-label-user-last-login.component.scss']
})
export class PsLabelUserLastLoginComponent extends PsLabelComponent
  implements OnInit {
  @Input() options: IOptionsPsLabelUserLastLoginExposed;
  datePipeString: string;
  labelOptions: IOptionsPsLabel = {
    translate: false,
    labelKey: 'last_login_key' // default key for this string.
  };
  ipLabelOptions: IOptionsPsLabel = {
    translate: false,
    labelKey: ''
  };
  timeLabelOptions: IOptionsPsLabel = {
    translate: false,
    labelKey: ''
  };
  lastLoginLabelOptions: IOptionsPsLabel = {
    labelKey: 'last_login_key'
  };

  constructor(
    common: PsCommonService,
    public logger: LoggerService,
    public omniCommon: OmniCommonService,
    private datePipe: DatePipe,
    public omniPull: OmniPullService
  ) {
    super(common, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.options, this.labelOptions, false, true);
    this.commonProv.copyObject(this.options, this.ipLabelOptions, false, true);
    this.commonProv.copyObject(
      this.options,
      this.timeLabelOptions,
      false,
      true
    );
    try {
      this.labelOptions.labelKey = this.omniCommon.common.translate(this.labelOptions.labelKey);
      if (this.omniCommon.common.getLoginResponse()) {
        this.ipLabelOptions.labelKey = this.omniCommon.common.getLoginResponse().omniUserVO.COMP_CODE.toString();
        this.omniPull.getParamValOf('DefaultDateTimeFormat').then(result => {
          if (result) {
            const paramData: IOmniLovTypeRequest = {
              lovTypeId: CommonBussinessConstant.DEFAULT_DATE_TIME_LOV_TYPE_ID,
              lovCodesInlude: result['DefaultDateTimeFormat']
            };
            this.omniPull.returnLovTypesValues(paramData).then(res => {
              if (res) {
                this.datePipeString = this.datePipe.transform(new Date(this.omniCommon.common.getLoginResponse().omniUserVO.LAST_ACCESS_TIME).toISOString(), res[0].description);
                this.timeLabelOptions.labelKey = this.datePipeString;
              }
            }).catch(error => this.logger.log(error));
          }
        }).catch(error => this.logger.log(error));
      }
    } catch (e) {
      this.omniCommon.common.logger.error(e);
    }
  }
}
