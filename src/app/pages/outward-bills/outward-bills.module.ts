import { PsComplexBillItemComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bill-item/ps-complex-bill-item.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsInputFreeTextComponentModule } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsBanksComponentModule } from './../../commonBussinessSRC/psComponents/ps-banks/ps-banks.component.module';
import { PsComplexAddressComponentModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.module';
import { PsAccountsListComponentModule } from './../../commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsDateDayMonthYearFutureComponentModule } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsDropdownTFSDocumentTypeComponentModule } from './../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.module';
import { PsComplexGoodsComponentModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-goods/ps-complex-goods.component.module';
import { PsComplexSettlementComponentModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-settlement/ps-complex-settlement.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { OutwardBillsPage } from './outward-bills.page';

const routes: Routes = [
  {
    path: '',
    component: OutwardBillsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateFormModule,
    PsTemplateStepperModule,
    PsComplexAmountComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsDropdownTFSDocumentTypeComponentModule,
    PsLookupOwnAccountComponentModule,
    PsAccountsListComponentModule,
    PsComplexSettlementComponentModule,
    PsComplexGoodsComponentModule,
    PsComplexBillItemComponentModule,
    PsComplexAddressComponentModule,
    PsInputFreeTextComponentModule,
    PsBanksComponentModule,
    PsInputVarcharComponentModule
  ],
  declarations: [OutwardBillsPage]
})
export class OutwardBillsPageModule { }
