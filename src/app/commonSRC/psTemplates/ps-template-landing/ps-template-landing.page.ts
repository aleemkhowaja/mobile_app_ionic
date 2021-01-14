import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { IOptionsTemplateLanding } from '../../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsTemplateLandingMainPage } from '../ps-template-landing-main/ps-template-landing-main.page';



@Component({
  selector: 'ps-template-landing',
  templateUrl: './ps-template-landing.page.html',
  styleUrls: ['./ps-template-landing.page.scss']
})
export class PsTemplateLandingPage extends PsTemplateLandingMainPage implements OnInit {
  @Input() options: IOptionsTemplateLanding = {};

  constructor(public omniCommon?: OmniCommonService, componentFactoryResolver?: ComponentFactoryResolver) {
    super(omniCommon, componentFactoryResolver);
  }
  ngOnInit() {
    this.init();
    this.menuHeaderoptions.showProfile = true;
  }
}
