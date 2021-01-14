import { MatStepper } from '@angular/material/stepper';
import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';


export interface IOptionsPsDraftsReportComponent extends IOptionsPsBaseFieldExposed {
    requestObject?: any;
    stepper?: MatStepper;
}
