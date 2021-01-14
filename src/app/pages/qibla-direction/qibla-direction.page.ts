import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsQiblaDirection } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-qibla-direction',
  templateUrl: './qibla-direction.page.html',
  styleUrls: ['./qibla-direction.page.scss'],
})
export class QiblaDirectionPage extends OmniBasePage implements OnInit, OnDestroy {

  qiblaDirectionOptions: IOptionsQiblaDirection = {};
  deviceOrientationSubscription: any;
  qiblaLocation = ConstantCommon.qiblaLocation;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private deviceOrientation: DeviceOrientation) {
    super();
  }
  
  ngOnInit() {
    super.init();
    // Get the device current compass heading
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
        // console.log(data);
      },
      (error: any) => {}/*console.log(error)*/
    );
    // Watch the device compass heading change
    this.deviceOrientationSubscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        const elem = document.getElementsByClassName('landmark-icon')[0];
        const elem1 = document.getElementsByClassName('compass-background')[0];

        elem['style'].transform =
        'rotateZ(' + (-( data.magneticHeading)) + 'deg)';
        elem1['style'].transform =
        'rotateZ(' + (-( data.magneticHeading)) + 'deg)';
      }
    );
    this.qiblaDirectionOptions = {
      lblOptions: {
        labelKey: 'qilba_direction_key'
      },
      landMarkCompassOtpions: {
        labelKey: 'landmark_key'
      }
    };
  }

  ngOnDestroy() {
    // Stop watching heading change
    this.deviceOrientationSubscription.unsubscribe();
  }

}
