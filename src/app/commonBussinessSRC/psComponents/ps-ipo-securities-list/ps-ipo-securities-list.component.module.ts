import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsIpoSecuritiesListComponent } from './ps-ipo-securities-list.component';


@NgModule({
    declarations: [
        PsIpoSecuritiesListComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsIpoSecuritiesListComponent
    ],
    entryComponents: [
        PsIpoSecuritiesListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsIpoSecuritiesListComponentModule { }
