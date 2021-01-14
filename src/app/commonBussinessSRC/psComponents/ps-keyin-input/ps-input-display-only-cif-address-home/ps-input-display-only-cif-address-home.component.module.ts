import { PsInputDisplayOnlyCIFAddressHomeComponent } from './ps-input-display-only-cif-address-home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';

@NgModule({
    declarations: [
        PsInputDisplayOnlyCIFAddressHomeComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputDisplayOnlyCIFAddressHomeComponent
    ],
    entryComponents: [PsInputDisplayOnlyCIFAddressHomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputDisplayOnlyCIFAddressHomeComponentModule { }