import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PsActionButtonComponent } from '../ps-action-button.component';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonNext } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';


@Component({
  selector: 'ps-button-next',
  templateUrl: './ps-button-next.component.html',
  styleUrls: ['./ps-button-next.component.scss'],
})
export class PsButtonNextComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonNext;

  nextOptions: IOptionsPsActionButton;

  constructor(private commonService: PsCommonService, loggerP: LoggerService, elRefNext?: ElementRef) {
    super(commonService, loggerP, elRefNext);
  }

  ngOnInit() {
    this.nextOptions = {
      labelKey: this.options.labelKey,
      type: 'button',
      iconName: this.options.floatingButton ? 'skip-forward' : 'arrow-round-forward',
      iconPosition: 'end',
      psClass: 'ps-button-next',
      group: this.options.group
    };
  }

  onNextClicked(event: Event) {
    if (this.options.stepper) {
      const response = this.common.returnStepControlsAsAbstractControl(this.options.group, this.options.stepper,
        this.options.stepper.selectedIndex, this.options.stepperId, true);
      this.common.events.publish('triggerValidation', { response, fromNext: true, group: this.options.group });
      if (response.listOfInvalidControls != null && response.listOfInvalidControls.length > 0) {
        if (!response.isValid) {
          response.listOfInvalidControlsWithDOMReferences[0].scrollIntoView({ behavior: 'smooth' });
          return;
        }
        this.options.stepper.next();
      } else {
        this.options.stepper.next();
      }
    }
    this.onClick.emit(event);
  }
}
