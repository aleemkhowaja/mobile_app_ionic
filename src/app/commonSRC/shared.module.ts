import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './psComponents/material.module';

@NgModule({
    exports: [
        TranslateModule,
        CommonModule,
        MaterialModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        // CustPopoverPageModule
    ],
})
export class SharedModule {

}
