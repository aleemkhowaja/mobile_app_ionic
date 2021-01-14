import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsContainerItem, IOptionsPsSelectSegment, IPsSelect } from '../../../../../psServices/models/ps-common-interface';
import { PsFieldSelectComponent } from '../ps-field-select.component';


/**
 * @author Aftab.Ali
 * @since 19/11/2019
 *
 * <p> PsSelectSegmentComponent will show the segment buttons based on the provided list of values.</p>
 */
@Component({
  selector: 'ps-select-segment',
  templateUrl: './ps-select-segment.component.html',
  styleUrls: ['./ps-select-segment.component.scss'],
})
export class PsSelectSegmentComponent extends PsFieldSelectComponent implements OnInit {

  @Input() options: IOptionsPsSelectSegment;
  @Output() public segmentButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  selectedSegment: string;
  selectedIdx: any;
  defaultSegment: IPsSelect;
  selectedSegmentColor: string;
  itemOptions: IOptionsPsContainerItem = {
    hideImageAndIconIfNotPresent: true
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private cf: ChangeDetectorRef
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    // Added by Richie for TP# 1067331
    this.custIconOptions.component = PsSelectSegmentComponent;
    this.custIconOptions.componentOptions = this.options;
    // End Richie
    super.ngOnInit();
    // Added by Richie for #TP 1105083 since segment was changed in V5
    if (this.options.defaultSegment && this.options.defaultSegment.itemValue) {
      this.selectedSegment = this.options.defaultSegment.itemValue.toString();
    }
  }

  segmentChanged() {
    // Modified by Richie for #TP 1105083 since segment was changed in V5
    // if (this.selectedSegment !== segmentValue) {
    //   this.selectedIdx = index;
    //   this.selectedSegment = segmentValue;
    //   // console.log('Segment changed', segmentValue);
    // }
    this.cf.detectChanges();
    this.segmentButtonClicked.emit(this.selectedSegment);
  }
}
