import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { PsBaseComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IchangeValues } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexTermsAndConditionsExposed } from './ps-complex-terms-and-conditions.component.interfaces';



/*
Author: H.Hassan
Date: 21Oct2019
WI: #915289
ps-template-terms-and-conditions
*/

@Component({
  selector: 'ps-complex-terms-and-conditions',
  templateUrl: './ps-complex-terms-and-conditions.component.html',
  styleUrls: ['./ps-complex-terms-and-conditions.component.scss'],
})
export class PsComplexTermsAndConditionsComponent extends PsBaseComponent implements OnInit {

  @Output() public onPsChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() public options: IOptionsPsComplexTermsAndConditionsExposed = {};


  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }


  ngOnInit() {
    this.options.checkBoxOptions.labelKey = this.options.chargesAmount ? this.options.chargesAmount + this.options.checkBoxOptions.labelKey : this.options.checkBoxOptions.labelKey;

    if (this.options && !(this.options.htmlViewerOptions && this.options.htmlViewerOptions.fileName)) {
      this.options.htmlViewerOptions = {
        fileName: PsCommonBusinessSettings.defaultTermsAndConditions,
        parseHtmlFromFile: true
      };
    }

    // this.options.checkBoxOptions.labelKey = this.options.checkBoxOptions.labelKey;
  }

  // handle checkbox change
  onChange(event: IchangeValues) {
    if (this.options.checkBoxOptions.group.controls[this.options.checkBoxOptions.fcName].value === false) {
      this.options.checkBoxOptions.group.controls[this.options.checkBoxOptions.fcName].reset();
    }
    this.onPsChange.emit(event);
  }

}
