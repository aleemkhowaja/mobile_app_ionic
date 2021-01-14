import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownEcoSectorsComponentModule } from '../../ps-select-dropdown/ps-dropdown-eco-sectors/ps-dropdown-eco-sectors.component.module';
import { PsDropdownSubEcoSectorsComponentModule } from '../../ps-select-dropdown/ps-dropdown-sub-eco-sectors/ps-dropdown-sub-eco-sectors.component.module';
import { PsComplexEcoSectorComponent } from './ps-complex-eco-sector.component';

@NgModule({
    declarations: [PsComplexEcoSectorComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownEcoSectorsComponentModule,
        PsDropdownSubEcoSectorsComponentModule
    ],
    exports: [PsComplexEcoSectorComponent],
    entryComponents: [PsComplexEcoSectorComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexEcoSectorModule { }