import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownInsuranceCompanyComponent } from './ps-dropdown-insurance-company.component';



@NgModule({
    declarations: [
        PsDropdownInsuranceCompanyComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownInsuranceCompanyComponent
    ],
    entryComponents: [
        PsDropdownInsuranceCompanyComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownInsuranceCompanyComponentModule { }