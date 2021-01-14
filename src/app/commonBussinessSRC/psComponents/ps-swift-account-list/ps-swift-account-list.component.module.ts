import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsSwiftAccountListComponent } from './ps-swift-account-list.component';


@NgModule({
    declarations: [PsSwiftAccountListComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsSwiftAccountListComponent],
    entryComponents: [PsSwiftAccountListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsSwiftAccountListComponentModule { }
