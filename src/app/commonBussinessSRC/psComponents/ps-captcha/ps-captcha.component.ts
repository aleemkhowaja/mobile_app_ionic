import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { CommonUtils } from './../../../commonSRC/psServices/models/common-utils';
import { PsCommonService } from './../../../commonSRC/psServices/ps-common/ps-common.service';
import { IPsCaptchaOptions } from './ps-captcha.component.interface';


@Component({
  selector: 'ps-captcha',
  templateUrl: './ps-captcha.component.html',
  styleUrls: ['./ps-captcha.component.scss'],
})
export class PsCaptchaComponent implements OnInit {
  @Input() options: IPsCaptchaOptions;
  @Output() onCaptchaResolved = new EventEmitter<any>();
  siteKey: string;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  constructor(private commonService: PsCommonService) { }

  ngOnInit() {
    this.siteKey = this.commonService.isNativeMobile() ? PsApplicationSettings.GOOGLE_API_KEYS.RECAPTCHA_NATIVE_KEY : PsApplicationSettings.GOOGLE_API_KEYS.RECAPTCHA_KEY;
    this.addRecaptchaScript();
  }

  renderReCaptch() {
    window.grecaptcha.render(this.recaptchaElement.nativeElement, {
      sitekey: this.siteKey,
      callback: (response) => {
        this.onResolve(response);
      },
    });
  }
  addRecaptchaScript() {
    window.grecaptchaCallback = () => {
      this.renderReCaptch();
    };
    CommonUtils.addJSScript('https://www.google.com/recaptcha/api.js?hl=' + PsCommonSettings.activeLanguge.toLowerCase() + '&onload=grecaptchaCallback&amp;render=explicit',
      {
        id: 'recaptcha-jssdk',
        async: true,
        checkSRCIfPresent: true,
        removeIDIfPresent: false
      }
    );
  }

  onResolve(data) {
    this.onCaptchaResolved.emit(data);
  }
}
