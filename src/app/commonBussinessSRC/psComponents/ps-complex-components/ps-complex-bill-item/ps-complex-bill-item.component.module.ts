import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexBillItemComponent } from './ps-complex-bill-item.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';

@NgModule({
  declarations: [
    PsComplexBillItemComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputVarcharComponentModule,
    PsInputFreeTextComponentModule,
    PsInputNumericComponentModule
  ],
  exports: [
    PsComplexBillItemComponent
  ],
  entryComponents: [
    PsComplexBillItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexBillItemComponentModule { }
