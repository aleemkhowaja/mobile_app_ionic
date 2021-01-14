import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsLabelUserLastLoginComponent } from './ps-label-user-last-login.component';

@NgModule({
    declarations: [PsLabelUserLastLoginComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsLabelUserLastLoginComponent],
    entryComponents: [PsLabelUserLastLoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers:[DatePipe]
})
export class PsLabelUserLastLoginComponentModule { }
