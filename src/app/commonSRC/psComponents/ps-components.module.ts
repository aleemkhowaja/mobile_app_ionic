import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'ngx-avatar';

import { PsCommonDirectivesModule } from '../psDirectives/ps-common-directives.module';
import { PsCommonPipesModule } from '../psPipes/ps-common-pipes.module';
import { SharedModule } from '../shared.module';
import { MaterialModule } from './material.module';
import { psComponents } from './ps-components';

@NgModule({
    declarations: [
        ...psComponents
    ],
    imports: [
        SharedModule,
        PsCommonPipesModule,
        PsCommonDirectivesModule,
        ReactiveFormsModule,
        AvatarModule
    ],
    exports: [
        ...psComponents,
        CommonModule,
        MaterialModule,
        IonicModule,
        FormsModule,
        PsCommonPipesModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    providers: [],
    entryComponents: [
        ...psComponents
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComponentsModule { }
