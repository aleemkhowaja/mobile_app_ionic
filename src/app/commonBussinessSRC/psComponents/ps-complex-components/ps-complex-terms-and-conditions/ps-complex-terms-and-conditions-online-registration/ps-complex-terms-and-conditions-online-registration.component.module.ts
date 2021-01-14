import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexTermsAndConditionsModule } from '../ps-complex-terms-and-conditions.module';
import { PsComplexTermsAndConditionsOnlineRegistrationComponent } from './ps-complex-terms-and-conditions-online-registration.component';


@NgModule({
    declarations: [PsComplexTermsAndConditionsOnlineRegistrationComponent],
    imports: [
        SharedModule,
        PsComplexTermsAndConditionsModule
    ],
    exports: [PsComplexTermsAndConditionsOnlineRegistrationComponent],
    entryComponents: [PsComplexTermsAndConditionsOnlineRegistrationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexTermsAndConditionsOnlineRegistrationModule { }
