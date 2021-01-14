import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PsActionButtonComponent } from '../ps-action-button.component';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonPrevious } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';


@Component({
  selector: 'ps-button-previous',
  templateUrl: './ps-button-previous.component.html',
  styleUrls: ['./ps-button-previous.component.scss'],
})

export class PsButtonPreviousComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonPrevious;

  previousOptions: IOptionsPsActionButton;

  constructor(common: PsCommonService, loggerP: LoggerService, elRef?: ElementRef) {
    super(common, loggerP, elRef);
  }

  ngOnInit() {
    this.previousOptions = {
      labelKey: this.options.labelKey,
      type: 'button',
      iconName: this.options.floatingButton ? 'skip-backward' : 'arrow-round-back',
      iconPosition: 'start',
      psClass: 'ps-button-back',
      group: this.options.group
    };
  }

  onBackClicked(event: Event) {
    if (this.options.stepper) {
      this.options.stepper.previous();
    }
    this.onClick.emit(event);
  }

}
