import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsLocalBeneficiaryComponent } from './ps-local-beneficiary.component';


@NgModule({
    declarations: [PsLocalBeneficiaryComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsLocalBeneficiaryComponent],
    entryComponents: [PsLocalBeneficiaryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLocalBeneficiaryComponentModule { }
