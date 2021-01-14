import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownSubEcoSectorsComponent } from './ps-dropdown-sub-eco-sectors.component';

@NgModule({
    declarations: [
        PsDropdownSubEcoSectorsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownSubEcoSectorsComponent
    ],
    entryComponents: [
        PsDropdownSubEcoSectorsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownSubEcoSectorsComponentModule { }