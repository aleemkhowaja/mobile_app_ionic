/*
* @author islam sayed
* geolocation service
*/
import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { LoggerService } from '../logger/logger.service';
import { CommonUtils } from '../models/common-utils';
import { ICurrentCoordinates, IOptionsAlert, IOptionsLocationInformation } from '../models/ps-common-interface';
import { PsNavigatorService } from '../navigator/ps-navigator.service';
import { SessionService } from '../session/session.service';




// @author: GRadwan Userstory: 925625

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  options: GeolocationOptions;
  currentPos: Geoposition;
  requestTimeOut: any = PsCommonSettings.requestTimeOut ? Math.round(PsCommonSettings.requestTimeOut / 2) : 2000;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  locationInformation: IOptionsLocationInformation = {};
  constructor(public geolocation: Geolocation
    , private geocoder: NativeGeocoder
    , private session: SessionService
    , private navService: PsNavigatorService
    , private logger: LoggerService) {
    this.getUserPosition(false).then(pos => {
      this.watchUserPosition();
    });
  }

  /*
  * @author islam sayed 10Jan2020
  */
  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates(goBack: boolean = false) {
    this.options = {
      enableHighAccuracy: true,
      timeout: (this.requestTimeOut <= 2000) ? this.requestTimeOut : 2000
    };
    return new Promise<IOptionsLocationInformation>((resolve, reject) => {
      this.geolocation.getCurrentPosition(this.options).then((resp) => {
        this.locationInformation.latitude = resp.coords.latitude;
        this.locationInformation.longitude = resp.coords.longitude;
        this.locationInformation.timestamp = resp.timestamp;
        // will get user address by lat&lng in case web will return only coords only
        this.getGeoencoder(resp.coords.latitude, resp.coords.longitude)
          .then(location => {
            this.locationInformation.currentCity = location[0].administrativeArea.replace(' Governorate', '');
            this.locationInformation.currentCountry = location[0].countryName;
          }, error => {
            if (CommonUtils.isNativeMobile()) {
              reject(error);
            } else {
              resolve(null);
            }
          }).finally(() => {
            resolve(this.locationInformation);
          });
      }).catch((error) => {
        this.logger.error('Error getting location' + error);
        if (goBack === true) {
          this.goBack();
        }
        reject(error);
      });
    });
  }

  getCachedCoordinates(goBack: boolean = false) {
    return new Promise<ICurrentCoordinates>(async (resolve, reject) => {
      try {

        // [Islam: bug-1026936] 09 Jul 2020
        // In firefox if session doesn't have key,
        // it raise exception "Error: No available storage method found."
        // we should to handle this exception while getting stored value as following
        const lat = await this.session
          .getStoredValueOf(PsCommonSettings.COORDS_LATITUDE_KEY)
          .catch(error => {
            this.logger.error(error);
          });
        const lng = await this.session
          .getStoredValueOf(PsCommonSettings.COORDS_LONGITUDE_KEY)
          .catch(error => {
            this.logger.error(error);
          });

        let coords: ICurrentCoordinates;

        if (lat && lng) {
          coords = {
            longitude: lng,
            latitude: lat
          }
          resolve(coords);
        } else {
          this.getUserPosition(goBack).then((pos) => {
            coords = {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            }
            resolve(coords);
          }, error => {
            reject(error)
          }).catch(error => {
            reject(error)
          });
        }
      } catch (error) {
        reject(error)
      }
    });
  }

  getUserPosition(goBack: boolean = true) {
    const timeout = (this.requestTimeOut <= 2000) ? this.requestTimeOut : 2000

    this.options = {
      enableHighAccuracy: true,
      timeout
    };
    return new Promise<any>(async (resolve, reject) => {
      this.geolocation.getCurrentPosition(this.options).then((pos) => {
        this.currentPos = pos;

        this.session.append(PsCommonSettings.COORDS_LATITUDE_KEY, pos.coords.latitude, true);
        this.session.append(PsCommonSettings.COORDS_LONGITUDE_KEY, pos.coords.longitude, true);
        this.session.append(PsCommonSettings.COORDS_TIMESTAMP_KEY, pos.timestamp, true);

        resolve(this.currentPos);
      }, (err: PositionError) => {
        this.logger.error(err);
        if (goBack === true) {
          this.goBack(err);
        }
        reject(err);
      }).catch((err) => {
        this.logger.error(err);
        if (goBack === true) {
          this.goBack(err);
        }
        reject(err);
      });
    });
  }
  // error of type GeolocationPositionError
  // #ref: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  public goBack(error?, customTitle = null) {
    let message: string;
    // PERMISSION_DENIED
    if (error.code === 1) {
      message = `${customTitle}_service_needs_location_permission_key`;
    } else if (error.code === 2) {
      message = `${customTitle}_unable_to_access_device_location_key`;
    } else if (error.code === 3) {
      message = `${customTitle}_needs_to_enable_location_access_key`;
    }
    // Modified by Richie for TP# 1105083 : the interface PSAlertOptions was sent to the function causing compilation error
    const alertOption: IOptionsAlert = {
      title: CommonUtils.translate('failed_location_key'),
      message: CommonUtils.translate(message),
      // buttons: [
      //   {
      //     text: CommonUtils.translate('okay_key'),
      //     role: 'cancel', cssClass: 'button-primary'
      //   }
      // ]
    };
    /* this.navService.pop().then((result) => {
      this.logger.log('go back!');
      CommonUtils.presentFailureAlert(null, alertOption);
    }); */

    this.logger.log('go back!');
    CommonUtils.presentFailureAlert(null, alertOption);
  }

  /*
  * @author islam sayed 10Jan2020
  */
  getGeoencoder(latitude, longitude) {
    return new Promise<NativeGeocoderResult[]>((resolve, reject) => {
      this.geocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          resolve(result);
        }, (err: any) => {
          this.logger.error(err);
          reject(err);
        })
        .catch((error: any) => {
          this.logger.error('Error getting location' + JSON.stringify(error));
          reject(error);
        });
    });
  }

  // Return Comma saperated address
  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }

  watchUserPosition() {

    this.options = {
      enableHighAccuracy: false
    };

    const watch = this.geolocation.watchPosition(this.options);
    watch.subscribe((pos: Geoposition) => {
      this.session.append(PsCommonSettings.COORDS_LATITUDE_KEY, pos.coords.latitude, true);
      this.session.append(PsCommonSettings.COORDS_LONGITUDE_KEY, pos.coords.longitude, true);
      this.session.append(PsCommonSettings.COORDS_TIMESTAMP_KEY, pos.timestamp, true);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

      // to use it in any page just subscribe as here with data
    });
    return watch;
  }
}
