import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateScreenPageModule } from '../ps-template-screen/ps-template-screen.template.module';
import { PsTemplateView } from './ps-template-view.template';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateScreenPageModule
  ],
  declarations: [PsTemplateView],
  exports: [PsTemplateView],
  entryComponents: [PsTemplateView],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsTemplateViewModule { }
