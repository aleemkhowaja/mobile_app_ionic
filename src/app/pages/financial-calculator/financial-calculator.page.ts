import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { IOptionsPscomplexContactInfoExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-contact-info/ps-complex-contact-info.component.interface';
import { IOptionsPsComplexFinancialCalculcatorExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-financial-calculator/ps-complex-financial-calculator.component.interfaces';
import { IProductClass } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { CommonBussinessConstant } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonSettings } from './../../commonSRC/psServices/models/ps-common.settings';


/** @name financial-calculator
 *  @author Heba.Hassan 
 *  @description Display the financial calculator in pre login an post login
 */

@Component({
  selector: 'app-financial-calculator',
  templateUrl: './financial-calculator.page.html',
  styleUrls: ['./financial-calculator.page.scss'],
})
export class FinancialCalculatorPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  financialCalculatorOptions: IOptionsPsComplexFinancialCalculcatorExposed;
  stepperOptions: IOptionsTemplateStepper;
  panelOptionsStep1: IOptionsPsContainerPanel;
  panelOptions1Step2: IOptionsPsContainerPanel;
  contactInfoOptions: IOptionsPscomplexContactInfoExposed;
  public operationID: number;
  cifInfo: any;
  productClass: IProductClass = {};
  amountValue = 0;
  ownFinancialCalculatorVO?: any = {
  };

  constructor(public datepipe: DatePipe, private common: PsCommonService,
    public omniPull: OmniPullService, public logger: LoggerService, private navService: PsNavigatorService
  ) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.common.session.getValueOf(ConstantCommon.USERINFO);


    this.loadOptions();
  }

  private loadOptions() {
    this.panelOptionsStep1 = {
      isExpandable: true,
      labelKey: 'contact_information_key',
      iconName: 'contact',
      expanded: true
    };
    this.panelOptions1Step2 = {
      isExpandable: true,
      labelKey: 'financing_calculator_key',
      iconName: 'calculator',
      expanded: true
    };

    this.contactInfoOptions = {
      emailOptions: {
        group: this.formGroup,
        fcName: 'email',
        labelKey: 'email_key',
        placeHolder: 'enter_email_key'
      },
      fullNameOptions: {
        labelKey: 'full_name_key',
        placeHolder: 'full_name_key',
        group: this.formGroup,
        fcName: 'fullName',
        iconOptions: {
          iconName: 'user3'
        }
      },
      phoneNumberOptions: {
        labelKey: 'phone_number_key',
        fcName: 'phoneNumber',
        placeHolder: 'phone_number_key',
        group: this.formGroup
      }
    };
    this.financialCalculatorOptions = {
      productTypesOptions: {
        labelKey: 'product_type_key',
        placeHolder: 'product_type_key',
        fcName: 'productType',
        group: this.formGroup
      },
      group: this.formGroup,
      complexAmountOptions: {
        currency: '',
        currenciesOptions: {
          labelKey: 'currency_key',
          placeHolder: 'select_currency_key',
          fcName: 'dealCurrency',
          group: this.formGroup
        },
        amountOptions: {
          labelKey: 'amount_key',
          placeHolder: 'enter_amount_key',
          fcName: 'dealAmount',
          group: this.formGroup,
          decimalPoints: 3
        }
      },
      downPaymentOptions: {
        fcName: 'downPayment',
        group: this.formGroup,
        labelKey: 'down_payment_key',
        placeHolder: 'enter_down_payment_key',
        decimalPoints: 2
      },
      numberOfInstallmentsCountOptions: {
        labelKey: 'installments_count_key',
        fcName: 'numberOfPayments',
        group: this.formGroup,
        inputCountOptions: {
          fcName: 'numberOfPayments',
          group: this.formGroup,
          labelKey: 'no_of_installments_key',
        }
      },
      paymentsLabelOptions: { previewMode: true },
      amountLabelOptions: { previewMode: true },
    };
    this.stepperOptions = {
      stepperName: 'finan_calc_stepper',
      isHorizontalStepper: true,
      numberOfSteps: this.cifInfo ? 1 : 2,
      namesofSteps: ['financing_calculator_key', 'contact_information_key'],
      group: this.formGroup,
      requestObject: this.ownFinancialCalculatorVO,
      submitOptions: {
        group: this.formGroup,
        submitServiceUrl: PsCommonBusinessSettings.serviceUrl.FinancialCalculator,
        postCallFunction: {
          func(response) {
            return new Promise<any>((resolve, reject) => {
              resolve(this.executionClass.navigateToReport(response));
            });
          },
          executionClass: this,
          params: [this]
        }
      },
    };
  }


  navigateToReport(params?: any) {
    const pram = params.commonResponseList as Map<string, string>;
    if (PsCommonSettings.oper_ID === CommonBussinessConstant.DEAL_REQUEST_OPER) {
      pram['dynamicOperId'] = CommonBussinessConstant.DEAL_REQUEST_OPER;
    }

    PsCommonSettings.oper_ID = CommonBussinessConstant.FINANCING_CALC_REPORT;

    const navigationExtras: NavigationExtras = {
      queryParams: pram
    };
    this.navService.navigateForward('financing-calculator-report', navigationExtras);
  }

  onProductChange(value: any) {

    if (value && value.selectedObj && value.selectedObj.productClassCode !== this.productClass.productClassCode) {
      this.productClass = value.selectedObj;

      this.formGroup.controls[this.financialCalculatorOptions.numberOfInstallmentsCountOptions.fcName].setValue(this.productClass.noOfPayment ? this.productClass.noOfPayment.toString() : '0');

      this.financialCalculatorOptions.numberOfInstallmentsCountOptions.min = this.productClass.minNoOfRepayments;
      this.financialCalculatorOptions.numberOfInstallmentsCountOptions.max = this.productClass.minNoOfRepayments;

      this.financialCalculatorOptions.paymentsLabelOptions.labelKey = this.common.translate('down_payment_key') + ' ' + value.selectedObj.downPayment + '%';

      if (this.productClass.minFinancingAmt !== undefined && this.productClass.minFinancingAmt > 0) {
        this.financialCalculatorOptions.amountLabelOptions.labelKey = this.common.translate('min_amount_key') + ' ' + this.productClass.minFinancingAmt;

      }
      if (this.productClass.maxFinancingAmt !== undefined && this.productClass.maxFinancingAmt < 999999999999) {
        this.financialCalculatorOptions.amountLabelOptions.labelKey += ' ' + this.common.translate('max_amount_key') + ' ' + this.productClass.maxFinancingAmt;
      }
      this.financialCalculatorOptions.downPaymentExists = (value.selectedObj.downPayment && value.selectedObj.downPayment > 0) ? true : false;

      // set validation form no of installments
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXVALUE, [this.financialCalculatorOptions.numberOfInstallmentsCountOptions.fcName], this.productClass.maxNoOfRepayments);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINVALUE, [this.financialCalculatorOptions.numberOfInstallmentsCountOptions.fcName], this.productClass.minNoOfRepayments);

      // set validation for min/max financing amount
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXVALUE, [this.financialCalculatorOptions.complexAmountOptions.amountOptions.fcName], this.productClass.maxFinancingAmt);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINVALUE, [this.financialCalculatorOptions.complexAmountOptions.amountOptions.fcName], this.productClass.minFinancingAmt);
      /* To clear fields when product class changed */
      if (this.formGroup.controls[this.financialCalculatorOptions.complexAmountOptions.amountOptions.fcName]) {
        this.formGroup.controls[this.financialCalculatorOptions.complexAmountOptions.amountOptions.fcName].setValue('');
        this.amountValue = 0;
      }
      if (this.formGroup.controls[this.financialCalculatorOptions.downPaymentOptions.fcName]) {
        this.formGroup.controls[this.financialCalculatorOptions.downPaymentOptions.fcName].setValue(0);
      }
      if (this.formGroup.controls[this.financialCalculatorOptions.complexAmountOptions.currenciesOptions.fcName]) {
        this.formGroup.controls[this.financialCalculatorOptions.complexAmountOptions.currenciesOptions.fcName].setValue(null);
      }
    }
  }
  // the event trigger when change the amount to validate the financing Amount and the downpayment value
  onAmountChange(event) {
    if (event && event.amount && this.amountValue != event.amount) {
      this.amountValue = event.amount;

      if (event.amount && this.productClass && this.productClass.downPayment > 0) {
        const minDownPayment = (event.amount * this.productClass.downPayment) / 100;
        if (this.formGroup.controls[this.financialCalculatorOptions.downPaymentOptions.fcName]) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXVALUE, [this.financialCalculatorOptions.downPaymentOptions.fcName], event.amount);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINVALUE, [this.financialCalculatorOptions.downPaymentOptions.fcName], minDownPayment);
          this.formGroup.controls[this.financialCalculatorOptions.downPaymentOptions.fcName].setValue(minDownPayment.toString());
        }
      }
    }
  }


  // event trigger when currancy change to add the select surruncy id to the VO object
  // temporary added till the issue of financial calc service fixed
  currencyChange(event: any) {
    if (event && event.itemValue) {
      // set decimalpoins per currency
      if (this.formGroup.controls[this.financialCalculatorOptions.downPaymentOptions.fcName]) {
        this.financialCalculatorOptions.downPaymentOptions.decimalPoints = this.financialCalculatorOptions.complexAmountOptions.amountOptions.decimalPoints;
      }

    }
  }



}



