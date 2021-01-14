import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInternalBeneficiaryComponent } from './ps-internal-beneficiary.component';


@NgModule({
    declarations: [PsInternalBeneficiaryComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsInternalBeneficiaryComponent],
    entryComponents: [PsInternalBeneficiaryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInternalBeneficiaryComponentModule { }
