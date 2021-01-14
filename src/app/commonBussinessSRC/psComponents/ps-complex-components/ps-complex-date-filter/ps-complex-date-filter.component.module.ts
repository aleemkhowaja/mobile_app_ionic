import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PSComplexDateFilterComponent } from './ps-complex-date-filter.component';

@NgModule({
  declarations: [PSComplexDateFilterComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PSComplexDateFilterComponent],
  entryComponents: [PSComplexDateFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PSComplexDateFilterComponentModule { }
