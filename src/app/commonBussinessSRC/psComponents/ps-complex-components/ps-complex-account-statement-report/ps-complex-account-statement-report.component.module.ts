import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexAccountStatementReportComponent } from './ps-complex-account-statement-report.component';

@NgModule({
    declarations: [
        PsComplexAccountStatementReportComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
    ],
    exports: [
        PsComplexAccountStatementReportComponent
    ],
    entryComponents: [
        PsComplexAccountStatementReportComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexAccountStatementReportComponentModule { }
