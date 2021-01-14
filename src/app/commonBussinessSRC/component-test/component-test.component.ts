import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsAlert, IOptionsPsActionGallery, IOptionsPsHyperlinkAnchor } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { PsGalleryVerificationImagesComponent } from '../psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.component';
import { IOptionsPsGalleryVerificationImagesExposed } from '../psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.component.interfaces';
import { IOptionsPsMenuHeaderExposed } from '../psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.interfaces';
import { IOptionsPsComplexTermsAndConditionsExposed } from '../psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsPsComplexUserProfileMenuExposed } from '../psComponents/ps-complex-components/ps-complex-user-profile-menu/ps-complex-user-profile-menu.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from '../psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IAlertMessage } from '../psServices/models/ps-common-bussiness-interfaces';
import { OmniCommonService } from '../psServices/omni-common/omni-common.service';

@Component({
  selector: 'component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {
  @ViewChild(PsGalleryVerificationImagesComponent, { static: true })
  psVerfication: PsGalleryVerificationImagesComponent;



  alertOptions: IAlertMessage;
  verificationOptions: IOptionsPsGalleryVerificationImagesExposed;
  bannersOptions: IOptionsPsActionGallery;

  //#region Terms and conditions and spinner interfaces
  termsAndConditinsOptions: IOptionsPsComplexTermsAndConditionsExposed;
  optionsUserProfileMenu: IOptionsPsComplexUserProfileMenuExposed;
  preferredLanguageOptions?: IOptionsPsLovPreferredLanguageExposed;
  //#endregion
  mygroup: FormGroup = new FormGroup({});
  menuHeaderoptions: IOptionsPsMenuHeaderExposed;
  intBenefAnchorOptions: IOptionsPsHyperlinkAnchor;
  locBenefAnchorOptions: IOptionsPsHyperlinkAnchor;
  extBenefAnchorOptions: IOptionsPsHyperlinkAnchor;
  transferType: any;


  constructor(
    private commonService: OmniCommonService,
    private navService: PsNavigatorService
  ) { }

  ngOnInit() {
    this.preferredLanguageOptions = {
      fcName: 'lang',
      group: this.mygroup
    };

    this.menuHeaderoptions = {};

    this.verificationOptions = {
      layout: 'grid'
    };

    this.bannersOptions = {
      layout: 'slider'
    };



    this.termsAndConditinsOptions = {
      checkBoxOptions: {
        group: this.mygroup,
        fcName: 'checkboxConfirm',
        labelKey: 'i_agree_key'
      },
      htmlViewerOptions: {
        fileName: PsCommonBusinessSettings.onlineRegistrationTermsAndConditionsFileName
      }
    };

    this.optionsUserProfileMenu = {
      group: this.mygroup
    };

    this.intBenefAnchorOptions = {
      labelKey: 'internal_beneficiary_key',
      iconOptions: {
        labelOptions: {
          labelKey: 'add_internal_beneficiary_key'
        }
      }
    };

    this.locBenefAnchorOptions = {
      labelKey: 'local_beneficiary_key',
      iconOptions: {
        labelOptions: {
          labelKey: 'add_local_beneficiary_key'
        }
      }
    };

    this.extBenefAnchorOptions = {
      labelKey: 'external_beneficiary_key',
      iconOptions: {
        labelOptions: {
          labelKey: 'add_external_beneficiary_key'
        }
      }
    };

  }


  navigateprayer() {
    this.navService.navigateForward(['/prayer-time']);
  }


  goExtBeneficiary() {
    this.transferType = 'international';
    const navigationExtras: NavigationExtras = {
      queryParams: {
        transferType: this.transferType,
      }
    };
    this.navService.navigateForward(['./beneficiary'], navigationExtras);
  }


  goLocBeneficiary() {

    this.navService.navigateForward(['./local-beneficiary']);
  }

  goIntBeneficiary() {

    this.navService.navigateForward(['./internal-beneficiary']);
  }

  goInternationBeneficiary() {
    this.navService.navigateForward(['./international-beneficiary']);
  }


  async onClickSucess() {
    let alertOptions: IOptionsAlert = {
      autoHide: true
    };
    this.commonService.presentSuccessAlert(null, alertOptions);
  }

  async onClickSucessUserDismiss() {
    this.commonService.presentSuccessAlert('A success message is shown here');
  }
  async onClick_Info() {
    let alertOptions: IOptionsAlert = {
      title: 'Tip'
    };
    this.commonService.presentInfoAlert('This is information alert!', alertOptions);
  }

  async onClick_Failure() {
    this.commonService.presentFailureAlert('This is a failure message!');
  }

  async onClick_Fatal() {
    let alertOptions: IOptionsAlert = {
      title: 'Warning'
    };
    this.commonService.presentFatalAlert('The user is already logged in', alertOptions);
  }

  navigateDeals() {
    this.navService.navigateForward(['/deals-list']);
  }

}
