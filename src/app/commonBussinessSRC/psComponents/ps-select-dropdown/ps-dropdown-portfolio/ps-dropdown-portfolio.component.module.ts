import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownPortfolioComponent } from './ps-dropdown-portfolio.component';

@NgModule({
    declarations: [PsDropdownPortfolioComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownPortfolioComponent],
    entryComponents: [PsDropdownPortfolioComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownPortfolioComponentModule { }