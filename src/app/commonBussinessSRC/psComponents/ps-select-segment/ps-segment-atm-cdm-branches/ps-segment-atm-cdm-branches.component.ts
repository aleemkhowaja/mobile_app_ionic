import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOmniLovTypeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectSegment, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsSelectSegmentComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-segment/ps-select-segment.component';
import { IOptionsPsSegmentAtmCdmBranchesExposed } from './ps-segment-atm-cdm-branches.component.interface';


/**
 * @author Aftab.Ali
 * @since 19/11/2019
 *
 * <p> PsSegmentAtmCdmBranchesComponent will fetch list of AtmcdmBranches base on LOV id.</p>
 */
@Component({
  selector: 'ps-segment-atm-cdm-branches',
  templateUrl: './ps-segment-atm-cdm-branches.component.html',
  styleUrls: ['./ps-segment-atm-cdm-branches.component.scss'],
})
export class PsSegmentAtmCdmBranchesComponent extends PsSelectSegmentComponent implements OnInit, OnChanges, OnDestroy {


  @Input() options: IOptionsPsSegmentAtmCdmBranchesExposed = {
  };
  @Output() public segmentButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onDataLoad: EventEmitter<IPsSelect[]> = new EventEmitter<IPsSelect[]>();
  languageChangedSubscription: Subscription;

  public defaultOptions: IOptionsPsSelectSegment = {
    segmentList: [],
    defaultSegment: { itemValue: 'All', description: 'ALL' },
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_ATM_CDM_BRANCHES
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService, private eventEmitterService: EventEmitterService,
    curCf: ChangeDetectorRef,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger, curCf);
  }

  ngOnInit() {
    super.init();
    this.defaultOptions.defaultSegment = this.options.defaultSegment;
    this.commonProv.copyObject(this.options, this.defaultOptions, false);
    this.loadAtmCdmBranches();
    this.languageChangedSubscription = this.commonProv.languageChanged.subscribe(isChanged => {
      if (isChanged) {
        this.loadAtmCdmBranches();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const allKey = this.commonProv.translate('all_key');
    const allowedSegments = [{ itemValue: allKey, description: allKey, iconName: '' }];
    const segmentList = this.defaultOptions.segmentList;
    if (changes.options.currentValue.allowedSegments !== undefined) {
      changes.options.currentValue.allowedSegments.forEach(segment => {
        segmentList.filter((value) => {
          if (value.itemValue === segment) {
            allowedSegments.push({
              itemValue: segment, description: value.description,
              iconName: value.itemValue === 'A' ? 'card' : value.itemValue === 'B' ? 'branch' : value.itemValue === 'C' ? 'cdm' : ''
            });
          }
        });
      });
      setTimeout(() => {
        this.defaultOptions.segmentList = allowedSegments;
      }, 100);
    }
  }
  ngOnDestroy() {
    if (this.languageChangedSubscription) {
      this.languageChangedSubscription.unsubscribe();
    }
  }
  /**
   * Is responsible for populating segmentList: IPsSelect after getting LOV types from service
   */
  public async loadAtmCdmBranches() {
    if (this.defaultOptions.lovTypeId == null || this.defaultOptions.lovTypeId === undefined) {
      this.logger.error('Error: lovTypeId is not provided, Please set lovTypeId for ps-segment-atm-cdm-branches');
      return;
    }
    const paramData: IOmniLovTypeRequest = {
      lovTypeId: this.defaultOptions.lovTypeId
    };
    this.defaultOptions.segmentList = [];
    const allKey = this.commonProv.translate('all_key');
    const result = await this.omniPull.returnLovTypesValues(paramData).catch(error => {
      this.logger.error('Error: While fetching LOV types in PsSegmentAtmCdmBranchesComponent :', error);
    });

    if (result && result.length > 0) {
      const defaultSegment = { itemValue: allKey, description: allKey };
      this.defaultOptions.segmentList.includes(defaultSegment) ? null : this.defaultOptions.segmentList.push(defaultSegment);
      for (const iterator of result) {
        const lovDropDown: IPsSelect = {
          itemValue: iterator.itemValue,
          description: iterator.description,
          iconName: iterator.itemValue === 'A' ? 'card' : iterator.itemValue === 'B' ? 'branch' : iterator.itemValue === 'C' ? 'cdm' : ''
        };
        if (this.defaultOptions.segmentList.filter(item => item.itemValue === lovDropDown.itemValue).length > 0) {
          continue;
        } else { this.defaultOptions.segmentList.push(lovDropDown); }
        this.defaultOptions.defaultSegment = defaultSegment;
      }
      this.onDataLoad.emit(this.defaultOptions.segmentList);
    }
  }
  onClickSegment(value) {
    const segment = {
      options: this.defaultOptions,
    };
    this.eventEmitterService.emitSelectSegmentEvent(segment);
    this.segmentButtonClicked.emit(value);
  }

}
