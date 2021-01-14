import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PsKeyinInputComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsInputPassword } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';


@Component({
  selector: 'ps-input-password',
  templateUrl: './ps-input-password.component.html',
  styleUrls: ['./ps-input-password.component.scss'],
})
export class PsInputPasswordComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputPassword;

  defaultConf: IOptionsPsInputPassword = {
    iconOptions: {
      iconName: 'lock-closed',
      iconPosition: 'start',
    },
    labelKey: 'password_key',
    placeHolder: 'password_key',
    type: 'text',
    disablePreview: true,
    autocomplete: 'new-password'
  };
  isFireFoxOrIE: boolean;

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    this.preventInput(e);
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    this.preventInput(e);
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    this.preventInput(e);
  }

  @HostListener('window:drop', ['$event']) public blockDrop(e) {
    this.preventInput(e);
  }

  @HostListener('window:dragover', ['$event']) public onDragOver(e) {
    this.preventInput(e);
  }

  @HostListener('window:dragleave', ['$event']) public onDragLeave(e) {
    this.preventInput(e);
  }

  constructor(commonP: PsCommonService, loggerP: LoggerService) {
    super(commonP, loggerP);
  }

  ngOnInit() {
    this.isFireFoxOrIE = CommonUtils.isFireFox() || CommonUtils.isIE();
    if (this.isFireFoxOrIE) {
      this.defaultConf.type = 'text';
      this.commonProv.copyObject(this.defaultConf, this.options, false);
    } else {
      this.commonProv.copyObject(this.defaultConf, this.options, false);
    }
    this.options.name = this.options.fcName + "_" + Date.now();
  }

  preventInput(e) {
    e.preventDefault();
  }

  onFocus(event) {
    super.writeValue('', true);
  }

  superWriteValue(value) {
    super.writeValue(value, true);
  }
}
