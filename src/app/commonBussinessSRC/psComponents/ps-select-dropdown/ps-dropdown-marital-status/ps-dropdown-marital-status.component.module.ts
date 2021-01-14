import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownMaritalStatusComponent } from './ps-dropdown-marital-status.component';

@NgModule({
    declarations: [PsDropdownMaritalStatusComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownMaritalStatusComponent],
    entryComponents: [PsDropdownMaritalStatusComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownMaritalStatusComponentModule { }
