import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsLabelHeader } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsFieldLabelComponent } from '../ps-field-label.component';
import { IOptionsPsLabel } from './../../../../../psServices/models/ps-common-interface';

@Component({
  selector: 'ps-label-header',
  templateUrl: './ps-label-header.component.html',
  styleUrls: ['./ps-label-header.component.scss'],
})
export class PsLabelHeaderComponent extends PsFieldLabelComponent implements OnInit {
  @Input() options: IOptionsPsLabelHeader = {
    psClass: 'ps-label-header'
  };
  labelOptions: IOptionsPsLabel = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.labelOptions, this.options);
   }
  
}
