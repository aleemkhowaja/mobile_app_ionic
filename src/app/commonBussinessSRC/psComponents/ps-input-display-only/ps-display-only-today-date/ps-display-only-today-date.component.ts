import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsKeyinInputComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { IOptionsPsDisplayOnlyTodayDateExposed } from './ps-display-only-today-date.component.interface';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';

@Component({
  selector: 'ps-display-only-today-date',
  templateUrl: './ps-display-only-today-date.component.html',
  styleUrls: ['./ps-display-only-today-date.component.scss'],
})
export class PsDisplayOnlyTodayDateComponent extends PsKeyinInputComponent implements OnInit {
  @Input() options: IOptionsPsDisplayOnlyTodayDateExposed;
  defaultConf: IOptionsPsDisplayOnlyTodayDateExposed = {
    psClass: 'ps-disabled'
  };


  constructor(commonP: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonP, loggerP);
  }
  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.commonProv.copyObject(this.options, this.defaultConf);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.options.group.controls[this.options.fcName].setValue((new PsDateFormatPipe().transform(new Date(), 'MM/DD/YYYY'))); // TODO: fixed after the report is fixed. since this is not used anywhere else
  }

}
