import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsLabelUserLastLoginComponentModule } from '../../ps-label/ps-label-user-last-login/ps-label-user-last-login.component.module';
import { PsLabelWelcomeComponentModule } from '../../ps-label/ps-label-welcome/ps-label-welcome.component.module';
import { PsDropdownAllowedLanguagesComponentModule } from '../../ps-select-dropdown/ps-dropdown-allowed-languages/ps-dropdown-allowed-languages.component.module';
import { PsComplexProfileComponent } from './ps-complex-profile.component';

@NgModule({
    declarations: [
        PsComplexProfileComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsLabelWelcomeComponentModule,
        PsLabelUserLastLoginComponentModule,
        PsDropdownAllowedLanguagesComponentModule
    ],
    exports: [
        PsComplexProfileComponent,

    ],
    entryComponents: [
        PsComplexProfileComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexProfileComponentModule { }