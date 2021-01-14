import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownEcoSectorsComponent } from './ps-dropdown-eco-sectors.component';

@NgModule({
    declarations: [
        PsDropdownEcoSectorsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownEcoSectorsComponent
    ],
    entryComponents: [
        PsDropdownEcoSectorsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownEcoSectorsComponentModule { }