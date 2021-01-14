import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as asmcrypto from 'asmcrypto.js';
import { LoggerService } from '../logger/logger.service';
import { ConstantCommon } from '../models/common-constant';
import { CommonUtils } from '../models/common-utils';
import { PsCommonSettings } from '../models/ps-common.settings';


/**
 * @author khaledaltimany
 * some information musrt be kept saved at the client side like cif and userid and comp code ...
 * and its not a best practice to store them in local storage as it will be visible for the user
 * in the dev tools so to overcome that a static object was made and can hold all the variable
 */
// the following object will be only available in the ram and not in the local storage

declare function unescape(s: string): string;
declare function escape(s: string): string;

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(
        private storage: Storage, private platform: Platform,
        private secureStorage: SecureStorage,
        private logger: LoggerService,
         /*private http: HttpProvider,private logger: LoggerProvider*/) {
        // Added by Richie to implement the secure storage
        if (this.isNativeMobile()) {
            const sessionPromise = this.secureStorage.create('session');
            if (sessionPromise) {
                sessionPromise.then((stor: SecureStorageObject) => {
                    this._storageObj = stor;
                }).catch((err) => { this.logger.error(err); });
            }
        }
        // end Richie
    }

    get SESSION() {
        return this.__SESSION = this.clone(this.__SESSION);
    }

    set SESSION(value) {
        throw new Error('do not mutate the `__SESSION` directly');
    }

    private _storageObj: SecureStorageObject;
    private __SESSION = {};

    private salt = asmcrypto.string_to_bytes('This is the salt. It does not have to be secret');
    private iterations = 4096;
    private nonceLen = 12;

    public append(key: string, value: any, save: boolean = false) {
        // const datePipe = new PsDateFormatPipe();
        // let now;

        if (value === undefined) {
            value = null;
        }
        if (save) {
            this.storage.set(key, value).catch((err) => { this.logger.error(err); });
        } else {
            try {
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session append started for:' + key + ' at: ' + now);
                // this.__SESSION[key] = value; TODO to be fixed later when decision is made on saving data
                const sessionId = this.checkSession();
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session append get mainJson started:' + key + ' at: ' + now);
                let mainJson = sessionStorage.getItem(sessionId);
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session append get mainJson ended:' + key + ' at: ' + now);
                // End Richie
                if (mainJson == null || mainJson === undefined) {
                    mainJson = JSON.parse('{}');
                } else {
                    mainJson = JSON.parse(decodeURIComponent(escape(atob(mainJson))));
                }
                // Commented/Added by Richie for TP# 971125
                // mainJson[key] = value;
                mainJson[key] = this.returnEncValue(key, value);
                // End Richie
                sessionStorage.setItem(sessionId, btoa(unescape(encodeURIComponent(JSON.stringify(mainJson)))));
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session append Ended:' + key + ' at: ' + now);
            } catch (error) {
                this.logger.error(error);
            }

        }
    }

    public remove(key: string) {
        this.storage.remove(key).catch((err) => { this.logger.error(err); });
        const sessionId = this.checkSession();
        let mainJson = sessionStorage.getItem(sessionId);
        if (mainJson == null || mainJson === undefined) {
            mainJson = JSON.parse('{}');
        } else {
            mainJson = JSON.parse(decodeURIComponent(escape(atob(mainJson))));
        }
        delete mainJson[key];
        sessionStorage.setItem(sessionId, btoa(unescape(encodeURIComponent(JSON.stringify(mainJson)))));
        // sessionStorage.removeItem(key);
    }

    public getValueOf(key: string): any {
        // const datePipe = new PsDateFormatPipe();
        // let now;
        // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
        // this.logger.log('session getValueOf Started:' + key + ' at: ' + now);
        const sessionId = this.checkSession();
        let mainJson = sessionStorage.getItem(sessionId);
        if (mainJson == null || mainJson === undefined) {
            return null;
        }
        mainJson = JSON.parse(decodeURIComponent(escape(atob(mainJson))));
        const val = mainJson[key];
        if (val) {
            const finalVal = this.returnDecValue(key, val);
            if (typeof finalVal === 'string' && finalVal.toLowerCase() === 'false') {
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session getValueOf Ended:' + key + ' at: ' + now);
                return false;
            }
            if (typeof finalVal === 'string' && finalVal.toLowerCase() === 'true') {
                // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
                // this.logger.log('session getValueOf Ended:' + key + ' at: ' + now);
                return true;
            }
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getValueOf Ended:' + key + ' at: ' + now);
            return finalVal;
        } else {
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getValueOf Ended:' + key + ' at: ' + now);
            return val;
        }
    }

    public getStoredValueOf(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.get(key).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }


    private clone(object: any) {
        return JSON.parse(JSON.stringify(object));
    }

    // private getPrameter(key: string): any {

    // }

    /**
     * function used to set a value in storage in a secure way (not plain text)
     *
     * @author RichardZourob
     * @param key
     * @param value
     */
    public setSecureKey(key: string, value: any) {
        let valueStored = '';
        if (value) {
            valueStored = JSON.stringify({ val: value });
        }
        if (this.isNativeMobile()) {
            this._storageObj.set(key, valueStored).catch((err) => { this.logger.error(err); });
        } else {
            if (window.crypto.subtle) {
                this.setSecureWebStore(key, valueStored);
            } else {
                this.storage.set(key, value).catch((err) => { this.logger.error(err); });
            }
        }
    }

    /**
     * function that reads the secure values in the storage and returns them as normal data as they were entered.
     *
     * @author RichardZourob
     * @param key
     */
    public getSecureValueOf(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.isNativeMobile()) {
                this._storageObj.get(key).then((result) => {
                    const valueObj = JSON.parse(result);
                    resolve(valueObj.val);
                }).catch((error) => {
                    resolve(null);
                });
            } else {
                if (window.crypto.subtle) {
                    this.getSecureWebStore(key).then((result: string) => {
                        if (result) {
                            const valueObj = JSON.parse(result);
                            resolve(valueObj.val);
                        } else {
                            resolve(result);
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    this.storage.get(key).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            }
        });
    }

    /**
     * function that removes the key,value combination from the secured storage.
     *
     * @author RichardZourob
     * @param key
     */
    public removeSecureKey(key: string) {
        if (this.isNativeMobile()) {
            this._storageObj.remove(key).catch((err) => { this.logger.error(err); });
        } else {
            this.storage.remove(key).catch((err) => { this.logger.error(err); });
        }
    }

    /**
     * function that clears out the entire key value store.
     * @author RichardZourob
     */
    public clearSecureStore(): Promise<any> {
        if (this.isNativeMobile()) {
            return this._storageObj.clear();
        } else {
            return this.storage.clear();
        }
    }

    /**
     * @author RichardZourob
     * @param password
     */
    private deriveAesKey(password: string): Uint8Array {
        const pass = asmcrypto.string_to_bytes(password);
        return asmcrypto.Pbkdf2HmacSha256(pass, this.salt, this.iterations, 32);
    }

    /**
     * @author RichardZourob
     * @param nonce
     * @param data
     */
    private joinNonceAndData(nonce: Uint8Array, data: Uint8Array): Uint8Array {
        const buf = new Uint8Array(nonce.length + data.length);
        nonce.forEach((byte, i) => buf[i] = byte);
        data.forEach((byte, i) => buf[i + nonce.length] = byte);
        return buf;
    }

    /**
     * @author RichardZourob
     * @param buf
     */
    private separateNonceFromData(buf: Uint8Array): { nonce: Uint8Array, data: Uint8Array } {
        const nonce = new Uint8Array(this.nonceLen);
        const data = new Uint8Array(buf.length - this.nonceLen);
        buf.forEach((byte, i) => {
            if (i < this.nonceLen) {
                nonce[i] = byte;
            } else {
                data[i - this.nonceLen] = byte;
            }
        });
        return {
            nonce,
            data
        };
    }

    /**
     * @author RichardZourob
     * @param key
     * @param data
     */
    private encrypt(key: Uint8Array, data: string): Uint8Array {
        const bData = asmcrypto.string_to_bytes(data, true) as Uint8Array;
        const nonce = window.crypto.getRandomValues(new Uint8Array(this.nonceLen)) as Uint8Array;
        const encrypted = asmcrypto.AES_GCM.encrypt(bData, key, nonce) as Uint8Array;
        const secData = this.joinNonceAndData(new Uint8Array(nonce), new Uint8Array(encrypted));
        return secData as Uint8Array;
    }

    /**
     * @author RichardZourob
     * @param key
     * @param buffer
     */
    private decrypt(key: Uint8Array, buffer: Uint8Array): string {
        const parts = this.separateNonceFromData(buffer);
        const decrypted = asmcrypto.AES_GCM.decrypt(parts.data, key, parts.nonce);
        const decData = asmcrypto.bytes_to_string(decrypted);
        return decData;
    }

    // Added by Richie for TP# 971125
    private returnSecValue(key: string, value: any): Uint8Array {
        // const datePipe = new PsDateFormatPipe();
        // let now;
        // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
        // this.logger.log('session returnSecValue deriveAesKey started:' + key + ' at: ' + now);
        const k = this.deriveAesKey(key);
        // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
        // this.logger.log('session returnSecValue deriveAesKey Ended:' + key + ' at: ' + now);
        // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
        // this.logger.log('session returnSecValue encrypt started:' + key + ' at: ' + now);
        const val = this.encrypt(k, value);
        // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
        // this.logger.log('session returnSecValue encrypt Ended:' + key + ' at: ' + now);
        return val;
    }
    private returnEncValue(key: string, value: any): string {
        const secValue = this.returnSecValue(key, btoa(unescape(encodeURIComponent(JSON.stringify(value)))));
        const strVal = asmcrypto.bytes_to_string(secValue);
        return strVal;
    }
    private returnDecValue(key: string, strVal: string): any {
        let finalVal;
        if (strVal) {
            // const datePipe = new PsDateFormatPipe();
            // let now;
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getSecureLocalStore deriveAesKey started:' + key + ' at: ' + now);
            const k = this.deriveAesKey(key);
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getSecureLocalStore deriveAesKey ended:' + key + ' at: ' + now);
            const byteVal = asmcrypto.string_to_bytes(strVal);
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getSecureLocalStore decrypt started:' + key + ' at: ' + now);
            strVal = this.decrypt(k, byteVal);
            // now = datePipe.transform(Date.now(), 'hh:mm:ss:SSS');
            // this.logger.log('session getSecureLocalStore decrypt ended:' + key + ' at: ' + now);
            finalVal = JSON.parse(decodeURIComponent(escape(atob(strVal))));
        } else {
            finalVal = strVal;
        }
        return finalVal;
    }
    // End Richie
    /**
     * @author RichardZourob
     * @param key
     * @param value
     */
    private setSecureWebStore(key: string, value: any) {
        const secValue = this.returnSecValue(key, value);
        this.storage.set(key, secValue).catch((err) => { this.logger.error(err); });
    }

    /**
     * @author RichardZourob
     * @param key
     */
    private getSecureWebStore(key: string): any {
        return new Promise<string>((resolve, reject) => {
            this.storage.get(key).then((result) => {
                if (result) {
                    const k = this.deriveAesKey(key);
                    const strValue = this.decrypt(k, result);
                    resolve(strValue);
                } else {
                    resolve(result);
                }
            }).catch(error => reject(error));
        });
    }
    isNativeMobile() {
        const cordova: boolean = this.platform.is('cordova');
        const deviceModeSimulation = cordova ? ((window as any).cordova.platformId === 'browser' ? true : false) : false;
        const nativeMobile: boolean = this.platform.is('ios') || this.platform.is('android') /*NOT supported in ionic 4: || this.platform.is('windows') */;
        return (cordova && nativeMobile) && !deviceModeSimulation;
    }

    clearLocalStorage() {
        let tempSetting = this.getValueOf('APPSETTINGS');
        // sessionStorage.clear();
        sessionStorage.removeItem(sessionStorage.tabID);

        if (!tempSetting) {
            tempSetting = PsCommonSettings;
        }
        PsCommonSettings.functions.__SET(tempSetting);
        this.append('APPSETTINGS', tempSetting);
    }
    checkSession() {
        let tabID = Date.now().toString();
        let closedTab = '';
        if (sessionStorage.tabID) {
            closedTab = 'closedLastTab_' + sessionStorage.tabID;
            if (sessionStorage[closedTab]) {
                if (sessionStorage[closedTab] === '2') {
                    tabID = sessionStorage.tabID;
                } else {
                    this.clearCurrentSession();
                }
            }
        }
        closedTab = 'closedLastTab_' + tabID;
        sessionStorage.tabID = tabID;
        sessionStorage[closedTab] = '2';
        return tabID;
    }

    clearUserSession() {

        PsCommonSettings.isLoggedIn = false;
        PsCommonSettings.oper_ID = null;
        PsCommonSettings.pageName = null;

        this.remove(ConstantCommon.USERINFO);
        this.remove(ConstantCommon.SESSION_ID);
        this.remove(ConstantCommon.USER_IS_LOGGED_IN);
        this.remove(ConstantCommon.SERVER_LOGIN_TOKEN);
        this.remove(ConstantCommon.SERVER_AUTH_TOKEN);
        this.remove(ConstantCommon.USER_FORCE_LOGOUT);
        this.remove(ConstantCommon.WORKINGCIF);
    }

    clearCurrentSession() {
        const tabID = sessionStorage.tabID;
        const closedTab = 'closedLastTab_' + tabID;
        sessionStorage.removeItem(closedTab);
        sessionStorage.removeItem('tabID');
        sessionStorage.removeItem(tabID);
    }
    createSession() {
        this.checkSession();
    }

    resetSession() {
        this.clearCurrentSession();
        /* let closedTab = "";
        let tabID = sessionStorage.tabID;
        if (sessionStorage.tabID) {
            closedTab = "closedLastTab_" + sessionStorage.tabID;
        }
        sessionStorage.clear();
        sessionStorage.tabID = tabID;
        sessionStorage[closedTab] = '1'; */
        // this.clearCurrentSession();
    }

    /**
     * @author Aftab.Ali
     * TP#997503
     * will return a complete JSON object for session
     */
    private getSessionJson() {
        const sessionId = this.checkSession();
        const mainJson = sessionStorage.getItem(sessionId);
        if (mainJson == null || mainJson === undefined) {
            return null;
        }
        return JSON.parse(decodeURIComponent(escape(atob(mainJson))));
    }

    /**
     * @author Aftab.Ali
     * TP#997503
     * will return a complete list of session object's variables
     */
    public getListOfSessionVarilables(): string[] {
        return this.createListFromSessionObject(this.getFilteredSessionObject());
    }


    /**
     * @author Aftab.Ali
     * TP#997503
     * will return a filtered session object
     */
    public getFilteredSessionObject(): any {
        let sessionObj: any;
        const sessionId = this.checkSession();
        const mainJson = sessionStorage.getItem(sessionId);
        if (mainJson == null || mainJson === undefined) {
            return null;
        } else {
            sessionObj = JSON.parse(decodeURIComponent(escape(atob(mainJson))));
        }
        return this.filterSessionObject(sessionObj);
    }

    /**
     * @author Aftab.Ali
     * TP#997503
     * will return a filtered session object based on ConstantCommon.SESSION_VARS_TO_BE_READ.sessionVarsToBeFiltered
     */
    private filterSessionObject(sessionObj) {
        const filteredSessionObj = {};
        ConstantCommon.SESSION_VARS_TO_BE_READ.sessionVarsToBeFiltered.forEach(element => {
            const sessionVar = this.returnFilteredSessionObject(element, sessionObj, true);
            if (sessionVar && typeof sessionVar === 'object') {
                CommonUtils.copyObject(filteredSessionObj, sessionVar, false, true);
            } else {
                filteredSessionObj[element] = sessionVar;
            }
        });
        return filteredSessionObj;
    }

    /**
     * @author Aftab.Ali
     * TP#997503
     * this is a recursive method to filter the session object
     */
    private returnFilteredSessionObject(propName, sessionObj, encrypted) {
        const nestedObjIndex = propName.indexOf('.');
        let curSessionObj = sessionObj;
        /**
         * if propName is nested then we need to traverse the inner session object to get the value through recursive calls of the function
         */
        if (nestedObjIndex > -1) {
            const result = {};
            const objName = propName.substring(0, nestedObjIndex);
            if (sessionObj) {
                curSessionObj = sessionObj[objName];
            }
            if (encrypted && curSessionObj) {
                curSessionObj = this.returnDecValue(objName, curSessionObj);
            }
            result[objName] = this.returnFilteredSessionObject(propName.substring(nestedObjIndex + 1), curSessionObj, false);
            return result;
        } else {
            /**
             * if propName is not nested then return the session value of that property
             */
            const result = {};
            if (sessionObj) {
                curSessionObj = sessionObj[propName];
            }
            if (encrypted && curSessionObj) {
                curSessionObj = this.returnDecValue(propName, curSessionObj);
                result[propName] = curSessionObj;
                return result;
            } else if (!encrypted) {
                result[propName] = curSessionObj;
                return result;
            }
            return curSessionObj;
        }
    }

    /**
     * @author Aftab.Ali
     * TP#997503
     * will return a list of keys from session object to be shown as mapping for common service
     */
    private createListFromSessionObject = (obj, prefix = '') => Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            return res;
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...this.createListFromSessionObject(obj[el], prefix + el + '.')];
        } else {
            return [...res, prefix + el];
        }
    }, [])
}


