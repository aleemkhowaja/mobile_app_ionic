import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownDocumentTypesComponent } from './ps-dropdown-document-types.component';



@NgModule({
    declarations: [
        PsDropdownDocumentTypesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownDocumentTypesComponent
    ],
    entryComponents: [
        PsDropdownDocumentTypesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownDocumentTypesComponentModule { }