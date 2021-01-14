import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownNationalitiesComponent } from './ps-dropdown-nationalities.component';


@NgModule({
    declarations: [
        PsDropdownNationalitiesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownNationalitiesComponent
    ],
    entryComponents: [
        PsDropdownNationalitiesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownNationalitiesComponentModule { }