import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputCountComponentModule } from '../../ps-keyin-input/ps-input-count/ps-input-count.component.module';
import { PsDropdownProductTypesComponentModule } from '../../ps-select-dropdown/ps-dropdown-product-types/ps-dropdown-product-types.component.module';
import { PsComplexAmountComponentModule } from './../ps-complex-amount/ps-complex-amount.component.module';
import { PsComplexFinancialCalculatorComponent } from './ps-complex-financial-calculator.component';

@NgModule({
  declarations: [
    PsComplexFinancialCalculatorComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDropdownProductTypesComponentModule,
    PsComplexAmountComponentModule,
    PsInputCountComponentModule
  ],
  exports: [
    PsComplexFinancialCalculatorComponent
  ],
  entryComponents: [
    PsComplexFinancialCalculatorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexFinancialCalculatorComponentModule { }
