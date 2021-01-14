import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInputCountExposed } from '../../ps-keyin-input/ps-input-count/ps-input-count.component.interfaces';
import { IOptionsPsLovPeriodicityOptionsExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-periodicity/ps-lov-periodicity.component.interfaces';
import { IOptionsPSComplexRecurringSchedulerExposed } from './ps-complex-recurring-scheduler.component.interfaces';


declare var Date;
@Component({
  selector: 'ps-complex-recurring-scheduler',
  templateUrl: './ps-complex-recurring-scheduler.component.html',
  styleUrls: ['./ps-complex-recurring-scheduler.component.scss'],
})
export class PsComplexRecurringSchedulerComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPSComplexRecurringSchedulerExposed;
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  // calendarWeekends = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    weekends: true,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this)
  };
  eventColor = 'red';
  schedulerForm: FormGroup = new FormGroup({});
  priodicityOptions: IOptionsPsLovPeriodicityOptionsExposed = {};
  selectedPriodicity: string;
  selectedCount = 1;
  priodicitySelected: boolean;
  onDayDateSelected: boolean;
  onSaveBtn: boolean;
  recurringDate: Date;
  onDateSelectedByCalendar: boolean;
  calendarCounter = 0;
  calendarDate = new Date();
  endCountOptions: IOptionsPsInputCountExposed;
  priodicityByDay: boolean;
  priodicityDay: number;
  priodicityWeekOfMonth: number;
  selectDayValue: number;
  nextBtnClicked: boolean;
  prevBtnClicked: boolean;
  countUnlimited: boolean;
  singleDate: boolean = false;
  eventTitle: any;

  constructor(public commonProv: PsCommonService, public logger: LoggerService, private calendar: Calendar, private plt: Platform, private eventEmitter: EventEmitterService) {
    super(commonProv, logger);
  }

  ngOnInit() {
    this.countUnlimited = true;
    this.priodicityOptions = {
      fcName: 'periodicity',
      group: this.options.group
    };
    this.endCountOptions = {
      min: 2,
      labelKey: 'end_count_key',
      fcName: 'end_count',
      group: this.options.group,
      inputCountOptions: {
        fcName: this.options.inputCountOptions.fcName,
        group: this.options.group,
        labelKey: 'number_of_payments_key',
        forceTriggerChange: true
      },
      inputDefaultOptions: {
        fcName: this.options.inputDefaultOptions.fcName,
        group: this.options.group,
        labelKey: 'number_of_payments_key',
        forceTriggerChange: true
      },
      defaultValue: 'Unlimited',
      forceTriggerChange: true,
      inputCountObject: this.setInputCountObj()
    };
    this.priodicitySelected = true;
    this.selectedPriodicity = 'M';
    this.priodicityByDay = false;
    this.calendarOptions.events = [];
    // This method is to populate the calendar events with respect to no of payments and priodicity
    // while navigating to next/previous months

    setTimeout(() => {
      this.disablePrevBtn();
      document.getElementsByClassName('fc-next-button')[0].addEventListener('click', () => {
        this.selectedPriodicity = typeof (this.selectedPriodicity) !== 'string' ? this.selectedPriodicity !== undefined ? this.selectedPriodicity['itemValue'] : undefined : this.selectedPriodicity;
        if (this.countUnlimited && this.selectedPriodicity === 'M') {
          this.selectedCount += 1;
        } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
          this.selectedCount += 5;
        }
        if (this.priodicityByDay) {
          this.selectDayValue = 0;
          this.nextBtnClicked = true;
        } else {
          this.nextBtnClicked = false;
        }
        if (this.onDateSelectedByCalendar === false) {
          this.calendarCounter += 1;
          this.dateManipulation(this.selectedPriodicity, this.calendarCounter, new Date());
        } else {
          this.calendarCounter += 1;
          if ((this.calendarOptions.events as EventInput[]).length > 0) {
            this.calendarDate = new Date(this.calendarOptions.events[0].start.toString());
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
          } else {
            this.calendarDate = new Date();
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
          }
        }
        this.enablePrevBtn();
      });
      document.getElementsByClassName('fc-prev-button')[0].addEventListener('click', () => {
        this.selectedPriodicity = typeof (this.selectedPriodicity) !== 'string' ? this.selectedPriodicity !== undefined ? this.selectedPriodicity['itemValue'] : undefined : this.selectedPriodicity;
        if (this.countUnlimited && this.selectedPriodicity === 'M') {
          this.selectedCount -= 1;
        } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
          this.selectedCount -= 5;
        }
        if (this.priodicityByDay) {
          this.selectDayValue = 0;
          this.prevBtnClicked = true;
        } else {
          this.prevBtnClicked = false;
        }
        if (this.calendarCounter > 1) {
          if (this.calendarCounter === 2) {
            this.disablePrevBtn();
          }
          if (this.onDateSelectedByCalendar === false) {
            this.calendarCounter -= 1;
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, new Date());
          } else {
            this.calendarCounter -= 1;

            if ((this.calendarOptions.events as EventInput[]).length > 0) {
              this.calendarDate = new Date(this.calendarOptions.events[0].start.toString());
              this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
            } else {
              this.calendarDate = new Date();
              this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
            }
          }
        } else {
          this.disablePrevBtn();
        }
      });
      this.calendarCounter += 1;
      setTimeout(() => {
        if (this.options.calendarEventConfiguration !== undefined) {
          this.calendarOptions.events = [this.options.calendarEventConfiguration];
        } else {
          this.calendarOptions.events = [{
            title: 'New Event',
            start: new Date(),
            allDay: true
          }];
        }
      }, 1000);
    }, 500);

    this.eventEmitter.schedulerObjLoadedPromise.subscribe((requestObject) => {
      if (requestObject) {
        this.loadSchedulerPromise(requestObject);
      }
    })
  }

  onChangePriodicityLov(values) {
    if (values !== undefined && values.itemValue !== undefined && this.options.requestObject !== undefined) {
      this.selectDayValue = 0;
      this.selectedPriodicity = values.itemValue;
      this.priodicitySelected = true;
      this.onDayDateSelected = true;
      this.onSaveBtn = false;
      if (this.options.requestObject.noOfPayments == '' || this.options.requestObject.noOfPayments == null) {
        this.countUnlimited = true;
      } else {
        this.countUnlimited = false;
        if (this.selectedPriodicity !== 'S') {
          this.selectedCount = this.options.requestObject.noOfPayments;
          this.options.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(this.selectedCount !== undefined ? this.selectedCount : this.endCountOptions.min);
          this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue(null);
          this.dateManipulation(this.selectedPriodicity, 0, this.options.requestObject['startDate'] !== undefined ? new Date(this.options.requestObject['startDate']) : new Date());
        }
      }
      if (this.countUnlimited && this.selectedPriodicity === 'M') {
        this.selectedCount += 1;
        this.inputCountChange();
        this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue('Unlimited');
      } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
        this.selectedCount += 5;
        this.inputCountChange();
        this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue('Unlimited');
      } else if (this.countUnlimited && this.selectedPriodicity === 'S') {
        this.options.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(null);
        this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue(null);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputDefaultOptions.fcName], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputCountOptions.fcName], 0);
      } else if (!this.countUnlimited && this.selectedPriodicity === 'S') {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputCountOptions.fcName], 0);
        this.options.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(null);
        this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue(null);
      }
      this.dateManipulation(this.selectedPriodicity, 0, this.options.requestObject['startDate'] !== undefined ? new Date(this.options.requestObject['startDate']) : new Date());
    }
  }
  onChangePriodicityEnd(currentCount) {
    if (currentCount.newValue === undefined && this.options.requestObject !== undefined) {
      currentCount = currentCount !== 'Unlimited' ? parseInt(currentCount) : currentCount;
      this.selectDayValue = 0;
      if (currentCount !== undefined && currentCount.length > 4 && typeof (currentCount) === "number") {
        this.commonProv.presentAlert('Scheduler Preview', 'Calendar date process limit exceeded');
        setTimeout(() => {
          this.endCountOptions.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(null);
        }, 10);
        return;
      }
      if ((this.calendarOptions.events as EventInput[]).length > 0) {
        if (currentCount === 'Unlimited') {
          this.countUnlimited = true;
          setTimeout(() => {
            this.options.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(null);
            this.options.group.controls[this.options.inputDefaultOptions.fcName].setValue(currentCount);
          }, 100);
        } else {
          this.countUnlimited = false;
          this.options.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(currentCount);
        }
        this.calendarDate = this.options.requestObject['startDate'] !== undefined ? new Date(this.options.requestObject['startDate']) : new Date(this.calendarOptions.events[0].start.toString());
        if (typeof (currentCount) === 'number' && currentCount !== 0) {
          this.selectedCount = currentCount;
          if (this.countUnlimited && this.selectedPriodicity === 'M') {
            this.selectedCount += 1;
          } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
            this.selectedCount += 5;
          }
          this.dateManipulation(this.selectedPriodicity, this.selectedCount, this.calendarDate);
        } else if (currentCount !== undefined && currentCount !== 0) {
          this.selectedCount = typeof (currentCount) === 'number' ? currentCount : (this.calendarOptions.events as EventInput[]).length;
          if (this.countUnlimited && this.selectedPriodicity === 'M') {
            this.selectedCount += 1;
          } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
            this.selectedCount += 5;
          }
          this.dateManipulation(this.selectedPriodicity, this.selectedCount, this.calendarDate);
        }
      }
    }
  }
  onChangeDayDate(values) {
    this.calendarDate = new Date(this.calendarOptions.events[0].start.toString());
    this.selectDayValue = 0;
    if (values.itemValue === 'Day') {
      this.priodicityByDay = true;
      this.dateManipulation(this.selectedPriodicity, this.selectedCount, this.calendarDate);
    } else {
      this.priodicityByDay = false;
      this.dateManipulation(this.selectedPriodicity, this.selectedCount, this.calendarDate);
    }
  }

  handleDateClick(arg) {
    const todayDate = new Date();
    const formattedDate = todayDate.getDate() + '-' + todayDate.getMonth() + '-' + todayDate.getFullYear();
    const argFormattedDate = arg.date.getDate() + '-' + arg.date.getMonth() + '-' + arg.date.getFullYear();
    this.selectedPriodicity = this.selectedPriodicity && this.selectedPriodicity['itemValue'] !== undefined ? this.selectedPriodicity['itemValue'] : this.selectedPriodicity;
    if (arg.date < todayDate) {
      if (argFormattedDate === formattedDate) {
        this.selectDayValue = 0;
        this.onDateSelectedByCalendar = true;
        this.calendarDate = arg.date;
        this.dateManipulation(this.selectedPriodicity, this.selectedCount, arg.date);
      }
      return;
    }
    this.selectDayValue = 0;
    this.onDateSelectedByCalendar = true;
    this.calendarDate = arg.date;
    this.dateManipulation(this.selectedPriodicity, this.selectedCount, arg.date);
  }

  dateManipulation(priodicity, count, date) {
    this.calendarOptions.events = [];
    let currentDate = date;
    priodicity = typeof (priodicity) !== 'string' ? priodicity !== undefined ? priodicity.itemValue : undefined : priodicity;
    if (priodicity === undefined || priodicity === 'S') {
      this.singleDate = priodicity !== undefined ? true : false;
      currentDate = date;
      let eventDate;
      eventDate = new Date(currentDate.setDate(currentDate.getDate()));
      if (this.options.hasMendatoryEvent && this.options.calendarEventConfiguration.start !== undefined) {
        this.calendarOptions.events = this.calendarOptions.events.concat({
          title: this.options.calendarEventConfiguration.title,
          start: eventDate,
          allDay: true,
          backgroundColor: this.options.calendarEventConfiguration.backgroundColor,
          borderColor: this.options.calendarEventConfiguration.borderColor,
          textColor: this.options.calendarEventConfiguration.textColor,
          className: this.options.calendarEventConfiguration.className
        });
      } else {
        this.calendarOptions.events = this.calendarOptions.events.concat({
          title: 'S Scheduler',
          start: eventDate,
          allDay: true
        });
      }
      // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.endCountOptions.inputDefaultOptions.fcName], 0);
      // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputDefaultOptions.fcName], 0);
      // this.options.group.controls[this.endCountOptions.inputDefaultOptions.fcName].setValue(null);
      this.onPsChange.emit({
        startDate: this.calendarOptions.events[0].start,
        endDate: this.calendarOptions.events[0].start,
        unlimitedNumberOfPayments: this.countUnlimited,
        priodicityBy: priodicity
      });
    }
    if (priodicity === 'W') {
      this.singleDate = false;
      for (let i = 0; i < this.selectedCount; i++) {
        currentDate = date;
        let eventDate;
        if (i === 0) {
          eventDate = new Date(currentDate.setDate(currentDate.getDate()));
        } else if (i > 0) {
          eventDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        }
        if (this.options.hasMendatoryEvent && this.options.calendarEventConfiguration.start !== undefined) {
          this.calendarOptions.events = this.calendarOptions.events.concat({
            title: this.options.calendarEventConfiguration.title,
            start: eventDate,
            allDay: true,
            backgroundColor: this.options.calendarEventConfiguration.backgroundColor,
            borderColor: this.options.calendarEventConfiguration.borderColor,
            textColor: this.options.calendarEventConfiguration.textColor,
            className: this.options.calendarEventConfiguration.className
          });
        } else {
          this.calendarOptions.events = this.calendarOptions.events.concat({
            title: this.eventTitle !== undefined ? this.eventTitle : 'New Recuring Scheduler',
            start: eventDate,
            allDay: true
          });
        }
      }
      this.onPsChange.emit({
        startDate: this.calendarOptions.events[0].start,
        endDate: this.calendarOptions.events[this.calendarOptions.events.length - 1].start,
        unlimitedNumberOfPayments: this.countUnlimited,
        priodicityBy: priodicity
      });
    }
    if (priodicity === 'M') {
      this.singleDate = false;
      const selectedDate = new Date(date);
      const periodicityDayString = new Date(date).toDateString().split(' ')[0];
      let updatedDate = new Date(date);
      if (this.priodicityByDay) {
        if (this.nextBtnClicked) {
          updatedDate = new Date(updatedDate.setDate(selectedDate.getDate()));
          updatedDate = updatedDate.next().month();
        }
        for (let i = 0; i < this.selectedCount; i++) {
          if (this.selectDayValue === 0) {
            this.selectDayValue += 1;
            if (this.options.hasMendatoryEvent && this.options.calendarEventConfiguration.start !== undefined) {
              this.calendarOptions.events = this.calendarOptions.events.concat({
                title: this.options.calendarEventConfiguration.title,
                start: selectedDate,
                allDay: true,
                backgroundColor: this.options.calendarEventConfiguration.backgroundColor,
                borderColor: this.options.calendarEventConfiguration.borderColor,
                textColor: this.options.calendarEventConfiguration.textColor,
                className: this.options.calendarEventConfiguration.className
              });
            } else {
              this.calendarOptions.events = this.calendarOptions.events.concat({
                title: this.eventTitle !== undefined ? this.eventTitle : 'New Recuring Scheduler',
                start: selectedDate,
                allDay: true
              });
            }
            if (!this.nextBtnClicked) {
              updatedDate = new Date(updatedDate.setDate(selectedDate.getDate()));
              updatedDate = updatedDate.next().month();
            }
          }
          if (this.selectDayValue > 0) {
            updatedDate = new Date(updatedDate.setDate(selectedDate.getDate()));
            if (updatedDate.toDateString().split(' ')[0] !== periodicityDayString) {
              if (periodicityDayString === 'Mon') {
                updatedDate = updatedDate.monday();
              } else if (periodicityDayString === 'Tue') {
                updatedDate = updatedDate.tuesday();
              } else if (periodicityDayString === 'Wed') {
                updatedDate = updatedDate.wednesday();
              } else if (periodicityDayString === 'Thu') {
                updatedDate = updatedDate.thursday();
              } else if (periodicityDayString === 'Fri') {
                updatedDate = updatedDate.friday();
              } else if (periodicityDayString === 'Sat') {
                updatedDate = updatedDate.saturday();
              } else if (periodicityDayString === 'Sun') {
                updatedDate = updatedDate.sunday();
              }
            }
            const futureMonthLastDay = new Date(updatedDate.getFullYear(), updatedDate.getMonth() + 1, 0);
            const y = futureMonthLastDay.getFullYear();
            const m = futureMonthLastDay.getMonth();
            let d = futureMonthLastDay.getDate();
            if (this.onDateSelectedByCalendar === false) {
              this.recurringDate = new Date(y, m, d);
            }
            const countDays = new Date(y, m + 1, 0).getDate();
            if (updatedDate.getDate() === d && d >= countDays) {
              d = countDays;
              this.recurringDate = new Date(y, m, d);
            } else {
              this.recurringDate = new Date(y, m, updatedDate.getDate());
            }
            if (this.options.hasMendatoryEvent && this.options.calendarEventConfiguration.start !== undefined) {
              this.calendarOptions.events = this.calendarOptions.events.concat({
                title: this.options.calendarEventConfiguration.title,
                start: this.recurringDate,
                allDay: true,
                backgroundColor: this.options.calendarEventConfiguration.backgroundColor,
                borderColor: this.options.calendarEventConfiguration.borderColor,
                textColor: this.options.calendarEventConfiguration.textColor,
                className: this.options.calendarEventConfiguration.className
              });
            } else {
              this.calendarOptions.events = this.calendarOptions.events.concat({
                title: this.eventTitle !== undefined ? this.eventTitle : 'New Recuring Scheduler',
                start: this.recurringDate,
                allDay: true
              });
            }
            updatedDate = new Date(updatedDate.setDate(selectedDate.getDate()));
            updatedDate = updatedDate.next().month();
          }
        }
        this.onPsChange.emit({
          startDate: this.calendarOptions.events[0].start,
          endDate: this.calendarOptions.events[this.calendarOptions.events.length - 1].start,
          unlimitedNumberOfPayments: this.countUnlimited,
          priodicityBy: priodicity
        });
      } else {
        for (let i = 0; i < this.selectedCount; i++) {
          const futureMonthLastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + (i + 1), 0);
          const y = futureMonthLastDay.getFullYear();
          const m = futureMonthLastDay.getMonth();
          let d = futureMonthLastDay.getDate();
          d = selectedDate.getDate();
          if (this.onDateSelectedByCalendar === false) {
            this.recurringDate = new Date(y, m, d);
          }
          const countDays = new Date(y, m + 1, 0).getDate();
          if (d >= countDays) {
            d = countDays;
            this.recurringDate = new Date(y, m, d);
          } else {
            this.recurringDate = new Date(y, m, selectedDate.getDate());
          }
          if (this.options.hasMendatoryEvent && this.options.calendarEventConfiguration.start !== undefined) {
            this.calendarOptions.events = this.calendarOptions.events.concat({
              title: this.options.calendarEventConfiguration.title,
              start: this.recurringDate,
              allDay: true,
              backgroundColor: this.options.calendarEventConfiguration.backgroundColor,
              borderColor: this.options.calendarEventConfiguration.borderColor,
              textColor: this.options.calendarEventConfiguration.textColor,
              className: this.options.calendarEventConfiguration.className
            });
          } else {
            this.calendarOptions.events = this.calendarOptions.events.concat({
              title: this.eventTitle !== undefined ? this.eventTitle : 'New Recuring Scheduler',
              start: this.recurringDate,
              allDay: true
            });
          }
        }
        this.onPsChange.emit({
          startDate: this.calendarOptions.events[0].start,
          endDate: this.calendarOptions.events[this.calendarOptions.events.length - 1].start,
          unlimitedNumberOfPayments: this.countUnlimited,
          priodicityBy: priodicity
        });
      }
    }
  }

  inputCountChange() {
    this.endCountOptions = {
      min: 2,
      labelKey: 'end_count_key',
      fcName: 'end_count',
      group: this.options.group,
      inputCountOptions: {
        fcName: 'noOfPayments',
        group: this.options.group,
        labelKey: 'number_of_payments_key',
      },
      inputDefaultOptions: {
        fcName: 'noOfPayment',
        group: this.options.group,
        labelKey: 'number_of_payments_key',
      },
      defaultValue: 'Unlimited',
      inputCountObject: this.setInputCountObj()
    };
  }

  ionViewWillLeave() {
    document.getElementsByTagName('ps-components')[0]['style'].removeProperty('display');
  }

  disablePrevBtn() {
    document.getElementsByClassName('fc-prev-button')[0]['style'].cssText = 'pointer-events: none; background: var(--ion-color-medium); border: none';
  }

  enablePrevBtn() {
    document.getElementsByClassName('fc-prev-button')[0]['style'].cssText = 'pointer-events: all; background: var(--ion-color-dark-shade); border-color: var(--ion-color-dark-shade)';
  }

  onNextPreviousCalendarMonth() {
    setTimeout(() => {
      this.disablePrevBtn();
      document.getElementsByClassName('fc-next-button')[0].addEventListener('click', () => {
        if (this.countUnlimited && this.selectedPriodicity === 'M') {
          this.selectedCount += 1;
        } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
          this.selectedCount += 5;
        }
        if (this.priodicityByDay) {
          this.selectDayValue = 0;
          this.nextBtnClicked = true;
        } else {
          this.nextBtnClicked = false;
        }
        if (this.onDateSelectedByCalendar === false) {
          this.calendarCounter += 1;
          this.dateManipulation(this.selectedPriodicity, this.calendarCounter, new Date());
        } else {
          this.calendarCounter += 1;
          if ((this.calendarOptions.events as EventInput[]).length > 0) {
            this.calendarDate = new Date(this.calendarOptions.events[0].start.toString());
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
          } else {
            this.calendarDate = new Date();
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
          }
        }
        this.enablePrevBtn();
      });
      document.getElementsByClassName('fc-prev-button')[0].addEventListener('click', () => {
        if (this.countUnlimited && this.selectedPriodicity === 'M') {
          this.selectedCount -= 1;
        } else if (this.countUnlimited && this.selectedPriodicity === 'W') {
          this.selectedCount -= 5;
        }
        if (this.priodicityByDay) {
          this.selectDayValue = 0;
          this.prevBtnClicked = true;
        } else {
          this.prevBtnClicked = false;
        }
        if (this.calendarCounter > 1) {
          if (this.calendarCounter === 2) {
            this.disablePrevBtn();
          }
          if (this.onDateSelectedByCalendar === false) {
            this.calendarCounter -= 1;
            this.dateManipulation(this.selectedPriodicity, this.calendarCounter, new Date());
          } else {
            this.calendarCounter -= 1;

            if ((this.calendarOptions.events as EventInput[]).length > 0) {
              this.calendarDate = new Date(this.calendarOptions.events[0].start.toString());
              this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
            } else {
              this.calendarDate = new Date();
              this.dateManipulation(this.selectedPriodicity, this.calendarCounter, this.calendarDate);
            }
          }
        } else {
          this.disablePrevBtn();
        }
      });
      this.calendarCounter += 1;
      setTimeout(() => {
        if (this.options.calendarEventConfiguration !== undefined) {
          this.calendarOptions.events = [this.options.calendarEventConfiguration];
        } else {
          this.calendarOptions.events = [{
            title: 'New Event',
            start: new Date(),
            allDay: true
          }];
        }
      }, 1000);
    }, 500);
  }

  loadSchedulerPromise(requestObject) {
    this.options.requestObject = requestObject;
    this.selectedPriodicity = this.options.requestObject[this.priodicityOptions.fcName]
    this.eventTitle = this.options.requestObject.toAmount || 'New event';
    const draftDate = this.options.requestObject['startDate'] !== undefined ? new Date(this.options.requestObject['startDate']) : new Date();
    this.options.calendarEventConfiguration = {
      title: this.eventTitle,
      start: draftDate,
      allDay: true,
      backgroundColor: '#e77543',
      borderColor: 'white',
      textColor: 'white',
      className: 'testClass'
    }
    if ((this.options.requestObject[this.endCountOptions.inputCountOptions.fcName] !== undefined && this.options.requestObject[this.endCountOptions.inputCountOptions.fcName] !== null)) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputDefaultOptions.fcName], 0);
    }
    if ((this.options.requestObject[this.endCountOptions.inputDefaultOptions.fcName] !== undefined && this.options.requestObject[this.endCountOptions.inputDefaultOptions.fcName] !== null)) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputCountOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.endCountOptions.inputDefaultOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endCountOptions.inputDefaultOptions.fcName], 0);
    }
    this.calendarOptions.events = [this.options.calendarEventConfiguration];
    if (this.options.requestObject && this.options.requestObject[this.endCountOptions.inputCountOptions.fcName] !== null && this.options.requestObject[this.endCountOptions.inputCountOptions.fcName] < 999) {
      this.endCountOptions.group.controls[this.endCountOptions.inputCountOptions.fcName].setValue(this.options.requestObject[this.endCountOptions.inputCountOptions.fcName]);
      this.onChangePriodicityEnd(this.options.requestObject[this.endCountOptions.inputCountOptions.fcName]);
    }
  }

  setInputCountObj() {

    const inputCountValues = {};
    if (this.options.requestObject !== undefined) {
      inputCountValues[this.options.inputCountOptions.fcName] = this.options.requestObject[this.options.inputCountOptions.fcName]
      inputCountValues[this.options.inputDefaultOptions.fcName] = this.options.requestObject[this.options.inputDefaultOptions.fcName]
    }
    return inputCountValues;
  }

}
