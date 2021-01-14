import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsOptionExpiredSecurityComponent } from './ps-option-expired-security.component';

@NgModule({
    declarations: [PsOptionExpiredSecurityComponent],
    imports: [SharedModule, PsComponentsModule],
    exports: [PsOptionExpiredSecurityComponent],
    entryComponents: [PsOptionExpiredSecurityComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsOptionExpiredSecurityComponentModule {

}