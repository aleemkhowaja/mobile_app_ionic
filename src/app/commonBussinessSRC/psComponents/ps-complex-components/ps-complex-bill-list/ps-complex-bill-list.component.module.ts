import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexBillItemComponentModule } from './../ps-complex-bill-item/ps-complex-bill-item.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsComplexBillListComponent } from './ps-complex-bill-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

@NgModule({
  declarations: [
    PsComplexBillListComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexBillItemComponentModule,
    PsInputFreeTextComponentModule,
    PsInputVarcharComponentModule
  ],
  exports: [
    PsComplexBillListComponent
  ],
  entryComponents: [
    PsComplexBillListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexBillListComponentModule { }
