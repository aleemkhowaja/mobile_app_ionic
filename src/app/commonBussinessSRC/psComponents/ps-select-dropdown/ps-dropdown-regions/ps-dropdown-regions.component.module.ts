import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownRegionsComponent } from './ps-dropdown-regions.component';

@NgModule({
    declarations: [PsDropdownRegionsComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownRegionsComponent],
    entryComponents: [PsDropdownRegionsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

//Author: GRadwan 16/01/2020

export class PsDropdownRegionsComponentModule { }
