import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { google } from 'google-maps';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { GeolocationService } from 'src/app/commonSRC/psServices/geolocation/geolocation.service';
import { IOptionsPsActionIconExposed, IOptionsPsContainerPanel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { IOptionsPsButtonCall, IOptionsPsButtonDirection, IOptionsPsContainerList, IOptionsPsIconAvailable, IOptionsPsIconUnAvailable, IOptionsPsLabel, IOptionsPsLabelHeader } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IDayOptions, IOptionsPsComplexCardDetailsBranchComponentExposed } from './ps-complex-card-details-branch.component.interface';


declare var google: google;

@Component({
  selector: 'ps-complex-card-details-branch',
  templateUrl: 'ps-complex-card-details-branch.component.html',
  styleUrls: ['./ps-complex-card-details-branch.component.scss']
})
export class PsComplexCardDetailsBranchComponent extends PsBaseFieldComponent implements OnInit {
  @Input() options: IOptionsPsComplexCardDetailsBranchComponentExposed;
  headerLabelOptions: IOptionsPsLabelHeader = {};
  countryLabelOptions: IOptionsPsLabel = { labelKey: 'country_key' };
  countryLabelValueOptions: IOptionsPsLabel = {};
  cityLabelOptions: IOptionsPsLabel = { labelKey: 'city_key' };
  cityLabelValueOptions: IOptionsPsLabel = {};
  managerLabelOptions: IOptionsPsLabel = { labelKey: 'manager_key' };
  managerLabelValueOptions: IOptionsPsLabel = {};
  telephoneNumberLabelOptions: IOptionsPsLabel = { labelKey: 'tel_key' };
  concatLocationLabelValueOptions: IOptionsPsLabel = {};
  locationDetailsLabelValueOptions: IOptionsPsLabel = {};
  telephoneNumberLabelValueOptions: IOptionsPsLabel = {};
  branchLabelValueOptions: IOptionsPsLabel = {};
  faxLabelValueOptions: IOptionsPsLabel = {};
  selectedBranchLabelOptions: IOptionsPsLabel = {};
  branchLabelOptions: IOptionsPsLabel = { labelKey: 'branch_key' };
  faxLabelOptions: IOptionsPsLabel = { labelKey: 'fax_key' };
  openingHoursOptions: IOptionsPsContainerList = {};
  listOfDays: IDayOptions[] = [];
  markerPosition = new google.maps.LatLng(null, null);
  currentPosition = new google.maps.LatLng(null, null);
  callOptions: IOptionsPsButtonCall;
  directionOptions: IOptionsPsButtonDirection;
  iconAvailableOption: IOptionsPsIconAvailable = {
    iconPosition: 'start'
  };
  iconUnAvailableOption: IOptionsPsIconUnAvailable = {
    iconPosition: 'start'
  };
  panel1Options: IOptionsPsContainerPanel;
  panel2Options: IOptionsPsContainerPanel;
  panel3Options: IOptionsPsContainerPanel;
  erroOpeningHoursOptions: IOptionsPsLabel = {
    labelKey: 'no_opening_hours_available_key',
    previewMode: false
  };

  closeIcon: IOptionsPsActionIconExposed = {
    iconName: 'close'
  };
  cardDetailsTitle: IOptionsPsLabel = {
    labelKey: 'branches_and_atm_details_key'
};
  constructor(private commonP: PsCommonService, private eventEmitterService: EventEmitterService, private geolocationService: GeolocationService, public modalController: ModalController) {
    super(commonP, commonP.logger);
  }

  ngOnInit() {
    this.headerLabelOptions.labelKey = this.options.mapType;
    this.branchLabelValueOptions.labelKey = this.options.briefDesc;
    this.faxLabelValueOptions.labelKey = this.options.faxNumber;
    this.countryLabelValueOptions.labelKey = this.options.countryName;
    this.cityLabelValueOptions.labelKey = this.options.cityName;
    this.managerLabelValueOptions.labelKey = this.options.managerName;
    this.locationDetailsLabelValueOptions.labelKey = this.options.locationDetails;
    this.concatLocationLabelValueOptions.labelKey = this.options.cityName !== undefined ? this.options.cityName : '';
    this.concatLocationLabelValueOptions.labelKey += this.options.regionName !== undefined ? ' ' + this.options.regionName : '';
    this.concatLocationLabelValueOptions.labelKey += this.options.countryName !== undefined ? ' ' + this.options.countryName : '';
    this.telephoneNumberLabelValueOptions.labelKey = this.options.telephoneNumber;
    this.selectedBranchLabelOptions.labelKey = this.options.selectedBranch === true ? 'this_branch_is_selected_key' : '';
    if (this.options.openingHours) {
      for (const eachDay of this.options.openingHours) {
        const day: IDayOptions = {
          dayLabel: { labelKey: eachDay.day },
          openingHourLabel: { labelKey: eachDay.openingHour },
          closingHourLabel: { labelKey: eachDay.closingHour },
          closingYN: eachDay.closingYN
        };
        if (eachDay.closingYN === 'Y') {
          day.openingHourLabel.labelKey = '';
          day.closingHourLabel.labelKey = 'Closed';
        }
          this.listOfDays.push(day);
        }
    }
    this.callOptions = {
      type: 'button',
      group: this.options.group
    };
    this.directionOptions = {
      type: 'button',
      group: this.options.group
    };
    this.callOptions.cellNumber = this.options.telephoneNumber;
    this.geolocationService.getCachedCoordinates().then((resp) => {
      this.currentPosition = new google.maps.LatLng(resp.latitude, resp.longitude);
      this.markerPosition = new google.maps.LatLng(this.options.latitude, this.options.longtitude);
      this.directionOptions = {
        currentLocation: this.currentPosition,
        markerLocation: this.markerPosition,
        currentLocationString: resp.latitude.toString() + ', ' + resp.longitude,
        markerLocationString: this.options.latitude.toString() + ', ' + this.options.longtitude,
        group: this.options.group
      };
    }).catch((error) => {
      // console.log('Error getting location', error);
    });
    this.panel1Options = {
      isExpandable: true,
      labelKey: 'branch_key',
      iconName: 'branch',
      expanded: true
    };
    this.panel2Options = {
      isExpandable: true,
      labelKey: 'location_key',
      iconName: 'location',
      expanded: true
    };
    this.panel3Options = {
      isExpandable: true,
      labelKey: 'opening_hours_key',
      iconName: 'clock',
      expanded: true
    };

    setTimeout(() => {
      if (document.getElementsByClassName('ps-container-panel-item')[0] !== undefined) {
        document.getElementsByClassName('ps-container-panel-item')[0].getElementsByClassName('ps-item-wrapper')[0]['style'].cssText = '--background: ' + this.options.panelColor;
        document.getElementsByClassName('ps-container-panel-item')[1].getElementsByClassName('ps-item-wrapper')[0]['style'].cssText = '--background: ' + this.options.panelColor;
        document.getElementsByClassName('ps-container-panel-item')[2].getElementsByClassName('ps-item-wrapper')[0]['style'].cssText = '--background: ' + this.options.panelColor;
      }
    });
  }
  getUnique(array) {
    const uniqueArray = [];
    // Loop through array values
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
  onSwipe() {
    this.eventEmitterService.emitSwipeChangeEvent(true);
  }

  dismissPopover() {
    this.modalController.dismiss();
  }
}
