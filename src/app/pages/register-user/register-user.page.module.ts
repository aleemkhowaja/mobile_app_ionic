import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { RegisterUserPage } from './register-user.page';
import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsDropdownAllowedLanguagesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-allowed-languages/ps-dropdown-allowed-languages.component.module';
import { PsDropdownSubProfileComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-sub-profile/ps-dropdown-sub-profile.component.module';
import { PsLovPreferredLanguageComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.module';
import { PsInputEmailComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsEntityPhoneNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';


const routes: Routes = [
  {
    path: '',
    component: RegisterUserPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsTemplateStepperModule,
    PsComponentsModule,
    PsInputFreeTextComponentModule,
    PsDropdownAllowedLanguagesComponentModule,
    PsDropdownSubProfileComponentModule,
    PsLovPreferredLanguageComponentModule,
    PsInputEmailComponentModule,
    PsEntityPhoneNumberComponentModule
  ],
  declarations: [RegisterUserPage]
})
export class RegisterUserPageModule { }
