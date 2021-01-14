import { IOptionsPsDateMonthYearFutureExposed } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.interfaces';
import { IOptionsPsInputCardCvvExposed } from '../../ps-keyin-input/ps-input-card-cvv/ps-input-card-cvv.component.interfaces';
import { IOptionsPsInputCardNumberExposed } from '../../ps-keyin-input/ps-input-card-number/ps-input-card-number.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexCreditCardExposed extends IOptionsPsBaseFieldExposed {
    cardNumber?: IOptionsPsInputCardNumberExposed;
    cardOwner?: IOptionsPsInputFreeTextExposed;
    cardCVV?: IOptionsPsInputCardCvvExposed;
    dateOptions?: IOptionsPsDateMonthYearFutureExposed;
}
