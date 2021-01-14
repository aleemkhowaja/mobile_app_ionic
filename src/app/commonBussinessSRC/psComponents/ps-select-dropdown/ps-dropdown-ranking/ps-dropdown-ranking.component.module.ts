import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownRankingComponent } from './ps-dropdown-ranking.component';

@NgModule({
    declarations: [PsDropdownRankingComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownRankingComponent],
    entryComponents: [PsDropdownRankingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownRankingComponentModule { }