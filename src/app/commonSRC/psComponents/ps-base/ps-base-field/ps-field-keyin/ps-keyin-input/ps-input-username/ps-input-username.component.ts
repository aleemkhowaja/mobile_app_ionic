import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PsFieldKeyinComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-field-keyin.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInputUserNameExposed, IOptionsPsKeyinInput } from './../../../../../../psServices/models/ps-common-interface';



@Component({
  selector: 'ps-input-username',
  templateUrl: './ps-input-username.component.html',
  styleUrls: ['./ps-input-username.component.scss'],
})
export class PsInputUsernameComponent extends PsFieldKeyinComponent implements OnInit {

  @Input() public options: IOptionsPsInputUserNameExposed;
  defaultConf: IOptionsPsKeyinInput = {
    iconOptions: {
      iconName: 'user',
      iconPosition: 'start',
    },
    labelKey: 'user_name_key',
    placeHolder: 'enter_your_username_key',
    type: 'text',
    autocomplete: 'new-password'
  };
  public verificationImage;

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

  constructor(common: PsCommonService, loggerP: LoggerService) {
    super(common, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultConf, this.options, false, false);
    this.defaultConf.name = this.options.fcName + "_" + Date.now();
  }

  preventInput(e) {
    e.preventDefault();
  }
}
