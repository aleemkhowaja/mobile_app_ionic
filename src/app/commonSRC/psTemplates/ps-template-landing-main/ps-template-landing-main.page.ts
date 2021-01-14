import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexFindCIFComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.interfaces';
import { IOptionsPsMenuHeaderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.interfaces';
import { IOptionsPsComplexMenuReachExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.interfaces';
import { IOptionsPsComplexUserProfileMenuExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-profile-menu/ps-complex-user-profile-menu.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IOptionsTemplateLandingMain } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';

import { CommonUtils } from '../../psServices/models/common-utils';
import { PsApplicationSettings } from '../../psServices/models/ps-app-settings';
import { IOptionsPsActionIconExposed, IOptionsPsContainerFlip } from '../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';



@Component({
  selector: 'ps-template-landing-main',
  templateUrl: './ps-template-landing-main.page.html',
  styleUrls: ['./ps-template-landing-main.page.scss']
})

export class PsTemplateLandingMainPage extends PsTemplateBasePage implements OnInit, AfterViewInit {
  @Input() public options: IOptionsTemplateLandingMain = {};
  preferredLanguageOptions: IOptionsPsLovPreferredLanguageExposed = {};
  optionsUserProfileMenu: IOptionsPsComplexUserProfileMenuExposed = {};
  menuHeaderoptions: IOptionsPsMenuHeaderExposed = {};
  psMenuReachOptions: IOptionsPsComplexMenuReachExposed = {};
  psContainerFlip: IOptionsPsContainerFlip = {
    hideVisibleArea: false,
    isFlipped: false
  };

  switchOptions: IOptionsPsActionIconExposed = {
    iconName: 'exchange'
  };

  findCIFOptions: IOptionsPsComplexFindCIFComponentExposed = {
    fcName: 'findCIF',
    group: new FormGroup({})
  };

  psContainerFlipHeader: IOptionsPsContainerFlip = {
    hideVisibleArea: false,
    isFlipped: false,
    animationClass: 'verticalFlip'
  };
  previousComponent;
  landingType = PsApplicationSettings.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION.LANDING_UI_TYPE;
  @ViewChild('hiddenComponent', { static: true, read: ViewContainerRef }) hiddenComponent;
  constructor(public omniCommon?: OmniCommonService, public componentFactoryResolver?: ComponentFactoryResolver) {
    super();
    if (this.landingType === 3) {
      document.querySelector('html').classList.add('landing-navbar');
      CommonUtils.changeCssVariable('--ps-nav-header-height', CommonUtils.getCssVariableValue('--ps-nav-header-init'));
    } else {
      document.querySelector('html').classList.add('landing-default');
    }
  }

  changeContent(component) {
    if (component) {
      if (this.previousComponent && this.previousComponent.component === component.component) {
        this.psContainerFlip.isFlipped = !this.psContainerFlip.isFlipped;
        this.psContainerFlip.hideVisibleArea = !this.psContainerFlip.hideVisibleArea;
        this.previousComponent = component;
      } else {
        if (this.previousComponent) {
          this.hiddenComponent.clear();
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(component.component);
        const ref = this.hiddenComponent.createComponent(factory);
        (ref.instance).componentOption = component.componentOption;
        ref.changeDetectorRef.detectChanges();
        this.previousComponent = component;
        if (!this.psContainerFlip.isFlipped) {
          this.psContainerFlip.isFlipped = !this.psContainerFlip.isFlipped;
          this.psContainerFlip.hideVisibleArea = !this.psContainerFlip.hideVisibleArea;
        }
      }
      if (this.psContainerFlip.isFlipped) {
        document.getElementById('main-header').classList.add('flipped');
       } else {
        document.getElementById('main-header').classList.remove('flipped');
      }
    }
  }

  switchContent() {
    this.psContainerFlipHeader.isFlipped = !this.psContainerFlipHeader.isFlipped;
    this.psContainerFlipHeader.hideVisibleArea = !this.psContainerFlipHeader.hideVisibleArea;
  }

  ngAfterViewInit() {
    if (this.omniCommon.isAgent() && this.commonProv.isWebLayout()) {
      setTimeout(() => {
        this.switchContent();
      }, 5000);
    }
  }
}
