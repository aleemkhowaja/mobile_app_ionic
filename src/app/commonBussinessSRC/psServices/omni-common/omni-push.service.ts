import { Injectable } from '@angular/core';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOmniCommonCO } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { PsCommonService } from './../../../commonSRC/psServices/ps-common/ps-common.service';
import { ILoginRequest, ILoginResponse } from './../../../pages/omni-login/omni-login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OmniPushService {

  constructor(public commonService: PsCommonService) { }

  login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    return new Promise<ILoginResponse>((resolve) => {
      this.commonService.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.login, loginRequest).then(result => {
        resolve(result.data);
      }).catch(error => this.commonService.logger.log(error));
    });
  }


  genericActionFunc(request: any, actionUrl: string): Promise<ILoginResponse> {
    return new Promise<ILoginResponse>((resolve) => {
      this.commonService.http.commonRequestAjax(actionUrl, request).then(result => {
        resolve(result.data);
      }).catch(error => this.commonService.logger.log(error));
    });
  }

  deleteSubmitData(request: any): Promise<IOmniCommonCO> {
    return new Promise<IOmniCommonCO>((resolve) => {
      this.commonService.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.deleteSubmitData, request).then(result => {
        resolve(result);
      }).catch(error => this.commonService.logger.log(error));
    });
  }
}
