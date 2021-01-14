import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsEntityPhoneNumberComponentModule } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

import { PsInputEmailComponentModule } from '../../ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexAddressComponentModule } from '../ps-complex-address/ps-complex-address.component.module';
import { PsComplexCifDetailsComponent } from './ps-complex-cif-details.component';


@NgModule({
    declarations: [
        PsComplexCifDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputFreeTextComponentModule,
        PsInputNumericComponentModule,
        PsComplexAddressComponentModule,
        PsInputVarcharComponentModule,
        PsInputEmailComponentModule,
        PsEntityPhoneNumberComponentModule
    ],
    exports: [
        PsComplexCifDetailsComponent
    ],
    entryComponents: [
        PsComplexCifDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexCifDetailsComponentModule { }