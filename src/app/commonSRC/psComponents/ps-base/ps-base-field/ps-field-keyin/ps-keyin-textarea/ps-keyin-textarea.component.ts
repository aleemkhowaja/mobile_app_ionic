import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsContainerItem, IOptionsPsKeyinTextarea, IOptionsPsLabelInput } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsFieldKeyinComponent } from './../ps-field-keyin.component';


@Component({
  selector: 'ps-keyin-textarea',
  templateUrl: './ps-keyin-textarea.component.html',
  styleUrls: ['./ps-keyin-textarea.component.scss'],
})
export class PsKeyinTextareaComponent extends PsFieldKeyinComponent implements OnInit {

  @Input() options: IOptionsPsKeyinTextarea = {};
  @ViewChild('msgInput', { read: ElementRef, static: false }) msgInput: ElementRef<HTMLElement>;

  labelOptions: IOptionsPsLabelInput = {};


  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.addComponentValidator(this.options.group, this.options.fcName, this.common.prepareValidation(false, null, false, null, null, ConstantCommon.DEFAULT_MIN_LENGTH, ConstantCommon.DEFAULT_MAX_LENGTH));
    this.custIconOptions.component = PsKeyinTextareaComponent;
    this.custIconOptions.componentOptions = this.options;
    super.ngOnInit();
    this.labelOptions.labelKey = this.options.labelKey;
    this.labelOptions.required = this.required;
    this.options.autoGrow = this.options.autoGrow !== null && this.options.autoGrow !== undefined ? this.options.autoGrow : true;
  }

  resize() {
    this.msgInput.nativeElement.style.height = 'auto';
    this.msgInput.nativeElement.style.height = this.msgInput.nativeElement.scrollHeight + 'px';
  }
}
