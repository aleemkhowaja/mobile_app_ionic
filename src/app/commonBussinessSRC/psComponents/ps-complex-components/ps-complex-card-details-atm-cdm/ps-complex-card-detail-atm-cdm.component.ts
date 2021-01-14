import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { google } from 'google-maps';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { GeolocationService } from 'src/app/commonSRC/psServices/geolocation/geolocation.service';
import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { IOptionsPsActionIconExposed, IOptionsPsButtonDirection, IOptionsPsContainerPanel, IOptionsPsLabel, IOptionsPsLabelHeader } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexCardDetailsAtmCdmComponentExposed } from './ps-complex-card-details-atm-cdm.component.interface';


declare var google: google;

@Component({
    selector: 'ps-complex-card-details-atm-cdm',
    templateUrl: './ps-complex-card-details-atm-cdm.component.html',
    styleUrls: ['./ps-complex-card-details-atm-cdm.component.scss']
})
export class PsComplexCardDetailAtmCdmComponent extends PsBaseFieldComponent implements OnInit {
    @Input() options: IOptionsPsComplexCardDetailsAtmCdmComponentExposed;
    headerLabelOptions: IOptionsPsLabelHeader = {};
    countryLabelOptions: IOptionsPsLabel = { labelKey: 'country_key' };
    countryLabelValueOptions: IOptionsPsLabel = {};
    cityLabelOptions: IOptionsPsLabel = { labelKey: 'city_key' };
    cityLabelValueOptions: IOptionsPsLabel = {};
    managerLabelOptions: IOptionsPsLabel = { labelKey: 'manager_key' };
    managerLabelValueOptions: IOptionsPsLabel = {};
    telephoneNumberLabelOptions: IOptionsPsLabel = { labelKey: 'tel_#_key' };
    telephoneNumberLabelValueOptions: IOptionsPsLabel = {};
    directionOptions: IOptionsPsButtonDirection;
    markerPosition = new google.maps.LatLng(null, null);
    panel1Options: IOptionsPsContainerPanel;
    currentPosition = new google.maps.LatLng(null, null);
    panel2Options: IOptionsPsContainerPanel;
    locationDetailsLabelValueOptions: IOptionsPsLabel = {};
    concatLocationLabelValueOptions: IOptionsPsLabel = {};
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
        this.headerLabelOptions.labelKey = this.options.mapType.toLowerCase() + '_key';
        this.countryLabelValueOptions.labelKey = this.options.countryName;
        this.cityLabelValueOptions.labelKey = this.options.cityName;
        this.managerLabelValueOptions.labelKey = this.options.managerName;
        this.telephoneNumberLabelValueOptions.labelKey = this.options.telephoneNumber;
        this.locationDetailsLabelValueOptions.labelKey = this.options.locationDetails;
        this.concatLocationLabelValueOptions.labelKey = this.options.cityName !== undefined ? this.options.cityName : '';
        this.concatLocationLabelValueOptions.labelKey += this.options.regionName !== undefined ? ' ' + this.options.regionName : '';
        this.concatLocationLabelValueOptions.labelKey += this.options.countryName !== undefined ? ' ' + this.options.countryName : '';
        this.directionOptions = {
            type: 'button',
            group: this.options.group
        };
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
            this.commonP.logger.error('Error getting location', error);
        });
        this.panel1Options = {
            labelKey: this.options.mapType.toLowerCase() + '_key',
            iconName: this.options.mapType.toLowerCase() === 'atm' ? 'card' : 'cdm',
            expanded: true
        };

        this.panel2Options = {
            isExpandable: true,
            labelKey: 'location_key',
            iconName: 'location',
            expanded: true
        };
        setTimeout(() => {
            if (document.getElementsByClassName('ps-container-panel-item')[0] !== undefined) {
                document.getElementsByClassName('ps-container-panel-item')[0].getElementsByClassName('ps-item-wrapper')[0]['style'].cssText = '--background: ' + this.options.panelColor;
            }
        });
    }

    onDirection() {
        // console.warn('onDirection Clicked !');
    }

    onSwipe() {
        this.eventEmitterService.emitSwipeChangeEvent(true);
    }


    dismissPopover() {
        this.modalController.dismiss();
    }
}
