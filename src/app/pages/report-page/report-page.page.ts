import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsTemplateReport, IPageCommon } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsCommonSettings } from './../../commonSRC/psServices/models/ps-common.settings';


@Component({
  selector: 'report-page',
  templateUrl: './report-page.page.html',
  styleUrls: ['./report-page.page.scss'],
})
export class ReportPagePage extends OmniBasePage implements OnInit, OnDestroy {

  reportTemplateOptions: IOptionsPsTemplateReport = {
    reportParametersList: {
      iconPath: PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE
    },
    showReport: true
  };
  public pagesNavigationInfoSubscription: Subscription;
  parameterListCache = 0;
  constructor(private logger: LoggerService, private common: PsCommonService, private navService: PsNavigatorService, public modalController: ModalController) {
    super();
    this.parameterListCache = 0;
    /* Fixed by Hisham.Omar TP#986400 start 
     * Move the function content to the constructor as the constructor parameters 
     * will be undefined when accessing them using 'this' keyword
     * Get the classList from offsetParent property as the class is added on the 'td' tag not the 'a' tag
     * Remove the function 'checkHyperlinkClickEvent' from the code as it is no longer needed
     * Remove the document function 'removeEventListener' from ngOnDestroy
    **/
    document.addEventListener('click', () => {
      if (event.target['offsetParent'].classList.contains(ConstantCommon.REPORT_CLICK_EVENT_REFERENCE)) {
        event.preventDefault();
        const hyperLinkTag = event.target['offsetParent'].querySelector('a');
        let parameterList = hyperLinkTag.href as string;
        if (this.parameterListCache && this.parameterListCache > 0) {
          return;
        }
        this.parameterListCache++;
        if (parameterList.indexOf('operId') > -1) {
          parameterList = parameterList.substring(parameterList.indexOf('operId'), parameterList.length - 1);
          let parametersListArray = parameterList.split('&');
          const operationIdObject = parametersListArray[0];
          const reportNameObject = parametersListArray[1];
          const operationIdObjectArray = operationIdObject.split('=');
          const operationId = operationIdObjectArray[1];
          const parentOperId = PsCommonSettings.oper_ID;
          PsCommonSettings.oper_ID = +operationId;
          const reportNameObjectArray = reportNameObject.split('=');
          const reportName = reportNameObjectArray[1];
          parametersListArray = parametersListArray.length > 2 ? parametersListArray.slice(2) : [];
          let navigationExtras: NavigationExtras = {};

          const reportParametersList = {};

          if (parametersListArray && parametersListArray.length > 0) {
            for (const eachParameter of parametersListArray) {
              const parameter = eachParameter.split('=');
              reportParametersList[parameter[0]] = parameter[1];
            }
            navigationExtras = {
              queryParams: reportParametersList
            };
            navigationExtras.queryParams['parentOperId'] = parentOperId;
          }
          let reportTitle = String(reportName).split('-').join('_');
          reportTitle += '_key';
          PsCommonSettings.pageName = reportTitle;
          const page: IPageCommon = {
            operID: +operationId,
            title: reportTitle
          };
          common.activePage.next(page);
          if (navigationExtras) {
            navService.navigateForward(reportName, navigationExtras);
          } else {
            navService.navigateForward(reportName);
          }
        } else {
          parameterList = parameterList.substring(parameterList.indexOf('className'), parameterList.length - 1);
          let parametersListArray = parameterList.split('&');
          const classNameObject = parametersListArray[0];
          const methodNameObject = parametersListArray[1];
          const classNameObjectArray = classNameObject.split('=');
          const className = classNameObjectArray[1];
          const methodNameObjectArray = methodNameObject.split('=');
          const methodName = methodNameObjectArray[1];
          parametersListArray = parametersListArray.length > 2 ? parametersListArray.slice(2) : [];
          const reportParametersList = {};
          if (parametersListArray && parametersListArray.length > 0) {
            for (const eachParameter of parametersListArray) {
              const parameter = eachParameter.split('=');
              reportParametersList[parameter[0]] = parameter[1];
            }
          }
          // For now as the securityCode should be returned as securityCode1
          // When fixed then we can pass the reportParameterList directly to the method.
          const requestParameters = {
            applicationName: reportParametersList['applicationName'],
            progReference: reportParametersList['progReference'],
            securityCode1: reportParametersList['securityCode'],
            transactionNumberDetails: reportParametersList['transactionNumber']
          };
          common.getAttachmentsAndOrDownload(requestParameters, true);
        }
      }
    }, false);
    /* Fixed by Hisham.Omar TP#986400 end **/
  }

  ngOnInit() {
    super.init();
    this.reportTemplateOptions.operId = PsCommonSettings.oper_ID;
    this.prepareReportParams();
    this.handleFilteredReports();
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.reportRefrshFlag.next(true);
  }

  prepareReportParams() {
    const result = this.navService.getAllParams() ? this.navService.getAllParams() : null;
    if (result) {
      const resultData = result as Map<string, string>;
      // oper id for the new transaction associated by submit
      if (resultData['operId']) {
        this.reportTemplateOptions.operId = resultData['operId'];
      }

      if (resultData['dynamicOperId']) {
        this.reportTemplateOptions.dynamicOperId = resultData['dynamicOperId'];
        this.reportTemplateOptions.submitOptions = {
          group: new FormGroup({}),
          submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
          extraParams: resultData
        };
      }
      this.reportTemplateOptions.reportParametersList = resultData;
      if (resultData['parentOperId']) {
        this.reportTemplateOptions.parentOperId = resultData['parentOperId'];
      }
    }
  }
  handleFilteredReports() {
    if (PsCommonBusinessSettings.filteredReport.includes(this.reportTemplateOptions.operId)) {
      this.reportTemplateOptions.showReport = false;
    } else {
      this.reportTemplateOptions.showReport = true;
    }
  }
  // refreshReport() {
  //   this.showReport = false;
  //   this.viewWillLeave();
  //   setTimeout(() => {
  //     super.viewDidEnter();
  //     this.init();
  //   }, 500);
  // }

  ngOnDestroy() {
    if (this.pagesNavigationInfoSubscription) {
      this.pagesNavigationInfoSubscription.unsubscribe();
    }
  }
}
