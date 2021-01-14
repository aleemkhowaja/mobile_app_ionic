import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { ConnectionStatus, PsNetworkService } from 'src/app/commonSRC/psServices/network/ps-network.service';
import { AuthMatrixViewer } from '../../../../../../commonBussinessSRC/psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.interface';
import { AuthenticationMatrixService } from '../../../../../../commonBussinessSRC/psServices/authentication-matrix/authentication-matrix.service';
import { ConstantCommon } from '../../../../../psServices/models/common-constant';
import { IOptionsPsActionButton, IOptionsPsButtonSubmit } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';



@Component({
  selector: 'ps-button-submit',
  templateUrl: './ps-button-submit.component.html',
  styleUrls: ['./ps-button-submit.component.scss'],
})
export class PsButtonSubmitComponent extends PsActionButtonComponent implements OnInit {

  private firstNavigation = true;
  mainOptions: IOptionsPsButtonSubmit;
  submitOptions: IOptionsPsActionButton;
  private lockButton = false;
  @Input() options: IOptionsPsButtonSubmit;

  public actionType = 'Submit';
  constructor(public commonService: PsCommonService, private nav: PsNavigatorService,
    private omniAuthService: AuthenticationMatrixService, private psNetworkService: PsNetworkService, elRef?: ElementRef) {
    super(commonService, commonService.logger, elRef);
  }
  private responseIndex;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const element = document.getElementById(ConstantCommon.AUTH_MATRIX_VERIFY_BUTTON_ID);
      if (!element) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        this.options.group.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        this.callServer();
      }
    }
  }

  ngOnInit() {

    this.submitOptions = {
      labelKey: this.options.labelKey,
      type: 'submit',
      iconName: this.options.iconName ? this.options.iconName : 'paper-plane',
      iconPosition: 'start',
      psClass: this.options.psClass ? this.options.psClass : 'ps-button-submit',
      group: this.options.group
    };
    if (typeof this.options.allowCust !== undefined) {
      this.submitOptions.allowCust = this.options.allowCust;
    }
    this.actionType = this.options.actionType ? this.options.actionType : 'Submit';
    this.commonService.fireAuth.subscribe(res => {
      if (res === true) {
        this.callServer();
      }
    });
  }

  async callServer() {
    // Added by Richie for #TP 997475: opening omni cust war
    if (PsCommonSettings.custMode) {
      CommonCustUtils.submitBtnCallServer();
      return;
    }
    // End Richie

    // check status because it can be disable instead on valid on approve request
    if (!(this.options.group && this.options.group.status != 'INVALID') && (!this.options.isSave)) {
      let numberOfInvalidControls = 0;
      const listOfDOMReferences: Array<Element> = [];
      const listOfControls: Array<AbstractControl> = [];
      Object.keys(this.options.group.controls).forEach(key => {
        if (!this.options.group.get(key).getError(ConstantCommon.CUSTOM_ERROR_KEY)) {
          this.common.validateFormController(this.options.group.controls[key]);
        }
        if (this.options.group.get(key).invalid) {
          const element = document.querySelector('[' + ConstantCommon.selectorCriteria + '="' + key + '"]');
          if (element) {
            numberOfInvalidControls++;
            listOfDOMReferences.push(element);
            listOfControls.push(this.options.group.get(key));
          }
        }
      });
      if (numberOfInvalidControls > 0) {
        this.common.events.publish('triggerValidation', { fromSubmit: true, group: this.options.group, numberOfInvalidControls, listOfDOMReferences, listOfControls });
        return;
      }
    }

    if (this.lockButton) {
      return;
    }
    const connectionStatus: ConnectionStatus = await this.psNetworkService.handleNetworkNotifications();
    if (connectionStatus === 0) {
      return;
    }
    this.lockButton = true;
    this.preCallChecking();
  }

  preCallChecking(isSave?) {
    if (this.options.preCallFunction && this.options.preCallFunction.executionClass) {
      this.preCallFunctionCall().then((preCallResult) => {
        this.checkAuthenticationMatrix(preCallResult);
      }).catch((error) => {
        this.resetLockButton();
      });
    } else {
      this.checkAuthenticationMatrix();
    }

  }

  checkAuthenticationMatrix(preCallResult?: any) {
    if (this.options.isSave) {
      this.prepareHTTPRequest(preCallResult);
    } else {
      this.omniAuthService.authenticationMatrixProcess(AuthMatrixViewer.MODAL, this.options.group).then(result => {
        if (result && result.success) {
          this.prepareHTTPRequest(preCallResult);
          setTimeout(() => {
            this.resetLockButton();
          }, PsCommonSettings.requestTimeOut);
        }
      }).catch((error) => {
        this.resetLockButton();
      });
    }
  }

  prepareHTTPRequest(paramI?) {
    const url = this.screenDispElt && this.screenDispElt.SERVICE_URL ? this.screenDispElt.SERVICE_URL : this.options.submitServiceUrl;
    // Heba.Hassan TP #988289 Deal Request - condition changed for the case of submit with empty form and all params added to extraparams. isNotNull used because isNotEmptyObject always return true
    let param = CommonUtils.isNotEmptyObject(this.options.group.controls.formData) ? { ...this.options.group.controls.formData.value } : {};
    if (url && this.options.group && (CommonUtils.isNotEmptyObject(param) || this.options.extraParams)) {

      delete param.actionType; // gilbertandary // remove any actionType that is set as auto bind

      if (CommonUtils.isNotEmptyObject(this.options.extraParams)) {
        param = { ...param, ...this.options.extraParams };
      }
      if (window.navigationHandler && CommonUtils.isNotEmptyObject(window.navigationHandler.commonParam)) {
        param = { ...param, ...window.navigationHandler.commonParam };
      }
      if (window.navigationHandler && CommonUtils.isNotEmptyArray(window.navigationHandler.routesParam) && window.navigationHandler.currentPage >= 0) {
        const tempParam = window.navigationHandler.routesParam[window.navigationHandler.currentPage];
        param = { ...param, ...tempParam };
      }

      if (this.options.appendPreCallResult && paramI) {
        param = { ...param, ...paramI };
      }

      if (this.options.stepper) {
        param[ConstantCommon.LAST_ACTIVE_STEP] = this.options.stepper[ConstantCommon.LAST_ACTIVE_STEP]
      }

      if (PsCommonBusinessSettings.commonParamServices.includes(url)) {
        param = {
          ...param,
          commonParametersList: param
        };
      }
      if (!this.options.isSave) {
        param = {
          ...param,
          actionType: param.actionType ? param.actionType : this.actionType
        };
      }
      this.logger.warn(param);
      if (CommonUtils.isNotEmptyObject(param)) {
        this.sendHTTPRequest(url, param);
      }
    } else {
      this.resetLockButton();
    }
  }
  resetLockButton() {
    this.commonService.dismissLoading();
    this.lockButton = false;
  }

  sendHTTPRequest(url, param) {
    this.commonService.presentLoading();
    this.commonService.http.commonRequestAjax(url, param).then((result) => {
      if (result.success) {
        const response = result.data;

        if (window.navigationHandler) {
          const currentPage = window.navigationHandler.currentPage + 1;
          if (currentPage > window.navigationHandler.pageData.length) {
            window.navigationHandler = undefined;
          } else {
            this.nav.autoNavigate(window.navigationHandler);
          }
        }
        this.commonService.dismissLoading();
        // making pop before call postCallFunction to avoid any navigation happen on the function
        if (!window.navigationHandler) {
          this.nav.pop();
        }
        this.postCallFunctionCall(response).then(() => {
          // the below 2 lines should be moved to this body. yet we need to check all postCallFunctions in system
        });
        this.onClick.emit(response);
        this.lockButton = false;
      }
    }).catch((error) => {
      if (this.options.failureCallFunction) {
        this.failureCallFunctionCall().then(() => {
          // conditions to be handeled in case of failure callbacks
        });
      }
      this.commonService.dismissLoading();
      this.lockButton = false;
      this.nav.pop();
    });
  }

}
