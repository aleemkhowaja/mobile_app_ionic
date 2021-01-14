import { NgModule } from '@angular/core';

import { PsCurrencyPipe } from './ps-currency/ps-currency.pipe';
import { PsDateFormatPipe } from './ps-date-format/ps-date-format.pipe';
import { PsFileSizePipe } from './ps-file-size/ps-file-size.pipe';
import { PsSafePipe } from './ps-safe/ps-safe.pipe';
import { PsTruncatePipe } from './ps-truncate/ps-truncate.pipe';

export const psCommonPipes = [
  PsCurrencyPipe,
  PsTruncatePipe,
  PsSafePipe,
  PsDateFormatPipe,
  PsFileSizePipe
];

@NgModule({
  declarations: [psCommonPipes],
  exports: [psCommonPipes]
})
export class PsCommonPipesModule { }
