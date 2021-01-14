import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

import { LoggerService } from '../logger/logger.service';
import { CommonUtils } from '../models/common-utils';

declare var IRoot: any;
@Injectable({
    providedIn: 'root'
})
export class CheckAppService {
    constructor(private platform: Platform, private logger: LoggerService, private device: Device) {
    }
    private handleStopApp() {
        if (CommonUtils.isAndroid()) {
            navigator['app'].exitApp();
        } else if (CommonUtils.isIOS()) {
            CommonUtils.presentFatalAlert(null, { title: 'security_alert_key', message: 'cannot_open_app_key', noButtons: true });
        }
    }
    
    public returnNativeUserAgent(): string {
    	if (CommonUtils.isNativeMobile() && this.device) 
    	{
     		return 'Native Mobile : Manufacturer ' + this.device.manufacturer 
					    		+ ' , Model ' + this.device.model 
					    		+ ' , Platform ' + this.device.platform 
					    		+ ' , Version ' + this.device.version
					    		+ ' , Uuid ' + this.device.uuid
					    		+ ' , isVirtual ' + this.device.isVirtual
					    		+ ' , Serial ' + this.device.serial;
    	}
    	else
    	{   
    		return null;
    	}
    }
    
    private checkIsVirtual(): boolean {
        // TP# 955174 check if the device is real or virtual (emulator/simulator)
        if (this.device.isVirtual) {
            this.logger.log('device.isVirtual: ', this.device.isVirtual);
            this.handleStopApp();
            return true;
        }
        return false;
    }// Added by Richie for TP# 955174 & 955171
    private checkIsRooted(): Promise<boolean> {
        // TP# 955171 check if the device is rooted/jailbroken
        return new Promise<any>((val, reject) => {
            IRoot.isRooted((booleanVal) => {
                this.logger.log('IRoot.isRooted success: ', booleanVal);
                if (booleanVal) {
                    this.handleStopApp();
                    val(true);
                }
                val(false);
            }, (err) => {
                this.logger.log('IRoot.isRooted error:', err);
                reject(err);
            });
        });
    }
    // Added by Richie for security checkings
    public async checkAppProtection(): Promise<boolean> {
        return new Promise<any>(async (res, rej) => {
            /* Richie: commented temporarly as requested by Hanna in order to be able to test on simulator.
             * IT SHOULD BE UNCOMMENTED BEFORE DELIVERY

            if (CommonUtils.isNativeMobile()) {
                // TP# 955174 check if the device is real or virtual (emulator/simulator)
                const isVirtual = this.checkIsVirtual();
                if (isVirtual) {
                    res(true);
                } else {
                    // TP# 955171 check if the device is rooted/jailbroken
                    const isrooted = await this.checkIsRooted().catch(err => { rej(err); });
                    res(isrooted);
                }
            }
            */
            res(false);
        });
    }
    // End Richie
}
