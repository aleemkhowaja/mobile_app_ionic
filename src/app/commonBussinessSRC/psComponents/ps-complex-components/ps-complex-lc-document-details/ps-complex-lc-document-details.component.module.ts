import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLcDocumentDetailsComponent } from './ps-complex-lc-document-details.component';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsLovABOrignalForComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-ab-orignal-for/ps-lov-ab-orignal-for.component.module';

@NgModule({
  declarations: [
    PsComplexLcDocumentDetailsComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputNumericComponentModule,
    PsInputFreeTextComponentModule,
    PsLovABOrignalForComponentModule

  ],
  exports: [
    PsComplexLcDocumentDetailsComponent
  ],
  entryComponents: [
    PsComplexLcDocumentDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexLcDocumentDetailsComponentModule { }
