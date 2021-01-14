import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCitiesComponent } from './ps-dropdown-cities.component';

// Author: GRadwan 16/01/2020

@NgModule({
    declarations: [PsDropdownCitiesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownCitiesComponent],
    entryComponents: [PsDropdownCitiesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCitiesComponentModule { }
