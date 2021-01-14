import { Routes } from '@angular/router';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { ICustUrlParams } from '../../../psServices/models/ps-common-interface';

export const EXTENDED_ROUTES: Routes = [{ path: '', redirectTo: 'omni-login', pathMatch: 'full' }];
/**
 * @author RichardZourob
 * common functions used for customization special handling in the common code
 */
export class CommonCustUtils {

    constructor(/** no object should be injected here this a global classs and should not depend on any obejct from angular injector */) {
        throw new Error('Error: Instantiation failed: Use CommonUtils.methodName(...) instead of new.');
    }

    public static returnCustMode(): boolean {
        return false;
    }

    public static returnCustUrlParams(): ICustUrlParams {
        return;
    }
    public static putCustUrlParams(params: ICustUrlParams) {
        return;
    }
    public static returnReqBody(): any {
        return null;
    }
    public static putReqBody(body: any) {
        return;
    }

    public static returnChnlID(): number {
        return;
    }
    public static returnAppID(): number {
        return;
    }
    public static returnOperID(): number {
        return;
    }

    public static custAppInitialize() {
        return;
    }

    public static adjustPreLoginParams(prelogInParam) {
        return;
    }

    public static async preLoginReponseHandler(preLoginResponse) {
        const commonService: PsCommonService = CommonUtils.injectionHandler(PsCommonService);
        PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
        const res = await commonService.applyPageCustomization();
    }

    public static returnNavUrl(url) {
        return url;
    }

    public static returnResponse(res, req) {
        return null;
    }

    public static callMockService(req) {
        return null;
    }

    public static submitBtnCallServer() {
        return;
    }

    public static getDefaultIndicatorType(): {} {
        return { displayDefaultIndicatorType: true };
    }

    public static getStepperIconName() {
        return 'done';
    }
    public static getAllVariablesNamesFromSession(): string[] {
        return [];
    }

}

