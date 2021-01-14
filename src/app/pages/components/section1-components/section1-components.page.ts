import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsDateMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.interfaces';
import { IOptionsPsDateMonthYearPastExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-past/ps-date-month-year-past.component.interfaces';
import { IOptionsPsDateMonthYearExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year.component.interfaces';
import { IOptionsPsDateDayMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.interfaces';
import { IOptionsPsDateDayMonthYearPastExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.interfaces';
import { IOptionsPsDateDayMonthYearExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year.component.interfaces';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsComplexCardDetailsAtmCdmComponentExposed } from '../../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-card-details-atm-cdm/ps-complex-card-details-atm-cdm.component.interface';
import { IOptionsPsComplexCardDetailsBranchComponentExposed } from '../../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component.interface';
import { IOpeningHours } from '../../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsButtonStandard, IOptionsPsContainerPanel, IOptionsPsKeyinDate, IOptionsPsSelectToggle, IOptionsPsTemplateReport } from '../../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'section1-components',
  templateUrl: './section1-components.page.html',
  styleUrls: ['./section1-components.page.scss'],
})
export class Section1ComponentsPage implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  datesComponentsPanelOptions: IOptionsPsContainerPanel = {
    labelKey: 'DATES_COMPONENTS_KEY',
    iconName: 'calendar',
    expanded: true
  };
  psKeyinDateOptions: IOptionsPsKeyinDate = {
    fcName: 'keyinDate',
    group: this.formGroup,
    labelKey: 'KEY_IN_DATE_KEY',
    placeHolder: 'Enter the date'
  };
  psDateMonthYearOptions: IOptionsPsDateMonthYearExposed = {
    fcName: 'dateMonthYear',
    group: this.formGroup,
    labelKey: 'PsDateMonthYear component :',
    placeHolder: 'Enter the date'
  };
  psDateMonthYearFutureOptions: IOptionsPsDateMonthYearFutureExposed = {
    fcName: 'dateMonthYearFuture',
    group: this.formGroup,
    labelKey: 'PsDateMonthYearFuture component :',
    placeHolder: 'Enter the date'
  };
  psDateMonthYearPastOptions: IOptionsPsDateMonthYearPastExposed = {
    fcName: 'dateMonthYearPast',
    group: this.formGroup,
    labelKey: 'PsDateMonthYearPast component :',
    placeHolder: 'Enter the date'
  };
  psDateDayMonthYearOptions: IOptionsPsDateDayMonthYearExposed = {
    fcName: 'dateDayMonthYear',
    group: this.formGroup,
    labelKey: 'PsDateDayMonthYear component :',
    placeHolder: 'Enter the date'
  };
  psDateDayMonthYearFutureOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    fcName: 'dateDayMonthYearFuture',
    group: this.formGroup,
    labelKey: 'PsDateDayMonthYearFuture component :',
    placeHolder: 'Enter the date'
  };
  psDateDayMonthYearPastOptions: IOptionsPsDateDayMonthYearPastExposed = {
    fcName: 'dateDayMonthYearPast',
    group: this.formGroup,
    labelKey: 'PsDateDayMonthYearPast component :',
    placeHolder: 'Enter the date'
  };
  toggleOptions: IOptionsPsSelectToggle = {
    fcName: 'toggleButton',
    group: this.formGroup,
    labelKey: 'TOGGLE_BUTTON_KEY',
    // disabled: true,
    // checked: true
  };
  cardDetailsPanelOptions: IOptionsPsContainerPanel = {
    labelKey: 'ATM & CDM',
    iconName: 'location-pin',
    expanded: true
  };
  branchDetailsPanelBranchOptions: IOptionsPsContainerPanel = {
    labelKey: 'BRANCHES',
    iconName: 'location-pin',
    expanded: true
  };
  atmCdmOptions: IOptionsPsComplexCardDetailsAtmCdmComponentExposed = {};
  branchOptions: IOptionsPsComplexCardDetailsBranchComponentExposed = {};
  openingHoursData: IOpeningHours[] = [];

  reportTemplateOptions: IOptionsPsTemplateReport = {};

  goToReport: IOptionsPsButtonStandard = {
    labelKey:'Go to Report',
    group: this.formGroup
  };

  constructor() { }

  ngOnInit() {
    //Call the service that returns the response of type : ICommonServiceResponse
    //then copy the gridModel to the interface : IOmniATMCDMBranchesResponse that contains array of branch data
    //Now in the template when we try to click a certain map locator , we will copy element from the 
    //above array to the exposed related interface .
    this.atmCdmOptions = {
      mapType: 'ATM',
      countryName: 'Lebanon',
      cityName: 'Baalbeck',
      managerName: 'ALI CHREIF',
      telephoneNumber: '78 111 222'
    };
    this.openingHoursData.push({
      day: 'Monday',
      openingHour: '123123',
      closingHour: '123123'
    });
    this.openingHoursData.push({
      day: 'Tuesday',
      openingHour: '123123',
      closingHour: '123123'
    });
    this.openingHoursData.push({
      day: 'Wednesday',
      openingHour: '123123',
      closingHour: '123123'
    });
    this.branchOptions = {
      mapType: 'BRANCH',
      countryName: 'UAE',
      cityName: 'Dubai',
      managerName: 'BEN RACHED',
      telephoneNumber: '+971 785 125 254',
      openingHours: this.openingHoursData
    };
  }

  onChange(values: IchangeValues) {
    // console.log('the changed values are:');
    // console.log(values);
    // console.log('the formVO values are:');
  }
}
