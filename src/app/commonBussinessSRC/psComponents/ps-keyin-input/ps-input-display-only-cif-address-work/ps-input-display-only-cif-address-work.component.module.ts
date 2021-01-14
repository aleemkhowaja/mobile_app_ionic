import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsInputDisplayOnlyCIFAddressWorkComponent } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';

@NgModule({
    declarations: [
        PsInputDisplayOnlyCIFAddressWorkComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputDisplayOnlyCIFAddressWorkComponent
    ],
    entryComponents: [PsInputDisplayOnlyCIFAddressWorkComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputDisplayOnlyCIFAddressWorkComponentModule { }