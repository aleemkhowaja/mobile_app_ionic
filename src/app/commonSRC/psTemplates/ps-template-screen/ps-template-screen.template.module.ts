import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateBasePageModule } from '../ps-template-base/ps-template-base.module';
import { PsTemplateScreenPage } from './ps-template-screen.template';



@NgModule({
  imports: [
    SharedModule,
    PsTemplateBasePageModule,
    PsComponentsModule
  ],
  declarations: [PsTemplateScreenPage],
  entryComponents: [PsTemplateScreenPage],
  exports: [PsTemplateScreenPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsTemplateScreenPageModule { }
