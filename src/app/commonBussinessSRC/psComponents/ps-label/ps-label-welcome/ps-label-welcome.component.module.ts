import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsLabelWelcomeComponent } from './ps-label-welcome.component';

@NgModule({
    declarations: [PsLabelWelcomeComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsLabelWelcomeComponent],
    entryComponents: [PsLabelWelcomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLabelWelcomeComponentModule { }
