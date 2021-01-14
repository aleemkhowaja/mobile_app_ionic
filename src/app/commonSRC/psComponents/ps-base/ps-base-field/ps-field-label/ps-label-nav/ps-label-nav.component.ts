import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsLabelNav } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsFieldLabelComponent } from '../ps-field-label.component';

@Component({
  selector: 'ps-label-nav',
  templateUrl: './ps-label-nav.component.html',
  styleUrls: ['./ps-label-nav.component.scss'],
})
export class PsLabelNavComponent extends PsFieldLabelComponent implements OnInit {

  @Input() options: IOptionsPsLabelNav = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    super.init();
   }

}
