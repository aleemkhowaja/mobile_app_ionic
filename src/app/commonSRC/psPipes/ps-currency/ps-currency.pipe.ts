import { Pipe, PipeTransform } from '@angular/core';
import { ConstantCommon } from '../../psServices/models/common-constant';
const padding = '000000';
@Pipe({
  name: 'psCurrency'
})
export class PsCurrencyPipe implements PipeTransform {

  private prefix: string;
  private decimal_separator: string;
  private thousands_separator: string;
  private suffix: string;

  constructor() {
    this.prefix = '';
    this.suffix = '';
    this.decimal_separator = ConstantCommon.DECIMAL_SEPARATOR;
    this.thousands_separator = ConstantCommon.THOUSANDS_SEPARATOR;
  }
  transform(value: string, fractionSize: number = 0): string {
    if (value != null && value!= undefined) {
      //Modified by Richie for #BUG 755638
      let val: string;
      if (String(value).indexOf(this.thousands_separator)) {
        val = this.parse(value, fractionSize);
      } else {
        val = parseFloat(value).toString();
      }
      let [integer, fraction = ''] = (val || '').split('.');
      fraction = fractionSize > 0 ? this.decimal_separator + (fraction + padding).substring(0, fractionSize) : '';
      if (isNaN(parseFloat(integer))) {
        integer = '0';
      } else {
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousands_separator);
      }
      return this.prefix + integer + fraction + this.suffix;
    }
  }

  parse(value: string, fractionSize: number = 0): string {
    value = value + '';//convert to string if its not a string so we can access the replace function
    let [integer, fraction = ''] = (value || '').replace(this.prefix, '')
      .replace(this.suffix, '')
      .split(this.decimal_separator);

    integer = integer.replace(new RegExp(this.thousands_separator, 'g'), '');

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.decimal_separator + (fraction + padding).substring(0, fractionSize)
      : '';

    return integer + fraction;
  }

}
