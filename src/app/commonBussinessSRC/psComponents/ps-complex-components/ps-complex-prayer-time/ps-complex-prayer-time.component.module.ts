import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexPrayerTimesComponent } from './ps-complex-prayer-time.component';

// @author: GRadwan Userstory: 925625 Date: 11122019 

@NgModule({
    declarations: [PsComplexPrayerTimesComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        RoundProgressModule
    ],
    exports: [PsComplexPrayerTimesComponent],
    entryComponents: [PsComplexPrayerTimesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexPrayerTimeModule { }
