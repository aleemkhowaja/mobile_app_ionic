import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { PsIconCustomizationComponent } from 'src/app/commonSRC/customization/psComponent/ps-icon-customization/ps-icon-customization.component';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerStepperComponent, IOptionsReturnStepControlsAsAbstractControl } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';


@Component({
  selector: 'ps-container-stepper',
  templateUrl: './ps-container-stepper.component.html',
  styleUrls: ['./ps-container-stepper.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: CommonCustUtils.getDefaultIndicatorType()
  }]
})
export class PsContainerStepperComponent extends PsBaseContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() options: IOptionsPsContainerStepperComponent;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('stepper', { read: ElementRef, static: false }) stepperNative: ElementRef;
  @ViewChild('custIcon') iconCust: PsIconCustomizationComponent;
  showPreview = true;
  showTerms = true;
  showSteps = {
    step1: true,
    step2: true,
    step3: true,
    step4: true,
    step5: true,
    step6: true,
    step7: true,
    step8: true,
    step9: true,
    step10: true
  };

  public formGroupArray: Array<FormGroup> = [];
  private subscription: Subscription;
  stepperLength: number;
  matIconName: string;
  termsStepName;
  previewStepName
  constructor(commonP: PsCommonService, loggerP: LoggerService, private eventEmitter: EventEmitterService) {
    super(commonP, loggerP);
    this.subscription = this.commonProv.checkView().subscribe((result) => {
      if (result && result.didEnter && this.options && this.options.group) {
        this.initStepper();
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.initStepper();
  }

  ngAfterViewInit() {
    this.onPsInit.emit(this.stepper);
    setTimeout(() => {
      if (this.stepper[ConstantCommon.LAST_ACTIVE_STEP]) {
        this.commonProv.navigateStepperToIndex(this.stepper, parseInt(this.stepper[ConstantCommon.LAST_ACTIVE_STEP]), this.options.group);
      } else {
        this.stepper[ConstantCommon.LAST_ACTIVE_STEP] = this.stepper.selectedIndex;
      }
    }, ConstantCommon.TODO_LIST_STEP_VALIDATION_DELAY)

  }
  initStepper() {
    this.matIconName = CommonCustUtils.getStepperIconName();
    this.formGroupArray = [];
    if (this.options.group && this.stepper) {

      let response: IOptionsReturnStepControlsAsAbstractControl;
      /*
        gilbertAndary: extract for each step, list of controls present in this step
        */
      this.stepper.steps.forEach((cdkStep, index) => {
        response = this.common.returnStepControlsAsAbstractControl(this.options.group, this.stepper, index);
        const fromGroup = new FormGroup(response.mapOfControls);
        this.formGroupArray.push(fromGroup);
      });

      this.termsStepName = this.id + '_terms';
      this.previewStepName = this.id + '_preview';
      this.options.namesofSteps.push(this.termsStepName, this.previewStepName);

      if (!this.custMode) {
        this.validateStepper();
      }

      this.stepperNative.nativeElement.setAttribute('currentIndex', 0);
    }
  }

  onSelectionChange(event) {
    if (event.selectedIndex == this.options.schedulerStepIndex) {
      this.eventEmitter.setSchedulerObjLoaded(this.options['requestObject']);
    }
    if (event.selectedIndex && this.stepperNative.nativeElement && this.stepperNative.nativeElement.getElementsByClassName('mat-horizontal-content-container')[0]) {
      Array.from(this.stepperNative.nativeElement.getElementsByClassName('mat-horizontal-stepper-content')).forEach((elem: any) => {
        elem.scroll({ behavior: 'smooth', top: 0 });
      });
    }

    if (event) {
      this.stepperNative.nativeElement.setAttribute('currentIndex', event.selectedIndex);
      if (event.selectedIndex > event.previouslySelectedIndex && this.stepper[ConstantCommon.LAST_ACTIVE_STEP] < event.selectedIndex) {
        this.stepper[ConstantCommon.LAST_ACTIVE_STEP] = event.selectedIndex;
      }
    }
  }

  onClickIcon(event, index) {
    if (this.custMode) {
      if (index >= 0) {
        if (index === (this.options.namesofSteps.length - 1)) {
          // Preview Step
          this.custIconOptions.fieldNameDesc = this.id + this.common.translate('preview_key');
        } else if (index === (this.options.namesofSteps.length - 2)) {
          // Terms and conditions step
          this.custIconOptions.fieldNameDesc = this.id + this.common.translate('terms_and_conditions_key');
        } else {
          this.custIconOptions.fieldNameDesc = this.options.namesofSteps[index];
        }
        this.custIconOptions.fieldNameId = this.options.namesofSteps[index];
      } else {
        this.custIconOptions.fieldNameDesc = this.options.namesofSteps[this.stepper.selectedIndex];
        this.custIconOptions.fieldNameId = this.options.namesofSteps[this.stepper.selectedIndex];
      }
      this.custIconOptions.availableCustomization = {
        IS_VISIBLE: true,
        IS_READONLY: true
      };
      this.iconCust.openCustomization(this.custIconOptions);
      // $('#stepper_cust_icon').click();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.dynScreenDisplayEmitEventSubscription) {
      this.dynScreenDisplayEmitEventSubscription.unsubscribe();
    }
  }

  validateStepper() {
    this.stepperLength = this.formGroupArray.length;
    if (this.options.namesofSteps && this.options.namesofSteps.length > 0) {
      for (const eachStepName of this.options.namesofSteps) {
        const stepValidations = this.commonProv.getElementValidations(eachStepName);
        const stepNumber = this.options.namesofSteps.indexOf(eachStepName);
        const stepControls = Object.keys(this.formGroupArray[stepNumber].controls);
        if (stepValidations.IS_VISIBLE === 0 && !this.custMode) {
          if (stepNumber !== -1) {
            this.showSteps['step' + (stepNumber + 1)] = false;
            this.updateChildrenValidity(stepControls, { isVisible: false });
          }
        } else {
          if (stepValidations.IS_READONLY === 1) {
            this.updateChildrenValidity(stepControls, { isReadOnly: true });
          } else {
            this.updateChildrenValidity(stepControls, { isReadOnly: false });
          }
        }
      }

      const previewValidations = this.commonProv.getElementValidations(this.previewStepName);
      const termsValidations = this.commonProv.getElementValidations(this.termsStepName);
      if (previewValidations.IS_VISIBLE === 0) {
        this.showPreview = false;
      } else {
        this.showPreview = true;
      }
      const termsAndConditionStepControls = Object.keys(this.formGroupArray[this.stepperLength - 2].controls);
      const isTermsVisible = termsValidations.IS_VISIBLE === 1 ? true : false;
      const isTermsReadOnly = termsValidations.IS_READONLY === 1 ? true : false;
      if (isTermsVisible) {
        this.showTerms = true;
      } else {
        this.showTerms = false;
      }
      this.updateChildrenValidity(termsAndConditionStepControls, { isVisible: isTermsVisible, isReadOnly: isTermsReadOnly });
    }

    this.dynScreenDisplayEmitEventSubscription = this.commonProv.dynScreenDisplayEmitEvent.subscribe(result => {
      if (result && result.id) {
        const stepNumber = this.options.namesofSteps.indexOf(result.id);
        let stepControlsNative = [];
        let stepControls = [];
        if (stepNumber !== -1) {
          if (this.showSteps['step' + (stepNumber + 1)]) {
            stepControls = Object.keys(this.formGroupArray[stepNumber].controls);
            stepControlsNative = Object.keys(this.common.returnStepControlsAsAbstractControl(this.options.group, this.stepper, stepNumber).mapOfControls);
          }
          stepControls = [...new Set([...stepControls, ...stepControlsNative])];
          const isVisible = result.screenDispVO.IS_VISIBLE === 1 ? true : false;
          const isReadOnly = result.screenDispVO.IS_READONLY === 1 ? true : false;
          this.showSteps['step' + (stepNumber + 1)] = isVisible;
          this.updateChildrenValidity(stepControls,
            {
              isVisible,
              isReadOnly
            });
        }
      }
    });
  }

  updateChildrenValidity(stepControls, actionType: { isVisible?: boolean, isReadOnly?: boolean, parentNode?: any }) {
    super.updateChildrenValidity(stepControls, { isVisible: actionType.isVisible, isReadOnly: actionType.isReadOnly, parentNode: this });
    this.stepper._stateChanged();
  }
}
