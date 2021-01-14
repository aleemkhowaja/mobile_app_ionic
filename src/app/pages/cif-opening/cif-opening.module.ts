import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexAddressComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.module';
import { PsComplexCifDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-details/ps-complex-cif-details.component.module';
import { PsComplexEcoSectorModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-eco-sector/ps-complex-eco-sector.component.module';
import { PsComplexEmploymentDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-employment-details/ps-complex-employment-details.component.module';
import { PsComplexIdDetailsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.module';
import { PsComplexPersonalDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-personal-details/ps-complex-personal-details.component.module';
import { PsComplexUserContactComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-contact/ps-complex-user-contact.component.module';
import { PsInputEmailComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsDropdownCifTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cif-types/ps-dropdown-cif-types.component.module';
import { PsDropdownCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropdownLegalStatusComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-legal-status/ps-dropdown-legal-status.component.module';
import { PsLovGenderComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-gender/ps-lov-gender.component.module';
import { PsDropdownPostalCodesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-postal-codes/ps-dropdown-postal-codes.component.module';
import { PsDropdownRankingComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-ranking/ps-dropdown-ranking.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { CifOpeningPage } from './cif-opening.page';
import { PsComplexCifIdTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-id-types/ps-complex-cif-id-types.component.module';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';
import { PsLovResidencyComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-residency/ps-lov-residency.component.module';
import { PsEntityPhoneNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

const routes: Routes = [
  {
    path: '',
    component: CifOpeningPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateFormModule,
    PsComplexPersonalDetailsComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownPostalCodesComponentModule,
    PsLovGenderComponentModule,
    PsDropdownLegalStatusComponentModule,
    PsDropdownRankingComponentModule,
    PsInputEmailComponentModule,
    PsComplexAddressComponentModule,
    PsComplexUserContactComponentModule,
    PsComplexEcoSectorModule,
    PsComplexIdDetailsModule,
    PsInputNumericComponentModule,
    PsDropdownCountryComponentModule,
    PsTemplateStepperModule,
    PsMapAtmBranchesComponentModule,
    PsDropdownCifTypesComponentModule,
    PsComplexCifDetailsComponentModule,
    PsComplexEmploymentDetailsComponentModule,
    PsComplexSelectBranchComponentModule,
    PsComplexCifIdTypesComponentModule,
    PsLovResidencyComponentModule,
    PsEntityPhoneNumberComponentModule
  ],
  declarations: [CifOpeningPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CifOpeningPageModule {}
