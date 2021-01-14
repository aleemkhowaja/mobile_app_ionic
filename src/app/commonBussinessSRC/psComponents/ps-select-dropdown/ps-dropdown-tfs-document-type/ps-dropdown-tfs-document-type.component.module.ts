import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownTFSDocumentTypeComponent } from './ps-dropdown-tfs-document-type.component';



@NgModule({
    declarations: [
        PsDropdownTFSDocumentTypeComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownTFSDocumentTypeComponent
    ],
    entryComponents: [
        PsDropdownTFSDocumentTypeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownTFSDocumentTypeComponentModule { }