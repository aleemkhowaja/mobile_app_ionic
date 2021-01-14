import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPsComplexFindCIFComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.interfaces';
import { IOptionsPsMenuHeaderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.interfaces';
import { IOptionsPsComplexProfileExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsTemplateLanding } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ConstantCommon } from '../../psServices/models/common-constant';
import { CommonUtils } from '../../psServices/models/common-utils';
import { PsApplicationSettings } from '../../psServices/models/ps-app-settings';
import { IOptionsPsActionGallery, IOptionsPsActionIcon, IOptionsPsContainerPanel, IOptionsPsSelectSegment, IOptionsPsTemplateView } from '../../psServices/models/ps-common-interface';
import { PsNavigatorService } from '../../psServices/navigator/ps-navigator.service';
import { PsTemplateLandingMainPage } from '../ps-template-landing-main/ps-template-landing-main.page';
import { PsCommonService } from './../../psServices/ps-common/ps-common.service';





@Component({
  selector: 'ps-template-landing-web',
  templateUrl: './ps-template-landing-web.template.html',
  styleUrls: ['./ps-template-landing-web.template.scss'],
})
export class PsTemplateLandingWebPage extends PsTemplateLandingMainPage implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('mainSection', { static: false }) mainSection;
  @ViewChild('reachMenu', { static: false }) reachMenuValue = new EventEmitter<HTMLElement>();
  findCIFOptions: IOptionsPsComplexFindCIFComponentExposed = {
    fcName: 'findCIF',
    group: new FormGroup({})
  };
  landingType = PsApplicationSettings.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION.LANDING_UI_TYPE;
  toggleIcon: IOptionsPsActionIcon = {
    iconName: 'cog'
  };
  segmentOptions: IOptionsPsSelectSegment = {
    segmentList: []
  };
  showAds = false;
  showPanels = true;
  menuHeaderoptions: IOptionsPsMenuHeaderExposed = {};
  optionsComplexProfile: IOptionsPsComplexProfileExposed = {};
  templateLandingOptions: IOptionsTemplateLanding = {
    isWideLayout: true,
    optionsComplexProfile: {}
  };

  bannersOptions: IOptionsPsActionGallery = {
    layout: 'slider'
  };

  formGroup = new FormGroup({});
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  wasChecked = false;
  videoUrl;
  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: true,
    showToCurrencyOptions: false,
    operId: ConstantCommon.EXCHANGE_RATE_OPER_ID,
    fromAmountOptions: {
      currency: '',
      group: this.formGroup,
      fcName: 'fromAmount',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'currency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        group: this.formGroup
      }
    },
    toAmountOptions: {
      group: this.formGroup,
      fcName: 'toAmount',
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'toCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'exchange_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'toAmount',
        group: this.formGroup
      }
    }
  };
  public exchangeRatePanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'exchange_rate_key',
    iconName: 'exchange-landing-panel',
    expanded: true
  };

  public atmBranchesPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'atm_branches_key',
    iconName: 'map-outline-landing-panel',
    expanded: true
  };

  public prayerTimeOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'prayer_time_key',
    iconName: 'timer-outline-landing-panel',
    expanded: true
  };
  showMenu: boolean;
  subscription: Subscription;
  openToggle = true;
  openRightSide = false;
  constructor(public commonProv: PsCommonService, public common: PsCommonService, public navService: PsNavigatorService, public cd?: ChangeDetectorRef, private omniPull?: OmniPullService,
  ) {
    super();
  }

  ngOnInit() {
    this.subscription = this.common.deductCharges.subscribe(result => {
      this.showMenu = !result;
    });
    this.videoUrl = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'welcome.mp4';
    this.mapAtmBranchesOptions = {
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: true,
      mapTypesInclude: '\'A\',\'B\',\'C\'',
      group: this.formGroup,
      fcName: 'landingMap'
    };
    this.segmentOptions = {
      segmentList: [{
        selected: true,
        itemValue: 'panels',
        description: this.commonProv.translate('additional_services_key')
      }, {
        selected: true,
        itemValue: 'ads',
        description: this.commonProv.translate('banners_key')
      }],
      defaultSegment: { itemValue: 'panels', description: this.commonProv.translate('additional_services_key') }
    };
    setTimeout(() => {
      this.openToggle = false;
    }, 5000);
  }

  /*   checkContent() {
      const homeBanners = document.querySelector('.home-banners');
      const pageContent: any = document.querySelector('.page-content');
      const bodyRect = document.body.getBoundingClientRect(),
        elemRect = pageContent.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
      if (pageContent && homeBanners && homeBanners.clientHeight) {
        // pageContent.style.height = 'calc(100vh  - (' + (offset + (2 * parseInt(CommonUtils.getCssVariableValue('--ps-section-padding'))) + parseInt(CommonUtils.getCssVariableValue('--ps-section-padding'))) + 'px))';
        this.wasChecked = true;
        this.cd.detectChanges();
      }
    } */
  ngOnDestroy() {
    this.wasChecked = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  toggleClick() {
    this.openToggle = !this.openToggle;
  }
  onClickSegment(selectedSegment) {
    if (selectedSegment === 'ads') {
      this.showAds = true;
      this.showPanels = false;
    } else {
      this.showPanels = true;
      this.showAds = false;
    }
  }

  changeContent(component) {
    this.templateLandingOptions.triggerMenuFlip(component);
  }

  ngAfterViewChecked() {
    if (this.mainSection) {
      const elt = this.mainSection.nativeElement.getBoundingClientRect();
      if (elt.left > 0) {
        CommonUtils.changeCssVariable('--ps-margin-left', elt.left + 'px');
      }
    }
  }
}
