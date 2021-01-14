import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OmniPushService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-push.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsDynamicEditExposed, IOptionsPsActionIcon, IOptionsPsKeyinInput, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseComponent } from '../ps-base.component';



/**
 * @author Aftab.Ali
 * @since 30/1/2020
 *
 * <p> PsDynamicEditComponent is responsile for editing a single value based on provided maps</p>
 */
@Component({
  selector: 'ps-dynamic-edit',
  templateUrl: './ps-dynamic-edit.component.html',
  styleUrls: ['./ps-dynamic-edit.component.scss'],
})
export class PsDynamicEditComponent extends PsBaseComponent implements OnInit {

  @Input() options: IOptionsDynamicEditExposed = {};
  public inputEditOptions: IOptionsPsKeyinInput = {};
  public showEdit = false;
  public editIconOptions: IOptionsPsActionIcon;
  public submitIconOptions: IOptionsPsActionIcon;
  public labelOption: IOptionsPsLabel = {};

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPush: OmniPushService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.custIconOptions.component = PsDynamicEditComponent;
    this.custIconOptions.componentOptions = this.options;
    this.options.formGroup = new FormGroup({});
    this.labelOption = {
      labelKey: this.options.valueMap,
      translate: this.options.translate
    };
    this.inputEditOptions = {
      placeHolder: 'place_holder_key',
      fcName: this.options.fcName,
      group: this.options.formGroup
    };
    this.editIconOptions = {
      iconName: 'create'
    };
    this.submitIconOptions = {
      iconName: 'checkmark',
      labelOptions: {
        labelKey: 'save_key'
      }
    };
  }

  /**
   * will show the edit button and poplulate the value to edit
   */
  public showEditInput() {
    this.showEdit = true;
    setTimeout(() => {
      this.inputEditOptions.group.controls[this.inputEditOptions.fcName].setValue(this.options.valueMap);
    }, 0);
  }

  /**
   * will prepare the request map and data to edit the server base on actionUrl
   */
  public submit() {
    const requestParams = this.options.formGroup.value;
    if (this.options && this.options.editRequestMap && this.options.requestMap) {
      this.common.presentLoading();
      this.options.editRequestMap.forEach((value: string, key: string) => {
        const requestObj = {};
        if (key === 'type') {
          requestObj[key] = value;
        } else {
          requestObj[key] = requestParams[value];
        }
        this.common.copyObject(requestParams, requestObj, false);
      });

      this.options.requestMap.forEach((value: string, key: string) => {
        const requestObj = {
          [key]: this.options.itemCard[value]
        };
        this.common.copyObject(requestParams, requestObj, false);
      });

      if (this.options.actionUrl && this.options.actionUrl) {
        this.omniPush.genericActionFunc(requestParams, this.options.actionUrl).then(result => {
          if (result) {
            if ((result.outputType && result.outputType === 'S') || (result.outputCode && result.outputCode === 0)) {
              this.showEdit = false;
              setTimeout(() => {
                if (requestParams.newNickName !== undefined && requestParams.newNickName !== '') {
                  this.options.valueMap = requestParams.newNickName;
                  this.labelOption = {
                    labelKey: requestParams.newNickName,
                    translate: this.options.translate
                  };
                  this.inputEditOptions.group.controls[this.inputEditOptions.fcName].setValue(requestParams.newNickName);
                }
              }, 1);
            } else {
              this.showEdit = true;
            }
          }
          this.common.dismissLoading();
        }).catch((error) => {
          this.common.dismissLoading();
          this.showEdit = true;
          this.logger.log(error);
        });
      } else {
        this.common.dismissLoading();
      }
    }

  }
}
