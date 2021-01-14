import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComplexFilterAmountComponent } from './ps-complex-filter-amount.component';

@NgModule({
  declarations: [PsComplexFilterAmountComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsComplexFilterAmountComponent],
  entryComponents: [PsComplexFilterAmountComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexFilterAmountComponentModule { }
