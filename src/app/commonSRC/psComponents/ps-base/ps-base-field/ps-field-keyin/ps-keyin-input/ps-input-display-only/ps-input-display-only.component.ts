import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from '../../../../../../psServices/models/common-constant';
import { PsCommonSettings } from '../../../../../../psServices/models/ps-common.settings';
import { PsKeyinInputComponent } from '../ps-keyin-input.component';


@Component({
  selector: 'ps-input-display-only',
  templateUrl: './ps-input-display-only.component.html',
  styleUrls: ['./ps-input-display-only.component.scss'],
})
export class PsInputDisplayOnlyComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsKeyinInput;
  get fieldVisibility() {
    if (PsCommonSettings.custMode) {
      return true;
    }
    return this.visible && !this.previewMode && (this.displayValue.labelKey || this.options.showEmpty);
  }

  constructor(commonP: PsCommonService, loggerP: LoggerService) {
    super(commonP, loggerP);
  }

  get displayValue(): IOptionsPsLabel {
    return {
      labelKey: this.fcFieldValue || this.options.group.controls[this.options.fcName].value,
      translate: false
    };
  }
  defaultConf: IOptionsPsKeyinInput = {
    type: 'text',
    psClass: 'ps-disabled'
  };

  ngOnInit() {
    this.custIconOptions.component = PsInputDisplayOnlyComponent;
    this.custIconOptions.componentOptions = this.options;
    super.init();
    this.commonProv.copyObject(this.options, this.defaultConf);
    this.defaultConf.psClass = 'ps-disabled';
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.fcName], 0);
    this.custIconOptions.availableCustomization.IS_READONLY = false;
  }

}
