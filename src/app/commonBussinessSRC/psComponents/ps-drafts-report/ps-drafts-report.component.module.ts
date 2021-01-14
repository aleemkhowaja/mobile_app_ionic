import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDraftsReportComponent } from './ps-drafts-report.component';


@NgModule({
  declarations: [PsDraftsReportComponent],
  imports: [SharedModule, PsComponentsModule, RoundProgressModule],
  exports: [PsDraftsReportComponent],
  entryComponents: [PsDraftsReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDraftsReportPageModule { }
