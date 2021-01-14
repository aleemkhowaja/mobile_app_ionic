import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IOptionsPsMenuHeaderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.interfaces';
import { IOptionsTemplateBase } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { LoggerService } from '../../psServices/logger/logger.service';
import { CommonUtils } from '../../psServices/models/common-utils';
import { IOptionsPsActionGallery } from '../../psServices/models/ps-common-interface';
import { PsNavigatorService } from '../../psServices/navigator/ps-navigator.service';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';



@Component({
  selector: 'ps-template-base',
  templateUrl: './ps-template-base.page.html',
  styleUrls: ['./ps-template-base.page.scss'],
})
export class PsTemplateBasePage implements OnInit {
  @Input() public options: IOptionsTemplateBase = {};
  @Input() public id = 'default_stepper_id';

  menuHeaderoptions: IOptionsPsMenuHeaderExposed = {};
  bannersOptions: IOptionsPsActionGallery;

  @ViewChild('mainSection', { read: ElementRef, static: true }) mainSection: ElementRef;
  @ViewChild('mainHeader', { read: ElementRef, static: true }) mainHeader: ElementRef;
  @ViewChild('mainFooter', { read: ElementRef, static: true }) mainFooter: ElementRef;
  @ViewChild('mainContent', { read: ElementRef, static: true }) mainContent: ElementRef;


  public commonProv: PsCommonService;
  public loggerP: LoggerService;
  public navService: PsNavigatorService;

  private checkViewSubscription: Subscription;
  private intervalChecking;
  constructor(public cd?: ChangeDetectorRef) {
    this.commonProv = CommonUtils.injectionHandler(PsCommonService);
    this.navService = CommonUtils.injectionHandler(PsNavigatorService);
    this.loggerP = CommonUtils.injectionHandler(LoggerService);
  }

  get custMode() {
    return PsCommonSettings.custMode && this.options && this.options.allowCust;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.options && !this.options.group) {
      this.options.group = new FormGroup({});
    }
    this.bannersOptions = {
      layout: 'slider'
    };
    this.checkViewSubscription = this.commonProv.checkView().subscribe((result) => {
      if (result && result.didEnter) {
        this.commonChecking();
      }
    });
  }

  commonChecking() {
    this.checkContent();

    this.intervalChecking = setTimeout(() => {
      this.commonChecking();
    }, 2000);

  }

  checkContent() {
    const mainSection = this.mainSection ? this.mainSection.nativeElement : undefined;
    const mainHeader = this.mainHeader ? this.mainHeader.nativeElement : undefined;
    const mainfooter = this.mainFooter ? this.mainFooter.nativeElement : undefined;
    const mainContent = this.mainContent ? this.mainContent.nativeElement : undefined;

    let sumToBeSubtracted = 0;
    let counter = 0;
    let headerHeight;
    let footerHeight, additionalHeight = 0;
    const sectionPadding = parseInt(CommonUtils.getCssVariableValue('--ps-section-padding'));
    if (mainContent) {
      const elem: any = mainContent;
      const bodyRect = document.body.getBoundingClientRect(),
        elemRect = elem.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;

      const mainSectionHeight = mainSection.clientHeight, mainSectionWidth = mainSection.clientWidth;



      if (mainHeader) {
        headerHeight = mainHeader.clientHeight;
        mainHeader.style.maxWidth = mainSection.clientWidth + 'px';
      }

      if (mainfooter) {
        footerHeight = mainfooter.clientHeight;
        mainfooter.style.maxWidth = mainSection.clientWidth + 'px';
      }


      if (headerHeight) {
        counter++;
        if (parseInt(CommonUtils.getElementStyle(mainHeader, 'order')) > parseInt(CommonUtils.getElementStyle(mainContent, 'order'))) {
          additionalHeight = Math.abs(bodyRect.height - mainHeader.getBoundingClientRect().y); // if header is placed below the content, add its height in the subtraction formula
        }
      }
      if (footerHeight) {
        counter++;
        if (parseInt(CommonUtils.getElementStyle(mainfooter, 'order')) >= parseInt(CommonUtils.getElementStyle(mainContent, 'order'))) {
          if ((additionalHeight > 0 && mainfooter.getBoundingClientRect().bottom < mainHeader.getBoundingClientRect().bottom && additionalHeight > 0)
            || (additionalHeight === 0)) {
            additionalHeight = Math.abs(bodyRect.height - mainfooter.getBoundingClientRect().y); // if footer is placed below the content, add its height in the subtraction formula
          }
        }
      }


      sumToBeSubtracted = offset + additionalHeight /* + ((counter) * sectionPadding) */;
      const newHeight = 'calc(100vh  - (' + (Math.abs(sumToBeSubtracted)) + 'px))';
      elem.style.height = newHeight;
    }

  }
  ngOnDestroy() {
    if (!!this.checkViewSubscription) {
      this.checkViewSubscription.unsubscribe();
    }

    if (this.intervalChecking) {
      // clearInterval(this.intervalChecking);
      clearTimeout(this.intervalChecking);
    }
  }
}
