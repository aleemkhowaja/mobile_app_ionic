import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsLabelUserEmailComponent } from './ps-label-user-email.component';

@NgModule({
    declarations: [PsLabelUserEmailComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsLabelUserEmailComponent],
    entryComponents: [PsLabelUserEmailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLabelUserEmailComponentModule { }
