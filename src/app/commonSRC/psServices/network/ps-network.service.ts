import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';

import { IOptionsAlert } from '../models/ps-common-interface';

export enum ConnectionStatus {
  Offline,
  Online,
}

@Injectable({
  providedIn: 'root'
})

export class PsNetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  private previousState = ConnectionStatus.Offline;
  constructor(private network: Network, private toastController: ToastController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeNetworkEvents();
      const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
      this.previousState = this.getCurrentNetworkStatus();
    });
  }

  public initializeNetworkEvents() {
    if (this.platform.is('cordova')) {
      this.network.onDisconnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Online) {
          this.updateDeviceNetworkStatus(ConnectionStatus.Offline);
        }
      });

      this.network.onConnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Offline) {
          this.updateDeviceNetworkStatus(ConnectionStatus.Online);
        }
      });
    } else {
      fromEvent(window, 'offline').subscribe((result) => {
        this.updateDeviceNetworkStatus(ConnectionStatus.Offline);
      });

      fromEvent(window, 'online').subscribe((result) => {
        this.updateDeviceNetworkStatus(ConnectionStatus.Online);
      });
    }
  }

  private async updateDeviceNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    this.handleNetworkNotifications(true);
  }


  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  public async handleNetworkNotifications(showAlertPopUp?: boolean): Promise<ConnectionStatus> {
    if (this.getCurrentNetworkStatus() === 0 && this.getCurrentNetworkStatus() === this.previousState) {
      return;
    }
    const connection = this.getCurrentNetworkStatus() === ConnectionStatus.Offline ? '_offline_key' : '_online_key';
    if ((this.getCurrentNetworkStatus() !== this.previousState && this.getCurrentNetworkStatus() === 1) || (this.getCurrentNetworkStatus() === 0)) {
      const alertMessage = CommonUtils.translate(`you_are_now${connection}`);
      if (showAlertPopUp) {
        if (this.status.getValue() === ConnectionStatus.Offline) {
          const alertOptions: IOptionsAlert = {
            imageName: CommonUtils.getCssVariableValue('--ps-no-network-image-name'),
            title: CommonUtils.translate('warning_key'),
            message: alertMessage
          };
          CommonUtils.presentPopUpMessage(alertOptions, 'ps-network-status-alert');
        } else {
          CommonUtils.presentSuccessAlert(alertMessage);
        }
      }

      if (this.getCurrentNetworkStatus() === ConnectionStatus.Online) {
        await this.toastController.dismiss();
      }
      const toast = this.toastController.create({
        message: alertMessage,
        duration: this.getCurrentNetworkStatus() === ConnectionStatus.Offline ? undefined : 3000,
        position: 'top'
      });
      toast.then((toast$) => {
        toast$.present();
      });

      this.previousState = this.getCurrentNetworkStatus();
      return this.getCurrentNetworkStatus();
    }
  }

}
