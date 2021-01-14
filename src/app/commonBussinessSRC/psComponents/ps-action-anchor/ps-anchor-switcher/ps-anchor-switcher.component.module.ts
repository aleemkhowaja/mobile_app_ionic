import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsAnchorSwitcherComponent } from './ps-anchor-switcher.component';

@NgModule({
    declarations: [
        PsAnchorSwitcherComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsAnchorSwitcherComponent
    ],
    entryComponents: [
        PsAnchorSwitcherComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsAnchorSwitcherComponentModule { }