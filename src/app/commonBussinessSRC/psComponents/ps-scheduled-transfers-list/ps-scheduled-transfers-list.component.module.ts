import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsScheduledTransfersListComponent } from './ps-scheduled-transfers-list.component';



@NgModule({
    declarations: [PsScheduledTransfersListComponent],
    imports: [
        SharedModule,
       PsComponentsModule
    ],
    exports: [PsScheduledTransfersListComponent],
    entryComponents: [PsScheduledTransfersListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsScheduledTransfersListComponentModule { }