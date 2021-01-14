import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsOptionCardComponent } from './ps-option-card.component';

@NgModule({
    declarations: [PsOptionCardComponent],
    imports:
        [
            SharedModule,
            PsComponentsModule
        ],
    exports: [PsOptionCardComponent],
    entryComponents: [PsOptionCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsOptionCardComponentModule { }