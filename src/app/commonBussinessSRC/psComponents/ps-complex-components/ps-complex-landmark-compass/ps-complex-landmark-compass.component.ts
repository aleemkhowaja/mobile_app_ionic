import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { Coordinates, LandmarkCompassService } from '../../../../commonSRC/psServices/landmark-compass/landmark-compass';
import { IOptionsPsActionIcon, IOptionsPsLabel, IOptionsQiblaDirection } from '../../../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'ps-complex-landmark-compass',
  templateUrl: './ps-complex-landmark-compass.component.html',
  styleUrls: ['./ps-complex-landmark-compass.component.scss'],
})
export class PsComplexLandmarkCompassComponent extends PsBaseFieldComponent implements OnInit, OnDestroy {
  @Input('landmark-location') set landmarkLocation(value: Coordinates) {
    this.landmarkLoc = value;
  }
  get landmarkLocation(): Coordinates {
    return this.landmarkLoc;
  }
  @Input() options: IOptionsQiblaDirection;
  northOptions: IOptionsPsLabel;
  northEastOptions: IOptionsPsLabel;
  eastOptions: IOptionsPsLabel;
  southEastOptions: IOptionsPsLabel;
  southOptions: IOptionsPsLabel;
  southWestOptions: IOptionsPsLabel;
  westOptions: IOptionsPsLabel;
  northWestOptions: IOptionsPsLabel;
  landmarkLoc: Coordinates = {
    latitude: 0,
    longitude: 0
  };

  iconOptions: IOptionsPsActionIcon = {
    iconName: 'arrow-round-up'
  };

  landmarkArrowOptions: IOptionsPsActionIcon = {
    iconName: 'compass-arrow',
  };
  landmarkOptions: IOptionsPsActionIcon = {
    iconName: 'remove',
  };
  landmarkFormGroup: FormGroup = new FormGroup({});

  constructor(public commonProv: PsCommonService, public logger: LoggerService, private landmarkCompassService: LandmarkCompassService) {
    super(commonProv, logger);
  }

  ngOnInit() {
    if (this.commonProv.isMobile()) {
      this.landmarkCompassService.subscribe();
    }

    this.northOptions = {
      labelKey: 'north_key',
      fcName: 'north',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate'
    };
    this.northEastOptions = {
      labelKey: 'ne_key',
      fcName: 'northEast',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate coordinates-upcase'
    };
    this.eastOptions = {
      labelKey: 'east_key',
      fcName: 'east',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate'
    };
    this.southEastOptions = {
      labelKey: 'se_key',
      fcName: 'southEast',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate coordinates-upcase'
    };
    this.southOptions = {
      labelKey: 'south_key',
      fcName: 'south',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate'
    };
    this.southWestOptions = {
      labelKey: 'sw_key',
      fcName: 'southWest',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate coordinates-upcase'
    };
    this.westOptions = {
      labelKey: 'west_key',
      fcName: 'west',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate'
    };
    this.northWestOptions = {
      labelKey: 'nw_key',
      fcName: 'northWest',
      group: this.landmarkFormGroup,
      psClass: 'transformRotate coordinates-upcase'
    };
  }

  ngOnDestroy() {
    if (this.commonProv.isNativeMobile()) {
      this.landmarkCompassService.unsubscribe();
    }
  }

  public get deviceAngle(): number {
    if (document.getElementsByClassName('transformRotate')[0] !== undefined) {
      document.getElementsByClassName('transformRotate')[0]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[1]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[2]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[3]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[4]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[5]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[6]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('transformRotate')[7]['style'].transform = 'rotate(' + (this.landmarkCompassService.deviceAngle) + 'deg)';
      document.getElementsByClassName('landmark-compass-icon-arrow')[0]['style'].transform = 'translateX(-50%) rotate(' + ((this.landmarkCompassService.deviceAngle - this.landmarkAngle) + 90) + 'deg)';
      document.getElementsByClassName('landmark-icon-wrapper')[0]['style'].transform = document.getElementsByClassName('transformRotate')[0]['style'].transform;
      document.getElementsByClassName('main-pointing-arrow')[0]['style']['transform-origin'] = 'top bottom';
    }
    return - this.landmarkCompassService.deviceAngle;
  }

  public get landmarkAngle(): number {
    return this.landmarkCompassService.getLandmarkAngle(this.landmarkLocation);
  }
}