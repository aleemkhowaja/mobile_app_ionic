import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexPasswordConfirmModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.module';
import { PsConfirmPinModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { ChangePinPage } from './card-pin-request.page';
import { PsOptionCardComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.module';


const routes: Routes = [
  {
    path: '',
    component: ChangePinPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsTemplateFormModule,
    PsConfirmPinModule,
    PsComponentsModule,
    PsComplexPasswordConfirmModule,
    PsOptionCardComponentModule
  ],
  declarations: [ChangePinPage]
})
export class ChangePinPageModule { }
