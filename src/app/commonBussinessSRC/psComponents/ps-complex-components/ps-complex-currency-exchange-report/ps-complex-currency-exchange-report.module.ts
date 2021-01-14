import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexCurrencyExchangeReportComponent } from './ps-complex-currency-exchange-report.component';

@NgModule({
    declarations: [
        PsComplexCurrencyExchangeReportComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
    ],
    exports: [
        PsComplexCurrencyExchangeReportComponent
    ],
    entryComponents: [
        PsComplexCurrencyExchangeReportComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexCurrencyExchangeReportModule { }
