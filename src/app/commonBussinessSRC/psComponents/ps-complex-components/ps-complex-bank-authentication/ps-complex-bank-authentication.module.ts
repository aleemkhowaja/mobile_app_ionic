import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputAccountNumberComponentModule } from '../../ps-keyin-input/ps-input-account-number/ps-input-account-number.module';
import { PsInputCardNumberComponentModule } from '../../ps-keyin-input/ps-input-card-number/ps-input-card-number.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexBankAuthenticationComponent } from './ps-complex-bank-authentication.component';

@NgModule({
    declarations: [
        PsComplexBankAuthenticationComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputAccountNumberComponentModule,
        PsInputVarcharComponentModule,
        PsInputCardNumberComponentModule,
    ],
    exports: [
        PsComplexBankAuthenticationComponent
    ],
    entryComponents: [PsComplexBankAuthenticationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexBankAuthenticationComponentModule { }
