import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsActionButtonEmailUsDefaultedModule } from '../../ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component.module';
import { PsNotificationDefaultedComponentModule } from '../../ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.module';
import { PsDraftsReportPageModule } from '../../ps-drafts-report/ps-drafts-report.component.module';
import { PsComplexInfoComponentModule } from '../ps-complex-info/ps-complex-info.component.module';
import { PsComplexMenuReachComponent } from './ps-complex-menu-reach.component';


@NgModule({
    declarations: [
        PsComplexMenuReachComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsActionButtonEmailUsDefaultedModule,
        PsNotificationDefaultedComponentModule,
        PsComplexInfoComponentModule,
        PsDraftsReportPageModule

    ],
    exports: [
        PsComplexMenuReachComponent
    ],
    entryComponents: [
        PsComplexMenuReachComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PsComplexMenuReachComponentModule { }