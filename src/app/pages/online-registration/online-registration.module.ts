import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsGalleryVerificationImagesModule } from 'src/app/commonBussinessSRC/psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.module';
import { PsComplexBankAuthenticationComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bank-authentication/ps-complex-bank-authentication.module';
import { PsComplexIdDetailsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.module';
import { PsConfirmPinModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.module';
import { PsComplexSecurityQuestionComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.module';
import { PsEntityPhoneNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';
import { PsInputEmailComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComplexUserCredentialsComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.module';
import { PsComplexTermsAndConditionsModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.module';
import { PsDateDayMonthYearPastAsStringComponentModule } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past-asString/ps-date-day-month-year-past-asString.component.module';
import { OnlineRegistrationPage } from './online-registration.page';



const routes: Routes = [
  {
    path: '',
    component: OnlineRegistrationPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsComponentsModule,
    PsTemplateStepperModule,
    PsComplexTermsAndConditionsModule,
    PsComplexIdDetailsModule,
    PsComplexBankAuthenticationComponentModule,
    PsComplexUserCredentialsComponentModule,
    PsGalleryVerificationImagesModule,
    PsDateDayMonthYearPastAsStringComponentModule,
    PsComplexSecurityQuestionComponentModule,
    PsConfirmPinModule,
    PsInputEmailComponentModule,
    PsEntityPhoneNumberComponentModule
  ],
  declarations: [OnlineRegistrationPage],
  exports: [OnlineRegistrationPage],
  entryComponents: [OnlineRegistrationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnlineRegistrationPageModule { }
