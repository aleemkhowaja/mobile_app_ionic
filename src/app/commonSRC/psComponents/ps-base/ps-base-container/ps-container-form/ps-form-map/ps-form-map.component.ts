import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Platform } from '@ionic/angular';
import { google } from 'google-maps';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { GeolocationService } from 'src/app/commonSRC/psServices/geolocation/geolocation.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsActionImageExposed, IOptionsPsContainerForm, IOptionsPsFormMap, IOptionsPsLabelInput } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../../ps-base-container.component';


declare var google: google;

@Component({
  selector: 'ps-form-map',
  templateUrl: './ps-form-map.component.html',
  styleUrls: ['./ps-form-map.component.scss'],
})
export class PsFormMapComponent extends PsBaseContainerComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsFormMap = {};
  @Output() public onMarkerClick: EventEmitter<any> = new EventEmitter<any>();
  formOptions: IOptionsPsContainerForm = {};
  noPlatform: boolean;
  labelOptions: IOptionsPsLabelInput = {
    labelKey: 'google_map_could_not_load_key'
  };
  launchNavigation: LaunchNavigatorOptions = {};
  mapApp: any;
  // map: GoogleMap;

  @ViewChild('googleMapCanvas', { static: false }) mapElement: any;
  @ViewChild('legendWrapper', { static: false }) legendWrapper: any;
  mapWeb: any;
  isDesktop: boolean;
  isApp: boolean;
  languageChangedSubscription: Subscription;
  markersSubscription: Subscription;
  directionSubscription: Subscription;
  markerLength: number;
  userPosition: any;
  setMarkers: any;
  locationMarker: any;
  // googleInstance: google;
  previousLanguage;
  legendWasAdded = false;
  legend: Array<IOptionsPsActionImageExposed> = [];
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private launchNavigator: LaunchNavigator,
    private platform: Platform, private cd: ChangeDetectorRef, private eventEmitterService: EventEmitterService,
    private geolocationService: GeolocationService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    // await this.platform.ready();
    this.initializeMap();
  }


  subscribeOnLanguageChange() {
    if (!this.languageChangedSubscription) {
      this.languageChangedSubscription = this.commonProv.languageChanged.subscribe(isChanged => {
        if (isChanged && this.previousLanguage !== String(PsCommonSettings.activeLanguge).toLocaleLowerCase()) {
          this.initializeMap();
        }
      });
    }
  }

  initializeMap() {
    this.loadMapScript().then(async () => {
      await this.loadMapWeb();
      if (!this.commonProv.isWeb()) {
        const isMapAvailable = this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS);
        if (isMapAvailable) {
          this.mapApp = this.launchNavigator.APP.GOOGLE_MAPS;
        }
      }
      this.subscribeOnLanguageChange();
      this.loadMarkersAndSubscribe();
      this.onDrirectionClick();
      this.addLegend();
    }).catch((error => {
      if (error && error.display) {
        CommonUtils.presentFailureAlert(error.message);
      }
      this.logger.error(error);
    }));
  }


  loadMapScript() {
    return new Promise((resolve, reject) => {
      const activeLanguage = String(PsCommonSettings.activeLanguge).toLocaleLowerCase();
      if (!this.previousLanguage) {
        this.previousLanguage = activeLanguage;
      }

      // if (!this.googleInstance) {
      //   const options: LoaderOptions = {
      //     language: activeLanguage
      //   };
      //   const loader = new Loader(PsApplicationSettings.GOOGLE_API_KEYS.MAP_WEB_API_KEY, options);
      //   this.googleInstance = await loader.load();
      // } else {
      //   this.googleInstance = null;
      //   await this.loadMapScript();
      // }
      try {
        if (activeLanguage !== this.previousLanguage && google && google.maps) {
          delete google.maps;
          this.previousLanguage = activeLanguage;
        }
      } catch (error) {
        this.logger.error(error);
      }
      if (!PsApplicationSettings.GOOGLE_API_KEYS.MAP_WEB_API_KEY) {
        reject(
          {
            display: true,
            message: this.common.translate('no_api_key_key')
          });
      }
      CommonUtils.addJSScript('https://maps.googleapis.com/maps/api/js?key='
        + PsApplicationSettings.GOOGLE_API_KEYS.MAP_WEB_API_KEY + '&&language=' + activeLanguage,
        { id: ConstantCommon.GOOGLE_MAPS_WEB_SCRIPT_ID, async: true, checkSRCIfPresent: true, removeIDIfPresent: true }).then(() => resolve());
    });
  }
  loadMarkersAndSubscribe() {
    if (!this.markersSubscription) {
      this.markersSubscription = this.options.markers.subscribe(async markers => {
        this.removeMarkers();
        await this.loadMarkersWeb(markers);
        if (!this.legendWasAdded) {
          this.addLegend();
        }
      });
    }
  }
  onDrirectionClick() {
    if (!this.directionSubscription) {
      this.directionSubscription = this.eventEmitterService.getDirectionChangeEmitter().subscribe((options) => {
        if (this.commonProv.isWeb()) {
          const anchorEl = document.createElement('a');
          anchorEl.href = 'https://www.google.com/maps/dir/?api=1&origin=' + options.cordinates.currentLocationString + '&destination=' + options.cordinates.markerLocationString + '&travelmode=driving';
          anchorEl.target = '_blank';
          anchorEl.click();
        } else {
          this.launchNavigation = {
            start: options.cordinates.currentLocationString,
            app: this.mapApp
          };
          this.launchNavigator.navigate(options.cordinates.markerLocationString, options).then(success => { }, error => { });
        }
      });
    }
  }

  centerControl(controlDiv, map, userPosition) {

    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.className = 'my-location-btn-ui';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.className = 'my-location-btn-text';
    controlText.innerHTML = this.commonProv.translate('my_location_key');
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      if (this.locationMarker !== undefined) {
        this.locationMarker.setMap(null);
      }
      this.mapWeb.setOptions({
        center: userPosition,
        zoom: PsCommonSettings.GOOGLE_MAP_CAMERA_ZOOM_USER_POSITION,
      });
      this.mapApp.setCenter(userPosition);
    });
  }
  loadMapWeb() {
    return new Promise<any>((resolve, reject) => {
      const currentPosition = {
        lat: null,
        lng: null
      };
      const googleCanvas = this.mapElement.nativeElement;
      if (googleCanvas) {
        googleCanvas.innerHTML = '';
      }
      this.geolocationService.getCachedCoordinates(false).then((resp) => {
        currentPosition.lat = resp.latitude;
        currentPosition.lng = resp.longitude;
        this.userPosition = currentPosition;
        const mapOptions: any = {
          center: currentPosition,
          zoom: PsCommonSettings.GOOGLE_MAP_CAMERA_ZOOM_USER_POSITION,
          minZoom: PsCommonSettings.GOOGLE_MAP_CAMERA_MIN_ZOOM,
          streetViewControl: false,
          restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
            }
          }
        };
        this.mapWeb = new google.maps.Map(googleCanvas, mapOptions);
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        const centerControlDiv = document.createElement('div');
        this.centerControl(centerControlDiv, this.mapWeb, this.userPosition);
        // centerControlDiv.index = 1;
        this.mapWeb.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
        const userMarkerOptions: google.maps.ReadonlyMarkerOptions = {
          position: new google.maps.LatLng(resp.latitude, resp.longitude),
          icon: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + PsCommonSettings.MAP_TYPE_LOCATION_IMG,
          zIndex: 1,
          map: this.mapWeb,
          animation: PsCommonSettings.MAP_MARKER_ANIMATION === 'DROP' ? google.maps.Animation.DROP : google.maps.Animation.BOUNCE,
        };
        const mapUserMarkerWeb = new google.maps.Marker(userMarkerOptions);
        mapUserMarkerWeb.setMap(this.mapWeb);
        // this.loadMarkersWeb(this.options.markers.value);
        // this.cd.detectChanges();
        resolve();
      }, (err) => {
        this.geolocationService.goBack(err, 'branches_and_atms');
        reject();
      });
    });
  }

  loadMarkersWeb(markers: Array<any>) {
    try {
      if (markers !== undefined && markers.values !== undefined) {
        this.setMarkers = [];
        markers.forEach((marker, index) => {
          if (index === markers.length - 1) {
            this.commonProv.dismissLoading();
          }
          this.addMarkerWeb(marker);
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  addMarkerWeb(marker: any) {
    const { zIndex } = marker;
    let position: any = {};
    if (marker.position !== undefined) {
      position = marker.position;
    } else if (marker.latitude !== undefined && marker.longitude !== undefined) {
      position.lat = marker.latitude;
      position.lng = marker.longitude;
    }
    if (position.lat !== undefined && position.lng !== undefined) {
      const markerOptions: google.maps.ReadonlyMarkerOptions = {
        position: new google.maps.LatLng(position.lat, position.lng),
        icon: marker.icon,
        zIndex: 1,
        map: this.mapWeb,
        animation: PsCommonSettings.MAP_MARKER_ANIMATION === 'DROP' ? google.maps.Animation.DROP : google.maps.Animation.BOUNCE,
      };
      const mapMarkerWeb = new google.maps.Marker(markerOptions);
      mapMarkerWeb.addListener('click', () => {
        if (document.fullscreen) {
          document.exitFullscreen();
        }
        this.onMarkerClick.emit(marker);
      });
      this.setMarkers.push(mapMarkerWeb);
      // mapMarkerWeb.setMap(this.mapWeb);

    }
  }

  addLegend() {
    if (this.options.legend && this.legendWrapper && this.options.legend.length > 0) {
      const legendWrapper = this.legendWrapper.nativeElement;
      this.options.legend.forEach((type) => {
        const name = type.name;
        const icon = type.icon;

        const image: IOptionsPsActionImageExposed = {
          imageName: icon,
          labelOptions: {
            labelKey: name
          }
        };
        if (image.labelOptions.labelKey === 'Branch') {
          image.labelOptions.psClass = 'legend-branch';
        }
        this.legend.push(image);
        this.legendWasAdded = true;
      });
      this.mapWeb.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendWrapper);
    }
  }

  ngOnDestroy() {
    if (this.languageChangedSubscription) {
      this.languageChangedSubscription.unsubscribe();
    }
    if (this.directionSubscription) {
      this.directionSubscription.unsubscribe();
    }
    if (this.markersSubscription) {
      this.markersSubscription.unsubscribe();
    }

  }

  removeMarkers() {
    if (this.setMarkers !== undefined) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.setMarkers.length; i++) {
        this.setMarkers[i].setMap(null);
      }
    }
  }
}
