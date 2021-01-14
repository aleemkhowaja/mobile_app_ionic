import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsContainerItem, IOptionsPsActionIconExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseContainerComponent } from '../ps-base-container.component';

@Component({
  selector: 'ps-container-item',
  templateUrl: './ps-container-item.component.html',
  styleUrls: ['./ps-container-item.component.scss'],
})
export class PsContainerItemComponent extends PsBaseContainerComponent {

  @Input() options: IOptionsPsContainerItem = {};
  @Output() onPsImageClicked = new EventEmitter<void>();
  @Output() onPsIconClicked = new EventEmitter<void>();

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
  }

  onIconClicked() {
    this.onPsIconClicked.emit();
  }

  onImageClicked() {
    this.onPsImageClicked.emit();
  }

  get serviceMappingIconOptions(): IOptionsPsActionIconExposed {
    let iconOpt = {};
    if (this.options && this.options.serviceMappingIconOptions) {
      iconOpt = {
        ... this.options.serviceMappingIconOptions
      };
    }
    return iconOpt;
  }

}
