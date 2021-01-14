import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsBaseContainer } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseComponent } from '../ps-base.component';


@Component({
  selector: 'ps-base-container',
  templateUrl: './ps-base-container.component.html',
  styleUrls: ['./ps-base-container.component.scss'],
})
export class PsBaseContainerComponent extends PsBaseComponent implements OnDestroy {
  @Input() options: IOptionsPsBaseContainer = {};
  protected dynScreenDisplayEmitEventSubscription: Subscription;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }


  updateChildrenValidity(listOfChildrenControlsOrIdsNames?: Array<string>, actionType?: { isVisible?: boolean, isReadOnly?: boolean, parentNode?: any }) {
    if (listOfChildrenControlsOrIdsNames.length > 0 && !this.custMode) {
      const isVisible = actionType.isVisible === false ? false : true;
      const isReadOnly = actionType.isReadOnly;
      if (!isVisible) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, listOfChildrenControlsOrIdsNames, 0);
      } else {
        if (isReadOnly) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, listOfChildrenControlsOrIdsNames, 1);
        } else {
          listOfChildrenControlsOrIdsNames.forEach(key => {
            const elementValidations = this.commonProv.getInitialState(key);
            let isMandatory = elementValidations.IS_MANDATORY;
            if (elementValidations.IS_READONLY === 1) {
              isMandatory = 0;
            }
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [key], isMandatory);
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [key], elementValidations.IS_READONLY);
          });
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.dynScreenDisplayEmitEventSubscription) {
      this.dynScreenDisplayEmitEventSubscription.unsubscribe();
    }
  }
}
