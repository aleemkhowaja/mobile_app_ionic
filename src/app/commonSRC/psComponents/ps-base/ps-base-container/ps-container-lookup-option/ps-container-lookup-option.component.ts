import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';
import { IActionDetailsOptions, IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { ComponentOptions, IOptionsDynamicEditExposed, IOptionsPsActionHyperlink, IOptionsPsActionIcon, IOptionsPsLabel, IOptionsPsRecordAttachmentComponentExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexAlertController } from 'src/app/commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { PsApplicationSettings } from '../../../../psServices/models/ps-app-settings';
import { IOptionsPsActionImage, IOptionsPsBalanceExposed, IOptionsPsFieldLabel, IPageCommon } from '../../../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../psServices/models/ps-common.settings';
import { PsActionIconComponent } from '../../ps-base-action/ps-action-icon/ps-action-icon.component';
import { PsBaseFieldComponent } from '../../ps-base-field/ps-base-field.component';



/**
 * @author Aftab.Ali
 * @since 09/12/2019
 * <p> PsContainerLookupOptionComponent </p>
 */
@Component({
  selector: 'ps-container-lookup-option',
  templateUrl: './ps-container-lookup-option.component.html',
  styleUrls: ['./ps-container-lookup-option.component.scss'],
})
export class PsContainerLookupOptionComponent extends PsBaseFieldComponent implements OnInit, AfterViewInit {

  @Input() options: IOptionsPsContainerLookupOptionComponentExposed = {};
  @Input() itemCard: any;
  @Output() clickedCard: EventEmitter<any> = new EventEmitter<any>();
  // @Output() refreshList: EventEmitter<any> = new EventEmitter<any>();
  public templateOptions: IMapKeyValue[] = [];
  public cardContentOptions: IMapKeyValue[] = [];
  public selectedItem: any = {};
  public actionDetailsOptions: IActionDetailsOptions = {};
  public editMode = false;
  public showFebCloseIcon = false;
  public collapsed = true;
  public initialShowVal = PsCommonSettings.showInitialCardValues;
  public showTotal;
  public balanceOptions: IOptionsPsBalanceExposed = {};
  public currencyImageOptions: IOptionsPsActionImage = {};
  public currencyImage: string;
  public dynamicEditOptions: IOptionsDynamicEditExposed = {};
  public gotoActionIcon: IOptionsPsActionIcon = {};
  public titleOptions: IOptionsPsLabel = {};
  public actionHyperlinkOptions: IOptionsPsActionHyperlink = {};
  public statusOptions: IOptionsPsLabel = {};
  public currencyISO: string;
  public showBalance = false;
  public itemStatusClass = '';
  public recordAttachementOptions: IOptionsPsRecordAttachmentComponentExposed = {};
  public showMoreOptions: IOptionsPsActionIcon = {};
  public showLessOptions: IOptionsPsActionIcon = {};
  public actionOptionList: IActionDetailsOptions[] = [];
  public isIOS: boolean;
  public loaderOptions: IOptionsPsActionIcon = {};
  public showLoader = false;
  detailsDisplayed = false;
  reqParamsLabelKey: any;
  @ViewChild('moreItems', { static: false }) moreItems: Element;
  @ViewChild('dynamicComponent', { static: false, read: ViewContainerRef }) dynamicComponentRef;
  public dynaComponent: Type<any>;
  public dynamicComponentOptions: any;
  public dynamicComponentParam; any;
  @ViewChildren('dynamicComponent') childrenComponent: QueryList<ViewContainerRef>;
  @ViewChild('actionIcon', { static: false }) actionIcon: PsActionIconComponent;
  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    public navService?: PsNavigatorService,
    private platform?: Platform,
    private componentFactoryResolver?: ComponentFactoryResolver
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.showTotal = this.options.showInitialCardValues ? this.options.showInitialCardValues : PsCommonSettings.showInitialCardValues;
    this.isIOS = this.platform.is('ios');
    this.options.group = this.options.formGroup;
    super.ngOnInit();
    this.editMode = false;
    this.options.showItemPopUp = false;
    this.options.showSelectedCard = true;
    // this.options.formGroup = new FormGroup({});
    this.loadBalanceMap();
    this.loadLabelsValueMap();
    this.gotoActionIcon = {
      iconName: this.options.statementOptions ? this.options.statementOptions.buttonIcon : '',
      allowCust: true
    };
    this.showMoreOptions = {
      iconName: 'arrow-down'
    };
    this.showLessOptions = {
      iconName: 'arrow-up'
    };
    this.loaderOptions = {
      iconName: 'loading',
      psClass: 'align-loader'
    };

    this.dynamicEditOptions = {
      itemCard: this.itemCard,
      group: this.options.formGroup,
      isEditable: this.options.isEditable,
      actionUrl: this.options.editActionUrl,
      requestMap: this.options.requestMap,
      editRequestMap: this.options.editRequestMap,
      translate: this.options.translateSubTitle
    };

    if (this.itemCard && this.itemCard.nickName) {
      const reqMap: Map<string, string> = new Map(this.options.requestMap);
      reqMap.set('oldNickName', 'nickName');
      const editReqMap: Map<string, string> = new Map(this.options.editRequestMap);
      editReqMap.set('newNickName', 'nickName');
      this.dynamicEditOptions.valueMap = this.itemCard.nickName;
      this.dynamicEditOptions.fcName = 'nickName';
      this.dynamicEditOptions.requestMap = reqMap;
      this.dynamicEditOptions.editRequestMap = editReqMap;
    } else {
      this.dynamicEditOptions.valueMap = this.itemCard[this.templateOptions[1].value];
      this.dynamicEditOptions.fcName = this.templateOptions[1].value;
    }

    setTimeout(() => {
      if (this.itemCard && this.itemCard[this.options.currencyFlag]) {
        this.currencyISO = this.itemCard[this.options.currencyFlag];
        this.currencyImage = this.itemCard[this.options.currencyFlag].toLowerCase() + '.png';
      }
      this.currencyImageOptions = {
        imagePath: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'currencies/',
        imageName: this.currencyImage,
        imageBase64Url: ''
      };
    }, 1);
    this.titleOptions.labelKey = this.itemCard[this.templateOptions[0].value];
    this.statusOptions.labelKey = this.getStatus();
    this.itemStatusClass = this.statusOptions.labelKey + '-status-class';
    this.actionOptionList = [];
    if (this.options.actionDetailsOptions !== null && this.options.actionDetailsOptions !== undefined) {
      this.options.actionDetailsOptions.forEach(actionOption => {
        if (actionOption && actionOption.actionHyperlink) {
          const hyperLink: IActionDetailsOptions = {};
          this.common.copyObject(hyperLink, actionOption, true, true);
          hyperLink.actionHyperlink.navigationOptions = {
            queryParams: Object.assign({}, this.itemCard, actionOption.actionHyperlink.navigationOptions ? actionOption.actionHyperlink.navigationOptions.queryParams : {})
          };
          hyperLink.actionHyperlink.pageOptions.operId = this.itemCard.operId ? this.itemCard.operId : actionOption.actionHyperlink.pageOptions.operId;
          this.actionOptionList.push(hyperLink);
        } else if (actionOption && (actionOption.actionUrl || actionOption.commonMethod)) {
          if (actionOption.actionType === 'suspend' && (this.itemCard.status !== 'S' && this.itemCard.status !== 'Suspended')) {
            this.actionOptionList.push(actionOption);
          } else if (actionOption.actionType === 'activate' && (this.itemCard.status !== 'A' && this.itemCard.status !== 'Active')) {
            this.actionOptionList.push(actionOption);
          } else if (actionOption.actionType !== 'activate' && actionOption.actionType !== 'suspend') {
            this.actionOptionList.push(actionOption);
          }
        } else if (actionOption && actionOption.component) {
          this.dynaComponent = actionOption.component;
          this.dynamicComponentOptions = actionOption.componentOptions !== undefined ? actionOption.componentOptions : {};
          this.dynamicComponentParam = actionOption.param !== undefined ? actionOption.param : {};
          if (this.dynamicComponentParam !== {} && this.dynamicComponentParam.optionKey !== null) {
            this.dynamicComponentOptions[this.dynamicComponentParam.optionKey] = this.itemCard[this.dynamicComponentParam.itemKey];
          }
          this.actionOptionList.push(actionOption);
        }
      });
    }
  }

  private getStatus(): string {
    const status = this.itemCard.status;
    let newStatus = '';
    if (status) {

      switch (status) {
        case 'A': {
          newStatus = 'Active';
          break;
        }
        case 'D': {
          newStatus = 'Deactive';
          break;
        }
        case 'B': {
          newStatus = 'Blocked';
          break;
        }
        case 'I': {
          newStatus = 'Inactive';
          break;
        }
        case 'S': {
          newStatus = 'Suspended';
          break;
        }
        case 'N': {
          newStatus = 'New';
          break;
        }
        case 'Active': {
          newStatus = 'Active';
          break;
        }
        case 'Deactive': {
          newStatus = 'Deactive';
          break;
        }
        case 'Blocked': {
          newStatus = 'Blocked';
          break;
        }
        case 'Inactive': {
          newStatus = 'Inactive';
          break;
        }
        case 'Suspended': {
          newStatus = 'Suspended';
          break;
        }
        case 'New': {
          newStatus = 'New';
          break;
        }
        case 'Draft': {
          newStatus = 'Draft';
          break;
        }
        default: {
          newStatus = this.common.translate(status);
          break;
        }
      }
    } else if (this.itemCard.chequebookStatusDesc !== undefined) {
      newStatus = this.itemCard.chequebookStatusDesc;
    }
    return newStatus;
  }
  /**
   *
   * @param item
   */
  public showClickedCard(item: any) {
    if (this.options.isEditable) {
      return;
    }
    this.clickedCard.emit(item);
  }

  /**
   * preparing list for template card and content card from the map passed in options
   */
  private loadLabelsValueMap() {

    Array.from(this.options.headerMap).forEach((headerOption) => {
      const tempOption: IMapKeyValue = {
        key: headerOption[0],
        value: headerOption[1].value,
        isEdit: headerOption[1].isEdit,
        formGroupMap: headerOption[1].formGroupMap
      };
      if (tempOption.formGroupMap && tempOption.formGroupMap !== undefined) {
        tempOption.formGroupMap.group = this.options.formGroup;
      }
      this.templateOptions.push(tempOption);
    });

    this.prepareCardContent();
  }

  /**
   *
   * @param item
   * @param actionOptions
   */
  public actionFunc(item: any, actionOptions: IActionDetailsOptions, event) {
    if (actionOptions.filterParamValues && actionOptions.filterParamValues.length > 0) {
      item = this.filterFunc(item, actionOptions);
    }
    if (actionOptions && actionOptions.commonMethod && actionOptions.commonMethod !== '') {
      this.commonProv[actionOptions.commonMethod](item);
    } else if (actionOptions && actionOptions.actionUrl && actionOptions.actionUrl !== '') {
      const requestparameters: any = {
        actionType: actionOptions.actionType,
        commonParametersList: item,
        operId: actionOptions.operId
      };
      if (item && item.dataSaveId) {
        requestparameters.dataSaveId = item.dataSaveId;
      }

      // ACTION_REASON_INPUT
      // ACTION_REASON_WARNING

      if (actionOptions.actionType) {
        if (actionOptions.alertType === ConstantCommon.ACTION_REASON_WARNING) {
          this.confirmationPopup(requestparameters, actionOptions, item);
        } else if (actionOptions.alertType === ConstantCommon.ACTION_REASON_INPUT) {
          this.reasonPopup(requestparameters, actionOptions, item);
        } else {
          this.confirmationPopup(requestparameters, actionOptions, item);
        }

      } else {
        this.actionGenericFunction(requestparameters, actionOptions, item);
      }
    }
  }

  public filterFunc(item: any, actionOptions: IActionDetailsOptions): any {
    // send specific parameters and not all item data
    const requestMap = {};
    actionOptions.filterParamValues.forEach(element => {
      requestMap[element] = item[element];
    });
    return requestMap;
  }

  /**
   * will send the edited values and additional values from the selected item
   */
  public submit() {

    const requestParams = this.options.formGroup.value;
    this.actionDetailsOptions.rquestParam.forEach(param => {
      const requestObj = {
        [param]: this.selectedItem[param]
      };
      this.commonProv.copyObject(requestParams, requestObj, false);
    });

    if (this.actionDetailsOptions && this.actionDetailsOptions.actionUrl) {
      this.prepareCommonReqAjax(this.actionDetailsOptions.actionUrl, requestParams ).then(result => {
        this.logger.log('success', result);
      }).catch(
        error => this.logger.error(error)
      );
    }
  }

  public showMore() {
    this.collapsed = !this.collapsed;
    this.showTotal = this.initialShowVal;

    // Restrict to call for one time only on card expend
    if (!this.collapsed && !this.detailsDisplayed) {
      this.detailsDisplayed = true;
      if (this.options.detailServiceUrl.length > 0) {
        this.prepareCardContent(false);
        this.options.detailServiceUrl.forEach(async (service, index) => {
          this.reqParamsLabelKey = {};
          this.showLoader = true;

          // check and prepare request params that passes from the business component
          if (service.paramsKeyLabels !== undefined) {
            this.reqParamsLabelKey = this.prepareReqParamKeyLabel(service.paramsKeyLabels)
          }
          if (service.url !== undefined) {

            // Calling ajax request 
            this.prepareCommonReqAjax(service.url, this.reqParamsLabelKey).then((result) => {
              if (result !== undefined) {
  
                // Bind the updated response value to the itemCard as defined as responsekeylabel in business component.
                const matchResponse = service.responseKeyLabel;
                this.cardContentOptions.forEach(param => {
                  matchResponse.forEach(response => {
                    if (response.value === param.value) {
                      this.itemCard[param.value] = result[response.key];
                    }
                  });
                });
                this.showLoader = false;
              } else {
                this.showLoader = false;
              }
            }), (error) => {
              this.showLoader = false;
            }
          }
        });
      }
    }
  }

  public showLess() {
    this.showTotal = this.options.showInitialCardValues ? this.options.showInitialCardValues : this.initialShowVal;
    this.common.hideElementWhenAnimationEnds(this.moreItems, 'card-action-buttons-hide').then(() => {
      this.collapsed = !this.collapsed;
    });
  }

  private loadBalanceMap() {
    if (this.options.balanceMapping && this.options.balanceMapping.length > 0) {
      this.balanceOptions.labelBalance1 = this.options.balanceMapping[0].key;
      this.balanceOptions.labelBalance2 = this.options.balanceMapping[1].key;
      this.balanceOptions.balanceValue1 = this.itemCard[this.options.balanceMapping[0].value];
      this.balanceOptions.balanceValue2 = this.itemCard[this.options.balanceMapping[1].value];
      if (this.balanceOptions.balanceValue1 !== null && this.balanceOptions.balanceValue1 !== undefined && this.balanceOptions.balanceValue2 !== null && this.balanceOptions.balanceValue2 !== undefined) {
        this.showBalance = true;
      }
    }
  }

  switchToEditMode() {

  }

  /**
   *
   * @param statmenetOptions
   */
  public gotoStatement(statmenetOptions: IActionDetailsOptions) {
    if (statmenetOptions && statmenetOptions.redirectUrl && statmenetOptions.redirectUrl !== '') {
      const reportParametersList = this.itemCard as Map<string, string>;
      const navigationExtras: NavigationExtras = {
        queryParams: { ...reportParametersList }
      };
      let page: IPageCommon;
      page = {
        operID: this.options.pageData.operID,
        title: this.options.pageData.title,
        icon: 'report'
      };
      this.common.activePage.next(page);
      PsCommonSettings.oper_ID = this.options.pageData.operID;
      PsCommonSettings.pageName = this.options.pageData.title;
      this.navService.navigateForward(statmenetOptions.redirectUrl, navigationExtras);
    }
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
      labelKey: this.fcValueDesc,
      psClass: 'ps-value-preview',
      previewMode: true
    };
  }

  get fcValueDesc(): string {
    const value: any = this.titleOptions.labelKey;
    return value;
  }

  ngAfterViewInit() {
    this.childrenComponent.changes.subscribe((comps: QueryList<ViewContainerRef>) => {
      if (this.options && this.dynaComponent && this.dynamicComponentRef) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.dynaComponent);
        const ref = this.dynamicComponentRef.createComponent(factory);
        (ref.instance as ComponentOptions).options = this.dynamicComponentOptions;
        ref.changeDetectorRef.detectChanges();
      }
    });
  }


  /**
   *
   * @param requestparameters
   * @param actionOptions
   * @param item
   */
  private reasonPopup(requestparameters: any, actionOptions: IActionDetailsOptions, item: any) {
    const postCall = actionOptions.postCallFunction;
    actionOptions.postCallFunction = undefined;
    return new Promise<any>((resolve, reject) => {
      {
        {
          const alertController: IOptionsPsComplexAlertController = {
            cssClass: 'ps-button-save',
            header: 'enter_' + requestparameters.actionType + '_reason_key',
            inputs: [
              {
                type: 'keyin',
                options: {
                  placeHolder: requestparameters.actionType + '_reason_key',
                  fcName: actionOptions.fcName,
                  group: this.dynamicEditOptions.formGroup
                }
              }
            ],
            buttons: [
              {
                role: 'cancel',
                options: {
                  labelKey: 'cancel_key',
                  psClass: 'ps-drafts-report-cancel-button',
                  group: this.options.formGroup
                },
                handler: () => {
                  this.dynamicEditOptions.formGroup.removeControl(actionOptions.fcName);
                  reject(false);
                }
              }, {
                role: 'cancel',
                options: {
                  ...actionOptions,
                  labelKey: requestparameters.actionType + '_key',
                  iconName: 'paper-plane',
                  psClass: 'ps-drafts-report-submit-button',
                  group: this.options.formGroup
                },
                handler: () => {
                  const requestParams: any = {
                    ...this.dynamicEditOptions.formGroup.value,

                    ...requestparameters,
                    commonParametersList: {
                      ...this.dynamicEditOptions.formGroup.value,
                      ...requestparameters.commonParametersList
                    }
                  };
                  const items: any = {
                    ...this.dynamicEditOptions.formGroup.value,
                    ...item
                  };
                  this.dynamicEditOptions.formGroup.removeControl(actionOptions.fcName);
                  actionOptions.postCallFunction = postCall;
                  this.actionGenericFunction(requestParams, actionOptions, items);
                  CommonUtils.dismissAllModals();
                }
              }
            ]
          };
          this.commonProv.presentPsAlert(alertController, 'ps-input-reason');
        }
      }
    });
  }


  /**
   *
   * @param requestparameters
   * @param actionOptions
   * @param item
   */
  private confirmationPopup(requestparameters: any, actionOptions: IActionDetailsOptions, item: any) {
    return new Promise<any>((resolve, reject) => {
      {
        CommonUtils.presentInfoAlert(actionOptions.alertMessage !== undefined ? this.commonProv.translate(actionOptions.alertMessage) : this.commonProv.translate('are_you_sure_?_key'),
          {
            buttonsArray: [
              {
                group: this.options.group,
                type: 'reset',
                labelKey: 'cancel_key',
                handler: () => {
                  CommonUtils.dismissAllModals();
                  reject(false);
                }
              },
              {
                group: this.options.group,
                labelKey: 'ok_key',
                type: 'submit',
                handler: () => {
                  this.actionGenericFunction(requestparameters, actionOptions, item);
                  CommonUtils.dismissAllModals();
                }
              }
            ]
          }
        );
      }
    });
  }


  /**
   *
   * @param requestparameters
   * @param actionOptions
   * @param item
   */
  private actionGenericFunction(requestparameters: any, actionOptions: IActionDetailsOptions, item: any) {
    CommonUtils.presentLoading();
    if (actionOptions.detailServiceCallOnAction) {
      if (actionOptions.detailServiceUrl !== undefined) {
        // Calling ajax request 
        this.prepareCommonReqAjax(actionOptions.detailServiceUrl, requestparameters).then((result) => {
          if (result !== undefined) {
            result = this.prepareResult(result);
            requestparameters.commonParametersList = Object.assign(requestparameters.commonParametersList, result);
            this.callGenericActionFunction(requestparameters, actionOptions, item);
          }
        });
      }
    } else {
      this.callGenericActionFunction(requestparameters, actionOptions, item);
    }
  }
  prepareReqParamKeyLabel(paramsKeyLabels) {
    paramsKeyLabels.forEach(param => {
      if (param.value !== undefined) {
        this.reqParamsLabelKey[param.key] = this.itemCard[param.value];
      } else if (param.staticValue !== undefined) {
        this.reqParamsLabelKey[param.key] = param.staticValue;
      }
    });
    return this.reqParamsLabelKey
  }


  // Common request ajax method to avoid calling bussiness component services
  async prepareCommonReqAjax(url, params): Promise<any> {
    params['apiCode'] = -1;
    return new Promise<any>((resolve, reject) => { 
      this.common.http.commonRequestAjax(url, params
        ).then
          ((result) => {
            const list: Array<any> = result.data.gridModel as Array<any>;
            if (result.data !== undefined && list === undefined) {
              resolve(result.data);
            }
            if (list && list.length > 0) {
              const data = list[0];
                resolve(data);
            }
          }).catch((error) => {
            this.logger.error('Error: ' + error);
              reject(undefined);
          });
    })

  }

  prepareCardContent(detailOption?) {
    this.cardContentOptions = [];
    Array.from(this.options.labelsValueMap).forEach((labelOption) => {
      const contentOption: IMapKeyValue = {
        key: labelOption[0],
        value: labelOption[1].key,
        isEdit: labelOption[1].isEdit,
        formGroupMap: labelOption[1].formGroupMap,
        showMappingOnNoValue: labelOption[1].showMappingOnNoValue !== undefined ? labelOption[1].showMappingOnNoValue : false,
        isDetailOption: detailOption !== undefined? detailOption : labelOption[1].isDetailOption
      };
      if (contentOption.formGroupMap && contentOption.formGroupMap !== undefined) {
        contentOption.formGroupMap.group = this.options.formGroup;
      }
      this.cardContentOptions.push(contentOption);
    });
  }

  // This method is to remove useless/non-required properties from the detailsService api result
  prepareResult(result) {
    delete result.udid;
    delete result.userCifNo;
    delete result.userName;
    delete result.workingCif;
    delete result.sessionId;
    delete result.ocUserId;
    return result;
  }
  callGenericActionFunction(requestparameters: any, actionOptions: IActionDetailsOptions, item: any){
    this.prepareCommonReqAjax(actionOptions.actionUrl, requestparameters).then(result => {
      if (result.outputType === ConstantCommon.OUT_PUT_TYPE_SUCCESS) {
        if (this.options.itemList && this.options.itemList.length > 0) {
          this.options.itemList = this.options.itemList.filter(itemVal => itemVal !== item);
          this.actionIcon.postCallFunctionCall();
        }
      } else {
        CommonUtils.presentFailureAlert(result.outputNotification, { autoHide: true });
      }
      CommonUtils.dismissLoading();
    }).catch(error => {
      this.logger.error(error);
      CommonUtils.dismissLoading();
    });
  }
}
