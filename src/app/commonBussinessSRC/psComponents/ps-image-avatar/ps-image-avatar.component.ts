import { Component, Input, OnInit } from '@angular/core';
import { PsActionImageComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-image/ps-action-image.component';
import { IOptionsPsImageAvatar } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-image-avatar',
  templateUrl: './ps-image-avatar.component.html'
})
export class PsImageAvatarComponent extends PsActionImageComponent implements OnInit {

  @Input() options: IOptionsPsImageAvatar;

  constructor(private commonService: PsCommonService) {
    super(commonService, commonService.logger);
  }
  ngOnInit() {
  }

}
