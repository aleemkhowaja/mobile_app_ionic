import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ILoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsHyperlinkInlineLabeled } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownAllowedLanguagesExposed } from '../../ps-select-dropdown/ps-dropdown-allowed-languages/ps-dropdown-allowed-languages.component.interfaces';
import { IOptionsPsComplexProfileExposed } from './ps-complex-profile.component.interfaces';



@Component({
  selector: 'ps-complex-profile',
  templateUrl: './ps-complex-profile.component.html',
  styleUrls: ['./ps-complex-profile.component.scss'],
})
export class PsComplexProfileComponent extends PsBaseFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public options: IOptionsPsComplexProfileExposed;
  private formGroup = new FormGroup({});
  optionsActionImage: IOptionsPsHyperlinkInlineLabeled = {
    actionImageOptions: {
      psClass: 'profile-pic-user',
      allowCust: true
    },
    labelOptions: {
      labelKey: 'edit_key'
    },
    route: 'profile',
    labelKey: 'profile_key',
    pageOptions: {
      title: 'profile_key',
      operId: ConstantCommon.PROFILE_OPER_ID
    }
  };
  optionsPreferredLanguage: IOptionsPsDropdownAllowedLanguagesExposed = {
    group: this.formGroup, fcName: 'language', changeSystemLanguage: true
  };
  userInformation: ILoginResponse;
  userProfileImage: string;
  private eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable
  constructor(loggerP: LoggerService, public commonProv: PsCommonService, public events: Events) {
    super(commonProv, loggerP);
    // modified by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable with one argument
    this.eventSub = events.subscribe('profileImageUpdateEvent', (base64Image) => {
      this.optionsActionImage.actionImageOptions.imageBase64Url = base64Image;
      if (!this.optionsActionImage.actionImageOptions.imageBase64Url) {
        this.optionsActionImage.actionImageOptions.imageName = CommonBussinessConstant.DEFAULT_IMAGE;
      }
    });
  }
  // Added by Richie #TP 1105083
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
  // end Richie
  ngAfterViewInit() {
    this.formGroup.controls[this.optionsPreferredLanguage.fcName].setValue(PsCommonSettings.activeLanguge);
  }

  ngOnInit() {
    this.userInformation = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    if (this.userInformation !== null && this.userInformation !== undefined && this.userInformation.profileImage) {
      this.optionsActionImage.actionImageOptions.imageBase64Url = this.userInformation.profileImage;
    }
  }


}
