import { PsSelectLookupOptionListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexDealDetailsComponent } from './ps-complex-deal-details.component';
import { SharedModule } from 'src/app/commonSRC/shared.module';


@NgModule({
    declarations: [PsComplexDealDetailsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [PsComplexDealDetailsComponent],
    entryComponents: [PsComplexDealDetailsComponent],
    imports: [
    SharedModule,
    PsComponentsModule,
    PsSelectLookupOptionListComponentModule]
})
export class PsComplexDealDetailsModule {

}