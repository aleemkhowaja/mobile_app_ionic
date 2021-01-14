import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDateMonthYearFutureComponentModule } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.module';
import { PsInputCardCvvComponentModule } from '../../ps-keyin-input/ps-input-card-cvv/ps-input-card-cvv.component.module';
import { PsInputCardNumberComponentModule } from '../../ps-keyin-input/ps-input-card-number/ps-input-card-number.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsComplexCreditCardComponent } from './ps-complex-credit-card.component';



@NgModule({
  declarations: [PsComplexCreditCardComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputNumericComponentModule,
    PsInputCardCvvComponentModule,
    PsInputCardNumberComponentModule,
    PsInputFreeTextComponentModule,
    PsDateMonthYearFutureComponentModule
  ],
  exports: [PsComplexCreditCardComponent],
  entryComponents: [PsComplexCreditCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexCreditCardComponentModule { }
