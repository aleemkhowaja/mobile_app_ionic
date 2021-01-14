import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownAccountTypesComponent } from './ps-dropdown-account-types.component';

@NgModule({
    declarations: [PsDropdownAccountTypesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownAccountTypesComponent],
    entryComponents: [PsDropdownAccountTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownAccountTypesComponentModule { }
