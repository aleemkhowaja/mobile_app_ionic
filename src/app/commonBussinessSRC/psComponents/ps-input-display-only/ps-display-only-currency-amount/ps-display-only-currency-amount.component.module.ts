import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCurrenciesComponentModule } from '../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsDisplayOnlyCurrencyAmountComponent } from './ps-display-only-currency-amount.component';

@NgModule({
    declarations: [PsDisplayOnlyCurrencyAmountComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownCurrenciesComponentModule
    ],
    exports: [PsDisplayOnlyCurrencyAmountComponent],
    entryComponents: [PsDisplayOnlyCurrencyAmountComponent],
})
export class PsDisplayOnlyCurrencyAmountComponentModule { }
