import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger/logger.service';
import { CommonUtils } from '../models/common-utils';
import { PsCommonSettings } from '../models/ps-common.settings';


interface IGoogleTranslate {
  q?: string;
  source: string;
  target: string;
  format: string;
}
@Injectable({
  providedIn: 'root'
})
export class MissinTranslationsService implements MissingTranslationHandler {
  enabled = true;
  constructor(private http: HttpClient, private logger: LoggerService, public injector: Injector/*,  private omniPush: OmniPushProvider */) {
  }
  handle(params: MissingTranslationHandlerParams) {
    if (!PsCommonSettings.missingTranslations) {
      PsCommonSettings.missingTranslations = [];
    }
    const t: string = this.convertToReadable(params.key);
    PsCommonSettings.missingTranslations.push(params.key);
    if (this.enabled && PsCommonSettings.activeLanguge.toLowerCase() === 'en') {
      return t;
    }
  }

  missingKeys(): Promise<any> {
    return new Promise<any>((resolve) => {
      const missingTrans: string[] = [];
      const missingTransKeys: string[] = [];
      PsCommonSettings.missingTranslations = Array.from(new Set(PsCommonSettings.missingTranslations));
      this.enabled = false;
      const translate = this.injector.get(TranslateService);
      const keys = translate.translations[String(PsCommonSettings.activeLanguge).toUpperCase()];
      if (keys) {
        for (const k of PsCommonSettings.missingTranslations) {
          const found = keys[k];
          if (!found) {
            const t: string = this.convertToReadable(k);
            missingTrans.push(t);
            missingTransKeys.push(k);
          }
        }
      }
      const shouldTrans = translate.currentLang.toLowerCase() !== 'en';
      if (shouldTrans && CommonUtils.isNotNull(missingTransKeys) && missingTransKeys.length > 0) {
        this.googleTranslate(missingTransKeys, missingTrans, 'en', translate.currentLang.toLowerCase()).then(result => {
          translate.setTranslation(translate.currentLang, result, true);
        }).catch(err => {
          this.logger.error(err);
        });
      }
      if (CommonUtils.isNotEmptyArray(missingTransKeys)) {
        try {
          // this.omniPush.notTransaltedKeys({ paramNameList: JSON.stringify(missingTransKeys) }).catch(err => { this.logger.error(err) });
        } catch (error) {
          this.logger.error(error);
        }
      }
      resolve({ toTranslate: missingTrans, keys: missingTransKeys });
    });

  }

  convertToReadable(key: string) {
    let trans = String(key).toLowerCase();
    for (const k of ['key', 'actions', 'action', 'sec', 'rep', 'req']) {
      trans = trans.replace(new RegExp(`_${k.toLowerCase()}$`, 'i'), '');
    }
    return CommonUtils.toTitleCase(trans); // Modified by Gilbert for #TP 1105083
  }

  googleTranslate(keys: string[], value: string[], source: string = 'en', target: string) {
    return new Promise<Object>((resolve, reject) => {
      const seperator = '★';
      const transObject: Object = {};
      const obj: IGoogleTranslate = {
        q: value.join(seperator),
        source,
        target,
        format: 'text',
      };
      /*  return this.http.post(transaltionApi, obj).toPromise().then((result) => {
         const allVal: string = (result as any).data.translations[0].translatedText;
         const val = allVal.split(seperator);
         for (let i = 0; i < val.length; i++) {
           transObject[keys[i]] = val[i];
         }
         resolve(transObject);
       }).catch(error => { reject(error); }); */
    });
  }

  transalteKeys(operId: number) {
    const keys =
      `ACCOUNTS_SEC
      BENEFICIARY_SEC
      CREDITFACILITY_SEC
      CONTACT_US_REQ
      FUND_TRANSFER_SEC
      PAYMENTS_SEC
      CHEQUEBOOKS_and_CHEQUES_SEC
      CARDS_SECTION_SEC
      REMITTANCE_SEC
      FINANCING_SECTION_SEC
      FUNDS_MANAGEMENTS
      INVESTMENTS_SEC
      TRADE_FINANCE_SEC
      INTERNAL_BENEFICIARY_TRANSFER_REQ
      BILL_SEC
      TRANSFERS_LIST_REP
      BILL_PAYMENT_HISTORY_REP
      BILL_PAYMENT_LIST_REP
      MY_PROFILE
      MY_DRAFT_REP
      REPORT_SECTION
      TRANSFER_QUICK_LINKS_SEC
      bill_payment_key
      credit_card_settlement_key
      agency_collection_key
      swift_transfer_key
      local_transfer_key
      internal_transfer_key
      home_page_key`;

    let _keys = keys.split('\n');
    let _readableKeys: string[] = [];
    for (const key of _keys) {
      _readableKeys.push(this.convertToReadable(key));
    }
    this.googleTranslate(_keys, _readableKeys, 'en', 'ar').then((arabic) => {
      this.googleTranslate(_keys, _readableKeys, 'en', 'fr').then((french) => {
        let _ar_trans = [];
        let _fr_trans = [];
        for (const key of Object.keys(arabic)) {
          _ar_trans.push(arabic[key]);
        }
        for (const key of Object.keys(french)) {
          _fr_trans.push(french[key]);
        }
        let _en_trans = _readableKeys;
        let script_ora = '';
        let script_syb = '';

        script_ora += `BEGIN\n`;
        script_syb += `BEGIN\n`;
        _keys.forEach((val, index) => {
          val = String(val).trim();
          let en = String(_en_trans[index]).trim();
          let ar = String(_ar_trans[index]).trim();
          let fr = String(_fr_trans[index]).trim();
          en = en.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          ar = ar.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          fr = fr.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          script_ora += (`P_OC_ADD_KEY_LABEL( ${operId},0,0,0,'${val}','${en}','${en}','${ar}','${fr}',${operId},'SYS');\n`);
          script_syb += (`P_OC_ADD_KEY_LABEL( ${operId},0,0,0,'${val}','${en}','${en}','${ar}','${fr}',${operId},'SYS');\n`);
        });
        script_ora += `END;\n/\nCOMMIT;`;
        script_syb += `END\nGO\nCommit\nGO`;
        this.logger.log(script_ora);
        this.logger.log(script_syb);
      }).catch(err => this.logger.error(err));
    }).catch(err => this.logger.error(err));


  }

}
