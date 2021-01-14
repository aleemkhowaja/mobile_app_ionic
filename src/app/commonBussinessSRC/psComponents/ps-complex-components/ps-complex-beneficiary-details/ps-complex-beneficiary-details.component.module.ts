import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsEntityPhoneNumberComponentModule } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

import { PsInputAccountNumberComponentModule } from '../../ps-keyin-input/ps-input-account-number/ps-input-account-number.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownCurrenciesComponentModule } from '../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsComplexAddressComponentModule } from '../ps-complex-address/ps-complex-address.component.module';
import { PsComplexBeneficiaryDetailsComponent } from './ps-complex-beneficiary-details.component';


@NgModule({
    declarations: [
        PsComplexBeneficiaryDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsComplexAddressComponentModule,
        PsInputAccountNumberComponentModule,
        PsDropdownCurrenciesComponentModule,
        PsEntityPhoneNumberComponentModule
    ],
    exports: [
        PsComplexBeneficiaryDetailsComponent
    ],
    entryComponents: [
        PsComplexBeneficiaryDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexBeneficiaryDetailsComponentModule {}
