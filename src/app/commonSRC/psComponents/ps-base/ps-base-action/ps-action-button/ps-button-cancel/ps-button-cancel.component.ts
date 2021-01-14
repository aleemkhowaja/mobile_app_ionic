import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { IOptionsPsActionButton, IOptionsPsButtonCancel } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';


@Component({
  selector: 'ps-button-cancel',
  templateUrl: './ps-button-cancel.component.html',
  styleUrls: ['./ps-button-cancel.component.scss'],
})
export class PsButtonCancelComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonCancel;

  cancelOptions: IOptionsPsActionButton;

  constructor(private commonService: PsCommonService, public navService?: PsNavigatorService, elRef?: ElementRef) {
    super(commonService, commonService.logger, elRef);
  }

  ngOnInit() {
    this.cancelOptions = {
      labelKey: 'cancel_key',
      type: 'button',
      iconName: 'close-circle',
      iconPosition: 'start',
      psClass: 'ps-button-cancel',
      group: this.options.group
    };
    if (this.navService.activeOpersList.length < 3) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.id], 0);
    }
  }

  onCancelClicked() {
    this.navService.onCancelClicked();
  }
}
