import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownPeriodicityFactorOptionsComponent } from './ps-dropdown-periodicity-factor.component';


@NgModule({
    declarations: [PsDropdownPeriodicityFactorOptionsComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownPeriodicityFactorOptionsComponent],
    entryComponents: [PsDropdownPeriodicityFactorOptionsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownPeriodicityFactorOptionsComponentModule { }
