import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsDropdownActivityComponent } from './ps-dropdown-activity.component';




@NgModule({
    declarations: [
        PsDropdownActivityComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownActivityComponent
    ],
    entryComponents: [
        PsDropdownActivityComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownActivityComponentModule { }