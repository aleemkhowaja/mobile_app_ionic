import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCurrenciesComponentModule } from '../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsComplexAmountComponent } from './ps-complex-amount.component';

@NgModule({
    declarations: [PsComplexAmountComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownCurrenciesComponentModule
    ],
    exports: [PsComplexAmountComponent],
    entryComponents: [PsComplexAmountComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexAmountComponentModule { }
