import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsActionHyperlink } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../psServices/models/ps-common-bussiness-constant';
import { IListContainerLookupOption, IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from '../../psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from '../../psServices/omni-common/omni-pull.service';
import { IOmniScheduledTransfer, IOptionsPsOptionScheduledTransferExposed } from './ps-scheduled-transfers-list.component.interface';



@Component({
    selector: 'ps-scheduled-transfers-list',
    templateUrl: './ps-scheduled-transfers-list.component.html',
    styleUrls: ['./ps-scheduled-transfers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsScheduledTransfersListComponent extends PsBaseFieldComponent implements OnInit, OnDestroy {
    public updateList: any[];
    public bRefresh = false;
    @Input() options: IOptionsPsOptionScheduledTransferExposed;
    lookUpOptions: IListContainerLookupOption[] = [];
    public labelValuesMap = new Map<string, IMapKeyValue>();
    public headerMap = new Map<string, IMapKeyValue>();
    allowEdit: boolean = false;
    allowDelete: boolean = false;
    allowStop: boolean = false;

    @Output() reloadFct = new EventEmitter<string>();
    constructor(commonServices: PsCommonService,
        logger: LoggerService,
        private omniPull?: OmniPullService) {
        super(commonServices, logger);
        this.populateHeaderValueMap();
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.options && this.options.listOfOptions) {
            this.options.itemList = this.options.listOfOptions;
        }
        if (this.common.getPageByOperId(CommonBussinessConstant.EDIT_STANDING_ORDER) !== undefined
            || PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) {
            this.allowEdit = true;
        }
        if (this.common.getPageByOperId(CommonBussinessConstant.DELETE_STANDING_ORDER) !== undefined
            || PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) {
            this.allowDelete = true;
        }
        if (this.common.getPageByOperId(CommonBussinessConstant.STOP_STANDING_ORDER) !== undefined
            || PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) {
            this.allowStop = true;
        }
    }

    prepareLookUp(card: IOmniScheduledTransfer): any {
        const lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
        lookupDetails.labelsValueMap = this.labelValuesMap;
        lookupDetails.headerMap = this.headerMap;
        lookupDetails.formGroup = this.options.group;
        lookupDetails.isEditable = this.options.isEditable;
        lookupDetails.itemList = this.options.itemList;
        lookupDetails.showInitialCardValues = 5;
        (PsCommonSettings.oper_ID != CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) ? lookupDetails.statementOptions = {
            buttonIcon: 'list-box',
            redirectUrl: 'scheduled-transfer-statement-report'
        } : {};
        lookupDetails.actionDetailsOptions = [
            ((this.allowEdit) ?
                {
                    label: 'edit_key',
                    actionHyperlink: {
                        iconOptions: {
                            iconName: 'edit1'
                        },
                        route: 'payment',
                        pageOptions: {
                            operId: PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? CommonBussinessConstant.EDIT_IMMEDIATE_TRANSFER : CommonBussinessConstant.EDIT_STANDING_ORDER,
                            iconName: 'edit1',
                            title: 'pending_transfers_key'
                        },
                        preCallFunction: {
                            func() {
                                return new Promise<any>((resolve, reject) => {
                                    resolve(this.executionClass.prepareTransaction(lookupDetails.actionDetailsOptions[0].actionHyperlink));
                                });
                            },
                            executionClass: this,
                            params: []
                        },
                        navigationOptions: {
                            queryParams: { transferScheduledList: true },
                        },
                    }
                } : {}),
            ((PsCommonSettings.oper_ID !== CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) ? {
                label: 'details_key',
                actionHyperlink: {
                    iconOptions: {
                        iconName: 'document'
                    },
                    route: 'payment',
                    pageOptions: {
                        operId: CommonBussinessConstant.EDIT_STANDING_ORDER,
                        iconName: 'document',
                        title: 'pending_transfers_key'
                    },
                    navigationOptions: {
                        queryParams: { transferScheduledList: true, readOnlypage: true },
                    },
                    preCallFunction: {
                        func() {
                            return new Promise<any>((resolve, reject) => {
                                resolve(this.executionClass.prepareTransaction(lookupDetails.actionDetailsOptions[1].actionHyperlink));
                            });
                        },
                        executionClass: this,
                        params: []
                    },
                }
            } : {}),
            ((card.transactionStatus === 'Active' && this.allowDelete) ? {
                buttonIcon: 'delete',
                actionUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
                cssClass: 'fab-edit-button',
                label: 'delete_key',
                iconName: 'trash',
                actionType: 'Submit',
                operId: PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? CommonBussinessConstant.DELETE_IMMEDIATE_TRANSFER : CommonBussinessConstant.DELETE_STANDING_ORDER,
                postCallFunction: {
                    func() {
                        return new Promise<any>((resolve, reject) => {
                            resolve(this.executionClass.reloadList());
                        });
                    },
                    executionClass: this,
                    params: []
                },
            } : {}),
            ((card.transactionStatus === 'Created' && PsCommonSettings.oper_ID !== CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID && this.allowStop) ?
                {
                    buttonIcon: 'delete',
                    actionUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
                    cssClass: 'fab-edit-button',
                    label: 'stop_key',
                    iconName: 'square-outline',
                    actionType: 'Submit',
                    operId: CommonBussinessConstant.STOP_STANDING_ORDER,
                    filterParamValues: ['transactionNumber'],
                    postCallFunction: {
                        func() {
                            return new Promise<any>((resolve, reject) => {
                                resolve(this.executionClass.reloadList());
                            });
                        },
                        executionClass: this,
                        params: []
                    },
                } : {})

        ];
        (PsCommonSettings.oper_ID != CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) ? lookupDetails.pageData = {
            operID: ConstantCommon.VIEW_STATEMENT_OF_TRANSACTIONS,
            title: 'accounts_report_key'
        } : {};

        return lookupDetails;
    }

    reloadList() {
        this.reloadFct.emit();
    }

    private populateHeaderValueMap() {
        let typeMap: IMapKeyValue = {};
        let fromAccountMap: IMapKeyValue = {};
        let toAccountMap: IMapKeyValue = {};
        let amountMap: IMapKeyValue = {};
        let dateMap: IMapKeyValue = {};
        let referenceMap: IMapKeyValue = {};
        let statusMap: IMapKeyValue = {};
        let headerTitleMap: IMapKeyValue = {};
        let headerSubtitleMap: IMapKeyValue = {};
        let transactionNumberMap: IMapKeyValue = {};
        let bankCifShortNameEngMap: IMapKeyValue = {};
        let transactionDateMap: IMapKeyValue = {};

        transactionDateMap = {
            key: 'transactionDate',
            value: '--- --- --- ---',
            isEdit: false,
        };

        bankCifShortNameEngMap = {
            key: 'bankCifShortNameEng',
            value: '--- --- --- ---',
            isEdit: false,
            showMappingOnNoValue: true
        };

        transactionNumberMap = {
            key: 'transactionNumber',
            value: '--- --- --- ---',
            isEdit: false,
        };
        typeMap = {
            key: 'transferType',
            value: '--- --- --- ---',
            isEdit: false,
        };
        referenceMap = {
            key: 'reference',
            value: '--- --- --- ---',
            isEdit: false,
        };
        fromAccountMap = {
            key: 'fromAccount',
            value: '--- --- --- ---',
            isEdit: false,
        };
        toAccountMap = {
            key: 'toAccount',
            value: '--- --- --- ---',
            isEdit: false,
        };
        statusMap = {
            key: 'transactionStatus',
            value: '--- --- --- ---',
            isEdit: false,
        };
        amountMap = {
            key: 'transactionAmount',
            value: '--- --- --- ---',
            isEdit: false,
        };
        dateMap = {
            key: 'date',
            value: '--- --- --- ---',
            isEdit: false,
        };
        headerTitleMap = {
            key: 'title',
            value: 'title',
            isEdit: false,
            formGroupMap: {
                placeHolder: 'enter_transfer_type',
                fcName: 'transferTypeTitle',
            }
        };

        headerSubtitleMap = {
            key: 'subTitle',
            value: 'subTitle',
            isEdit: false,
            formGroupMap: {
                placeHolder: 'transfer_type',
                fcName: 'transferTypeSubtTitle',
            }
        };

        this.labelValuesMap.set('type_key', typeMap);
        this.labelValuesMap.set('reference_key', referenceMap);
        this.labelValuesMap.set('from_account_key', fromAccountMap);
        this.labelValuesMap.set('to_account_key', toAccountMap);
        this.labelValuesMap.set('bank_key', bankCifShortNameEngMap);
        this.labelValuesMap.set('amount_key', amountMap);
        this.labelValuesMap.set('transaction_number_key', transactionNumberMap);
        this.labelValuesMap.set('trade_date_key', transactionDateMap);
        this.labelValuesMap.set('status_key', statusMap);
        this.labelValuesMap.set('date_key', dateMap);

        this.headerMap.set('title', headerTitleMap);
        this.headerMap.set('subTitle', headerSubtitleMap);
    }


    prepareTransaction(actionCard: IOptionsPsActionHyperlink): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const generalRequestData: any = {
                commonParametersList: {
                    transactionNumber: actionCard.navigationOptions.queryParams.transactionNumber,
                    transferTypeOperId: actionCard.navigationOptions.queryParams.operId
                }
            };
            this.omniPull.returnTransactionDetails(generalRequestData).then((result) => {
                result.data.toBeneficiary_lookupKey = result.data.toBeneficiary;
                result.data.toAccount_lookupKey = result.data.toAccount;
                result.data.fromAccount_lookupKey = result.data.fromAccount;
                result.data.operId = (PsCommonSettings.oper_ID == CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID) ? CommonBussinessConstant.EDIT_IMMEDIATE_TRANSFER : CommonBussinessConstant.EDIT_STANDING_ORDER;
                
                const data = this.prepareTransactionDet(result.data);
                this.commonProv.copyObject(actionCard.navigationOptions.queryParams, data, false);

                actionCard.navigationOptions.queryParams = {
                    ScreenVO: { ...actionCard.navigationOptions.queryParams },
                    ...actionCard.navigationOptions.queryParams
                };

                resolve(null);
            });
        });
    }

    prepareTransactionDet(result) {
        const details = {
            accountNumber: result.accountNumber,
            benefCurrency: result.benefCurrency,
            currency: result.currency,
            exchangeRate: result.exchangeRate,
            fromAccount: result.fromAccount,
            fromAccount_lookupKey: result.fromAccount_lookupKey,
            fromCurrency: result.fromCurrency,
            operId: result.operId,
            purpose: result.purpose,
            purposeTxtDesc: result.purposeTxtDesc,
            requestedDate: result.requestedDate,
            showBeneficiaryDetails: result.showBeneficiaryDetails,
            showToOtherDetails: result.showToOtherDetails,
            startDate: result.startDate,
            endDate: result.endDate,
            swiftCode: result.swiftCode,
            toAccount: result.toAccount,
            benefBranchTxt: result.benefBranchTxt,
            bank: result.bank,
            toAccount_lookupKey: result.toAccount_lookupKey,
            toAmount: result.toAmount,
            toBeneficiary: result.toBeneficiary,
            toBeneficiary_lookupKey: result.toBeneficiary_lookupKey,
            transactionAmount: result.transactionAmount,
            transactionDate: result.transactionDate,
            transactionNumber: result.transactionNumber,
        }

        return details;
    }

}
