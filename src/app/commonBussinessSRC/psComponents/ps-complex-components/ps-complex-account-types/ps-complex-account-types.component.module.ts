import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownAccountTypesComponentModule } from '../../ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.module';
import { PsComplexAccountTypesComponent } from './ps-complex-account-types.component';

@NgModule({
    declarations: [
        PsComplexAccountTypesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownAccountTypesComponentModule
    ],
    exports: [
        PsComplexAccountTypesComponent
    ],
    entryComponents: [
        PsComplexAccountTypesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexAccountTypesComponentModule { }