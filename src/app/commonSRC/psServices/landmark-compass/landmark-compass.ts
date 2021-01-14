import { Injectable } from '@angular/core';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from '../geolocation/geolocation.service';
import { LoggerService } from '../logger/logger.service';


export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LandmarkCompassService {

  public deviceAngle = 0;
  deviceLocation: Coordinates = {
    longitude: 35,
    latitude: 33,
  };

  private _subscriptions: any = {};


  constructor(private deviceOrientation: DeviceOrientation,
    private geolocationService: GeolocationService,
    private logger: LoggerService
  ) {


  }

  protected radToDeg(angleInRad: number): number {
    return angleInRad * 180 / Math.PI;
  }

  protected degToRad(angleInDeg: number): number {
    return angleInDeg * Math.PI / 180;
  }

  public getDistance(coordinates: Coordinates) {
    // alert(this.deviceLocation.latitude+","+this.deviceLocation.longitude);
    let R = 6371; // Radius of the earth in km
    let dLat = this.degToRad(coordinates.latitude - this.deviceLocation.latitude);
    let dLon = this.degToRad(coordinates.longitude - this.deviceLocation.longitude);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(this.deviceLocation.latitude)) * Math.cos(this.degToRad(coordinates.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  public subscribe() {
    this._subscriptions.watchHeading = this.deviceOrientation.watchHeading().subscribe(orientation => {
      this.deviceAngle = orientation.magneticHeading;
    }, error => { this.logger.log(error); });
    this.geolocationService.getCachedCoordinates().then(() => {
      this._subscriptions.watchPosition = this.geolocationService.watchUserPosition().subscribe((location: Geoposition) => {
        if (location.coords) {
          this.deviceLocation.latitude = location.coords.latitude;
          this.deviceLocation.longitude = location.coords.longitude;
        }
      }, error => { this.logger.log(error); });
    });
    // window.addEventListener('deviceorientation', this.processEvent, true);
  }

  public unsubscribe() {
    if (this._subscriptions.watchHeading !== undefined) {
      this._subscriptions.watchHeading.unsubscribe();
    }
    window.removeEventListener('deviceorientation', this.processEvent);
  }

  public getLandmarkAngle(coords: Coordinates) {

    if (!coords) { return; }

    const Xq = coords.longitude;
    const Yq = coords.latitude;

    const Xm = this.deviceLocation.longitude;
    const Ym = this.deviceLocation.latitude;

    const a2 = Math.atan(Math.abs(Xm - Xq) / Math.abs(90 - Yq))

    const b = Math.atan(Math.abs(Yq - 90) / Math.abs(Xq - Xm))
    const b1 = Math.atan(Math.abs(Yq - Ym) / Math.abs(Xq - Xm));
    const b2 = Math.abs(b1 - b);

    const c = 180 - this.radToDeg(a2 + b2);

    let result = c;
    if (Xq < Xm) { result = -result; }
    if (Yq > Ym) { result = 180 - result; }
    return result;
  }

  public trueAngle(coords: Coordinates): number {
    const landmarkAngle = this.getLandmarkAngle(coords);
    let result = (landmarkAngle - this.deviceAngle);
    if (result <= -180) { result = result + 360; }
    return result;
  }

  processEvent(event) {
    var elem = document.getElementsByClassName('direction-n');

    window.addEventListener('deviceorientation', (e) => {
      // remember to use vendor-prefixed transform property
      elem['style'].transform =
        'rotateZ(' + (e.alpha - 180) + 'deg) ' +
        'rotateX(' + e.beta + 'deg) ' +
        'rotateY(' + (-e.gamma) + 'deg)';
    });
  }
}
