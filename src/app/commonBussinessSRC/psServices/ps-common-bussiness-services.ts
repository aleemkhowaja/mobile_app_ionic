import { AuthenticationMatrixService } from './authentication-matrix/authentication-matrix.service';
import { InterceptorService } from './interceptor/interceptor.service';
import { OmniCommonService } from './omni-common/omni-common.service';
import { OmniPullService } from './omni-common/omni-pull.service';
import { OmniPushService } from './omni-common/omni-push.service';

export const PS_COMMON_BUSSINESS_SERVICES = [
    OmniCommonService,
    InterceptorService,
    OmniPullService,
    OmniPushService,
    AuthenticationMatrixService
];

