import { HttpClient } from '@angular/common/http';
import { InjectionToken, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PsTemplatePopupMessagePage } from '../../psTemplates/ps-template-popup-message/ps-template-popup-message.page';
import { FileService } from '../Files/file.Service';
import { AlertType, IOptionsAlert, IVersionParts } from './ps-common-interface';
import { PsCommonSettings } from './ps-common.settings';


type PsDocument = Document;

/**
 * @author Khaled Al-Timany
 * common function to help and facilitate in developing
 */
export class CommonUtils {

    constructor(/** no object should be injected here this a global classs and should not depend on any obejct from angular injector */) {
        throw new Error('Error: Instantiation failed: Use CommonUtils.methodName(...) instead of new.');
    }
    private static divider = 10;
    public static enableSpinner = false;
    private static spinnerId = 1;
    private static activeSpinnerId;


    static dateFormat(date: Date, sFormat: string = 'yyyy-MM-dd'): string {
        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();

        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    }

    static isNull(value: any): boolean {
        return value == null || typeof value === 'undefined';
    }

    static isNotNull(str: any): boolean {
        return !this.isNull(str);
    }
    static isNotEmptyArray(arr: any[]): boolean {
        return this.isNotNull(arr) && this.isArray(arr) && arr.length > 0;
    }
    static isEmptyArray(arr: any[]): boolean {
        return !this.isNotEmptyArray(arr);
    }

    static parseInt(value: any) {
        if (this.isNotNull(value) && this.isNumber(value)) {
            return Number(value);
        } else {
            return 0;
        }
    }

    static isEmptyString(value: string): boolean {
        return this.isNull(value) || value === '';
    }
    static isNotEmptyString(value: string): boolean {
        return !this.isEmptyString(value);
    }

    static isObject(object: any) {
        return this.isNotNull(object) && typeof object === 'object' && object.constructor === Object;
    }
    static isNotObject(object: any) {
        return !this.isObject(object);
    }

    static isEmptyObject(object: any) {
        if (object == null || object === undefined) {
            return true;
        }
        return this.isObject(object) && Object.keys(object).length === 0;
    }

    static isNotEmptyObject(object: any) {
        return !this.isEmptyObject(object);
    }

    static containsKey(object: any, key: string) {
        return this.isEmptyObject(object) === false && this.isNotNull(object[key]);
    }

    static isNumber(value): boolean {
        if (this.isNull(value)) { return false; }
        value = value.toString().replace(/,/g, '');
        return !isFinite(value) ? false : true;
    }

    static isPositiveInt(value): boolean {
        return (this.isNotNull(value) && value > 0) ? true : false;
    }

    static isArray(value: any) {
        return this.isNotNull(value) && Array.isArray(value);
    }

    static isNotArray(value: any) {
        return !this.isArray(value);
    }

    static isEqualToAnyProperties(value: any, prop: any[]) {
        if (this.isNull(value) || this.isNull(prop) || this.isNotArray(prop)) { return false; }
        let result = false;
        for (const p of prop) {
            result = result || (value === p);
        }
        return result;
    }

    static injectionHandler<T>(className: Type<T> | InjectionToken<T>) {
        if (this.isNotNull(PsCommonSettings.injector)) {
            return PsCommonSettings.injector.get(className);
        } else {
            return null;
        }
    }

    static isEmptyOrNull(value: string): boolean {
        return this.isEmptyString(value);
    }

    public static async dismissAllModals(data?: any, role?: string, id?: string) {
        const modalController: ModalController = CommonUtils.injectionHandler(ModalController);
        modalController.dismiss();
    }


    static async presentPopUpMessage(options: IOptionsAlert, id) {

        const modalController: ModalController = CommonUtils.injectionHandler(ModalController);
        modalController.dismiss(null, null, id);
        options.displayImageOrIcon = options.displayImageOrIcon != null && options.displayImageOrIcon != undefined ? options.displayImageOrIcon : true;
        options.autoHide = options.autoHide != null && options.autoHide != undefined ? options.autoHide : false;
        const modal = await modalController.create({
            component: PsTemplatePopupMessagePage,
            cssClass: 'alert-modal',
            componentProps: { alertOptions: options },
            backdropDismiss: false,
            animated: false,
            id
        });
        return await modal.present();
    }



    static async presentSuccessAlert(message?: string, options?: IOptionsAlert) {
        options = CommonUtils.commonMessagehandler(message, options, AlertType.SUCCESS);
        options.autoHide = true;
        return await CommonUtils.presentPopUpMessage(options, 'ps-success-alert');
    }

    static async presentFailureAlert(message?: string, options?: IOptionsAlert) {
        options = CommonUtils.commonMessagehandler(message, options, AlertType.FAILURE);
        return await CommonUtils.presentPopUpMessage(options, 'ps-failure-alert');
    }

    static async presentFatalAlert(message?: string, options?: IOptionsAlert) {
        options = CommonUtils.commonMessagehandler(message, options, AlertType.FATAL);
        return await CommonUtils.presentPopUpMessage(options, 'ps-fatal-alert');
    }

    static async presentInfoAlert(message?: string, options?: IOptionsAlert) {
        options = CommonUtils.commonMessagehandler(message, options, AlertType.INFO);
        return await CommonUtils.presentPopUpMessage(options, 'ps-info-alert');
    }

    private static commonMessagehandler(message?: string, options?: IOptionsAlert, alertType?) {
        if (!options) {
            options = {};
        }
        if (message != null && message != undefined) {
            options.message = message;
        }
        options.type = alertType;
        return options;
    }

    public static translate(key: string | Array<string>): any {
        const translateService: TranslateService = CommonUtils.injectionHandler(TranslateService);
        let keyTrans;
        translateService.get(key).subscribe(translated => {
            keyTrans = translated;
        });
        return keyTrans;
    }

    public static animationDelay(index, divider?) {
        if (divider === null || divider === undefined) {
            divider = this.divider;
        }
        const animationDelayCounter = index / divider;
        return {
            'webkit-animation-delay': animationDelayCounter + 's',
            '-moz-animation-delay': animationDelayCounter + 's',
            '-ms-animation-delay': animationDelayCounter + 's',
            '-o-animation-delay': animationDelayCounter + 's',
            'animation-delay': animationDelayCounter + 's',
        };
    }

    public static changeCssVariable(variableName, value) {
        document.documentElement.style.setProperty(variableName, value);
    }
    public static getCssVariableValue(variableName): string {
        const translateService: TranslateService = CommonUtils.injectionHandler(TranslateService);
        const modalController: ModalController = CommonUtils.injectionHandler(ModalController);

        const templatePopUp: PsTemplatePopupMessagePage = new PsTemplatePopupMessagePage(modalController, translateService);

        return templatePopUp.getCssVariableValue(variableName);
    }

    /**
     * @author RichardZourob
     * function moved here from ps-common.service in order to be used from other classes
     * where we dont want to inject the common service to avoid circular dependency
     */
    public static isNativeMobile(): boolean {
        const platform: Platform = CommonUtils.injectionHandler(Platform);
        const cordova: boolean = platform.is('cordova');
        const deviceModeSimulation = cordova ? ((window as any).cordova.platformId === 'browser' ? true : false) : false;
        const nativeMobile: boolean = platform.is('ios') || platform.is('android') || platform.is('mobileweb');
        return (cordova && nativeMobile) && !deviceModeSimulation;
    }

    /**
     * @author RichardZourob
     * function to check if the device is android device or not and return true/false accordingly
     */
    public static isAndroid(): boolean {
        const platform: Platform = CommonUtils.injectionHandler(Platform);
        return platform.is('cordova') && platform.is('android');
    }

    /**
     * @author RichardZourob
     * function to check if the device is ios device or not and return true/false accordingly
     */
    public static isIOS(): boolean {
        const platform: Platform = CommonUtils.injectionHandler(Platform);
        return platform.is('cordova') && platform.is('ios');
    }

    /**
     * @author ZunairZakir
     * function to check if the browser is firefox
     */
    public static isFireFox(): boolean {
        const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        return isFireFox;
    }

    /**
     * @author ZunairZakir
     * function to check if the browser is IE
     */
    public static isIE(): boolean {
        const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        return isIEOrEdge;
    }

    /**
     * @author ZunairZakir
     * function to check if the browser is Safari
     */
    public static isSafari(): boolean {
        const isSafari = navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0;
        return isSafari;
    }

    /**
     * @author RichardZourob
     * function that takes the version in both formats M.m.S.L.A or a 16 digit numeric string
     * and returns an object of the different parts of the version.
     */
    public static returnVersionParts(ver: string): IVersionParts {
        // check if the version is sent in the format M.m.S.L.A
        const versionParts: IVersionParts = {};
        if (ver.indexOf('.') > -1) {
            // for example the version is 3.0.1.10.11
            const splitVer = ver.split('.');
            if (splitVer.length >= 6) {
                // get the version splits
                versionParts.major = Number(splitVer[0]);
                versionParts.minor = Number(splitVer[1]);
                versionParts.extension = Number(splitVer[2]);// Added by Richie for TP# 1135618
                versionParts.store = Number(splitVer[3]);
                versionParts.live = Number(splitVer[4]);
                versionParts.assets = Number(splitVer[5]);
                return versionParts;
            } else {
                return null;
            }
        } else {
            // the sent version is sent as one numberic string as it is in the database
            // for ex: 0300000100100011 for the version 3.0.0.1.10.11
            if (ver.length === 16) {
                versionParts.major = Number(ver.substr(0, 2));
                versionParts.minor = Number(ver.substr(2, 2));
                // Modified by Richie for TP# 1135618
                versionParts.extension = Number(ver.substr(4, 2));
                versionParts.store = Number(ver.substr(6, 2));
                // end Richie
                versionParts.live = Number(ver.substr(8, 4));
                versionParts.assets = Number(ver.substr(12));
                return versionParts;
            } else {
                return null;
            }
        }
    }

    public static getElementStyle(element: Element, style?): any {
        if (style) {
            return getComputedStyle(element)[style];
        }
        return getComputedStyle(element);
    }

    public static presentLoading() {
        document.getElementsByTagName('html')[0].classList.add('open-loader');
        const tempSpinnerId = this.spinnerId;
        this.spinnerId++;
        this.enableSpinner = true;
        this.activeSpinnerId = tempSpinnerId;
        const loaderRef: any = document.querySelector('#ps-loader-controller');
        if (loaderRef) {
            // loaderRef.classList.remove('hide-spinner');
            // loaderRef.classList.add('show-spinner');
            loaderRef.style.display = 'block';
        }
        setTimeout(this.dismissLoading, PsCommonSettings.requestTimeOut + 1000, tempSpinnerId);
    }

    public static dismissLoading(id?: string | number) {
        document.getElementsByTagName('html')[0].classList.remove('open-loader');
        if (this.activeSpinnerId) {
            if (id) {
                if (this.activeSpinnerId === id) {
                    return this.dismissLoadingCtrl();
                }
            } else {
                return this.dismissLoadingCtrl();
            }
        } else {
            return this.dismissLoadingCtrl();
        }

    }


    private static dismissLoadingCtrl() {
        this.enableSpinner = false;
        this.activeSpinnerId = null;
        const loaderRef: any = document.querySelector('#ps-loader-controller');
        if (loaderRef) {
            // loaderRef.classList.remove('show-spinner');
            // loaderRef.classList.add('hide-spinner');
            loaderRef.style.display = 'none';
        }
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
    public static copyObject(obj: Object, newObj: Object, override?: boolean, copyNewOnly?: boolean): any {
        if (obj == null || newObj == null) {
            return;
        }
        if (override == undefined) {
            override = false;
        }
        if (copyNewOnly == undefined) {
            copyNewOnly = false;
        }
        if (override) {
            Object.keys(obj).forEach((key) => {
                delete obj[key];
            });
        }
        try {
            Object.keys(newObj).forEach((key) => {
                if (obj[key] && obj[key] instanceof FormGroup) {
                    return;
                } else if (obj[key] && obj[key] instanceof Object) {
                    obj[key] = this.copyObject(obj[key], newObj[key], override, copyNewOnly);
                } else {
                    if (copyNewOnly && (obj[key] != null && obj[key] != undefined)) {
                        return;
                    }
                    obj[key] = newObj[key];
                }
            });
        } catch (error) {
            // this.logger.error(error);
        }

        return obj;
    }

    public static clone(obj) {
        let copy;

        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        if (obj instanceof Map) {
            return new Map(this.clone(Array.from(obj)));
        }

        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Object) {
            copy = {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = this.clone(obj[attr]);
                }
            }
            return copy;
        }
        throw new Error('Unable to copy object! Its type isn\'t supported');
    }

    public static parseHTML(result, type?): Promise<PsDocument> {
        return new Promise<PsDocument>((resolve, reject) => {
            const fileService = CommonUtils.injectionHandler(FileService);
            const blobData = fileService.base64toBlob(btoa(unescape(encodeURIComponent(result))), 'text/html');
            const fr = new FileReader();
            fr.onload = (e) => {
                const dataURL = fr.result;
                const parser = new DOMParser();
                const parsedHtml = parser.parseFromString(dataURL.toString(), type ? type : 'text/html');
                resolve(parsedHtml);
            };
            fr.onerror = (e) => {
                reject(false);
            };
            fr.readAsText(blobData);
        });
    }


    public static sendGETRequest(url, options?): Promise<any> {
        const http = CommonUtils.injectionHandler(HttpClient);
        return new Promise<any>((resolve, reject) => {
            http.request('GET', url, { responseType: 'text', ...options }).subscribe(result => {
                resolve(result);
            }, err => {
                reject(err);
            });

        });
    }
    public static async addJSScript(url, options?: {
        id?: string,
        removeIDIfPresent?: boolean,
        checkSRCIfPresent?: boolean,
        async?: boolean
    }) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.id = options.id;
            script.async = options.async;
            const oldScript = document.getElementById(options.id);
            if (options.id && oldScript && options.removeIDIfPresent) {
                if (options.checkSRCIfPresent) {
                    const isPresent = document.querySelector('script[src="' + url + '"]') ? true : false;
                    if (isPresent) {
                        resolve(null);
                        return;
                    }
                }
                oldScript.parentNode.removeChild(oldScript);
                // document.body.removeChild(oldScript);
            }
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    public static loadCssIfNot(url, cssId, rel?) {
        return new Promise((resolve) => {
            if (!document.getElementById(cssId)) {
                const head = document.getElementsByTagName('head')[0];
                const link = document.createElement('link');
                link.id = cssId;
                link.rel = rel ? rel : 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                link.onload = () => {
                    resolve(null);
                };
                link.onerror = () => {
                    resolve(null);
                };
                head.appendChild(link);
            }
        });
    }

    public static deleteError(group: FormGroup, fcName: string) {
        this.setErrors(group, fcName, null);
    }

    public static setErrors(group: FormGroup, fcName: string, errorMessage) {
        group.controls[fcName]['errorMsgs'] = errorMessage;
    }

    /**
     * function that returns the value of a field using its field name (serialized)
     * from a nested json object (not serialized)
     *
     * @param propName example myGridVO.FIRST_NAME
     * @param values example data = {myGridVO:{FIRST_NAME:'Richie'}}
     * @author Richard Zourob
     */
    public static valFromNestedObj(propName: string, values: any): any {
        if (propName) {
            if (values) {
                const index = propName.indexOf('.');
                if (index === -1) {
                    return values[propName];
                } else {
                    const innerProp = propName.substring(index + 1);
                    const outerProp = propName.substring(0, index);
                    return this.valFromNestedObj(innerProp, values[outerProp]);
                }
            } else {
                return values;
            }
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
    public static setValInsideNestedObj(propName: string, propValue: any, values: any): any {
        if (!values) {
            values = {};
        }
        const index = propName.indexOf('.');
        if (index === -1) {
            values[propName] = propValue;
        } else {
            const innerProp = propName.substring(index + 1);
            const outerProp = propName.substring(0, index);
            values[outerProp] = this.setValInsideNestedObj(innerProp, propValue, values[outerProp]);
        }
        return values;
    }

    /**
     * @param propNameList - list of properties on which we will do checking 
     * @param sourceObj - Object to copy from
     * @param destObj - Object to return
     * @author Aftab Ali
     */
    public static copyOnlyExistingPropOfObject(sourceObj: any, destObj: any, propNameList: string[]): any {
        if (sourceObj == null || destObj == null) {
            return;
        }

        propNameList.forEach(propName => {
            const val = this.valFromNestedObj(propName, sourceObj);
            if (val) {
                this.setValInsideNestedObj(propName, val, destObj);
            }
        });

        return destObj;
    }

    public static extractContainerFcNames(nativeElement: HTMLElement): Array<string> {
        const listOfChildren = nativeElement.querySelectorAll('*[psFcName]');
        const listOfChildrenNames = [];
        Array.from(listOfChildren).forEach(element => {
            listOfChildrenNames.push(element.getAttribute('psFcName'));
        });
        return listOfChildrenNames;
    }

    // Added by Gilbert for #TP 1105083
    public static toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

}

