import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IsysParamObj } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { CommonUtils } from './../../commonSRC/psServices/models/common-utils';
import { PsCommonService } from './../../commonSRC/psServices/ps-common/ps-common.service';


@Component({
  selector: 'app-omni-base',
  templateUrl: './omni-base.page.html',
  styleUrls: ['./omni-base.page.scss'],
})
export class OmniBasePage implements OnInit, AfterViewChecked {
  commonProv: PsCommonService;
  baseFormGroup: FormGroup;
  private customizationMap: Map<number, Map<string, any>>;
  private navigationServices?: PsNavigatorService;
  pagesNavigationInfoSubscription?: Subscription;
  constructor() {
    this.commonProv = CommonUtils.injectionHandler(PsCommonService);
    this.navigationServices = CommonUtils.injectionHandler(PsNavigatorService);
    // this.getScreenTranslations();
  }

  init() {
    this.customizationMap = this.commonProv.returnOperCustomization();
    const navParams: any = this.navigationServices.getAllParams();
    const formDisObj: IsysParamObj = {};
    if (navParams && navParams.readOnlypage === true) {
      formDisObj.IS_READONLY = 1;
      if (this.customizationMap.get(PsCommonSettings.oper_ID)) {
        this.customizationMap.get(PsCommonSettings.oper_ID).set(ConstantCommon.FORM_READONLY, formDisObj);
      }
    } else if (this.customizationMap.get(PsCommonSettings.oper_ID)) {
      formDisObj.IS_READONLY = 0;
      if (this.customizationMap.get(PsCommonSettings.oper_ID)) {
        this.customizationMap.get(PsCommonSettings.oper_ID).set(ConstantCommon.FORM_READONLY, formDisObj);
      }
    }
  }

  ngOnInit() {
    this.init();
  }

  ionViewDidEnter() {
    this.viewDidEnter();
  }

  ionViewWillLeave() {
    this.viewWillLeave();
  }

  ionViewWillEnter() {
    this.viewWillEnter();
  }

  viewWillEnter() {

  }

  private disableForm(formGroup: FormGroup) {
    if (formGroup !== undefined && this.customizationMap && this.customizationMap.get(PsCommonSettings.oper_ID)) {
      const formObj = this.customizationMap.get(PsCommonSettings.oper_ID);
      const formDisObj: IsysParamObj = formObj.get(ConstantCommon.FORM_READONLY);
      if (formDisObj && formDisObj.IS_READONLY === 1 && formGroup.status != 'DISABLED') {
        formGroup.disable();
        Object.keys(formGroup.controls).forEach((key) => {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [key], 1);
        });
      }
    }
  }

  viewDidEnter() {
    this.commonProv.checkViewBS.next({ value: true, page: this, didEnter: true });
    this.commonProv.dismissLoading();
    this.disableForm(this.baseFormGroup);
  }

  viewWillLeave() {
    this.commonProv.checkViewBS.next({ value: true, page: this, willLeave: true });
  }
  ngAfterViewChecked() {
    this.disableForm(this.baseFormGroup);
  }
  /* getScreenTranslations() {
    const operationId: number = PsCommonSettings.oper_ID ? PsCommonSettings.oper_ID : 2222;
    const activeLanguage: string = PsCommonSettings.activeLanguge ? PsCommonSettings.activeLanguge : 'EN';
    if (operationId && activeLanguage) {
      this.commonProv.returnTranslationKeys(activeLanguage, operationId);
    }
  } */

}
