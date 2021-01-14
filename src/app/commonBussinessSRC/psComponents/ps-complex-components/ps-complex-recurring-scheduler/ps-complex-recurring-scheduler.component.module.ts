import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsInputCountComponentModule } from '../../ps-keyin-input/ps-input-count/ps-input-count.component.module';
import { PsLovPeriodicityOptionsComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-periodicity/ps-lov-periodicity.component.module';
import { PsComplexRecurringSchedulerComponent } from './ps-complex-recurring-scheduler.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGrigPlugin
]);

@NgModule({
  declarations: [PsComplexRecurringSchedulerComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsLovPeriodicityOptionsComponentModule,
    FullCalendarModule,
    PsInputCountComponentModule
  ],
  exports: [PsComplexRecurringSchedulerComponent],
  entryComponents: [PsComplexRecurringSchedulerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexRecurringSchedulerComponentModule { }
