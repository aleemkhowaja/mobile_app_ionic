import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { PsCommonSettings } from '../../psServices/models/ps-common.settings';

@Pipe({
  name: 'psDateFormat'
})
export class PsDateFormatPipe implements PipeTransform {

  /* private omniPull: OmniPullService;
  constructor() {
    this.omniPull = CommonUtils.injectionHandler(OmniPullService);
  } */
  transform(date, format, momentInputFormat?: moment.MomentFormatSpecification) {
    if (PsCommonSettings.activeLanguge) {
      if (momentInputFormat) {
        return moment(date, momentInputFormat).locale(PsCommonSettings.activeLanguge.toLocaleLowerCase()).format(format);
      } else {
        return moment(date).locale(PsCommonSettings.activeLanguge.toLocaleLowerCase()).format(format);
      }
    } else {
      if (momentInputFormat) {
        return moment(date, momentInputFormat).format(format);
      } else {
        return moment(date).format(format);
      }
    }
  }

}
