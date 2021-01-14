import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsPsContainerPanel, IOptionsPsKeyinInputExposed, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';
import { IOptionsTemplateStepper } from './../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from './../../commonSRC/psServices/models/ps-common.settings';

@Component({
    selector: 'registration-charges',
    templateUrl: './registration-charges.page.html',
    styleUrls: ['./registration-charges.page.scss']
})
export class RegistrationChargesPage extends OmniBasePage implements OnInit {
    formGroup: FormGroup = new FormGroup({});
    registrationChargesVO = {};
    countryFlagLocation;
    stepperOptions: IOptionsTemplateStepper = {
        stepperName: 'reg_charges_stepper',
        isHorizontalStepper: true,
        numberOfSteps: 1,
        namesofSteps: ['reg_charges_step1'],
        group: this.formGroup,
        requestObject: this.registrationChargesVO,
        submitOptions: {
            group: this.formGroup,
            submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
            postCallFunction: {
                func(response) {
                    return new Promise<any>((resolve) => {
                        resolve(this.executionClass.setUserAsLoggedIn(response));
                    });
                },
                params: [this],
                executionClass: this
            }
        }
    };
    registrationChargesPanel: IOptionsPsContainerPanel = {
        labelKey: 'registration_charges_key',
        isExpandable: false
    };
    chargesOptions: IOptionsPsKeyinInputExposed = {
        labelKey: 'charges_key',
        fcName: 'charges',
        group: this.formGroup
    };
    chargeAccountsOptions: IOptionsPsLookupOwnAccountsExposed = {
        labelKey: 'from_account_key',
        placeHolder: 'select_from_account_key',
        component: PsAccountsListComponent,
        currency: 'USD',
        group: this.formGroup,
        accountAllowedCurrencies: [],
        accountAllowedTypes: [],
        glTypes: 'G',
        fcName: 'fromAccount',
        fromTo: 'from',
        accountType: ConstantCommon.GeneralType,
        requestObject: this.registrationChargesVO
    };

    constructor(public commonProv: PsCommonService, public navigatorProv: PsNavigatorService, private omniPull: OmniPullService) {
        super();
        this.commonProv.setFormData(this.formGroup, this.registrationChargesVO);
    }

    async ngOnInit() {
        super.init();
        this.baseFormGroup = this.formGroup;
        PsCommonSettings.oper_ID = CommonBussinessConstant.REGISTRATION_CHARGES_OPER;
        this.countryFlagLocation = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'currencies/';
        const preLoginResponse = this.commonProv.session.getValueOf(ConstantCommon.preLoginResponse);
        const registrationCharges = preLoginResponse.businessProfilesCO.businessProfileVO.REGISTRATION_CHARGES ? preLoginResponse.businessProfilesCO.businessProfileVO.REGISTRATION_CHARGES : null;
        this.registrationChargesVO['transactionAmount'] = registrationCharges;
        const baseCurrency = preLoginResponse.companySettingsCO.briefDesc;
        const currencyCode = preLoginResponse.companySettingsCO.baseCurrency;
        if (registrationCharges) {
            this.commonProv.setValInsideNestedObj(this.chargesOptions.fcName, registrationCharges as string + ' ' + baseCurrency, this.registrationChargesVO);
        }
        const currencyInformation = await this.omniPull.returnCurrencyList({currencyCode: currencyCode}).catch(error => {
            this.commonProv.logger.error('Error: While fetching Currencies list in PsDropdownCurrenciesComponent : ', error);
        });
        if (currencyInformation) {
            //The gridmodel should contain one record
            for (const iterator of currencyInformation.gridModel) {
                if (+iterator.currencyCode === currencyCode) {
                    const currencyData: IPsSelect = {
                        itemValue: iterator.currencyCode,
                        description: iterator.description,
                        iconUrl: this.countryFlagLocation.concat((iterator.description).toLowerCase() + PsCommonBusinessSettings.IMG_CURRENCY_EXTENSION),
                        selectedObj: iterator
                    };
                    this.registrationChargesVO['currency'] = currencyData;
                    break;
                }
            }
        }
    }

    private setUserAsLoggedIn() {
        this.commonProv.deductCharges.next(false);
        PsCommonSettings.oper_ID = ConstantCommon.LANDING_OPER_ID;
        this.navigatorProv.navigateToMain('home');
    }

}
