import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerFlip } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';


@Component({
  selector: 'ps-container-flip',
  templateUrl: './ps-container-flip.component.html',
  styleUrls: ['./ps-container-flip.component.scss'],
})
export class PsContainerFlipComponent extends PsBaseContainerComponent implements OnInit {

  flipCardBackClass: any = {};
  flipCardInnerClass = {};
  mainOptions: IOptionsPsContainerFlip;
  @Input('options') set option(val: IOptionsPsContainerFlip) {
    if (CommonUtils.isNotEmptyObject(val)) {
      this.mainOptions = val;
      this.checkClasses();
    }
  }


  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    if (this.mainOptions.animationClass) {

    }
  }

  checkClasses() {
    if (CommonUtils.isNotEmptyObject(this.mainOptions)) {
      this.flipCardBackClass[this.mainOptions.animationClass] = this.mainOptions.animationClass;
      this.flipCardBackClass.hideHiddenArea = !this.mainOptions.hideVisibleArea;
      this.flipCardBackClass['flip-card-back-default-animation'] = !this.mainOptions.animationClass;
    }
    return this.flipCardBackClass;
  }

}
