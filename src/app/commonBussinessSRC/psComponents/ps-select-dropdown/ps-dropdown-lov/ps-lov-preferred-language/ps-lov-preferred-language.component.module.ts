import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovPreferredLanguageComponent } from './ps-lov-preferred-language.component';

@NgModule({
    declarations: [PsLovPreferredLanguageComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovPreferredLanguageComponent],
    entryComponents: [PsLovPreferredLanguageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovPreferredLanguageComponentModule { }
