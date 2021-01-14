import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsButtonLogoutComponent } from './ps-button-logout.component';


@NgModule({
    declarations: [PsButtonLogoutComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsButtonLogoutComponent],
    entryComponents: [PsButtonLogoutComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsButtonLogoutModule { }
