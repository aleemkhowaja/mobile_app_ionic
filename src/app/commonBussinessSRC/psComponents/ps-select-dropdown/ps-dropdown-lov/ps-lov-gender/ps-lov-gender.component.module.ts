import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovGenderComponent } from './ps-lov-gender.component';




@NgModule({
    declarations: [PsLovGenderComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovGenderComponent],
    entryComponents: [PsLovGenderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovGenderComponentModule { }