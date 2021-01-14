import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsDropDownIdTypesComponent } from './ps-dropdown-id-types.component';

@NgModule({
    declarations: [
        PsDropDownIdTypesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [
        PsDropDownIdTypesComponent
    ],
    entryComponents: [
        PsDropDownIdTypesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropDownIdTypesComponentModule { }
