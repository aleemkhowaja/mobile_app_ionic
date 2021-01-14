import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownOccupationComponent } from './ps-dropdown-occupation.component';



@NgModule({
    declarations: [
        PsDropdownOccupationComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownOccupationComponent
    ],
    entryComponents: [
        PsDropdownOccupationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownOccupationComponentModule { }