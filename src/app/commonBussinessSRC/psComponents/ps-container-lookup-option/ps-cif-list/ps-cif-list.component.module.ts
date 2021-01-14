import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsOptionCifReportListComponent } from './ps-cif-list.component';

@NgModule({
    declarations: [PsOptionCifReportListComponent],
    imports: [SharedModule, PsComponentsModule],
    exports: [PsOptionCifReportListComponent],
    entryComponents: [PsOptionCifReportListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsOptionCifReportListComponentModule {

}