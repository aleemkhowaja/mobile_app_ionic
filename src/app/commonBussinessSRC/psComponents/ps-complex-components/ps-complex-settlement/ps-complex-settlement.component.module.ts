import { PsLovSettlementTypeComponentModule } from './../../ps-select-dropdown/ps-dropdown-lov/ps-lov-settlement-type/ps-lov-settlement-type.component.module';
import { PsComplexSettlementComponent } from './ps-complex-settlement.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';

@NgModule({
  declarations: [
    PsComplexSettlementComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsLovSettlementTypeComponentModule,
    PsInputNumericComponentModule
  ],
  exports: [
    PsComplexSettlementComponent
  ],
  entryComponents: [
    PsComplexSettlementComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexSettlementComponentModule { }
