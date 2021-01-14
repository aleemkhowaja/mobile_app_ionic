import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexProfileComponentModule } from '../ps-complex-profile/ps-complex-profile.component.module';
import { PsComplexUserProfileMenuModule } from '../ps-complex-user-profile-menu/ps-complex-user-profile-menu.module';
import { PsComplexMenuHeaderContainerComponent } from './ps-complex-menu-header-container.component';

@NgModule({
    declarations: [PsComplexMenuHeaderContainerComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexUserProfileMenuModule,
        PsComplexProfileComponentModule

    ],
    exports: [PsComplexMenuHeaderContainerComponent],
    entryComponents: [PsComplexMenuHeaderContainerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexMenuHeaderContainerModule { }
