import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsSelectLookupOptionListComponent } from './ps-select-lookup-option-list.component';

@NgModule({
    declarations: [
        PsSelectLookupOptionListComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsSelectLookupOptionListComponent
    ],
    entryComponents: [
        PsSelectLookupOptionListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsSelectLookupOptionListComponentModule { }
