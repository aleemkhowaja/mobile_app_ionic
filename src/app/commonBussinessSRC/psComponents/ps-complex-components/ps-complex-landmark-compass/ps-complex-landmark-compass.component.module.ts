import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsSelectLookupOptionListComponentModule } from '../../ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';
import { PsComplexLandmarkCompassComponent } from './ps-complex-landmark-compass.component';

@NgModule({
    declarations: [PsComplexLandmarkCompassComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsSelectLookupOptionListComponentModule
    ],
    exports: [PsComplexLandmarkCompassComponent],
    entryComponents: [PsComplexLandmarkCompassComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexLandmarkCompassComponentModule { }
