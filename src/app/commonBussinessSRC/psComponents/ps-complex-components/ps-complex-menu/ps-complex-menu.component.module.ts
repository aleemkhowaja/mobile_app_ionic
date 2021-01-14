import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComplexMenuComponent } from './ps-complex-menu.component';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';


@NgModule({
    declarations: [PsComplexMenuComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsComplexMenuComponent],
    entryComponents: [PsComplexMenuComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexMenuModule { }
