import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDraftsReportPageModule } from '../../ps-drafts-report/ps-drafts-report.component.module';
import { PsComplexDraftsReportsLoader } from './ps-complex-drafts-reports-loader.component';



@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDraftsReportPageModule
  ],
  declarations: [PsComplexDraftsReportsLoader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PsComplexDraftsReportsLoader],
  entryComponents: [PsComplexDraftsReportsLoader],
})
export class PsComplexDraftsReportsLoaderPageModule { }
