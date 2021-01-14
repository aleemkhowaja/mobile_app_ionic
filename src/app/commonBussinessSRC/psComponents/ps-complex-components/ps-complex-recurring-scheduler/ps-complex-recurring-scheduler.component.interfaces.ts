import { EventInput } from '@fullcalendar/core';
import { IOptionsPsBaseFieldExposed, IOptionsPsKeyinInput } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputNumericExposed } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';


export interface IOptionsPSComplexRecurringSchedulerExposed extends IOptionsPsBaseFieldExposed {
    calendarEventConfiguration?: EventInput;
    hasMendatoryEvent?: boolean;
    inputCountOptions?: IOptionsPsInputNumericExposed;
    inputDefaultOptions?: IOptionsPsKeyinInput;
    requestObject?: any;
}
