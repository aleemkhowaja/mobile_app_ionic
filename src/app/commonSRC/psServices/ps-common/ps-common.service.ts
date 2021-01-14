import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Meta } from '@angular/platform-browser';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ActionSheetController, AlertController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { ActionSheetOptions, AlertButton } from '@ionic/core';
import { saveAs } from 'file-saver';
import { Deploy } from 'plugins/cordova-plugin-ionic/dist/ngx/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOmniCommonResponse, ISmartFieldCO, ISmartFieldRequest, ISmartFieldResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { ILoginResponse, IOperDef, IOperVO } from 'src/app/pages/omni-login/omni-login.interfaces';
import ubid from 'ubid';
import { HybridKeyService } from '../../../commonSRC/psServices/hybridkey/hybridkey.service';
import { PsCurrencyPipe } from '../../psPipes/ps-currency/ps-currency.pipe';
import { PsFileSizePipe } from '../../psPipes/ps-file-size/ps-file-size.pipe';
import { PsTemplateAlertController } from '../../psTemplates/ps-template-alert-controller/ps-template-alert-controller.template';
import { IOptionsPsComplexAlertController } from '../../psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { Events } from '../Event/event.service';
import { HttpService } from '../http/http.service';
import { LanguageService } from '../language/language.service';
import { LoggerService } from '../logger/logger.service';
import { ConstantCommon } from '../models/common-constant';
import { CommonUtils } from '../models/common-utils';
import { ICommonServiceCustomizationResponse, IcustomPatternValidator, IdefaultValidators, IOmniCommonFileRequest, IOmniCommonFileResponse, IOptionsActionSheet, IOptionsBiometricAuth, IOptionsReturnStepControlsAsAbstractControl, IPageCommon, IPreloginPreperation, Isubject, IsysParamObj, PSAlertOptions } from '../models/ps-common-interface';
import { PsCommonSettings } from '../models/ps-common.settings';
import { PsNotificationsService } from '../notifications/ps-notifications.service';
import { SessionService } from '../session/session.service';
import { SocialSharingService } from '../socialSharing/socialSharing.service';

/* nabil feghali - OMNI common security  */

// import { PrayerType } from './../models/common-type';
@Injectable({
  providedIn: 'root'
})
export class PsCommonService {
  previewSubject: BehaviorSubject<Isubject> = new BehaviorSubject<Isubject>(null);
  resetFormSubject: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  operationIDSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  activePage: BehaviorSubject<IPageCommon> = new BehaviorSubject<IPageCommon>(null);
  presentProfile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dynScreenDisplayEmitEvent: BehaviorSubject<{ id: string, actionType: string, value: any, screenDispVO: IsysParamObj }> = new BehaviorSubject<{ id: string, actionType: string, value: any, screenDispVO: IsysParamObj }>(null);
  fireAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cancelClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  languageChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  screenDisplayParams: BehaviorSubject<Map<number, Map<string, any>>> = new BehaviorSubject<Map<number, Map<string, any>>>(new Map<number, Map<string, any>>());
  entityScreenDisplayParams: BehaviorSubject<Map<number, Map<string, any>>> = new BehaviorSubject<Map<number, Map<string, any>>>(new Map<number, Map<string, any>>());
  initialScreenDisplayParams: Map<number, Map<string, any>> = new Map<number, Map<string, any>>(new Map<number, Map<string, any>>());
  private defaultValidators: Map<FormGroup, Map<string, IdefaultValidators>> = new Map<FormGroup, Map<string, IdefaultValidators>>();
  private componentValidators: Map<FormGroup, Map<string, IdefaultValidators>> = new Map<FormGroup, Map<string, IdefaultValidators>>();
  public checkViewBS: BehaviorSubject<any> = new BehaviorSubject<boolean>(null);
  private _activeOperId: string;
  private alerts: Map<number, HTMLIonAlertElement> = new Map<number, HTMLIonAlertElement>();
  private psFileSize: PsFileSizePipe = new PsFileSizePipe(); // Added by Richie for #BUg 855984
  pryerDate: string;
  private retrievedOpers: any[] = [];
  private businessProfileMap: IOperVO[] = [];
  private _loginResponse: ILoginResponse;
  deductCharges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cifInfo: any;
  companyCurrencyLK: any;
  reportRefrshFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    public events: Events,
    public language: LanguageService,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public logger: LoggerService,
    public http: HttpService,
    public platform: Platform,
    public session: SessionService,
    public faio: FingerprintAIO,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public localNotifications: LocalNotifications,
    public notificationService: PsNotificationsService,
    public nativeAudio: NativeAudio,
    public inAppBrowser: InAppBrowser,
    public uniqueDeviceID: UniqueDeviceID,
    private deploy: Deploy,
    private appVersion: AppVersion,
    private meta: Meta,
    private hybridkey: HybridKeyService,
    private file: File,
    private fileOpener: FileOpener,
    private socialSharingService: SocialSharingService,
    private statusBar: StatusBar,
    private device: Device // Added by Richie for #BUG 1119658
  ) { }
  /**
   * function that returns the value of a field using its field name (serialized)
   * from a nested json object (not serialized)
   *
   * @param propName example myGridVO.FIRST_NAME
   * @param values example data = {myGridVO:{FIRST_NAME:'Richie'}}
   * @author Richard Zourob
   */
  public valFromNestedObj(propName: string, values: any): any {
    return CommonUtils.valFromNestedObj(propName, values);
  }

  /**
   * method to use the pipe from the ts
   * @param value
   * @param decPoints
   */
  public amountFormat(value: number | string, decPoints: number): string {
    const psCurrencyPipe: PsCurrencyPipe = new PsCurrencyPipe();
    return psCurrencyPipe.transform(String(value), decPoints);
  }

  public translate(key: string | Array<string>): any {
    return CommonUtils.translate(key);
  }


  getLoginResponse(): ILoginResponse {
    if (this._loginResponse) {
      return this._loginResponse;
    } else {
      return this._loginResponse = this.session.getValueOf(ConstantCommon.USERINFO);
    }
  }
  clearResponse() {
    this.session.remove(ConstantCommon.USERINFO);
    if (this._loginResponse) {
      this._loginResponse = null;
    }
  }
  /**
   * function that sets the value of a property in a nested json object based on the dot presentation of the property name
   *
   * @param propName
   * @param propValue
   * @param values
   * @author Richard Zourob
   */
  public setValInsideNestedObj(propName: string, propValue: any, values: any): any {
    return CommonUtils.setValInsideNestedObj(propName, propValue, values);
  }

  /**
   * function used to map the data variable in the .ts with the components in the html
   *
   * @param formGroup
   * @param data
   * @author Richard Zourob
   */
  public setFormData(formGroup: FormGroup, data: any) {
    formGroup.addControl('formData', new FormControl(data));
    formGroup.get('formData').disable();
  }

  /**
   * function used to copy the contents of a json object into another object
   * (overriding the existing properties and add any new ones) and keeping the reference of the old object.
   *
   * @param obj - Object to be returned
   * @param newObj - Object to copy from
   * @param override optional parameter to determine whether to overide all attributes with the new ones(resets the old object).
   * @author Richard Zourob
   */
  public copyObject(obj: Object, newObj: Object, override?: boolean, copyNewOnly?: boolean): any {
    return CommonUtils.copyObject(obj, newObj, override, copyNewOnly);
  }
  editMode(fg: FormGroup) {
    setTimeout(() => {
      this.previewSubject.next({
        preview: false,
        formGroup: fg
      });
    }, 0);
  }

  getMode() {
    return this.previewSubject.asObservable();
  }

  public checkView(): Observable<any> {
    return this.checkViewBS.asObservable();
  }

  resetForms(...fg: FormGroup[]) {
    setTimeout(() => {
      for (const form of fg) {
        this.resetFormSubject.next(form);
        form.reset();
      }
    }, 0);
  }

  getResetForms() {
    return this.resetFormSubject.asObservable();
  }
  get activeOperId() {
    return this._activeOperId;
  }
  set activeOperId(val: string) {
    this._activeOperId = val;
  }

  setOperationID(opID: number) {
    setTimeout(() => {
      if (opID && opID > -1 && Number(this.activeOperId) !== opID) {
        this.operationIDSubject.next(opID);
        // this.screenDisplayParams.getValue().clear();
        this.activeOperId = String(opID);
      }
    }, 0);
  }

  getOperationID() {
    return this.operationIDSubject.asObservable();
  }

  public setComponentValidators(defValidators: Map<string, IdefaultValidators>, group: FormGroup, clearValidators?: boolean) {
    if (clearValidators && this.componentValidators.get(group)) {
      this.componentValidators.get(group).clear();
    }
    this.componentValidators.set(group, defValidators);
  }

  public getComponentValidators(group: FormGroup): Map<string, IdefaultValidators> {
    return this.componentValidators.get(group);
  }
  public addComponentValidator(group: FormGroup, fieldName: string, validator: IdefaultValidators) {
    if (!this.componentValidators.get(group)) {
      this.componentValidators.set(group, new Map<string, IdefaultValidators>());
    }
    this.componentValidators.get(group).set(fieldName, validator);
  }

  public setDefaultValidators(defValidators: Map<string, IdefaultValidators>, group: FormGroup, clearValidators?: boolean) {
    if (clearValidators && this.defaultValidators.get(group)) {
      this.defaultValidators.get(group).clear();
    }
    this.defaultValidators.set(group, defValidators);
  }
  public getDefaultValidators(group: FormGroup): Map<string, IdefaultValidators> {
    return this.defaultValidators.get(group);
  }
  public addDefaultValidator(group: FormGroup, fieldName: string, validator: IdefaultValidators) {
    if (!this.defaultValidators.get(group)) {
      this.defaultValidators.set(group, new Map<string, IdefaultValidators>());
    }
    this.defaultValidators.get(group).set(fieldName, validator);
  }
  /**
   * function to replace the Validators.min() function for the case when the value inside the formgroup is set with "," seperator
   * then the parsing of this value will return wrong and thus the validation will be applied on wrong value.
   * for example: if the value = 3,000.00 and the min value is set as 200 then the validation will return error
   * since it considers the value as parseFloat('3,000.00')= 3 which is < min=200
   * #BUG 755638
   * @author RichardZourob
   */
  public custMinValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const v = control.value.toString();
        let val;
        if (v.indexOf(ConstantCommon.THOUSANDS_SEPARATOR) > -1) {
          val = parseFloat(v.replace(new RegExp(ConstantCommon.THOUSANDS_SEPARATOR, 'g'), ''));
        } else {
          val = parseFloat(control.value);
        }
        return (val < min) ? { min: { min, actual: val } } : null;
      }
      return null;
    };
  }

  public custRegExpValidator(regExp: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const validRegExp = new RegExp(regExp);
        const result = validRegExp.test(control.value);
        if (!result) {
          return { pattern: true };
        }
      }
      return null;
    };
  }
  /**
   * function to replace the Validators.min() function for the case when the value inside the formgroup is set with "," seperator
   * then the parsing of this value will return wrong and thus the validation will be applied on wrong value.
   * for example: if the value = 5,000.00 and the max value is set as 2000 then the validation will return error
   * since it considers the value as parseFloat('5,000.00')= 5 which is < max=2000 which is wrong
   * #BUG 755638
   * @author RichardZourob
   */
  public custMaxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const v = control.value.toString();
        let val;
        if (v.indexOf(ConstantCommon.THOUSANDS_SEPARATOR) > -1) {
          val = parseFloat(v.replace(new RegExp(ConstantCommon.THOUSANDS_SEPARATOR, 'g'), ''));
        } else {
          val = parseFloat(control.value);
        }
        return (val > max) ? { max: { max, actual: val } } : null;
      }
      return null;
    };
  }

  public custServiceMappingValidator(customizationRequest: any, group: FormGroup): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        this.commonServiceCallForCustomization(customizationRequest).then(result => {
          if (result.outputType === 'S') {
            return null;
          }
        })
          .catch(error => {
            if (error.data.outputType !== 'S') {
              this.logger.error('Error ! while calling common service for customization ', error);
              return { serverError: error.data.outputNotification, valid: false };
            }
          });
      }
      return null;
    };
  }

  /**
   * function to replace the Validators.email() function in order to set the valid email address the same as that in OADM in function OmniCommonMethods.validateEmail()
   * #BUG 789100
   * @author RichardZourob
   */
  public custEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const validEmailAddressRegEx = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        const result = validEmailAddressRegEx.test(control.value);

        if (!result) {
          return { email: true };
        }
      }
      return null;
    };
  }

  /**
   * method created for #BUG 855984 to use the pipe psFileSize from the ts to convert bytes to upper units (KB,MB,GB, etc..)
   * and returns it with the unit. (ex: 1.5 KB or 2.03 MB)
   * @param value: the byte value to be converted
   * @param precision: is the number of decimals to represent (default value is 2)
   * @author RichardZourob
   */
  public convertBytes(value: number, precision?: number): string {
    return this.psFileSize.transform(value, precision);
  }

  /**
   * function used to get all the predefined customization on a certain screen (operID) and use them inside the components to set the customization.
   *
   * @author Richard Zourob
   */
  retrieveOperCustomization(calledFrom?: string): Promise<any> {
    const params = {
      operId: PsCommonSettings.oper_ID,
      appId: PsCommonSettings.APP_ID,
      channelId: PsCommonSettings.CHNL_ID,
      compCode: PsCommonSettings.COMP_CODE,
      calledFrom: calledFrom ? calledFrom : 'V'
    };
    return this.http.commonRequestAjax(PsCommonSettings.serviceUrl.returnElmCustomization, params).catch((err) => this.logger.error(err));
  }

  applyPageCustomization(calledFrom?: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const allScreensCust = this.initialScreenDisplayParams;
      const screenOperCust = allScreensCust.get(PsCommonSettings.oper_ID);
      let localScreenOperCust: Map<string, any> = new Map<string, any>();
      if (screenOperCust) {
        localScreenOperCust = CommonUtils.clone(screenOperCust);
        this.setScreenDisplayParams(localScreenOperCust);
        resolve(true);
      } else {
        this.retrieveOperCustomization(calledFrom).then(res => {
          if (res && res.success) {
            if (res.data && res.data.gridModel && res.data.gridModel.length > 0) {
              const screenDisplayParams: Map<string, any> = new Map<string, any>();
              for (let i = 0; i < res.data.gridModel.length; i++) {
                const curData = res.data.gridModel[i][ConstantCommon.CUSTOMIZATION_BY_NAME];
                const screenDispVO: IsysParamObj = curData.screenDispVO;
                if (curData.labelKeyCode) {
                  screenDispVO.KEY_LABEL_CODE = curData.labelKeyCode;
                }
                if (curData.patternLabelCode) {
                  screenDispVO.PATTERN_ERROR_CODE = curData.patternLabelCode;
                }
                if (curData.placeholderLabelCode) {
                  screenDispVO.PLACEHOLDER_LABEL_CODE = curData.placeholderLabelCode;
                }
                screenDisplayParams.set(curData.fieldTechDetailsVO.ELEMENT_NAME, screenDispVO);
              }
              this.setInitialScreenDisplayParams(screenDisplayParams);
              localScreenOperCust = CommonUtils.clone(screenDisplayParams);
              this.setScreenDisplayParams(localScreenOperCust);
            }
            resolve(true);
          } else {
            this.logger.log('error while fetching the customization data:' + res.error);
            // show error msg;
            reject(false);
          }
        }).catch(err => {
          this.logger.error(err);
          this.logger.log('error in catch while fetching the customization data:' + err);
          reject(false);
          // show error msg
        });
      }
    });
  }

  setScreenDisplayParams(displayParams: Map<string, any>) {
    const screenOperCust = this.returnOperCustomization();
    const entityOperCust = this.returnEntityOperCustomization();
    const screenDispList = new Map<string, any>();
    const entityScreenDispList = new Map<string, any>();
    const operId = PsCommonSettings.oper_ID;
    const entityScreenOperCust = entityOperCust.get(operId) ? entityOperCust.get(operId) : new Map<string, any>();
    let callNext = false;
    displayParams.forEach((value, key) => {
      screenDispList.set(key, value);
      if (entityScreenOperCust && entityScreenOperCust.has(key)) {
        entityScreenDispList.set(key, value);
        if (!callNext) {
          callNext = true;
        }
      }
    });
    screenOperCust.set(operId, screenDispList);
    this.screenDisplayParams.next(screenOperCust);
    if (callNext) {
      entityOperCust.set(operId, entityScreenDispList);
      this.entityScreenDisplayParams.next(entityOperCust);
    }
  }

  setInitialScreenDisplayParams(displayParams: Map<string, any>) {
    const screenDispList = new Map<string, any>();
    const operId = PsCommonSettings.oper_ID;
    displayParams.forEach((value, key) => {
      screenDispList.set(key, value);
    });
    this.initialScreenDisplayParams.set(operId, screenDispList);
  }
  /**
   * function used to return the list of customized fields set on the current screen as observable.
   *
   * @author Richard Zourob
   */
  returnOperCustomizationObserv(): Observable<Map<number, Map<string, any>>> {
    return this.screenDisplayParams.asObservable();
  }
  /**
   * function used to return the list of customized fields set on the current screen.
   *
   * @author Richard Zourob
   */
  returnOperCustomization(): Map<number, Map<string, any>> {
    return this.screenDisplayParams.getValue();
  }

  public async presentAlert(title: string, subTitle: string, buttons: Array<string> | Array<AlertButton> = [], alertoption?: PSAlertOptions): Promise<number> {
    try {
      let alert: HTMLIonAlertElement;
      // TP # 833762 end
      if (buttons == null) {
        buttons = [
          {
            text: 'Close', role: 'cancel', cssClass: 'button-primary'
          }
        ];
      }
      alert = await this.alertCtrl.create({
        header: title,
        subHeader: (alertoption != null && alertoption != undefined) ? ((alertoption.refCode != null && alertoption.refCode != undefined) ? (this.translate('reference_number_key') + ' : ' + alertoption.refCode) : subTitle) : subTitle,
        buttons,
        cssClass: 'icon icon-success',
        backdropDismiss: false
      });

      const alertID = Date.now();
      this.alerts.set(alertID, alert);
      alert.present().then(() => {
      }).catch((err) => { this.logger.error(err); });
      return alertID;
    } catch (error) {
      this.logger.error(error);
      return -1;
    }
  }

  getElementValidations(elementName: string) {
    const sysParamAllDispList: Map<number, Map<string, any>> = this.returnOperCustomization();
    const sysParamScreenDispList = sysParamAllDispList.get(PsCommonSettings.oper_ID) ? sysParamAllDispList.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    let screenDispVO: IsysParamObj = {
      IS_MANDATORY: ConstantCommon.DEFAULT_MANDATORY,
      IS_READONLY: ConstantCommon.DEFAULT_READONLY,
      IS_VISIBLE: ConstantCommon.DEFAULT_VISIBLE
    };
    if (sysParamScreenDispList && sysParamScreenDispList.get(elementName)) {
      screenDispVO = sysParamScreenDispList.get(elementName);
      if (!screenDispVO.IS_MANDATORY && screenDispVO.IS_MANDATORY !== 0) {
        screenDispVO.IS_MANDATORY = 1;
      }
    }
    return screenDispVO;
  }

  /**
   * function that will check if there's a cust record for the list of field names/ids and sets a default cust properties
   * either from the sent object or the normal default cust object.
   * it also has the ability to override the cust properties in case we explicitly want to override them in any case.
   *
   * @param elementNames the list of field fcNames or component ids
   * @param paramScreenDispVO (optional) the customization object to be set inside the cust map of the current active oper. if not sent or sent null then set the normal default cust object (visible=1, readonly=0, mandatory=1)
   * @param override (optional) a flag (true/false) to determine if we want to override the current existing cust properties (if they already exist in the map)
   *
   * @author RichardZourob
   */
  putFieldCust(elementNames: string[], paramScreenDispVO?: IsysParamObj, override?: boolean) {
    const sysParamAllDispList: Map<number, Map<string, any>> = this.returnOperCustomization();
    const sysParamScreenDispList = sysParamAllDispList.get(PsCommonSettings.oper_ID) ? sysParamAllDispList.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    elementNames.forEach(elementName => {
      const screenDispVO = sysParamScreenDispList.get(elementName);
      if ((screenDispVO && override) || (typeof screenDispVO === undefined)) {
        const curScreenDispVO: IsysParamObj = {
          IS_MANDATORY: ConstantCommon.DEFAULT_MANDATORY,
          IS_READONLY: ConstantCommon.DEFAULT_READONLY,
          IS_VISIBLE: ConstantCommon.DEFAULT_VISIBLE
        };
        if (paramScreenDispVO) {
          this.copyObject(curScreenDispVO, paramScreenDispVO, true);
        }
        sysParamScreenDispList.set(elementName, curScreenDispVO);
      }
    });
  }

  /**
   * function that will apply a certain action on the set of customization on a list of fields.
   * it reads the previous set of customizations (if they exist) and change the required attribute based on the action type.
   * if no previous customization object exists then add a new object with the newly set attributes.
   *
   * @param actionType : is the action type to determine which property to set (readonly/mandatory/visibility/labelkey/etc..)
   * @param elementNames : is the list of field names to apply the action on them
   * @param value : the value to be set
   *
   * @author Richard Zourob
   */
  applyDynScreenDisplay(actionType: string, elementNames: string[], value: any, emitEvent?: boolean) {
    const sysParamAllDispList: Map<number, Map<string, any>> = this.returnOperCustomization();
    const sysParamScreenDispList = sysParamAllDispList.get(PsCommonSettings.oper_ID) ? sysParamAllDispList.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    const entityOperCust = this.returnEntityOperCustomization();
    const entityScreenOperCust = entityOperCust.get(PsCommonSettings.oper_ID) ? entityOperCust.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    let entityFieldExists = false;
    elementNames.forEach((element) => {
      let screenDispVO: IsysParamObj;
      if (sysParamScreenDispList && sysParamScreenDispList.get(element)) {
        screenDispVO = sysParamScreenDispList.get(element);
      } else {
        screenDispVO = {
          IS_MANDATORY: ConstantCommon.DEFAULT_MANDATORY,
          IS_READONLY: ConstantCommon.DEFAULT_READONLY,
          IS_VISIBLE: ConstantCommon.DEFAULT_VISIBLE
        };
      }
      if (actionType === ConstantCommon.ACTION_TYPE_MANDATORY) {
        screenDispVO.IS_MANDATORY = value;
        // if mandatory is set then it should be visible and not readonly
        if (value === 1) {
          screenDispVO.IS_VISIBLE = 1;
          screenDispVO.IS_READONLY = 0;
        }
      } else if (actionType === ConstantCommon.ACTION_TYPE_VISIBLE) {
        /**
         * in case the element is Mandatory and hide then the element should be visible
         * (mandatory is dominant comparing to the visibility).
         */
        if (value === 1 || value === true) {
          screenDispVO.IS_VISIBLE = 1;
          const myValidations = this.getInitialState(element);
          if (myValidations.IS_MANDATORY === 1) {
            screenDispVO.IS_MANDATORY = 1;
          }
        } else {
          screenDispVO.IS_MANDATORY = 0;
          screenDispVO.IS_VISIBLE = 0;
        }
      } else if (actionType === ConstantCommon.ACTION_TYPE_READONLY) {
        /**
         * in case the element is Mandatory and readonly then the element should be enabled
         * (mandatory is dominant comparing to the readonly).
         */
        if (value === 1 || value === true) {
          screenDispVO.IS_MANDATORY = 0;
          screenDispVO.IS_READONLY = 1;
        } else {
          screenDispVO.IS_READONLY = 0;
          const myValidations = this.getInitialState(element);
          if (myValidations.IS_MANDATORY === 1) {
            screenDispVO.IS_MANDATORY = 1;
          }
        }
      } else if (actionType === ConstantCommon.ACTION_TYPE_LABEL) {
        screenDispVO.KEY_LABEL_CODE = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_MAXLENGTH) {
        screenDispVO.MAX_LENGTH = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_MINLENGTH) {
        screenDispVO.MIN_LENGTH = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_MAXVALUE) {
        screenDispVO.MAX_VALUE = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_MINVALUE) {
        screenDispVO.MIN_VALUE = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_DEFAULT_VALUE) {
        screenDispVO.DEFAULT_VALUE = value;
      } else if (actionType === ConstantCommon.ACTION_TYPE_PATTERN) {
        // screenDispVO.PATTERN = value;
        if (typeof value === 'object' && value.expression) {
          screenDispVO.PATTERN = value.expression;
          if (value.errorMsg) {
            screenDispVO.PATTERN_ERROR_CODE = value.errorMsg;
          }
        } else {
          screenDispVO.PATTERN = value;
        }
      }
      sysParamScreenDispList.set(element, screenDispVO);
      if (entityScreenOperCust.has(element)) {
        entityScreenOperCust.set(element, screenDispVO);
        entityFieldExists = true;
      }
      if (emitEvent) {
        this.dynScreenDisplayEmitEvent.next({ id: element, actionType, value, screenDispVO });
      }
      this.screenDisplayParams.next(sysParamAllDispList);
    });
    sysParamAllDispList.set(PsCommonSettings.oper_ID, sysParamScreenDispList);
    if (entityFieldExists) {
      this.setEntityScreenOperCustomization(entityScreenOperCust);
    }
  }

  /**
   * function to check for biometric authentication on the device
   * -if face recognition is available (configured) then authenticate using it as 1st priority
   * -if no face recognition is detected and finger print is detected then authenticate using fingerprint.
   *
   * the function returns a promise with the below statuses:
   * -success: meaning that the biometric authentication was passed successfully (whether it was face of finger print)
   * -fail: meaning that the biometric authentication was failed.
   * -unavailable: meaning that there's no available biometrics registered on the device.
   *
   * @author RichardZourob
   * @param options : IOptionsBiometricAuth takes the options for this method (starting with the username)
   */
  public biometricAuth(options: IOptionsBiometricAuth): Promise<string> {
    return new Promise<string>((resolve) => {
      this.faio.isAvailable()
        .then(result => {
          // console.log(result);
          if (result === 'biometric' || result === 'finger' || result === 'face') {
            // Fingerprint or Face Auth is available
            // console.log('Fingerprint or Face Exist!');
            // Modified by Richie for #TP 1105083
            // const fingerprintOptions: FingerprintOptions = {
            //   clientId: options.username,
            //   clientSecret: 'pathSolutionsBankingApp', // Only necessary for Android
            //   disableBackup: true, // Only for Android(optional)
            //   localizedFallbackTitle: this.translate('use_password_key'), // Only for iOS
            //   localizedReason: this.translate('please_authenticate_key') // Only for iOS
            // };

            const fingerprintOptions: FingerprintOptions = {
              fallbackButtonTitle: this.translate('use_password_key'),
              disableBackup: true,
              description: this.translate('please_authenticate_key')
            };
            // End Richie
            this.faio.show(fingerprintOptions)
              .then((result: any) => {
                if (result === ConstantCommon.BIOMETRIC_AUTH_SUCCESS_ANDROID || result === ConstantCommon.BIOMETRIC_AUTH_SUCCESS) {
                  // Fingerprint/Face was successfully verified
                  // TODO: here must call a service to get a token by username (with lifetime of 3-5s) in order to send it to the login service for validation.
                  resolve(ConstantCommon.BIOMETRIC_AUTH_SUCCESS);
                } else {
                  // Fingerprint/Face was not successfully verified
                  this.logger.error('fingerprint Error');
                  resolve(ConstantCommon.BIOMETRIC_AUTH_FAIL);
                }
              })
              .catch((error: any) => {
                // Fingerprint/Face was not successfully verified
                this.logger.error('fingerprint Error in catch : ', error);
                resolve(ConstantCommon.BIOMETRIC_AUTH_ERROR);
              });
          } else {
            // Fingerprint or Face Auth is not available
            this.logger.error('Fingerprint/Face Auth is not available on this device!');
            resolve(ConstantCommon.BIOMETRIC_AUTH_UNAVAILABLE);
          }
        });
    });
  }

  public dismissAlert(id: number): boolean {
    const alert = this.alerts.get(id);
    if (alert) {
      alert.dismiss().catch((err) => { this.logger.error(err); });
      return true;
    }
    return false;
  }
  public dismissAllAlerts(alsoLastOne: boolean = false): boolean {
    try {
      if (this.alerts.size > 0) {
        const [id, lastAlert] = Array.from(this.alerts)[this.alerts.size - 1];
        if (alsoLastOne) {
          if (id && this.alerts.get(id)) {
            lastAlert.dismiss().catch((err) => { this.logger.error(err); });
          }
        }
        this.alerts.forEach((alert) => {
          if (lastAlert !== alert) {
            alert.dismiss().catch((err) => { this.logger.error(err); return false; });
          }
        });
        this.alerts = new Map<number, HTMLIonAlertElement>();
      }
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
  public dismissLastAlert(): boolean {
    const [id, alert] = Array.from(this.alerts)[this.alerts.size - 1];
    if (id && this.alerts.get(id)) {
      alert.dismiss().catch((err) => { this.logger.error(err); });
      return true;
    }
    return false;
  }

  public prepareValidation(overrideCust: boolean, required?: boolean, disabled?: boolean, minValue?: number, maxValue?: number, minLength?: number, maxLength?: number, pattern?: IcustomPatternValidator, validators?: ValidatorFn[], zeroNotAllowed?: boolean): IdefaultValidators {
    return {
      overrideCust,
      minValue,
      maxValue,
      minLength,
      maxLength,
      required: required === undefined ? null : required,
      pattern,
      disabled: disabled === undefined ? null : disabled,
      validators: validators ? validators : null,
      zeroNotAllowed: zeroNotAllowed ? 'zeroNotAllowed' : null

    };
  }

  public isWeb(): boolean {
    return !(this.isMobile());
  }

  public isMobile(): boolean {
    return this.platform.is('ios') || this.platform.is('android') || this.platform.is('mobile') || this.platform.is('mobileweb');
  }

  public randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
  public isNativeMobile(): boolean {
    return CommonUtils.isNativeMobile();
  }

  public removeEmpty(map) {
    Object.keys(map).forEach((key) => {
      if (CommonUtils.isEmptyOrNull(map[key])) {
        delete map[key];
      }
    });
  }

  previewMode(fg: FormGroup) {
    // in case two trigger at same time we put settimout to handle that
    setTimeout(() => {
      this.previewSubject.next({
        preview: true,
        formGroup: fg
      });
    }, 0);
  }


  /**
   * function created to return the udid of the device in case of mobile device or web browser
   * @author RichardZourob
   */
  returnUdid(): Promise<any> {
    if (this.isNativeMobile()) {
      // modified by Richie for #BUG 1119658
      if (CommonUtils.isAndroid() && this.device) {
        return new Promise<any>((resolve) => {
          resolve(this.device.uuid);
        });
      } else {
        return this.uniqueDeviceID.get();
      }
      // End Richie
    } else {
      // in case of browser
      return new Promise<any>((resolve, reject) => {
        let browserUid = localStorage.getItem('browserUid');
        // let browserUid = this.session.getValueOf('browserUid');
        if (browserUid) {
          resolve(browserUid);
        } else {
          ubid.get((error, signatureData) => {
            if (error) {
              this.logger.error(error);
              reject(error);
            }
            if (signatureData && signatureData.canvas && signatureData.canvas.signature) {
              browserUid = signatureData.canvas.signature;
            } else {
              browserUid = Math.floor(Math.random() * 999999999999999999) + 1 + '' + Math.floor(Math.random() * 999999999999999999) + 1 + '' + Math.floor(Math.random() * 999999999999999999) + 1;
            }
            // Fingerprint2.get( (components) => {
            //   console.log(components) // an array of components: {key: ..., value: ...}
            // });
            // Modified by Richie for #TP 1105083
            // return Fingerprint2.getPromise({}).then((components) => {
            //   const v = components.map((pair) => pair.value).join();
            //   const fingerPrint = Fingerprint2.x64hash128(v, 31);
            //   browserUid = 'web_' + fingerPrint + '_' + browserUid;
            //   localStorage.setItem('browserUid', browserUid);
            //   resolve(browserUid);
            // });
            FingerprintJS.load().then(async fp => {
              const result = await fp.get()
              const fingerPrint = result.visitorId
              browserUid = 'web_' + fingerPrint + '_' + browserUid;
              localStorage.setItem('browserUid', browserUid);
              resolve(browserUid);
            });
            // End Richie

          });
        }
      });
    }
  }

  /**
   * function to return the app version
   * @author RichardZourob
   */
  public returnAppVersion(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.isNativeMobile()) {
        this.appVersion.getVersionNumber().then(val => {
          const nativeVerParts = CommonUtils.returnVersionParts(val);
          const currentVerParts = CommonUtils.returnVersionParts(PsCommonSettings.appVersionNumber);
          // if the version of the package is greater than that in ps-config which means that the package was updated from store so consider that as the version of the app, but in case a live update was done then the app version will be that defined in ps-config.json
          if (nativeVerParts && nativeVerParts && (nativeVerParts.major > currentVerParts.major || nativeVerParts.minor > currentVerParts.minor || nativeVerParts.extension > currentVerParts.extension || nativeVerParts.store > currentVerParts.store || nativeVerParts.live > currentVerParts.live || nativeVerParts.assets > currentVerParts.assets)) {
            PsCommonSettings.appVersionNumber = val;
          }
          resolve(true);
        }).catch(err => {
          this.logger.error(err);
          reject(false);
        });
      } else {
        const viewport = this.meta.getTag('name=version');
        PsCommonSettings.appVersionNumber = viewport.content;
        resolve(true);
      }
    });
  }

  async checkAvailableUpdate(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (this.isNativeMobile()) {
        // get latest version (for now will read it from commonsettings)
        const latestVer = PsCommonSettings.latestAppVerNb; // major.minor.store.live.assets
        const res = await this.returnAppVersion();
        if (res) {
          // means we have successfully retrieved the version
          const splitVer = PsCommonSettings.appVersionNumber.split('.');
          if (splitVer.length === 5) {
            // get the version splits
            const major = Number(splitVer[0]);
            const minor = Number(splitVer[1]);
            const store = Number(splitVer[2]);
            const live = Number(splitVer[3]);
            const assets = Number(splitVer[4]);

            const latestSplitVer = PsCommonSettings.latestAppVerNb.split('.');
            if (latestSplitVer.length === 5) {
              // get the latest version splits
              const latestMajor = Number(latestSplitVer[0]);
              const latestMinor = Number(latestSplitVer[1]);
              const latestStore = Number(latestSplitVer[2]);
              const latestLive = Number(latestSplitVer[3]);
              const latestAssets = Number(latestSplitVer[4]);

              if (latestMajor > major || latestMinor > minor || latestStore > store || latestLive > live || latestAssets > assets) {
                const warningMsg = this.translate('update_available_key');
                this.logger.warn(warningMsg);
                if ('0' === PsCommonSettings.mandatoryUpdate) {
                  // remove the canel the button and keep the update now button so that the popup msg does not close without update
                }
                CommonUtils.presentInfoAlert(warningMsg);
                // update button handler:
                if (latestLive > live || latestAssets > assets) {
                  const updateResult = await this.performAutomaticUpdate();
                  // this.performManualUpdate();
                  if (updateResult === 'error') {
                    reject('error');
                  }
                }
                resolve('success');
              }
            } else {
              reject('noUpdate');
            }
          } else {
            const errMsg = this.translate('app_has_invalid_version_key');
            this.logger.error(errMsg);
            CommonUtils.presentFailureAlert(errMsg);
            reject('error');
          }
        } else {
          reject('error');
        }
      } else {
        resolve('success');
      }
      // const update = await this.deploy.checkForUpdate();
      // if (update.available) {
      //   // We have a Live update!
      //   resolve('LiveUpdate');
      // }

    });
  }
  async performManualUpdate() {
    this.logger.log('Manual Update Started');
    const update = await this.deploy.checkForUpdate();
    if (update.available) {
      await this.deploy.downloadUpdate((progress) => {
        // console.log(progress);
      });
      await this.deploy.extractUpdate((progress) => {
        // console.log(progress);
      });
      this.logger.log('Manual Update Finished');
    }
  }
  async performAutomaticUpdate(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const currentVersion = await this.deploy.getCurrentVersion();
        // const config: IDeployConfig = {channel: 'Richie'};
        // await this.deploy.configure(config);
        this.logger.log('Automatic Update Started');
        const resp = await this.deploy.sync({ updateMethod: 'auto' }, percentDone => {
          // console.log(`Update is ${percentDone}% done!`);
        });
        if (!currentVersion || currentVersion.versionId !== resp.versionId) {
          // We found an update, and are in process of redirecting you since you put auto!
          this.logger.log('Automatic Update finished');
          resolve('success');
        } else {
          // No update available
          resolve('noUpdate');
        }
      } catch (err) {
        this.logger.error(err);
        reject('error');
      }
    });
  }

  preparePrelogin(): Promise<IPreloginPreperation> {
    return new Promise<IPreloginPreperation>((resolve, reject) => {
      // to implement real UDID
      this.returnUdid().then((result) => {
        this.hybridkey.genkeypair().then((genkeypairResult) => {
          const response: IPreloginPreperation = {
            udid: result,  /*Math.floor(Math.random() * 999999999999999999) + 1 + '' + Math.floor(Math.random() * 999999999999999999) + 1 + '' + Math.floor(Math.random() * 999999999999999999) + 1,*/
            privateKey: genkeypairResult.k.privateKey,
            publicKey: genkeypairResult.k.publicKey
          };
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  validateFormController(control) {
    if (control instanceof FormControl) {
      // in case we have a service mapping set on the field and the field was already invalid then do not revalidate that field again in order not to remove the error returned from the service call
      if (control[ConstantCommon.CONTROLLER_SCREEN_DISPLAY_VO] && control[ConstantCommon.CONTROLLER_SCREEN_DISPLAY_VO].SERVICE_MAPPING_ID && control.invalid && control[ConstantCommon.CONTROLLER_ERROR_MSGS] && control[ConstantCommon.CONTROLLER_ERROR_MSGS].length > 0) {
        return;
      }

      control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      control.markAsTouched({
        onlySelf: true
      });
    }
  }


  /**
   * function that call external function (funciton in another class)
   * @param mainClass class name
   * @param method method name
   * @param params parameters to be sent
   * @author gilbertAndary
   */

  public async callExternalFunction(mainClass, method, params?: any[]): Promise<any> {
    try {
      if (!params) {
        params = [{}];
      }
      return mainClass[method](...params);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async presentActionSheet(options: IOptionsActionSheet) {
    const actionSheetOptions: ActionSheetOptions = {
      header: options.header ? options.header : 'ActionSheet',
      buttons: options.buttons ? options.buttons : [{
        text: this.translate('ok_key'),
        role: 'cancel'
      }]
    };
    actionSheetOptions.buttons.push({
      text: this.translate('cancel_key'),
      role: 'cancel'
    });
    const actionSheet = await this.actionSheetCtrl.create(actionSheetOptions);
    await actionSheet.present();
  }


  returnReportDetails(request: IOmniCommonFileRequest): Promise<IOmniCommonFileResponse> {
    return new Promise<IOmniCommonFileResponse>((resolve, reject) => {
      this.http.commonRequestAjax(PsCommonSettings.serviceUrl.reportDetails, request).then(result => {
        resolve(result);
      }).catch(error => {
        this.logger.log(error);
        reject(error);
      });
    });
  }

  returnFormVO(group: FormGroup) {
    return group.controls.formData.value;
  }

  // duplicated from version 3, mod func used to get specific hijriday ,GRadwan US925625
  private gmod(n, m) {
    return ((n % m) + m) % m;
  }

  presentLoading() {
    CommonUtils.presentLoading();
  }


  dismissLoading(id?: string) {
    CommonUtils.dismissLoading();
  }

  // duplicated from version 3 to get hijri calender ,GRadwan US925625
  public pathSolutionCalendar(date, adjust?) {
    let today: Date;
    if (!date) {
      today = new Date();
    } else {
      today = date;
    }
    let adjustmili, todaymili, day, month, year, m, y, a, b, jd, bb, cc, dd, ee, wd, id, im, iy, cyc, iyear, epochastro, epochcivil, shift1, z, cy, j;
    if (adjust) {
      adjustmili = 1000 * 60 * 60 * 24 * adjust;
      todaymili = today.getTime() + adjustmili;
      today = new Date(todaymili);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    m = month + 1;
    y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    a = Math.floor(y / 100.);
    b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) { b = 0; }
    if (y == 1582) {
      if (m > 10) { b = -10; }
      if (m == 10) {
        b = 0;
        if (day > 4) { b = -10; }
      }
    }

    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4.);
    }
    bb = jd + b + 1524;
    cc = Math.floor((bb - 122.1) / 365.25);
    dd = Math.floor(365.25 * cc);
    ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    if (adjust) {
      wd = this.gmod(jd + 1 - adjust, 7) + 1;
    } else {
      wd = this.gmod(jd + 1, 7) + 1;
    }

    iyear = 10631. / 30.;
    epochastro = 1948084;
    epochcivil = 1948085;

    shift1 = 8.01 / 60.;

    z = jd - epochastro;
    cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    j = Math.floor((z - shift1) / iyear);
    iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) { im = 12; }
    id = z - Math.floor(29.5001 * im - 29);

    const myRes = new Array(8);

    myRes[0] = day; // calculated day (CE)
    myRes[1] = month - 1; // calculated month (CE)
    myRes[2] = year; // calculated year (CE)
    myRes[3] = jd - 1; // julian day number
    myRes[4] = wd - 1; // weekday number
    myRes[5] = id; // islamic date
    myRes[6] = im - 1; // islamic month
    myRes[7] = iy; // islamic year

    return myRes;
  }

  animationDelay(index, divider?) {
    return CommonUtils.animationDelay(index, divider);
  }

  /* returnTranslationKeys(lang: string, operationId: number) {
    return new Promise<any>(resolve => {
      const retrievedOperIndex = this.getOperation(operationId, lang);
      let retrievedOperDate;
      if (retrievedOperIndex == -1) {
        retrievedOperDate = null;
      } else {
        retrievedOperDate = this.retrievedOpers[retrievedOperIndex].retrievedDate;
      }
      this.language.changeLanguage(lang);
    });
  } */

  private addOperation(operId: number, lang: string): void {
    const operIndex = this.getOperation(operId, lang);
    if (operIndex == -1) {
      const operData = {
        operId,
        retrievedDate: new Date(),
        lang
      };
      this.retrievedOpers[this.retrievedOpers.length] = operData;
    } else {
      this.retrievedOpers[operIndex].retrievedDate = new Date();
    }
  }

  private getOperation(operId: number, lang: string): number {
    for (let i = 0; i < this.retrievedOpers.length; i++) {
      if (operId == this.retrievedOpers[i].operId && lang == this.retrievedOpers[i].lang) {
        return i;
      }
    }
    return -1;
  }


  isWebLayout() {
    const appWidth = screen.width;
    const appHeight = screen.height;
    const calculatedHeight = appHeight + (appHeight * 0.3);
    return appWidth >= appHeight;
  }

  isMobileLayout() {
    return !this.isWebLayout();
  }

  /**
   *
   * @param b64Data
   * @param fileName
   * @param contentType
   */
  public downloadFile(b64Data, fileName, fileExtension?) {
    let contentType = '';
    // The below check is for web and platform 'browser'
    if (this.isWeb()) {
      if (b64Data !== undefined) {
        if (fileExtension !== undefined) {
          fileExtension = '.' + fileExtension.toLowerCase();
          contentType = ConstantCommon.MIME_TYPES[fileExtension];

          if (fileName === undefined) {
            fileName = 'omni-bk' + fileExtension;
          }
          const blob = this.base64toBlob(b64Data, fileName, contentType);
          saveAs(blob, fileName);
        }
      }
    } else {
      if (fileName === undefined) {
        fileName = 'omni-bk.' + fileExtension;
      }
      // const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory;
      // const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
      this.saveFileAndOpen(fileName, b64Data, fileExtension);
    }
  }

  /**
   *
   * @param b64Data
   * @param fileName
   * @param contentType
   */
  public base64toBlob(b64Data, fileName, contentType?) {
    const extension = fileName.substring(fileName.lastIndexOf('.'));
    let type = ConstantCommon.MIME_TYPES[extension];
    type = type || 'application/octet-stream';
    contentType = contentType || type;
    const sliceSize = 512;
    b64Data = b64Data || '';
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(b64Data && b64Data != null && b64Data != undefined && b64Data != '' ? byteArrays : [], { type: contentType });
    return blob;
  }


  public getAttachmentsAndOrDownload(item: any, download: boolean = true): Promise<Array<ISmartFieldCO>> {
    this.presentLoading();
    const response: Array<ISmartFieldCO> = [];
    return new Promise<Array<ISmartFieldCO>>((resolve) => {
      const paramData: ISmartFieldRequest = {};
      paramData.progReference = item.progReference;
      paramData.smartFieldCode = item.securityCode1;
      paramData.applicationName = item.applicationName;
      paramData.transactionNumber = item.transactionNumberDetails;
      this.returnSmartDetails(paramData).then((result) => {
        const list: Array<ISmartFieldCO> = result.gridModel;
        let noFileWasFound = true;
        if (list != null && list !== undefined) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < list.length; i++) {
            const smart = list[i];
            if (smart.smartDetails && smart.smartDetails.smartFieldFileContents && smart.smartFieldText && JSON.parse(smart.isFile)) {
              noFileWasFound = false;
              if (download) {
                const fileType = smart.smartFieldText.split('.').pop();
                this.downloadFile(smart.smartDetails.smartFieldFileContents, smart.smartFieldText, fileType);
                this.dismissLoading();
              }
              this.dismissLoading();
              response.push(smart);
            }
          }
        }
        if (noFileWasFound) {
          this.dismissLoading();
        }
        resolve(response);
      }).catch((error) => {
        resolve(response);
      });
    });
  }


  returnSmartDetails(parameter: ISmartFieldRequest): Promise<ISmartFieldResponse> {
    return new Promise<ISmartFieldResponse>((resolve, reject) => {
      this.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.smartDetails, parameter
      ).then((result) => {
        const list: Array<ISmartFieldCO> = result.data.gridModel as Array<ISmartFieldCO>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  public navigateStepperToIndex(stepper: MatStepper, index: number, group: FormGroup, requestObject?: any) {
    if (!stepper || index < 1 || !group || (index >= stepper.steps.length)) {
      return;
    }
    stepper.steps.forEach((step, stepIndex) => {
      if (stepIndex < index) {
        let response = this.returnStepControlsAsAbstractControl(group, stepper, stepIndex, null, true);
        if (response.isValid) {
          stepper.selectedIndex = stepIndex;
          stepper.next();
        }
      }
    });
  }

  closeModals() {
    CommonUtils.dismissAllModals();
  }

  async presentPsAlert(options: IOptionsPsComplexAlertController, id: string) {
    const modalController: ModalController = CommonUtils.injectionHandler(ModalController);
    modalController.dismiss(null, null, id);
    const modal = await modalController.create({
      component: PsTemplateAlertController,
      cssClass: [options.cssClass + '-alert-modal', 'alert-modal'],
      componentProps: { options },
      backdropDismiss: false,
      animated: false,
      id: id
    });
    return await modal.present();
  }


  returnElementFormControlsAsHTML(parentElement?: Element): Array<Element> {
    const selectorCriteria = ConstantCommon.selectorCriteria;

    let children: Array<Element>;
    if (parentElement) {
      children = Array.prototype.slice.call(parentElement.querySelectorAll('*[' + selectorCriteria + ']'));
    } else {
      children = Array.prototype.slice.call(document.querySelectorAll('*[' + selectorCriteria + ']'));
    }
    return children;
  }

  returnElementFormControlsAsAbstractFC(formGroup: FormGroup, parentElement?: Element, validateEachFormControl?: boolean): IOptionsReturnStepControlsAsAbstractControl {
    const selectorCriteria = ConstantCommon.selectorCriteria;

    let children: Array<Element>;
    const mapOfControls = {};
    const mapOfInvalidControls = {};
    const mapOfDOMElements = {};
    let valid = true;
    let numberOfInvalidControls = 0;
    const response: Array<AbstractControl> = [];
    const listOfInvalidControls: Array<AbstractControl> = [];

    children = this.returnElementFormControlsAsHTML(parentElement);
    const allDomElementsArray: Array<Element> = [...children];
    const groupControlsDomElementsArray: Array<Element> = [];
    const invalidControlsDomElementsArray: Array<Element> = [];

    Array.from(children).forEach(element => {
      let fcName = '';
      if (element.hasAttribute(selectorCriteria)) {
        fcName = element.getAttribute(selectorCriteria);
      }

      if (formGroup) {
        const control: AbstractControl = this.returnFormControlFromGroup(formGroup, fcName);
        if (control) {
          if (validateEachFormControl) {
            this.validateFormController(control);
          }
          if (control.invalid) {
            valid = false;
            numberOfInvalidControls++;
            listOfInvalidControls.push(control);
            invalidControlsDomElementsArray.push(element);
            mapOfInvalidControls[fcName] = control;
          }
          response.push(control);
          mapOfControls[fcName] = control;
          groupControlsDomElementsArray.push(element);
        }
      }
      mapOfDOMElements[fcName] = element;
    });
    return {
      isValid: valid,

      listOfControls: response,
      listOfInvalidControls,

      mapOfControls,
      mapOfDOMReference: mapOfDOMElements,

      listOfAllControlsDOMReferences: allDomElementsArray,
      listOfGroupControlsWithDOMReferences: groupControlsDomElementsArray,
      listOfInvalidControlsWithDOMReferences: invalidControlsDomElementsArray,

      numberOfInvalidControls,
      mapOfInvalidControls
    };
  }



  returnStepControlsAsAbstractControl(formGroup, matStepper: MatStepper,
    stepToSearch?, stepperId?, validateEachFormControl?): IOptionsReturnStepControlsAsAbstractControl {
    let stepper: Element = stepperId ? document.getElementById(stepperId) : document.getElementsByTagName('mat-horizontal-stepper').item(0);
    stepper = stepper ? stepper : document.getElementsByTagName('mat-vertical-stepper').item(0);
    if (stepper) {
      let steps = stepper.querySelectorAll('.mat-horizontal-stepper-content');
      steps = steps ? steps : stepper.querySelectorAll('.mat-vertical-stepper-content');
      let activeStep = null;
      if (stepToSearch == null) {
        stepToSearch = stepper.getAttribute('currentIndex');
      }
      if (steps) {
        activeStep = Array.from(steps)[stepToSearch];
      }
      if (activeStep) {
        return this.returnElementFormControlsAsAbstractFC(formGroup, activeStep, validateEachFormControl);
      }
    }
  }

  returnFormControlFromGroup(formGroup, fcName): AbstractControl {
    let result: AbstractControl = null;
    if (formGroup instanceof Array) {
      for (let i = 0; i < formGroup.length; i++) {
        result = this.returnFormControlFromGroup(formGroup[i], fcName);
        if (result) {
          break;
        }
      }
    } else {
      for (const prop in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(prop)) {
          if (prop === fcName) {
            return formGroup.controls[prop];
          }
          if (formGroup.controls[prop] instanceof Object || formGroup.controls[prop] instanceof Array) {
            result = this.returnFormControlFromGroup(formGroup.controls[prop], fcName);
            if (result) {
              break;
            }
          }
        }
      }
    }
    return result;
  }

  public hasAccessOnOperation(operid: number, operationList?: number[], operator?: 'OR' | 'AND'): boolean {
    let bReturnVal = false;
    this.businessProfileMap = this.session.getValueOf(ConstantCommon.BUSINESS_PROFILE_MAP);
    if (operid !== null && operid !== undefined && operid !== 0) {
      const operation = this.businessProfileMap.filter(operVO => operVO.OPER_ID === operid).shift();
      if (operation !== null && operation !== undefined) {
        bReturnVal = true;
      } else {
        bReturnVal = false;
      }
    } else if (operationList !== null && operationList !== undefined && operationList.length > 1 && operator !== undefined) {
      if (operator === 'OR') {
        const withOR = this.businessProfileMap.filter(op => operationList.includes(op.OPER_ID));
        if (withOR !== null && withOR !== undefined && withOR.length > 0) {
          bReturnVal = true;
        } else {
          bReturnVal = false;
        }
      } else if (operator === 'AND') {
        const withAnd = this.businessProfileMap.filter(op => operationList.includes(op.OPER_ID));
        if (withAnd !== null && withAnd !== undefined && withAnd.length > 0 && withAnd.length === operationList.length) {
          bReturnVal = true;
        } else {
          bReturnVal = false;
        }
      }
    }
    return bReturnVal;
  }

  hideElementWhenAnimationEnds(element: Element | any, animationClass?): Promise<any> {
    return new Promise<any>((resolve) => {
      try {
        if (!animationClass) {
          animationClass = 'hide-element';
        }
        if (element.nativeElement) {
          element = element.nativeElement;
        }
        if (!element) {
          resolve(false);
          return;
        }
        element.classList.add(animationClass);
        element.addEventListener('webkitAnimationEnd', () => {
          resolve(true);
          element.classList.remove(animationClass);
        });
        element.addEventListener('animationend', () => {
          resolve(true);
          element.classList.remove(animationClass);
        });
      } catch (error) {
        resolve(false);
      }
    });
  }

  getInitialState(fcName: string) {
    const sysParamAllDispList: Map<number, Map<string, any>> = this.initialScreenDisplayParams;
    const sysParamScreenDispList = sysParamAllDispList.get(PsCommonSettings.oper_ID) ? sysParamAllDispList.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    let screenDispVO: IsysParamObj = {
      IS_MANDATORY: ConstantCommon.DEFAULT_MANDATORY,
      IS_READONLY: ConstantCommon.DEFAULT_READONLY
    };
    if (sysParamScreenDispList && sysParamScreenDispList.get(fcName)) {
      screenDispVO = sysParamScreenDispList.get(fcName);
      if (!screenDispVO.IS_MANDATORY && screenDispVO.IS_MANDATORY !== 0) {
        screenDispVO.IS_MANDATORY = 1;
      }
      if (!screenDispVO.IS_READONLY && screenDispVO.IS_MANDATORY !== 1) {
        screenDispVO.IS_READONLY = 0;
      }
    }
    return screenDispVO;
  }

  share(message: string, subject: string, files: string[], url: string) {
    this.socialSharingService.share(message, subject, files, url);
  }

  /**
   * 
   * @param contentType
   */
  public saveFileAndOpen(fileName: string, b64Data: string, fileExtension: string) {
    const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    this.file.writeFile(writeDirectory, fileName, this.base64toBlob(b64Data, fileName, fileExtension), { replace: true }).then(res => {
      const contentTYpe = '.' + fileExtension.toLowerCase();
      const URL = this.platform.is('ios') ? res.toNativeURL() : res.toInternalURL();
      this.fileOpener.open(URL, ConstantCommon.MIME_TYPES[contentTYpe]);
    });
  }
  resetStatusBar() {
    this.statusBar.hide();
    this.statusBar.show();
  }

  getPageByOperId(operId) {
    const pages = this.session.getValueOf(ConstantCommon.BUSINESS_PROFILE_MAP) as Array<IOperDef>;
    if (pages) {
      const activePage = pages.find((p) => {
        return p.OPER_ID == operId;
      });
      return activePage;
    }
    return null;
  }

  getLKCompany() {
    this.cifInfo = this.session.getValueOf(ConstantCommon.USERINFO);
    this.companyCurrencyLK = this.cifInfo.companySettingsCO.countryIso === PsCommonSettings.LK_COMPANY_ISO ? this.cifInfo.companySettingsCO.baseCurrency : undefined;
    if (this.companyCurrencyLK !== undefined) {
      return { isLK: true, currencyCode: this.cifInfo.companySettingsCO.baseCurrency };
    } else {
      return { isLK: false, currencyCode: undefined };
    }
  }

  /**
   * 
   * @param request 
   */
  public commonServiceCallForCustomization(request: any): Promise<ICommonServiceCustomizationResponse> {
    return new Promise<ICommonServiceCustomizationResponse>((resolve, reject) => {
      this.http.commonRequestAjax(PsCommonSettings.serviceUrl.customizationCommonServiceEndPoint, request).then(result => {
        resolve(result);
      }).catch(error => {
        this.logger.log(error);
        reject(error);
      });
    });
  }

  returnEntityOperCustomizationObserv(): Observable<Map<number, Map<string, any>>> {
    return this.entityScreenDisplayParams.asObservable();
  }

  returnEntityOperCustomization(): Map<number, Map<string, any>> {
    return this.entityScreenDisplayParams.getValue();
  }

  setEntityScreenOperCustomization(entityScreenOperCust: Map<string, any>, callNext = true) {
    const entityScreenInitVal = this.returnEntityOperCustomization();
    entityScreenInitVal.set(PsCommonSettings.oper_ID, entityScreenOperCust);
    if (callNext) {
      this.entityScreenDisplayParams.next(entityScreenInitVal);
    }
  }

  commonSelectDropdownRequest(url, parameter: any): Promise<any> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.http.commonRequestAjax(url, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
