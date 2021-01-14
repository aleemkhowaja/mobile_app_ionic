import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownRegionsComponentModule } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.module';
import { PsComplexPoBoxComponent } from './ps-complex-po-box.component';




@NgModule({
    declarations: [PsComplexPoBoxComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownRegionsComponentModule,
        PsInputVarcharComponentModule,

    ],
    exports: [PsComplexPoBoxComponent],
    entryComponents: [PsComplexPoBoxComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexPoBoxComponentModule { }
