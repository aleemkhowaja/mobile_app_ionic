import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { SessionService } from 'src/app/commonSRC/psServices/session/session.service';
import { IOptionsPsBaseActionModal, IOptionsPsFieldLabel, IOptionsPsFormMap, IOptionsPsKeyinInput, IOptionsPsLabel, IPsSelect } from '../../../commonSRC/psServices/models/ps-common-interface';
import { IOmniMapAtmBranchesRequest } from '../../psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from '../../psServices/omni-common/omni-pull.service';
import { PsComplexCardDetailAtmCdmComponent } from '../ps-complex-components/ps-complex-card-details-atm-cdm/ps-complex-card-detail-atm-cdm.component';
import { IOptionsPsComplexCardDetailsAtmCdmComponentExposed } from '../ps-complex-components/ps-complex-card-details-atm-cdm/ps-complex-card-details-atm-cdm.component.interface';
import { PsComplexCardDetailsBranchComponent } from '../ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component';
import { IOptionsPsComplexCardDetailsBranchComponentExposed } from '../ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component.interface';
import { IOptionsPsSegmentAtmCdmBranchesExposed } from '../ps-select-segment/ps-segment-atm-cdm-branches/ps-segment-atm-cdm-branches.component.interface';
import { IOptionsPsMapAtmBranchesExposed } from './ps-map-atm-branches.component.interfaces';




@Component({
  selector: 'ps-map-atm-branches',
  templateUrl: './ps-map-atm-branches.component.html',
  styleUrls: ['./ps-map-atm-branches.component.scss'],
})
export class PsMapAtmBranchesComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsMapAtmBranchesExposed;  // branchIds = "1, 2, 3" (BranchId's) ...

  get defaultOptions(): IOptionsPsKeyinInput {
    if (this.value !== undefined) {
      this.allMarkers.forEach((val, index) => {
        if (this.options.group.controls[this.options.fcName].status === "INVALID" && (this.value.id !== undefined && val.id == this.value.id) || (this.value.id === undefined && val.id == this.value)) {
          this.options.group.controls[this.options.fcName].setValue(val);
          // eslint-disable-next-line @typescript-eslint/semi, @typescript-eslint/member-delimiter-style
          this.isSelectableMarker = true;
          this.selectedBranchVal = val.briefDesc;
          this.selectedBranchLabelOptions.labelKey = this.selectedBranchVal;
          this.options.group.controls[this.mapInputOptions.fcName].setValue(val.briefDesc);
          this.eventEmitterService.emitSelectBranchEvent(val);
        }
      });
    }
    return {
      group: this.options.group,
      fcName: this.options.fcName,
      labelKey: this.options.labelKey,
      disablePreview: true
    };
  }
  mapOptions: IOptionsPsFormMap = {
    markers: []
  };
  previewLblOptions: IOptionsPsFieldLabel;
  cardDetailsBranchesOptions: IOptionsPsComplexCardDetailsBranchComponentExposed = {};
  cardDetailAtmCdmOptions: IOptionsPsComplexCardDetailsAtmCdmComponentExposed = {};
  modalOptions: IOptionsPsBaseActionModal = {};
  segmentAtmCdmBranchesForm: FormGroup = new FormGroup({});
  branchAtmCdmDetailsForm: FormGroup = new FormGroup({});
  segmentAtmCdmBranchesOptions: IOptionsPsSegmentAtmCdmBranchesExposed = {
    group: this.segmentAtmCdmBranchesForm
  };
  onClickMarker: boolean;
  allMarkers: any;
  cifBranchId: any;
  cifBranch: string[];
  selectedBranchVal = '';
  cardDetailsOptions: IOptionsPsComplexCardDetailsBranchComponentExposed = {};
  selectedBranchORAtmCDmVO = {};
  isATMBranchLocatorUrl = true;
  currentSegment: string;
  selectedBranchLabelOptions: IOptionsPsLabel = {};
  isSelectableMarker: boolean;
  mapInputOptions: IOptionsPsKeyinInput = {
    fcName: 'mapBranchInput',
    labelKey: 'map_Branch_Input',
    disablePreview: true
  };
  constructor(public commonProv: PsCommonService, private cd: ChangeDetectorRef, private router: Router,
    loggerP: LoggerService, private eventEmitterService: EventEmitterService, private sessionService: SessionService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
    this.mapOptions.markers = new BehaviorSubject<IOptionsPsFormMap>({});
  }

  ngOnInit() {
    super.init();
    let optionsFcNameValidations = this.commonProv.getElementValidations(this.mapInputOptions.fcName);
    if (this.options.parameterToCheck) {
      this.omniPull.checkBranch(this.options.parameterToCheck).then((result) => {
        optionsFcNameValidations = this.commonProv.getElementValidations(this.mapInputOptions.fcName);
        if (result.enableCifBranch || (this.mapInputOptions.fcName && !optionsFcNameValidations.IS_VISIBLE)
          /* || (this.mapInputOptions.fcName && !mapBranchInputvalidations.IS_VISIBLE) */) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapInputOptions.fcName], 0);
        } else {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapInputOptions.fcName], optionsFcNameValidations.IS_MANDATORY);
        }
      });
    } else {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapInputOptions.fcName], optionsFcNameValidations.IS_MANDATORY);
    }
    this.cifBranch = [];
    this.mapInputOptions.group = this.options.group;
    this.previewLblOptions = {
      labelKey: 'selected_branch_key',
      psClass: 'ps-lbl-preview',
      previewMode: true
    };

    this.onClickMarker = false;
    this.isATMBranchLocatorUrl = false;
    this.cifBranchId = this.sessionService.getValueOf('CIF_branch');
    this.selectedBranchLabelOptions.labelKey = '';
    if (this.options.branchIds !== undefined) {
      const branchIdArr = this.options.branchIds.split(',');
      this.cifBranch = branchIdArr.filter((value) => {
        value = value.trim();
        return value === this.cifBranchId;
      });
    }
    this.currentSegment = this.commonProv.translate('all_key');
    this.segmentAtmCdmBranchesOptions.defaultSegment = { itemValue: this.commonProv.translate('all_key'), description: 'ALL' };
    this.loadMapAtmBranches();
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
      labelKey: this.selectedBranchVal,
      psClass: 'ps-value-preview',
      previewMode: true
    };
  }
  onMarkerClick(value: any) {
    if (this.disabled) {
      return;
    }
    if (this.router.url.split('?')[0] === '/home' || this.router.url.split('?')[0] === '/atm-branch-locator') {
      this.isSelectableMarker = false;
    } else {
      this.isSelectableMarker = true;
    }
    this.cardDetailsOptions = {
      latitude: value.latitude,
      longtitude: value.longtitude,
      countryId: value.countryId,
      regionId: value.regionId,
      mapType: value.mapType,
      cityName: value.cityName,
      countryName: value.countryName,
      telephoneNumber: value.telephoneNumber,
      faxNumber: value.faxNumber,
      facilities: value.facilites,
      address: value.address,
      others: value.others,
      managerName: value.mangerName,
      regionName: value.regionName,
      locationDetails: value.locationDetails,
      openingHours: value.openingHours !== undefined ? value.openingHours : [],
      selectedBranch: value.mapType === 'BRANCH' && this.isSelectableMarker ? true : false,
      fcName: 'branchAtmCdmDetails',
      group: this.branchAtmCdmDetailsForm,
      panelColor: '#30688e',
      briefDesc: value.briefDesc,
    };
    if (value.mapType === 'BRANCH') {
      this.modalOptions = {
        component: PsComplexCardDetailsBranchComponent,
        componentOption: this.cardDetailsOptions,
        modalClassName: 'mapAtmBranchModal'
      };
      this.selectedBranchVal = value.briefDesc;
      this.selectedBranchLabelOptions.labelKey = this.selectedBranchVal;
      // delete (value.position);
      // delete (value.title);
      // delete (value.icon);
      // delete (value.color);
      if (value.openingHours === undefined) {
        value.openingHours = [];
      }
      this.options.group.controls[this.mapInputOptions.fcName].setValue(value.briefDesc);
      this.eventEmitterService.emitSelectBranchEvent(value); // briefDesc
    } else if (value.mapType === 'ATM' || value.mapType === 'CDM') {
      delete (this.cardDetailsOptions.openingHours);
      delete (this.cardDetailsOptions.selectedBranch);
      if (value.mapType === 'ATM') {
        this.cardDetailsOptions.panelColor = '#429ce8';
      } else {
        this.cardDetailsOptions.panelColor = '#0e4b75';
      }
      this.modalOptions = {
        component: PsComplexCardDetailAtmCdmComponent,
        componentOption: this.cardDetailsOptions,
        modalClassName: 'mapAtmBranchModal'
      };
      // delete (value.position);
      // delete (value.title);
      // delete (value.icon);
      // delete (value.color);
      // delete (value.openingHours);
      this.eventEmitterService.emitSelectBranchEvent(value);
    }
    this.commonProv.setFormData(this.cardDetailsOptions.group, this.selectedBranchORAtmCDmVO);
    this.selectedBranchORAtmCDmVO[this.cardDetailsOptions.fcName] = value;
    this.onClickMarker = true;
    this.cd.detectChanges();
  }
  onModalDismiss() {
    this.onClickMarker = false;
    this.modalOptions = {};
  }
  onClickSegment(value: any) {
    if (value === this.currentSegment) {
      return;
    } else {
      this.currentSegment = value;
    }
    if (value === this.commonProv.translate('all_key')) {
      this.mapOptions.markers.next(this.allMarkers);
    } else {
      const listMarker = this.allMarkers.filter((marker) => {
        if (marker.mapType.split('')[0] === value) {
          return marker;
        }
      });
      this.mapOptions.markers.next(listMarker);
    }
  }
  /**
   * Is responsible for populating listOfOption: Atm Branches CDM after getting LOV types from service
   */
  public async loadMapAtmBranches() {
    this.allMarkers = [];
    const parameter: IOmniMapAtmBranchesRequest = {
      mapTypesInclude: this.options.mapTypesInclude
    };
    const result = await this.omniPull.returnMapAtmBranches(parameter).catch(error => {
      this.logger.error('Error: While fetching MapAtmBranches :', error);
    });
    if (result && result.gridModel.length > 0) {
      // this.commonProv.presentLoading();
      const segments = [];
      result.gridModel.filter((marker, ind) => {
        if (marker.mapType === 'ATM') {
          if (segments.indexOf('A') === -1) {
            segments.push('A');
            this.segmentAtmCdmBranchesOptions = {
              group: this.segmentAtmCdmBranchesForm,
              defaultSegment: { itemValue: this.commonProv.translate('all_key'), description: 'ALL' },
              allowedSegments: segments
            };
          }
        }
        if (marker.mapType === 'CDM') {
          if (segments.indexOf('C') === -1) {
            segments.push('C');
            this.segmentAtmCdmBranchesOptions = {
              group: this.segmentAtmCdmBranchesForm,
              defaultSegment: { itemValue: this.commonProv.translate('all_key'), description: 'ALL' },
              allowedSegments: segments
            };
          }
        }
        if (marker.mapType === 'BRANCH') {
          if (segments.indexOf('B') === -1) {
            segments.push('B');
            this.segmentAtmCdmBranchesOptions = {
              group: this.segmentAtmCdmBranchesForm,
              defaultSegment: { itemValue: this.commonProv.translate('all_key'), description: 'ALL' },
              allowedSegments: segments
            };
          }
        }
      });
      const data = result.gridModel;
      for (let i = 0; i < data.length; i++) {
        if (data[i].branchesId !== undefined || (data[i].mapType === 'ATM' || data[i].mapType === 'CDM')) {
          const iconName = data[i].mapType !== 'ATM' ? (data[i].mapType === 'BRANCH' ? PsCommonSettings.MAP_TYPE_BRANCH_IMG : PsCommonSettings.MAP_TYPE_CDM_IMG) : PsCommonSettings.MAP_TYPE_ATM_IMG;
          this.allMarkers.push(
            {
              id: data[i].branchesId,
              vsBranchCode: data[i].vsBranchCode,
              mapType: data[i].mapType, // types: 'BRANCH', 'ATM', 'CDM'.
              cityName: data[i].cityName,
              countryId: data[i].countryId,
              countryName: data[i].countryName,
              regionId: data[i].regionId,
              regionName: data[i].regionName,
              telephoneNumber: data[i].telephoneNumber,
              faxNumber: (data[i].mapType) === 'BRANCH' ? data[i].faxNumber : null,
              facilites: data[i].facilites,
              position: { lat: data[i].latitude, lng: data[i].longtitude },
              latitude: data[i].latitude,
              longtitude: data[i].longtitude,
              icon: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + iconName,
              title: data[i].mapType + (!!(data[i].cityName) ? '-' + data[i].cityName : ''),
              locationDetails: !!(data[i].locationDetails) ? data[i].locationDetails : '',
              color: data[i].mapType !== 'ATM' ? (data[i].mapType === 'BRANCH' ? PsCommonSettings.MAP_TYPE_BRANCH_COLOR : PsCommonSettings.MAP_TYPE_CDM_COLOR) : PsCommonSettings.MAP_TYPE_ATM_COLOR,
              openingHours: data[i].openingHours,
              address: data[i].address,
              others: data[i].others,
              mangerName: data[i].mangerName,
              briefDesc: data[i].briefDesc,
              itemValue: data[i].branchesId !== undefined ? data[i].branchesId.toString() : data[i].branchesId,
            });
        }
      }
      this.mapOptions.markers.next(this.allMarkers);
    }
  }

  onDataLoad(segments: IPsSelect[]) {
    this.addLegend(segments);
  }

  addLegend(segments: IPsSelect[]) {
    const legend: Array<{
      name: string;
      icon: string;
    }> = [];
    segments.forEach((item) => {
      const description = item.description;
      let icon;
      if (item.itemValue === 'A') {
        icon = PsCommonSettings.MAP_TYPE_ATM_IMG;
      }
      if (item.itemValue === 'B') {
        icon = PsCommonSettings.MAP_TYPE_BRANCH_IMG;
      }
      if (item.itemValue === 'C') {
        icon = PsCommonSettings.MAP_TYPE_CDM_IMG;
      }
      if (icon) {
        legend.push({
          name: description,
          icon
        });
      }
    });
    this.mapOptions.legend = legend;
  }
  onChangeBranch($event) {
  }
}
