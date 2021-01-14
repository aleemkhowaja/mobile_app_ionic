import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from '../../psServices/Event/event.service';
import { CommonUtils } from '../../psServices/models/common-utils';
import { IOptionsPsActionImage, IOptionsPsButtonCancel, IOptionsPsTemplateView } from '../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';


@Component({
  selector: 'ps-template-view',
  templateUrl: './ps-template-view.template.html',
  styleUrls: ['./ps-template-view.template.scss'],
})
export class PsTemplateView extends PsTemplateBasePage implements OnDestroy {

  @Input() options: IOptionsPsTemplateView;
  cancelOptions: IOptionsPsButtonCancel = {
    labelKey: 'cancel_key',
    group: this.options.group
  };
  spinner = false;

  actionImageOptions: IOptionsPsActionImage = {
    imageName: CommonUtils.getCssVariableValue('--ps-loader-image-name')
  };
  // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable
  private reqStartEvent: Subscription;
  private reqCompletEvent: Subscription;
  // End Richie
  constructor(public events: Events) {
    super();
    // modified by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable with one argument
    this.reqStartEvent = events.subscribe('network:request:started', (time) => {
      this.spinner = true;
    });
    this.reqCompletEvent = events.subscribe('network:request:completed', (time) => {
      this.spinner = false;
    });
  }

  onFooterClick() {
    if (document.getElementsByTagName('ion-modal')[0] !== undefined) {
      document.getElementsByTagName('ion-modal')[0].dismiss();
    }
  }

  ngOnDestroy() {
    // modified by Richie #TP 1105083
    super.ngOnDestroy();
    if (this.reqStartEvent) {
      this.reqStartEvent.unsubscribe();
    }
    if (this.reqCompletEvent) {
      this.reqCompletEvent.unsubscribe();
    }
  }

}
