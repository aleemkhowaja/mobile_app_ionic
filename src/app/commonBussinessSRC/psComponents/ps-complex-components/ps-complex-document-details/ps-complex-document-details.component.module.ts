import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexDocumentDetailsComponent } from './ps-complex-document-details.component';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsDropdownLovComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.module';

@NgModule({
  declarations: [
    PsComplexDocumentDetailsComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputNumericComponentModule,
    PsInputFreeTextComponentModule,
    PsDropdownLovComponentModule

  ],
  exports: [
    PsComplexDocumentDetailsComponent
  ],
  entryComponents: [
    PsComplexDocumentDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexDocumentDetailsComponentModule { }
