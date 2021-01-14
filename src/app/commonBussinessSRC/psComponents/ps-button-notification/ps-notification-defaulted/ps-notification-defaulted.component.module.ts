import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexNotificationComponentModule } from '../../ps-complex-components/ps-complex-notification/ps-complex-notification.component.module';
import { PsNotificationDefaultedComponent } from './ps-notification-defaulted.component';

@NgModule({
  declarations: [PsNotificationDefaultedComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexNotificationComponentModule

  ],
  exports: [PsNotificationDefaultedComponent],
  entryComponents: [PsNotificationDefaultedComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsNotificationDefaultedComponentModule { }