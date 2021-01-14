import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexNotificationComponent } from './ps-complex-notification.component';

@NgModule({
    declarations: [
        PsComplexNotificationComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsComplexNotificationComponent
    ],
    entryComponents: [
        PsComplexNotificationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexNotificationComponentModule { }