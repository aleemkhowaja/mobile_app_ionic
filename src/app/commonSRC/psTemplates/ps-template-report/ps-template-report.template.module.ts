import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComplexReportFilterCriteriaComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-report-filter-criteria/ps-complex-report-filter-criteria.component.module';
import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateScreenPageModule } from '../ps-template-screen/ps-template-screen.template.module';
import { PsTemplateReport } from './ps-template-report.template';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateScreenPageModule,
    PsComplexReportFilterCriteriaComponentModule
  ],
  declarations: [PsTemplateReport],
  exports: [PsTemplateReport],
  entryComponents: [PsTemplateReport],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsTemplateReportModule { }
