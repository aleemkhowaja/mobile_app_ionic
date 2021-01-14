import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsImageLoggedinUserModule } from '../../ps-action-image/ps-image-loggedin-user/ps-image-loggedin-user.module';
import { PsLabelUserEmailComponentModule } from '../../ps-label/ps-label-user-email/ps-label-user-email.component.module';
import { PsLabelUserLastLoginComponentModule } from '../../ps-label/ps-label-user-last-login/ps-label-user-last-login.component.module';
import { PsLabelWelcomeComponentModule } from '../../ps-label/ps-label-welcome/ps-label-welcome.component.module';
import { PsLovPreferredLanguageComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.module';
import { PsComplexUserProfileMenuComponent } from './ps-complex-user-profile-menu.component';

@NgModule({
    declarations: [
        PsComplexUserProfileMenuComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsLabelWelcomeComponentModule,
        PsLabelUserEmailComponentModule,
        PsLabelUserLastLoginComponentModule,
        PsImageLoggedinUserModule,
        PsLovPreferredLanguageComponentModule,
        RouterModule.forChild([
        ]),
    ],
    exports: [
        PsComplexUserProfileMenuComponent
    ],
    entryComponents: [
        PsComplexUserProfileMenuComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexUserProfileMenuModule { }
