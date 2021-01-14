import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PsBaseFieldComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from './../../../psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from './../../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsOptionChequebookExposed } from './ps-option-chequebook.component.interface';

@Component({
    selector: 'ps-option-chequebook',
    templateUrl: './ps-option-chequebook.component.html',
    styleUrls: ['./ps-option-chequebook.component.scss']
})
export class PsOptionChequebookComponent extends PsBaseFieldComponent implements OnInit/* , AfterViewChecked */ {

    @Input() options: IOptionsPsOptionChequebookExposed;
    containerLookUpOptions: IOptionsPsContainerLookupOptionComponentExposed = {};
    termsLabelValuesMap = new Map<string, IMapKeyValue>();
    termsHeaderMap = new Map<string, IMapKeyValue>();
    private showSingleAccount = false;
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public onClickCard = new EventEmitter<any>();

    constructor(
        commonProv: PsCommonService,
        private cdRef?: ChangeDetectorRef
    ) {
        super(commonProv, commonProv.logger);
        this.populateHeaderValueMap();
    }

    ngOnInit() {
        super.init();
        if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
            this.options.showOnlyList = false;
        }
        this.containerLookUpOptions.currencyFlag = 'currencyDesc';
        this.containerLookUpOptions.labelsValueMap = this.termsLabelValuesMap;
        this.containerLookUpOptions.headerMap = this.termsHeaderMap;
        this.containerLookUpOptions.formGroup = this.options.group;
        this.containerLookUpOptions.balanceMapping = this.balanceMapping();
        this.containerLookUpOptions.isEditable = this.options.isEditable;
        // this.containerLookUpOptions.editActionUrl = 'rest/omniCommonPush/personalizeNickname';
        this.containerLookUpOptions.pageData = {
            operID: CommonBussinessConstant.CHEQUEBOOK_REPORT_OPER,
            title: 'chequebook_report_key'
        };
        if (this.options && this.options.listOfOptions) {
            this.options.itemList = this.options.listOfOptions;
        }
        // this.containerLookUpOptions.actionDetailsOptions = [
        //     {
        //         buttonIcon: 'delete',
        //         actionUrl: 'rest/omniCommonPush/beneficiaries',
        //         cssClass: 'fab-edit-button',
        //       label: 'delete_beneficiary_key',
        //       iconName: 'trash'
        //     }
        // ];
        /* this.chequebooksListOptions = {
            bottomPadding: true,
            labelsValueMap: this.termsLabelValuesMap,
            headerMap: this.termsHeaderMap,
            showTemplateCard: false,
            statementOptions: {
                buttonIcon: 'list-box',
                redirectUrl: 'chequebook-report'
            },
            isEditable: true,
            actionDetailsOptions: [
                {
                  buttonIcon: 'delete',
                  actionUrl: 'rest/commonPush/deleteAccount',
                  cssClass: 'fab-edit-button',
                  label: 'delete_key'
                },
                {
                buttonIcon: 'insert_chart_outlined',
                cssClass: 'fab-statement-button',
                redirectUrl: 'chequebook-report',
                label: 'chequebook_report_key'
                }
            ]
        };
        this.chequebooksListOptions.itemList = [this.options.chequebookInformation]; */
        this.containerLookUpOptions.statementOptions = {
            buttonIcon: 'list-box',
            redirectUrl: 'chequebook-statement-report'
        };

        if (this.options && (this.options.itemList === null || this.options.itemList === undefined)) {
            this.options.itemList = this.options.listOfOptions;
            this.showSingleAccount = false;
        } else if (this.options && this.options.itemList && this.options.itemList.length === 1 && this.showSingleAccount === false) {
            this.options.itemList = this.options.listOfOptions;
        } else if (this.options && this.options.showItemPopUp === undefined) {
            this.options.itemList = this.options.listOfOptions;
        }
        this.containerLookUpOptions.itemList = this.options.itemList;
        this.containerLookUpOptions.formGroup = this.options.group;
    }

    /* ngAfterViewChecked() {
        this.cdRef.detectChanges();

    } */

    public updateCard(account: any) {
        if (account && this.options.listOfOptions) {
            this.options.itemList = this.options.listOfOptions.filter(acct => acct === account);
            this.options.item = this.options.itemList[0];
            this.showSingleAccount = !this.showSingleAccount;
            this.options.showItemPopUp = !this.options.showItemPopUp;
            // this.options.showSelectedCard = false;
        }
        this.onClickCard.emit(this.options);
    }


    private populateHeaderValueMap() {
        let accountNumberMap: IMapKeyValue = {};
        let chequeBookNoMap: IMapKeyValue = {};
        let fromNumberMap: IMapKeyValue = {};
        let toNumberMap: IMapKeyValue = {};
        let headerTitleMap: IMapKeyValue = {};
        let headerSubtitleMap: IMapKeyValue = {};
        accountNumberMap = {
            key: 'additionalRef',
            value: 'additionalRef'
        };
        chequeBookNoMap = {
            key: 'chequebookCode',
            value: '1'
        };

        fromNumberMap = {
            key: 'fromNumber',
            value: '0'
        };
        toNumberMap = {
            key: 'toNumber',
            value: '10'
        };
        headerTitleMap = {
            key: 'title',
            value: 'chequeCode',
            isEdit: false,
            formGroupMap: {
                placeHolder: 'enter_chequebook_type',
                fcName: 'chequeBookType',
            }
        };

        headerSubtitleMap = {
            key: 'subTitle',
            value: 'chequeTypeName',
            isEdit: false,
            formGroupMap: {
                placeHolder: 'chequeTypeName',
                fcName: 'chequeTypeName',
            }
        };
        this.termsLabelValuesMap.set('Chequebook_no_key', chequeBookNoMap);
        this.termsLabelValuesMap.set('from_key', fromNumberMap);
        this.termsLabelValuesMap.set('to_Key', toNumberMap);
        // this.termsLabelValuesMap.set('title', headerTitleMap);

        this.termsHeaderMap.set('subTitle', headerSubtitleMap);
        this.termsHeaderMap.set('account_number_key', accountNumberMap);
    }


    private balanceMapping(): any[] {
        const balanceMappingList = [
            /* {
                key: 'current_balance_key',
                value: 'currentBalance'
            },
            {
                key: 'available_balance_key',
                value: 'availableBalance'
            },
            {
                key: 'currency_iso_key',
                value: 'currencyDesc'
            } */
        ];

        return balanceMappingList;
    }
}
