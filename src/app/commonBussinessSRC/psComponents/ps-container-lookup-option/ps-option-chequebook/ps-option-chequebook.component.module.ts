import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsOptionChequebookComponent } from './ps-option-chequebook.component';

@NgModule({
    declarations: [PsOptionChequebookComponent],
    imports: [SharedModule, PsComponentsModule],
    exports: [PsOptionChequebookComponent],
    entryComponents: [PsOptionChequebookComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsOptionChequebookComponentModule {

}