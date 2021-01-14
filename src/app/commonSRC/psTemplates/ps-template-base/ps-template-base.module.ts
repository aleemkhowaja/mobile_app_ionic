import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../psComponents/ps-components.module';
import { PsTemplateBasePage } from './ps-template-base.page';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    /* PsComplexMenuHeaderContainerModule, */
    /* RouterModule.forChild([
      {
        path: '',
        component: PsTemplateBasePage
      }
    ]) */
  ],
  declarations: [PsTemplateBasePage],
  exports: [PsTemplateBasePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [PsTemplateBasePage],
})
export class PsTemplateBasePageModule { }
