import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IOptionsPsActionGallery, IOptionsPsActionIconExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { IOptionsPsComplexProfileExposed } from '../ps-complex-profile/ps-complex-profile.component.interfaces';
import { IOptionsPsComplexUserProfileMenuExposed } from '../ps-complex-user-profile-menu/ps-complex-user-profile-menu.component.interfaces';
import { PsBaseFieldComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsMenuHeaderExposed } from './ps-complex-menu-header-container.interfaces';


@Component({
  selector: 'ps-complex-menu-header-container',
  templateUrl: './ps-complex-menu-header-container.component.html',
  styleUrls: ['./ps-complex-menu-header-container.component.scss'],

})
export class PsComplexMenuHeaderContainerComponent extends PsBaseFieldComponent implements OnInit, AfterViewInit {

  @Input() options: IOptionsPsMenuHeaderExposed = {
    showProfile: true
  };
  isUserLoggedIn = false;
  optionsUserProfileMenu: IOptionsPsComplexUserProfileMenuExposed = {};
  optionsComplexProfile: IOptionsPsComplexProfileExposed = {};
  bannersOptions: IOptionsPsActionGallery;
  sliderButtonOptions: IOptionsPsActionIconExposed = {
    iconName: 'play',
    labelOptions: {
      labelKey: 'profile_key'
    }
  };
  presentProfile = true;
  constructor(private nav: PsNavigatorService, private commonProvider: PsCommonService) {
    super(commonProvider, commonProvider.logger);
  }

  ngOnInit() {
    this.isUserLoggedIn = this.nav.isUserLoggedIn;
    this.bannersOptions = {
      layout: 'slider'
    };

    this.presentProfile = true;
    this.options.timeout = 5000;
  }

  ngAfterViewInit() {
    this.handleSliderMain();
  }

  handleSliderMain() {
    if (this.presentProfile) {
      this.commonProvider.presentProfile.subscribe(result => {
        if (result != undefined && result === false) {
          setTimeout(() => {
            this.closeSlider();
          }, this.options.timeout);
        }
      });
    }
  }

  closeSlider() {
    setTimeout(() => {
      this.presentProfile = false;
    }, 1000);
  }

  handleSlider() {
    this.presentProfile = true;
    this.handleSliderMain();
  }
}
