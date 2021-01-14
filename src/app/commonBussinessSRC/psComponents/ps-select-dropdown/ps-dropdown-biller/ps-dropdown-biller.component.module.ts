import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsDropdownBillerComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-biller/ps-dropdown-biller.component';



@NgModule({
    declarations: [PsDropdownBillerComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownBillerComponent],
    entryComponents: [PsDropdownBillerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownBillerComponentModule { }
