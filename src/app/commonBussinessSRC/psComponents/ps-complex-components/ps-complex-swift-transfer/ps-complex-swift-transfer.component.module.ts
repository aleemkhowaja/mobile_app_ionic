import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexLookupComponentModule } from '../ps-complex-lookup/ps-complex-lookup.component.module';
import { PsComplexSwiftTransferComponent } from './ps-complex-swift-transfer.component';

@NgModule({
    declarations: [
        PsComplexSwiftTransferComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsComplexSwiftTransferComponent
    ],
    entryComponents: [
        PsComplexSwiftTransferComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexSwiftTransferComponentModule { }
