import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateScreenPageModule } from '../ps-template-screen/ps-template-screen.template.module';
import { PsTemplateForm } from './ps-template-form.template';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateScreenPageModule
  ],
  declarations: [PsTemplateForm],
  exports: [PsTemplateForm],
  entryComponents: [PsTemplateForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsTemplateFormModule { }
