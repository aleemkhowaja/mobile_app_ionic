import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInternationalBeneficiaryComponent } from './ps-international-beneficiary.component';


@NgModule({
    declarations: [PsInternationalBeneficiaryComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsInternationalBeneficiaryComponent],
    entryComponents: [PsInternationalBeneficiaryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInternationalBeneficiaryComponentModule { }
