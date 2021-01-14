import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexCifIdTypesComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-id-types/ps-complex-cif-id-types.component';
import { PsDropdownCifTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cif-types/ps-dropdown-cif-types.component.module';
import { PsComplexIdDetailsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.module';

@NgModule({
    declarations: [
        PsComplexCifIdTypesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownCifTypesComponentModule,
        PsComplexIdDetailsModule
    ],
    exports: [
        PsComplexCifIdTypesComponent
    ],
    entryComponents: [PsComplexCifIdTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class  PsComplexCifIdTypesComponentModule { }