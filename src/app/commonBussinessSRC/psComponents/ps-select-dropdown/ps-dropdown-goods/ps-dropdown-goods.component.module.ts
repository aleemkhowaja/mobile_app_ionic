import { PsDropdownGoodsComponent } from './ps-dropdown-goods.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';

@NgModule({
  declarations: [
    PsDropdownGoodsComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsDropdownGoodsComponent
  ],
  entryComponents: [
    PsDropdownGoodsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownGoodsComponentModule { }
