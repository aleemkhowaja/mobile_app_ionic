import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';

import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from './../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from './../../commonSRC/shared.module';
import { RegistrationChargesPage } from './registration-charges.page';

const routes: Routes = [
    {
        path: '',
        component: RegistrationChargesPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        PsTemplateStepperModule,
        RouterModule.forChild(routes),
        PsComponentsModule,
        PsLookupOwnAccountComponentModule,
        PsAccountsListComponentModule,
    ],
    declarations: [RegistrationChargesPage]
})
export class RegistrationChargesPageModule {}