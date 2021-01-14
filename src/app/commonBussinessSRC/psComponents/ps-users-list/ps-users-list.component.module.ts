import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsUsersListComponent } from './ps-users-list.component';
import { PsSelectLookupOptionListComponentModule } from '../ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';

@NgModule({
    declarations: [PsUsersListComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsSelectLookupOptionListComponentModule
        
    ],
    exports: [PsUsersListComponent],
    entryComponents: [PsUsersListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsUsersListComponentModule { }
