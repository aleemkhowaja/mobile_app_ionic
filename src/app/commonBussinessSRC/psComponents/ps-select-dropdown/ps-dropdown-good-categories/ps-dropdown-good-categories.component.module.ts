import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownGoodCategoriesComponent } from './ps-dropdown-good-categories.component';

@NgModule({
  declarations: [
    PsDropdownGoodCategoriesComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsDropdownGoodCategoriesComponent
  ],
  entryComponents: [
    PsDropdownGoodCategoriesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownGoodCategoriesComponentModule { }
