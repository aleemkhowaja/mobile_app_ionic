import { Component, Input, OnInit } from '@angular/core';
import { PsBaseActionComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-base-action.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsActionHyperlink } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsAnchorSwitcherExposed } from './ps-anchor-switcher.component.interfaces';

@Component({
  selector: 'ps-anchor-switcher',
  templateUrl: './ps-anchor-switcher.component.html',
  styleUrls: ['./ps-anchor-switcher.component.scss'],
})
export class PsAnchorSwitcherComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsAnchorSwitcherExposed;

  private selectedIndex = 0;
  public currentOptions: IOptionsPsActionHyperlink;


  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);
  }


  ngOnInit() {
    if (this.options.listOfOptions.length > 0) {
      this.currentOptions = this.options.listOfOptions[0];
      if (!this.options.listOfOptions[0].anchorValue) {
        this.currentOptions.anchorValue = ConstantCommon.HREFRESTRICTVALUE;
      }
    }

  }
  onChange(event) {
    this.selectedIndex++;

    if (this.selectedIndex === this.options.listOfOptions.length) {
      this.selectedIndex = 0;
    }

    this.currentOptions = this.options.listOfOptions[this.selectedIndex];
    if (!this.options.listOfOptions[this.selectedIndex].anchorValue) {
      this.currentOptions.anchorValue = ConstantCommon.HREFRESTRICTVALUE;

    }

    this.onClick.emit(event);
  }
}
