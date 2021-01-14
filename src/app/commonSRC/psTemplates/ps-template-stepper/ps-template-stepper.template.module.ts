import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComplexDraftsReportsLoaderPageModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-drafts-reports-loader/ps-complex-drafts-reports-loader.component.module';
import { PsComplexTermsAndConditionsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.module';
import { PsDraftsReportPageModule } from 'src/app/commonBussinessSRC/psComponents/ps-drafts-report/ps-drafts-report.component.module';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateAlertControllerModule } from '../ps-template-alert-controller/ps-template-alert-controller.template.module';
import { PsComplexPreviewModule } from '../ps-template-preview/ps-complex-preview.template.module';
import { PsTemplateScreenPageModule } from '../ps-template-screen/ps-template-screen.template.module';
import { PsTemplateStepper } from './ps-template-stepper.template';

@NgModule({
  declarations: [PsTemplateStepper],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexPreviewModule,
    PsTemplateScreenPageModule,
    PsComplexTermsAndConditionsModule,
    PsComplexDraftsReportsLoaderPageModule,
    PsDraftsReportPageModule,
    PsTemplateAlertControllerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [PsTemplateStepper],
  exports: [PsTemplateStepper],
})
export class PsTemplateStepperModule { }
