import { AlertOptions } from '@ionic/core';
import { IOptionsTemplateBase } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsTemplatePopupMessage  extends AlertOptions, IOptionsTemplateBase {
  body?: string;
  hideContents?: boolean;
}

export interface IOptionsPsTemplatePopupMessageExposed extends AlertOptions, IOptionsTemplateBase {
  body?: string;
  hideContents?: boolean;
  title?:string;
}
