import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsAccountsListComponent } from './ps-accounts-list.component';

@NgModule({
    declarations: [PsAccountsListComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsAccountsListComponent],
    entryComponents: [PsAccountsListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsAccountsListComponentModule { }
