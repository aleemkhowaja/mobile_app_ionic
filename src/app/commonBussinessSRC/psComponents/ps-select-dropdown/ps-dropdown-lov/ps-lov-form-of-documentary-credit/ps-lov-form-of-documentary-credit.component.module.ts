import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovFormOfDocumentaryCreditComponent } from './ps-lov-form-of-documentary-credit.component';




@NgModule({
    declarations: [PsLovFormOfDocumentaryCreditComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovFormOfDocumentaryCreditComponent],
    entryComponents: [PsLovFormOfDocumentaryCreditComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovFormOfDocumentaryCreditComponentModule { }