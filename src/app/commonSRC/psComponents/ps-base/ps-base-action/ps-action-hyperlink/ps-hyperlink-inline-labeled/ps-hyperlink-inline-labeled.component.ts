import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsActionHyperlinkComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-hyperlink/ps-action-hyperlink.component';
import { IOptionsPsHyperlinkInlineLabeled } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-hyperlink-inline-labeled',
  templateUrl: './ps-hyperlink-inline-labeled.component.html',
  styleUrls: ['./ps-hyperlink-inline-labeled.component.scss'],
})
export class PsHyperlinkInlineLabeledComponent extends PsActionHyperlinkComponent implements OnInit {
  @Input() options: IOptionsPsHyperlinkInlineLabeled = {
    actionImageOptions: {
      psClass: 'profile-pic-user',
    },
    labelOptions: {
      labelKey: 'edit_key'
    },
    route: 'profile',
    labelKey: 'profile_key',
  };

  userProfileImage: string;
  constructor(public commonService: PsCommonService, public nav: PsNavigatorService) {
    super(commonService, nav);
  }

  ngOnInit() {
    if (!this.options.actionImageOptions.imageBase64Url) {
      this.options.actionImageOptions.imageName = CommonBussinessConstant.DEFAULT_IMAGE;
    }
  }
  editProfile(event) {
    super.handleClickEvent(event);
  }
}
