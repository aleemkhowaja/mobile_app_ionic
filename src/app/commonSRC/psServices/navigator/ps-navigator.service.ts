import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { reject } from 'q';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPageBussiness } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IbusinessProfilesCO, IOperDef } from 'src/app/pages/omni-login/omni-login.interfaces';
import { IOptionsPsComplexAlertController } from '../../psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { ConstantCommon } from '../models/common-constant';
import { CommonUtils } from '../models/common-utils';
import { INavigationHandler, PSNavigationOptions } from '../models/ps-common-interface';
import { PsCommonSettings } from '../models/ps-common.settings';
import { PsCommonService } from '../ps-common/ps-common.service';



@Injectable({
  providedIn: 'root'
})
export class PsNavigatorService {

  constructor(private navCtrl: NavController, public commonService: PsCommonService, public router: Router) {
  }

  private currentIndex = 0;
  private maxRouters = 50;
  private lastClosed;
  private activeRoutersArray = [];
  private pagesNavigationInfo: BehaviorSubject<IOperDef> = new BehaviorSubject<IOperDef>(null);
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private navParam: any = {};
  activeOpersList = [this.isUserLoggedIn ? ConstantCommon.LANDING_OPER_ID : ConstantCommon.LOGIN_OPER_ID];
  private businessProfile: IbusinessProfilesCO[] = [];




  private commonNavigationOptions = {
    // skipLocationChange: true , replaceUrl: false
  };
  private forwardAnimation = {
    ...this.commonNavigationOptions,
    animationDirection: 'forward'
  };

  private backwardAnimation = {
    ...this.commonNavigationOptions,
    animationDirection: 'back'
  };

  get isUserLoggedIn() {
    return PsCommonSettings.isLoggedIn;
  }

  public getPagesNavigationInfo(): Observable<IOperDef> {
    return this.pagesNavigationInfo.asObservable();
  }

  public getIsUserLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /**
   * a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
   * and that it will show a "forward" animation by default.
   */
  navigateForward(url, options?: PSNavigationOptions): Promise<any> {
    return new Promise<any>((resolve) => {
      if (PsCommonSettings.oper_ID === (ConstantCommon.LOGIN_OPER_ID || ConstantCommon.LANDING_OPER_ID)) {
        this.activeOpersList = [PsCommonSettings.oper_ID];
        this.navigateToMain().then(() => {
          resolve(true);
        }).catch(() => {
          reject();
        });
      } else {
        const canNavigate = this.commonCheckingPriorNavigation(url, options, this.navigateForward);
        if (!canNavigate) {
          reject();
          return;
        }
        this.activeOpersList.push(PsCommonSettings.oper_ID);
        this.commonService.applyPageCustomization().then(() => {
          if (this.checkIfWeb(url)) {
            return this.navigateWeb(url, options);
          }
          this.navCtrl.navigateForward(url, this.createOptionsAndApplyCommonFlow(url, options, this.forwardAnimation)).then((result) => {
            this.postNavigationCommonFlow();
            resolve(result);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    });
  }


  private commonCheckingPriorNavigation(url, options: PSNavigationOptions, functionToCall?: (...value: any) => boolean | void | { [key: string]: any; }): boolean {
    const previousOperID = this.activeOpersList.slice(-1).pop();
    const currentOperID = PsCommonSettings.oper_ID;
    if (previousOperID && currentOperID && previousOperID === currentOperID) {
      CommonUtils.dismissLoading();
      const alertController: IOptionsPsComplexAlertController = {
        cssClass: 'same-route-popup',
        header: 'reload_screen_key',
        buttons: [
          {
            role: 'cancel',
            options: {
              labelKey: 'cancel_key',
              psClass: 'ps-drafts-report-cancel-button',
              group: new FormGroup({}),
            },
            handler: () => {

            }
          },
          {
            options: {
              labelKey: 'yes_key',
              psClass: 'ps-button-submit',
              group: new FormGroup({}),
            },
            handler: async () => {
              await this.pop();
              this.openPage(options.psPage);
              CommonUtils.dismissAllModals();
            }
          }
        ]
      };
      this.commonService.presentPsAlert(alertController, 'same-route-popup');
      return false;
    }
    return true;
  }


  private checkIfWeb(url) {
    const path = this.router.config.find((element) => element.path === url && element.outlet === 'webOutlet');
    if (!path) {
      return false;
    }
    if (this.commonService.isWeb() && path && this.isUserLoggedIn) {
      return true;
    }
    return false;
  }


  private navigateWeb(url, options?: PSNavigationOptions, type?): Promise<any> {
    return new Promise<any>((resolve, rej) => {
      const tempUrl: any = {};
      tempUrl.outlets = {};
      tempUrl.outlets.webOutlet = url;
      if (!type) {
        this.navCtrl.navigateForward([{ outlets: tempUrl.outlets }], this.createOptionsAndApplyCommonFlow(url, options, this.forwardAnimation)).then((result) => {
          this.postNavigationCommonFlow();
          resolve(result);
        }).catch((error) => {
          rej(error);
        });
      }
      if (type === 0) {
        this.activeOpersList = [];
        this.activeOpersList.push(PsCommonSettings.oper_ID);
        this.navCtrl.navigateRoot([{ outlets: tempUrl.outlets }], this.createOptionsAndApplyCommonFlow(url, options, this.forwardAnimation)).then((result) => {
          this.postNavigationCommonFlow();
          resolve(result);
        }).catch((error) => {
          rej(error);
        });
      }
    });
  }



  /**
   * all the pages in the stack until the navigated page is found will be popped,
   * and that it will show a "back" animation by default.
   */
  navigateBack(url, options?: PSNavigationOptions): Promise<any> {
    return new Promise<any>((resolve) => {
      this.activeOpersList.pop();
      PsCommonSettings.oper_ID = this.activeOpersList[this.activeOpersList.length - 1];
      this.navCtrl.navigateBack(url, this.createOptionsAndApplyCommonFlow(url, options, this.backwardAnimation)).then((result) => {
        this.postNavigationCommonFlow();
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * all existing pages in the stack will be removed, and the navigated
   *  page will become the single page in the stack.
   */
  navigateToMain(url?: any, options?: PSNavigationOptions): Promise<any> {
    if (!url) {
      if (this.isUserLoggedIn) {
        url = ['./home'];
        PsCommonSettings.oper_ID = ConstantCommon.LANDING_OPER_ID;
      } else {
        url = ['./omni-login'];
        PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
      }
      this.activeOpersList = [];
      this.activeOpersList.push(PsCommonSettings.oper_ID);
    }
    return new Promise<any>(async (resolve, rej) => {
      let custRes = true;
      if (url[0].indexOf('omni-login') > -1) {
        this.activeOpersList = [];
        this.activeOpersList.push(PsCommonSettings.oper_ID);
        custRes = await this.commonService.applyPageCustomization();
        if (!custRes) {
          rej(custRes);
        }
      }
      if (custRes) {
        if (this.checkIfWeb(url)) {
          this.navigateWeb(url, options, 0).then(res => {
            resolve(res);
          }).catch(err => { rej(err); });
        } else {
          this.navCtrl.navigateRoot(url, this.createOptionsAndApplyCommonFlow(url, options, this.forwardAnimation)).then(res => {
            this.postNavigationCommonFlow();
            resolve(res);
          }).catch(err => { rej(err); });
        }
      }
    });
  }



  private createOptionsAndApplyCommonFlow(url, options, animation): PSNavigationOptions {
    let newOptions: PSNavigationOptions = {};
    newOptions = this.commonService.copyObject(newOptions, options, true);
    newOptions = newOptions ? { ...newOptions, ...this.commonNavigationOptions, ...animation } :
      {
        ...this.commonNavigationOptions,
        ...animation
      };
    this.navParam = newOptions.queryParams ? newOptions.queryParams : {};

    // apply common flow
    let currentPage: IOperDef = this.commonService.getPageByOperId(PsCommonSettings.oper_ID);
    if (currentPage) {
      currentPage.route = url;
    } else {
      currentPage = {
        route: url,
        OPER_ID: PsCommonSettings.oper_ID
      };
    }
    this.pagesNavigationInfo.next(currentPage);
    newOptions.skipLocationChange = true;
    return newOptions;
  }


  autoNavigate(navigationHandler: INavigationHandler) {
    if (!window.navigationHandler) {
      window.navigationHandler = navigationHandler;
    }
    const routes = navigationHandler.pageData;
    const currentPage = navigationHandler.currentPage;
    const mainPage = navigationHandler.mainPage;
    window.navigationHandler.currentPage++;

    if ([routes[currentPage].component]) {
      this.commonService.activePage.next({
        title: routes[currentPage].title ? this.commonService.translate(routes[currentPage].title) : null,
        icon: routes[currentPage].icon ? routes[currentPage].icon : null,
        operID: routes[currentPage].operID
      });
      PsCommonSettings.oper_ID = routes[currentPage].operID;
      this.navigateForward([routes[currentPage].component]);
    } else {
      // window.navigationHandler = undefined;
    }
  }

  /*   private createRouteAndNavigate(url, pathName, outletName, tempUrl, options) {
      this.router.resetConfig([
        ...this.router.config,
        { path: pathName, outlet: outletName },
      ]);

      return this.router.navigate([{ outlets: tempUrl.outlets }], options);
    }
   */
  pop(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.activeOpersList.pop();
      if (this.activeOpersList.length > 0) {
        PsCommonSettings.oper_ID = this.activeOpersList[this.activeOpersList.length - 1];
        this.navCtrl.pop().then((result) => {
          this.postNavigationCommonFlow();
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      } else {
        this.navigateToMain().then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      }
    });
  }

  private navigateTo(url, options?: PSNavigationOptions): Promise<any> {
    options ? options = { ...options, ...this.commonNavigationOptions } : {};
    return this.navigateForward(url, options);
  }

  getParamKey(key: string) {
    return this.navParam[key];
  }

  getAllParams() {
    return this.navParam;
  }

  onCancelClicked() {
    this.commonService.cancelClicked.next(true);
    this.pop();
    // if (this.isUserLoggedIn) {
    //   if (this.commonService.isWebLayout()) {
    //     this.pop();
    //   } else {
    //     PsCommonSettings.oper_ID = ConstantCommon.LANDING_OPER_ID;
    //     this.navigateToMain(['./home']);
    //   }
    // } else {
    //   this.commonService.activePage.next(null);
    //   PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
    //   this.navigateToMain(['./omni-login'], { queryParams: { fromCancel: ConstantCommon.CANCEL_CLICKED } });
    // }
  }


  openPage(page: IPageBussiness) {
    this.commonService.presentLoading();

    if ((!page.component) && page.operID) {
      const currentPage: IOperDef = this.commonService.getPageByOperId(page.operID);
      page.component = currentPage.PAGE_HREF;
      page.icon = currentPage.ICON_NAME;
      page.title = currentPage.OPER_NAME ? currentPage.OPER_NAME : currentPage.DESCRIPTION;
      page.param = page.param ? page.param : currentPage.PARAM;
      page.isMaker = currentPage.MAKER_YN === 'Y';
      page.isChecker = currentPage.CHECKER_YN === 'Y';
    }

    if (CommonBussinessConstant.WORKING_CIF_OPER_TO_BE_CHECKED.includes(page.operID) && PsCommonSettings.APP_ID === ConstantCommon.AGENT_APPLICATION_APP_ID) {
      const workingCif = this.commonService.session.getValueOf('WORKINGCIF');
      if (workingCif === undefined) {
        CommonUtils.presentFailureAlert(this.commonService.translate('please_add_working_cif_before_key')).then(() => {
          this.navigateToMain();
          this.commonService.dismissLoading();
        });
        return;
      }
    }


    if (page && page.component && page.component !== ConstantCommon.HASH_INPUT) {
      let isAvailable = false;
      for (const eachRoute of this.router.config) {
        if (eachRoute.path === page.component) {
          isAvailable = true;
          break;
        }
      }
      if (isAvailable === false) {
        CommonUtils.presentFailureAlert('Page Not Found!', { autoHide: true }).then(() => {
          PsCommonSettings.oper_ID = ConstantCommon.LANDING_OPER_ID;
          this.navigateToMain(['./home']);
          this.commonService.dismissLoading();
          return;
        });
      }
      // Added by Richie to retrieve the customization records per screen
      PsCommonSettings.oper_ID = page.operID;
      PsCommonSettings.pageName = page.title;
      PsCommonBusinessSettings.isMaker = page.isMaker;
      PsCommonBusinessSettings.isChecker = page.isChecker;
      this.commonService.activePage.next(page);
      if (page.isMaker != true && page.isChecker) {
        if (page.param === undefined) {
          page.param = {};
        }
       // page.param.readOnlypage = true;
      }

      const navigationOptions: PSNavigationOptions = {
        queryParams: page.param
      };
      navigationOptions.psPage = page;
      this.navigateForward(['./', page.component], navigationOptions);

      // End Richie
    } else {
      this.commonService.dismissLoading();
    }
  }

  postNavigationCommonFlow() {
    // this.resetBrowserURL();
  }
  resetBrowserURL() {
    if (!CommonUtils.isNativeMobile()) {
      const contextRoot = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      window.history.replaceState(null, null, contextRoot);
    }
  }
  /*   private postLoginNavigation(url, options?: NavigationOptions): Promise<any> {
      if (this.currentIndex <= this.maxRouters) {
        this.currentIndex++;
        this.activeRoutersArray.push(this.currentIndex);
        this.activeRouters.next(this.activeRoutersArray);
        const outletName = 'router' + this.currentIndex;
        const pathName = outletName + '-path';
        const tempUrl: any = {};
        tempUrl.outlets = {};
        tempUrl.outlets[outletName] = [pathName];

        _.remove(this.router.config, (x) => {
          return x.path === pathName;
        }); // remove path if already present

        return this.router.navigate([{ outlets: tempUrl.outlets }], options);
        // return this.createRouteAndNavigate(url, pathName, outletName, tempUrl, options);

      } else {
        // TODO reset int or popup a msg indicating max routers reached
      }
    } */
}
