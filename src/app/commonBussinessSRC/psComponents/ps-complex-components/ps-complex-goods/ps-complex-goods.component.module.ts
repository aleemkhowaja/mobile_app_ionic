import { PsDropdownCountryComponentModule } from './../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsComplexGoodsComponent } from './ps-complex-goods.component';
import { PsDropdownGoodsComponentModule } from './../../ps-select-dropdown/ps-dropdown-goods/ps-dropdown-goods.component.module';
import { PsDropdownGoodCategoriesComponentModule } from './../../ps-select-dropdown/ps-dropdown-good-categories/ps-dropdown-good-categories.component.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

@NgModule({
  declarations: [
    PsComplexGoodsComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDropdownGoodsComponentModule,
    PsDropdownCountryComponentModule,
    PsDropdownGoodCategoriesComponentModule
  ],
  exports: [
    PsComplexGoodsComponent
  ],
  entryComponents: [
    PsComplexGoodsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexGoodsComponentModule { }
