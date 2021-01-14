import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownBillersCategoryComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-billers-category/ps-dropdown-billers-category.component';

@NgModule({
    declarations: [PsDropdownBillersCategoryComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownBillersCategoryComponent],
    entryComponents: [PsDropdownBillersCategoryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownBillersCategoryComponentModule { }
