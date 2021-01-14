import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PsComplexTermsAndConditionsComponent } from './ps-complex-terms-and-conditions.component';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';


@NgModule({
    declarations: [PsComplexTermsAndConditionsComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsComplexTermsAndConditionsComponent],
    entryComponents: [PsComplexTermsAndConditionsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexTermsAndConditionsModule { }
