import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovMeansOfTransportationComponent } from './ps-lov-means-of-transportation.component';




@NgModule({
    declarations: [PsLovMeansOfTransportationComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovMeansOfTransportationComponent],
    entryComponents: [PsLovMeansOfTransportationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovMeansOfTransportationComponentModule { }