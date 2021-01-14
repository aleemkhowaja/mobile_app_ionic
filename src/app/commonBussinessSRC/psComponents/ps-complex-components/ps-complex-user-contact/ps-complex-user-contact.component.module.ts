import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsEntityPhoneNumberComponentModule } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

import { PsInputEmailComponentModule } from '../../ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsComplexUserContactComponent } from './ps-complex-user-contact.component';



@NgModule({
    declarations: [
        PsComplexUserContactComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputEmailComponentModule,
        PsEntityPhoneNumberComponentModule
    ],
    exports: [
        PsComplexUserContactComponent
    ],
    entryComponents: [
        PsComplexUserContactComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexUserContactComponentModule { }