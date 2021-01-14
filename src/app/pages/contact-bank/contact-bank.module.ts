import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsEntityPhoneNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';
import { PsInputEmailComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { ContactBankPage } from './contact-bank.page';



const routes: Routes = [
  {
    path: '',
    component: ContactBankPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateFormModule,
    PsInputEmailComponentModule,
    PsEntityPhoneNumberComponentModule
  ],
  declarations: [ContactBankPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactBankPageModule { }
