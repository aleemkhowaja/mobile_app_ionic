import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PsTemplatePopupMessagePage } from './ps-template-popup-message.page';
import { SharedModule } from '../../shared.module';
import { PsComponentsModule } from '../../psComponents/ps-components.module';

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,

  ],
  declarations: [PsTemplatePopupMessagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [PsTemplatePopupMessagePage],
})
export class PsTemplatePopupMessagePageModule { }
