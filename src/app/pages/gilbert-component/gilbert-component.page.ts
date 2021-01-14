import { ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsTemplateLogin } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsPsButtonSubmit, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { OmniLoginPage } from '../omni-login/omni-login.page';

@Component({
  selector: 'gilbert-component',
  templateUrl: './gilbert-component.page.html',
  styleUrls: ['./gilbert-component.page.scss'],
})
export class GilbertComponentPage implements OnInit {

  constructor(private nav: PsNavigatorService, private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef,
    private injector: Injector) { }

  private formGroup = new FormGroup({});

  public submitOptions: IOptionsPsButtonSubmit = {
     group: this.formGroup
  };

  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      fcName: 'toc',
      group: this.formGroup
    },
    htmlViewerOptions: {
      fileName: 'TermsAndConditions.html'
    }
  };

  public options: IOptionsTemplateLogin = {
    password: {
      fcName: 'password',
      group: this.formGroup,
    },
    userName: {
      fcName: 'userName',
      group: this.formGroup,
    },
    rememberMe: {
      fcName: 'credentials',
      group: this.formGroup
    },
    group: this.formGroup,
  };

  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: [],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.onlineRegistration,

    }
  };


  changeOutlet() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OmniLoginPage);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.getElementsByTagName("ion-slide")[0].appendChild(domElem);
  }


  ngOnInit() {
    //this.changeOutlet();
  }

}
