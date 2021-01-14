import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsTemplateAlertController } from './ps-template-alert-controller.template';




@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  declarations: [PsTemplateAlertController],
  entryComponents: [PsTemplateAlertController],
  exports: [PsTemplateAlertController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class PsTemplateAlertControllerModule { }
