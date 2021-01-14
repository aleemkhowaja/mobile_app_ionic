import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { IOptionsPsComplexDraftsReportsLoader } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-drafts-reports-loader/ps-complex-drafts-reports-loader.component.interfaces';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { PsDraftsReportComponent } from 'src/app/commonBussinessSRC/psComponents/ps-drafts-report/ps-drafts-report.component';
import { IOptionsPsDraftsReportComponent } from 'src/app/commonBussinessSRC/psComponents/ps-drafts-report/ps-drafts-report.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { PsButtonNextComponent } from '../../psComponents/ps-base/ps-base-action/ps-action-button/ps-button-next/ps-button-next.component';
import { PsButtonPreviousComponent } from '../../psComponents/ps-base/ps-base-action/ps-action-button/ps-button-previous/ps-button-previous.component';
import { PsButtonSubmitComponent } from '../../psComponents/ps-base/ps-base-action/ps-action-button/ps-button-submit/ps-button-submit.component';
import { Events } from '../../psServices/Event/event.service';
import { ConstantCommon } from '../../psServices/models/common-constant';
import { CommonUtils } from '../../psServices/models/common-utils';
import { IOptionsPsButtonApprove, IOptionsPsButtonNext, IOptionsPsButtonPrevious, IOptionsPsButtonReject, IOptionsPsButtonSave, IOptionsPsButtonSubmit, IOptionsPsContainerFlip, IOptionsPsContainerStepperComponent, IOptionsTemplateStepper } from '../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';
import { IOptionsPsActionIcon } from './../../psServices/models/ps-common-interface';



@Component({
  selector: 'ps-template-stepper',
  templateUrl: './ps-template-stepper.template.html',
  styleUrls: ['./ps-template-stepper.template.scss'],
})
export class PsTemplateStepper extends PsTemplateBasePage implements OnInit, OnDestroy {


  @Input() options: IOptionsTemplateStepper;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onNextPreviousStepper: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('next', { static: false }) next: PsButtonNextComponent;
  @ViewChild('previous', { static: false }) previous: PsButtonPreviousComponent;
  @ViewChild('submit', { static: false }) submit: PsButtonSubmitComponent;
  @ViewChild('report', { static: false }) report: PsDraftsReportComponent;

  public stepper: MatStepper;
  public isCheckerAndReportSelected = false;

  public isMakerAndReportSelected = false;
  public isDraft = false;
  stepperOptions: IOptionsPsContainerStepperComponent = {};

  psContainerFlip: IOptionsPsContainerFlip = {
    hideVisibleArea: false,
    isFlipped: false
  };

  previousIconOptions: IOptionsPsActionIcon = {
    iconName: 'arrow-round-back'
  };
  nextIconOptions: IOptionsPsActionIcon = {
    iconName: 'arrow-round-forward',

  };
  previousOptions: IOptionsPsButtonPrevious = {
    labelKey: 'previous_key',
    group: this.options.group
  };

  nextOptions: IOptionsPsButtonNext = {
    labelKey: 'next_key',
    // stepper: this.stepper, // Commented by Richie for TP# 1105083: stepper declared before initialized
    group: this.options.group
  };


  submitOptions: IOptionsPsButtonSubmit = {
    labelKey: 'submit_key',
    group: this.options.group
  };

  saveAsDraftOptions: IOptionsPsButtonSave = {
    labelKey: 'save_key',
    group: this.options.group
  };
  approveOptions: IOptionsPsButtonApprove = {
    labelKey: 'approve_key',
    group: this.options.group
  };
  rejectOptions: IOptionsPsButtonReject = {
    labelKey: 'reject_key',
    group: this.options.group
  };
  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      group: this.options.group,
      fcName: 'checkboxConfirm',
      labelKey: 'agree_terms_and_conditions_key'
    },
    htmlViewerOptions: {
    }
  };

  draftLoaderOptions: IOptionsPsComplexDraftsReportsLoader = {

  };
  readOnlyMode = false;


  public showReport = false;
  public showReportFlag = false;
  headerIconOptions: IOptionsPsActionIcon = {
    iconName: 'bookmark'
  };

  draftsOptions: IOptionsPsDraftsReportComponent = {

  };
  eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable
  constructor(private ref: ChangeDetectorRef, public events: Events) {
    super();
    this.eventSub = events.subscribe('draft:navigation', (requestObject) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.commonProv.copyObject(this.options.requestObject, requestObject, true, false);
      if (this.options.requestObject) {
        this.saveAsDraftOptions.dataSaveId = requestObject.dataSaveId;
      }
      this.checkMakerChecker();
      this.isDraft = false;
      if (this.options.requestObject != {}) {
        if (this.options.requestObject.status === 'DR') {
          this.isDraft = true;
        }
      }
    });
  }
  stepperInit(stepper) {
    this.stepper = stepper;
    this.nextOptions.stepper = this.stepper;
    this.submitOptions.stepper = this.stepper;
    this.saveAsDraftOptions.stepper = this.stepper;
    this.previousOptions.stepper = this.stepper;
    this.rejectOptions.stepper = this.stepper;
    this.approveOptions.stepper = this.stepper;
    this.draftsOptions.stepper = this.stepper;
    if (this.options.requestObject && this.options.requestObject[ConstantCommon.LAST_ACTIVE_STEP]) {
      this.stepper[ConstantCommon.LAST_ACTIVE_STEP] = this.options.requestObject[ConstantCommon.LAST_ACTIVE_STEP];
    }
  }

  ngOnInit() {
    const readOnly = this.navService.getParamKey('readOnlypage');
    if (readOnly != undefined) {
      this.readOnlyMode = readOnly;
    }
    this.options.showReport = this.options.showReport != undefined ? this.options.showReport : true;

    const screenVO = this.navService.getParamKey('ScreenVO');
    if (screenVO != undefined) {
      this.commonProv.copyObject(this.options.requestObject, screenVO, true, false);
      this.checkMakerChecker();
    }
    this.stepperOptions = this.options ? this.options : this.stepperOptions;
    this.commonProv.copyObject(this.submitOptions, this.options.submitOptions, false, true);
    this.commonProv.copyObject(this.saveAsDraftOptions, this.options.submitOptions, false, true);
    this.commonProv.copyObject(this.approveOptions, this.options.submitOptions, false, true);
    this.commonProv.copyObject(this.rejectOptions, this.options.submitOptions, false, true);
    this.commonProv.copyObject(this.nextOptions, this.options, false, true);
    this.commonProv.copyObject(this.draftsOptions, this.options, false, true);

    this.termsAndConditionsOptions.checkBoxOptions.group = this.options.group;
    this.termsAndConditionsOptions.htmlViewerOptions.fileName = this.commonProv.activeOperId;

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.termsAndConditionsOptions.checkBoxOptions.fcName], 1);
    if (!this.options.requestObject) {
      this.options.requestObject = {};
    }
    if (this.options.requestObject != {}) {
      if (this.options.requestObject.status === 'DR') {
        this.isDraft = true;
      }
    }
    this.saveAsDraftOptions.dataSaveId = this.options.requestObject.dataSaveId;
    this.commonProv.setFormData(this.options.group, this.options.requestObject);
  }

  checkMakerChecker() {
    if (PsCommonBusinessSettings.isAgent || PsCommonBusinessSettings.isCorporate) {
      if (PsCommonBusinessSettings.isChecker) {
        this.isCheckerAndReportSelected = true;
      }
      if (PsCommonBusinessSettings.isMaker) {
        this.isMakerAndReportSelected = true;
      }
    }
  }

  onFooterClick() {
    if (document.getElementsByTagName('ion-modal')[0] !== undefined) {
      document.getElementsByTagName('ion-modal')[0].dismiss();
    }
  }

  onNextAndPrevious(stepper) {
    this.onNextPreviousStepper.emit(stepper);
  }

  triggerNext(event) {
    // console.warn('triggerNext');
    if (this.next) {
      this.next.onNextClicked(event);
    }
  }

  triggerPrevious(event) {
    // console.warn('triggerPrevious');
    if (this.previous) {
      this.previous.onBackClicked(event);
    }
  }

  loadDrafts(report, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.checkDraftPage();

    if (report) { // report was chosen
      this.saveAsDraftOptions.dataSaveId = this.options.requestObject.dataSaveId;
      this.saveAsDraftOptions.labelKey = 'update_draft_key';
      if (PsCommonBusinessSettings.isAgent || PsCommonBusinessSettings.isCorporate) {
        if (PsCommonBusinessSettings.isChecker) {
          this.isCheckerAndReportSelected = true;
        }
        if (PsCommonBusinessSettings.isMaker) {
          this.isMakerAndReportSelected = true;
        }
      }
    }
    // this.ref.detectChanges();
  }

  checkDraftPage(forceClose?: boolean) {
    let reportStatus = !this.showReport;
    if (forceClose) {
      reportStatus = false;
    }
    this.showReportFlag = reportStatus;
    let animationDuration;
    if (!reportStatus) {
      if (this.report) {
        animationDuration = parseFloat(CommonUtils.getElementStyle(this.report.hostElement.nativeElement, 'animationDuration')) * 1000;
        setTimeout(() => {
          this.showReport = reportStatus;
        }, animationDuration);
        this.saveAsDraftOptions.dataSaveId = null;
        this.saveAsDraftOptions.labelKey = 'save_key';
      }
    } else {
      this.showReport = reportStatus;
    }
    if (this.options.requestObject != {}) {
      if (this.options.requestObject.actionType === 'save') {
        this.isDraft = true;
      }
    }
  }

  ngOnDestroy() {
    // Commented/Added by Richie #TP 1105083
    // this.events.unsubscribe('draft:navigation');
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
    // End Richie
  }

  refreshToDoList() {
    this.events.publish('draft:refresh');
  }
}
