import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCurrenciesComponent } from './ps-dropdown-currencies.component';

@NgModule({
    declarations: [
        PsDropdownCurrenciesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownCurrenciesComponent
    ],
    entryComponents: [
        PsDropdownCurrenciesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCurrenciesComponentModule { }
