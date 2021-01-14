import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IPrayerTime } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PrayerService } from 'src/app/commonBussinessSRC/psServices/omni-common/prayer.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import {
  IOptionsAlert,
  IOptionsLocationInformation,

  IOptionsPsActionIcon,
  IOptionsPsLabel
} from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { SessionService } from 'src/app/commonSRC/psServices/session/session.service';
import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { IOptionsPrayerTimesExposed } from './ps-complex-prayer-time.component.interfaces';


// @author: GRadwan Userstory: 925625
@Component({
  selector: 'ps-complex-prayer-time',
  templateUrl: './ps-complex-prayer-time.component.html',
  styleUrls: ['./ps-complex-prayer-time.component.scss'],
})
export class PsComplexPrayerTimesComponent extends PsBaseFieldComponent
  implements OnInit, OnDestroy {
  @Input() options: IOptionsPrayerTimesExposed;
  mygroup: FormGroup = new FormGroup({});

  datePipeString: string;
  isMobile: boolean;
  public ready = false;
  public today = new Date().toISOString().split('T')[0];
  public previousPrayer: IPrayerTime;
  public nextPrayer: IPrayerTime;
  public gregorianDate: string;
  public prayers: IPrayerTime[] = [];
  public hijriDate: string;
  public city: string;
  public country: string;
  public defaultDateFormat = 'DD/MM/YYYY';
  public now: Date;
  public time: any;
  public timeOutputFormat = 'hh:mm A';

  locationInformation: IOptionsLocationInformation = {};
  interval;
  prayerNotficStat;

  iconOptions: IOptionsPsActionIcon = {
    iconName: 'prayer-icon',
  };

  upcomingPrayerLabelOptions: IOptionsPsLabel = {
    labelKey: 'next_prayer_key',
    translate: true,
    group: this.mygroup,
  };

  hijriDateLabelOptions: IOptionsPsLabel = {
    labelKey: 'hijri_key',
    translate: false,
    group: this.mygroup,
  };

  dateLabelOptions: IOptionsPsLabel = {
    labelKey: 'date_key',
    translate: true,
    group: this.mygroup,
  };

  inLabel: IOptionsPsLabel = {
    labelKey: 'in_key',
    translate: true,
  };
  gregorianDateLabelOptions: IOptionsPsLabel = {
    labelKey: '',
    previewMode: true,
    group: this.mygroup,
  };

  prayerLabelOptions: IOptionsPsLabel = {
    labelKey: 'today_key',
    translate: true,
    group: this.mygroup,
  };

  notfictionIconOptions: IOptionsPsActionIcon = {
    iconName: '',
  };

  timeNowLabelOptions: IOptionsPsLabel = {
    labelKey: 'time_now_key',
    translate: true,
    group: this.mygroup,
  };

  todayLabelOptions: IOptionsPsLabel = {
    labelKey: 'today_key',
    translate: true,
    group: this.mygroup,
  };
  prayersNotificationStat: any = {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };

  prayersNotifications = {
    Fajr: 'Fajr',
    Dhuhr: 'Dhuhr',
    Asr: 'Asr',
    Maghrib: 'Maghrib',
    Isha: 'Isha',
  };

  constructor(
    public loggerP: LoggerService,
    private commonS: PsCommonService,
    private session: SessionService,
    public localNotifications: LocalNotifications,
    private prayerService: PrayerService
  ) {
    super(commonS, loggerP);
  }

  async ngOnInit() {
    this.isMobile = this.commonS.isMobile();
    this.options = {
      group: this.mygroup,
    };
    this.ready = true;
    this.getPrayers();

    this.prayerNotficStat = await this.session.getStoredValueOf(
      PsCommonSettings.PRAYER_NOTIFIC_STATUE
    );
    if (!this.prayerNotficStat || this.prayerNotficStat === 'undefined') {
      this.prayerNotficStat = false;
    }

    for (const prayer of Object.keys(this.prayersNotifications)) {
      this.prayersNotificationStat[
        prayer
      ] = await this.session.getStoredValueOf(
        this.prayersNotifications[prayer]
      );
      if (
        !this.prayersNotificationStat[prayer] ||
        this.prayersNotificationStat[prayer] === 'undefined'
      )
        this.prayersNotificationStat[prayer] = false;
    }

    if (this.prayerNotficStat === true) {
      this.notfictionIconOptions.iconName = 'bell-slash-o1';
    } else {
      this.notfictionIconOptions.iconName = 'bell-o1';
    }
  }

  // GRadwan: update method to use the prayerTime service
  private async getPrayers(dy = null, mth = null, yr = null) {
    this.ready = false;
    // let gregorianDate: string[];
    this.prayerService
      .getPrayers(dy, mth, yr)
      .then(async (result) => {
        try {
          const psDatePipe = new PsDateFormatPipe();
          const date = psDatePipe.transform(
            result.prayersDate,
            'ddd, D MMMM YYYY'
          );
          this.gregorianDateLabelOptions.labelKey = date;
          this.hijriDate = result.hijriDate.toString();
          this.prayers = result.prayersTimeTable;
          this.gregorianDate = result.prayersDate.toString();
          this.logger.log(this.gregorianDate);
          this.getNextPrayer();
          this.ready = true;
          this.interval = setInterval(() => {
            this.getNextPrayer();
          }, 1000 * 60);
        } catch (error) {
          this.loggerP.error(error);
        }
      })
      .catch((error) => {
        this.loggerP.error(error);
      });
  }

  private getNextPrayer() {
    const psDatePipe = new PsDateFormatPipe();
    this.now = new Date();
    const hours = this.now.getHours();
    const minutes: any = this.now.getMinutes();
    this.time = psDatePipe.transform(
      hours + ':' + minutes,
      this.timeOutputFormat,
      'h:mm'
    );
    for (const prayer of this.prayers) {
      const date = new Date(this.gregorianDate + ' ' + prayer.originalTime);
      if (this.now.getTime() > date.getTime()) {
        this.previousPrayer = prayer;
        if (prayer.id === 'Isha') {
          this.nextPrayer = this.prayers.filter(
            (aprayer) => aprayer.id === 'Fajr'
          )[0];
          this.nextPrayer = { ...this.nextPrayer, ...this.getProgress() };
        }
      }

      if (this.now.getTime() <= date.getTime()) {
        this.nextPrayer = prayer;
        this.nextPrayer = { ...this.nextPrayer, ...this.getProgress() };
        break;
      }
    }
  }

  private getProgress() {
    if (!this.prayers[0] || !this.nextPrayer) return { progress: 3 };
    const psDatePipe = new PsDateFormatPipe();
    const startTime =
      this.previousPrayer && this.previousPrayer.id !== 'Isha'
        ? new Date(
          this.gregorianDate + ' ' + this.previousPrayer.originalTime
        ).getTime()
        : new Date(
          this.gregorianDate + ' ' + this.prayers[4].originalTime
        ).getTime();
    // new Date(this.gregorianDate + ' ' + this.prayers[4].originalTime).setDate(new Date(this.gregorianDate + ' ' + this.prayers[4].originalTime).getDate() - 1);

    let endTime = new Date(
      this.gregorianDate + ' ' + this.nextPrayer.originalTime
    ).getTime();
    if (this.previousPrayer && this.previousPrayer.id === 'Isha') {
      const nextFajr = new Date(endTime);
      nextFajr.setDate(nextFajr.getDate() + 1);
      endTime = nextFajr.getTime();
    }

    const totalTime = Math.abs(endTime - startTime);
    const progress = 1 - (endTime - new Date().getTime()) / totalTime;
    const remaining = endTime - new Date().getTime();
    const remainingText = this.secondsToCountdown(Math.floor(remaining / 1000));
    const hours =
      parseInt(remainingText.split(':')[0]) < 10
        ? '0' + remainingText.split(':')[0]
        : remainingText.split(':')[0]; // + 'h';
    const minutes = remainingText.split(':')[1];
    const remainingTime = hours + ':' + minutes;
    const formattedRemaining = psDatePipe.transform(
      remainingTime,
      'HH:mm',
      'h:mm'
    );

    return { progress, remaining: formattedRemaining };
  }

  private secondsToCountdown(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds
      }`;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // GRadwan 16/03/2020, showing a message indcating action happens when clicking timer button
  changeNotficStatue() {
    this.notfictionIconOptions = {};

    if (this.prayerNotficStat === false) {
      this.prayerNotficStat = !this.prayerNotficStat;
      this.notfictionIconOptions = {
        iconName: 'bell-slash-o1',
      };

      this.session.append(
        PsCommonSettings.PRAYER_NOTIFIC_STATUE,
        this.prayerNotficStat,
        true
      );

      for (const prayer of Object.keys(this.prayersNotifications)) {
        this.session.append(
          this.prayersNotifications[prayer],
          this.prayerNotficStat,
          true
        );
        this.prayersNotificationStat[prayer] = this.prayerNotficStat;
      }

      this.prayerService
        .initPrayersService()
        .then((result) => {
          this.logger.log('result', result);

          CommonUtils.presentSuccessAlert(
            CommonUtils.translate('reminders_successfully_set_key')
          );
        })
        .catch((error) => {
          this.logger.error(error);
          this.failurePopup(CommonUtils.translate('something_went_wrong_key'));
        });
    } else {
      this.notfictionIconOptions = {
        iconName: 'bell-o1',
      };

      this.prayerNotficStat = !this.prayerNotficStat;
      this.session.append(
        PsCommonSettings.PRAYER_NOTIFIC_STATUE,
        this.prayerNotficStat,
        true
      );

      for (const prayer of Object.keys(this.prayersNotifications)) {
        this.session.append(
          this.prayersNotifications[prayer],
          this.prayerNotficStat,
          true
        );
        this.prayersNotificationStat[prayer] = this.prayerNotficStat;
      }
      this.localNotifications
        .cancelAll()
        .then((result) => {
          this.logger.log('result', result);
          CommonUtils.presentSuccessAlert(
            CommonUtils.translate('reminders_successfully_removed_key')
          );
        })
        .catch((error) => {
          this.logger.error(error);
          this.failurePopup(CommonUtils.translate('something_went_wrong_key'));
        });
    }
  }

  failurePopup(mes: string) {
    // Modified by Richie for TP# 1105083 : the interface PSAlertOptions was sent to the function causing compilation error
    const alertOption: IOptionsAlert = {
      title: CommonUtils.translate('failed_key'),
      message: mes
      // buttons: [
      //   {
      //     text: CommonUtils.translate('okay_key'),
      //     role: 'cancel',
      //     cssClass: 'button-primary',
      //   },
      // ],
    };
    CommonUtils.presentFailureAlert(null, alertOption);
  }

  setSinglePrayerNotific(prayer) {
    if (this.prayersNotificationStat[prayer.id] === false) {
      this.prayersNotificationStat[prayer.id] = !this.prayersNotificationStat[
        prayer.id
      ];

      this.session.append(
        this.prayersNotifications[prayer.id],
        this.prayersNotificationStat[prayer.id],
        true
      );

      this.prayerService
        .setSinglePrayerNotific(prayer)
        .then((result) => {
          this.logger.log('result', result);

          CommonUtils.presentSuccessAlert(
            CommonUtils.translate(
              prayer.id + ' ' + 'reminders_successfully_set_key'
            )
          );
        })
        .catch((error) => {
          this.logger.error(error);
          this.failurePopup(CommonUtils.translate('something_went_wrong_key'));
        });
    } else {
      this.prayersNotificationStat[prayer.id] = !this.prayersNotificationStat[
        prayer.id
      ];
      this.session.append(
        this.prayersNotifications[prayer.id],
        this.prayersNotificationStat[prayer.id],
        true
      );
      this.localNotifications
        .getAll()
        .then((result) => {
          for (const selectedprayer of result) {
            if (selectedprayer.text.includes(prayer.id))
              this.localNotifications
                .cancel(selectedprayer.id)
                .then(() => {
                  CommonUtils.presentSuccessAlert(
                    CommonUtils.translate(
                      prayer.id + ' ' + 'reminders_successfully_removed_key'
                    )
                  );
                })
                .catch((error) => {
                  this.failurePopup(
                    CommonUtils.translate('something_went_wrong_key')
                  );
                });
          }
        })
        .catch((error) => {
          this.logger.error(error);
          this.failurePopup(CommonUtils.translate('something_went_wrong_key'));
        });
    }
  }
}
