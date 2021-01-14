import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMapKeyValue, IFacilityDetailsRequest, IFacilityDetailsResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { IOptionsPsLookupFacilityDetailsExposed } from './ps-lookup-facility-details.component.interfaces';
import { PsOptionFacilityComponent } from '../../ps-container-lookup-option/ps-option-facility/ps-option-facility.component';

/**
 * @author GRadwan
 * @since 05/07/2020
 *
 * <p> PsLookupFacilityDetailsComponent is a lookup component to view facilities list fetched from server</p>
 */
@Component({
  selector: 'ps-lookup-facility-details',
  templateUrl: './ps-lookup-facility-details.component.html',
  styleUrls: ['./ps-lookup-facility-details.component.scss'],
})
export class PsLookupFacilityDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsLookupFacilityDetailsExposed = {
    requestObject: null
  };

  @Output() public onFacilityChange: EventEmitter<any> = new EventEmitter<any>();

  public formGroup: FormGroup = new FormGroup({});


  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_facility_found_key'
  };

  public listOfFacilities?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.loadfacilityDetails();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsOptionFacilityComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating facility details
   */
  private loadfacilityDetails() {
    const facilityDetailsRequestParam: IFacilityDetailsRequest = {

    };

    this.returnFacilityDetails(facilityDetailsRequestParam);
  }

  /**
   * fetching facilities from server
   * @param requestData IFacilityDetailsRequest
   */
  private async returnFacilityDetails(requestData: IFacilityDetailsRequest) {
    const result = await this.omniPull.returnFacilityList(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching facilities in PsLookupFacilityDetailsComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateFacilities(result.gridModel);
    } else {
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  onChangeItem(event) {
    this.onFacilityChange.emit(event.item);
  }

  /**
   * customizing facility details object
   * @param gridModel
   */
  private populateFacilities(facilities: Array<any>): IFacilityDetailsResponse[] {
    this.listOfFacilities = [];
    for (const iterator of facilities) {
      const facility: any = {
        facilityNo: iterator.facilityNo,
        facilityAmount: iterator.facilityAmount + ' ' + iterator.currency,
        expiryDate: iterator.expiryDate,
        unutilizedAmount: iterator.unutilizedAmount,
        branchName: iterator.branchName,
        key: iterator.key,
        lookupKey: iterator.key,
        currency: iterator.currency
      };
      this.listOfFacilities.push(facility);
    }
    return this.listOfFacilities;
  }


}

