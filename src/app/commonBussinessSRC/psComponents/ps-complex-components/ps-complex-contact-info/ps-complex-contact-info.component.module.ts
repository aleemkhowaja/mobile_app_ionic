import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsEntityPhoneNumberComponentModule } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

import { PsInputEmailComponentModule } from '../../ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PscomplexContactInfoComponent } from './ps-complex-contact-info.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PscomplexContactInfoComponent],
    exports: [PscomplexContactInfoComponent],
    entryComponents: [PscomplexContactInfoComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputEmailComponentModule,
        PsInputVarcharComponentModule,
        PsEntityPhoneNumberComponentModule
    ],
})
export class PscomplexContactInfoComponentModule {}
