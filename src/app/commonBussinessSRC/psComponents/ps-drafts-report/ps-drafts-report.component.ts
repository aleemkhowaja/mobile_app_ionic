import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionIconExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniPullService } from '../../psServices/omni-common/omni-pull.service';
import { OmniPushService } from '../../psServices/omni-common/omni-push.service';
import { IOptionsPsDraftsReportComponent } from './ps-drafts-report.component.interfaces';



@Component({
  selector: 'ps-drafts-report',
  templateUrl: './ps-drafts-report.component.html',
  styleUrls: ['./ps-drafts-report.component.scss'],
})
export class PsDraftsReportComponent extends PsBaseFieldComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsDraftsReportComponent;

  reportArray: Array<any>;
  totalProgress;
  mandatoryControls: string[];

  filterCriteria: [];
  filterValue: [];
  deleteReportIcon: IOptionsPsActionIconExposed = {
    iconName: 'trash' // deleteReportIcon
  };
  filterByOper = true;


  availableTypes: any = {

  };
  refreshIconOptions: IOptionsPsActionIconExposed = {
    iconName: 'to-do-refresh-icon'
  };
  private eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable
  constructor(public commonProv: PsCommonService, private navService: PsNavigatorService, loggerP: LoggerService, public hostElement: ElementRef, private omniPull: OmniPullService, private omniPush: OmniPushService, public events: Events) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.common.presentLoading();
    if (!this.options) {
      this.filterByOper = false;
    }
    // modified by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable with one argument
    this.eventSub = this.events.subscribe('draft:refresh', () => {
      this.refreshReport();
    });
    this.loadDrafts();
  }

  loadDrafts() {
    this.totalProgress = 0;
    this.mandatoryControls = [];
    if (this.options && this.options.group) {
      Object.keys(this.options.group.controls).forEach(key => {
        const keyValidations = this.commonProv.getElementValidations(key);
        if (keyValidations.IS_MANDATORY === 1 && key !== 'formData') {
          this.mandatoryControls.push(key);
          this.totalProgress++;
        }
      });
    }
    this.refreshReport();
  }

  async refreshReport() {
    this.common.presentLoading();
    this.reportArray = [];
    this.availableTypes = {};
    await this.loadData('P');
    await this.loadData('DR');
    if (this.reportArray && this.reportArray.length === 0) {
      CommonUtils.presentInfoAlert(this.commonProv.translate('no_data_found_key'));
      this.onPsChange.emit(null);
    }
  }

  async loadData(statusParam: string) {
    this.common.presentLoading();
    const result = await this.omniPull.returnSubmitDataList({ filterByOper: this.filterByOper, status: statusParam });
    const data = result.gridModel;
    this.common.dismissLoading();
    if (data.length > 0) {
      for (const report of data) {
        if (this.filterByOper) {
          let myProgress = 0;
          Object.keys(report.submitFieldValueMap).forEach((attributeName) => {
            if (this.mandatoryControls.indexOf(attributeName) !== -1) {
              const controlValidations = this.commonProv.getElementValidations(attributeName);
              if (controlValidations.IS_MANDATORY === 1) {
                myProgress++;
              }
            }
          });
          report.progress = myProgress / this.totalProgress;
          report.percentage = parseInt((myProgress / this.totalProgress) * 100 + '');
        }
        report.requestObject = {};
        this.commonProv.copyObject(report.requestObject, report.submitFieldValueMap, true, false);
        if (statusParam === 'P') {
          report.operName = this.getPageByOperId(report.operId) !== undefined ? this.getPageByOperId(report.operId).OPER_NAME : '';
          this.availableTypes.T = true; this.availableTypes.TS = true; this.availableTypes.TP = true;
        }
        report.avatar = {
          value: report.status
        };
        report.pendingDeletion = false;
        this.availableTypes[statusParam] = true;
        this.reportArray.push(report);
      }
      this.common.dismissLoading();
    }
  }

  getPageByOperId(operId) {
    return this.common.getPageByOperId(operId);
  }

  selectReport(report, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.options && this.options.stepper) {
      this.options.stepper.selectedIndex = 0;
      this.options.stepper.steps.toArray()[0].select();
    }
    if (this.options == undefined) {
      const activePage = this.getPageByOperId(report.operId);
      report.requestObject.dataSaveId = report.dataSaveId;
      report.requestObject.status = report.status;
      if (PsCommonSettings.oper_ID == activePage.OPER_ID) {
        this.events.publish('draft:navigation', report.requestObject);
        this.common.dismissLoading();
      } else {
        this.navService.openPage({
          operID: activePage.OPER_ID, param:
          {
            ScreenVO: report.requestObject,
            //readOnlypage: activePage.MAKER_YN !== 'Y' && activePage.CHECKER_YN === 'Y'
          }
        });
      }
    } else {
      this.commonProv.copyObject(this.options.requestObject, report.requestObject, true, false);
      this.options.requestObject.dataSaveId = report.dataSaveId;
    }
    this.onPsChange.emit(report);
    if (this.options && this.options.requestObject && this.options.requestObject[ConstantCommon.LAST_ACTIVE_STEP]) {
      this.commonProv.navigateStepperToIndex(this.options.stepper, parseInt(this.options.requestObject[ConstantCommon.LAST_ACTIVE_STEP]), this.options.group, this.options.requestObject);
    }
  }


  deleteReport(report, event: Event, reportHtmlId) {
    event.preventDefault();
    event.stopPropagation();
    if (report && report.dataSaveId) {
      report.pendingDeletion = true;
      this.omniPush.deleteSubmitData({ dataSaveId: report.dataSaveId, actionType: 'saveDelete' }).then((result) => {
        const index = this.reportArray.findIndex(reportDetail => reportDetail.dataSaveId === report.dataSaveId);

        if (index >= 0) {
          document.getElementById(reportHtmlId).classList.remove('draftReportInAnimation');
          document.getElementById(reportHtmlId).classList.add('draftReportOutAnimation');
          const animationDuration = parseFloat(CommonUtils.getElementStyle(document.getElementById(reportHtmlId), 'animationDuration')) * 1000;
          setTimeout(() => {
            this.reportArray.splice(index, 1);
          }, animationDuration);
        }
        if (this.reportArray.length === 0) {
          this.onPsChange.emit(null);
        }
      }).catch((error) => {
        this.logger.error(error);
        report.pendingDeletion = false;
      });
      event.stopPropagation();
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    // modified by Richie #TP 1105083
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
