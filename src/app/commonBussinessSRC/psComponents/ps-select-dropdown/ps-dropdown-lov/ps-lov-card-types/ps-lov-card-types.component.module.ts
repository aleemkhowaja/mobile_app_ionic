import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovCardTypesComponent } from './ps-lov-card-types.component';

@NgModule({
    declarations: [
        PsLovCardTypesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [
        PsLovCardTypesComponent
    ],
    entryComponents: [
        PsLovCardTypesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovCardTypesComponentModule { }
