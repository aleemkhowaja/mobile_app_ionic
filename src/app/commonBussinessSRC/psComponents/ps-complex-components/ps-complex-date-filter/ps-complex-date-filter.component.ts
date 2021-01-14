import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPSComplexDateFilter } from './ps-complex-date-filter.component.interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsKeyinDateComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-date/ps-keyin-date.component';

@Component({
  selector: 'ps-complex-date-filter',
  templateUrl: './ps-complex-date-filter.component.html',
  styleUrls: ['./ps-complex-date-filter.component.scss'],
})
export class PSComplexDateFilterComponent extends PsKeyinDateComponent implements OnInit {

  @Input() public options: IOptionsPSComplexDateFilter;

  filterFromDate: IOptionsPsKeyinDate = {};

  filterToDate: IOptionsPsKeyinDate = {};


  constructor(private commonC: PsCommonService, private loggerC: LoggerService, private omniPull: OmniPullService) {
    super(commonC, loggerC);
  }

  async ngOnInit() {
    this.filterFromDate = {
      labelKey: 'from_date_key',
      fcName: this.options.fromDate.fcName,
      group: this.options.fromDate.group,
      placeHolder: this.options.fromDate.placeHolder,
    };

    this.filterToDate = {
      labelKey: 'to_date_key',
      fcName: this.options.toDate.fcName,
      group: this.options.toDate.group,
      placeHolder: this.options.toDate.placeHolder,
    };
    const res = await this.omniPull.getParamValOf('DefaultDateFormat').catch(err => this.logger.log(err));
    if (res) {
      this.filterFromDate.displayFormat = res.DefaultDateFormat ? res.DefaultDateFormat : ConstantCommon.PREV_DATE_FORMAT;
      this.filterToDate.displayFormat = res.DefaultDateFormat ? res.DefaultDateFormat : ConstantCommon.PREV_DATE_FORMAT;
    }
  }

  fromDateChange(event) {
    this.filterToDate.min = event.newValue;
    this.logger.log('fromDateChange', event.newValue);
  }
  toDateChange(event) {
    this.filterFromDate.max = event.newValue;
    this.logger.log('toDateChange', event.newValue);
  }

}
