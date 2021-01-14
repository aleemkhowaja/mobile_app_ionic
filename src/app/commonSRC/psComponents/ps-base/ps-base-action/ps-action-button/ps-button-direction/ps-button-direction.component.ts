import { Component, Input, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonDirection } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';

@Component({
  selector: 'ps-button-direction',
  templateUrl: './ps-button-direction.component.html',
  styleUrls: ['./ps-button-direction.component.scss'],
})
export class PsButtonDirectionComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonDirection;

  directionOptions: IOptionsPsActionButton;

  constructor(public commonService: PsCommonService, loggerP: LoggerService, public eventEmitterService: EventEmitterService) {
    super(commonService, loggerP);
  }

  ngOnInit() {
    this.directionOptions = {
      labelKey: 'get_directions_key',
      type: 'button',
      psClass: 'ps-complex-card-details-branch-button-directions',
      group: this.options.group
    };
    this.commonService.copyObject(this.directionOptions, this.options);
  }

  onDirectionClicked(event) {
    const cordsLatLng = {
      currentLocation: this.options.currentLocation,
      markerLocation: this.options.markerLocation,
      currentLocationString: this.options.currentLocationString,
      markerLocationString: this.options.markerLocationString,
    };
    this.onClick.emit(event);
    this.eventEmitterService.emitDirectionChangeEvent({cordinates: cordsLatLng});

    // this.directionsService.route({
    //   origin: this.options.currentLocation,
    //   destination: this.options.markerLocation,
    //   travelMode: google.maps.TravelMode['DRIVING']
    //   }, (res, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //     this.decodedPoints = GoogleMaps.getPlugin().geometry.encoding.decodePath(
    //     res.routes[0].overview_polyline
    //     );
    //     this.onClick.emit(event);
    //     this.commonService.emitDirectionChangeEvent({cordinates: cordsLatLng , decodeOptions: this.decodedPoints});
    //   }
    // });
    // flightPath.setMap(map);

  }
}
