import { Injectable } from '@angular/core';
import { ILocalNotification, ILocalNotificationActionType, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { google } from 'google-maps';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOmniPrayerTimeRequest, IPrayerDate } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { GeolocationService } from '../../../commonSRC/psServices/geolocation/geolocation.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';



declare var google: google;

// Author: GRadwan 27Jan2020

@Injectable({
  providedIn: 'root'
})
export class PrayerService {
  notifactionPrayers: ILocalNotification[] = [];
  notificationID = 1;

  constructor(public omniPull: OmniPullService, public geolocation: GeolocationService, public localNotifications: LocalNotifications, public nativeAudio: NativeAudio, private logger: LoggerService) { }


  // duplicated from version 3, to get the hijridate for specific Gregorian date ,GRadwan US925625
  public async returnHijriDate(date: Date) {
    const wdNames = await this.omniPull.returnLovTypesValues({ lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_WEEK_DAYS });
    const iMonthNames = await this.omniPull.returnLovTypesValues({ lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_HIJIRI_MONTHS });
    const iDate = this.omniPull.omniCommon.common.pathSolutionCalendar(date);
    const outputIslamicDate = ((wdNames[iDate[4]]) ? wdNames[iDate[4]].description : '') + ', '
      + iDate[5] + ' ' + ((iMonthNames[iDate[6]]) ? iMonthNames[iDate[6]].description : '') + ' ' + iDate[7] + ' AH';

    this.logger.log('wdNames', wdNames);
    this.logger.log('iMonthNames', iMonthNames);
    this.logger.log('iDate', iDate);
    this.logger.log('outputIslamicDate', outputIslamicDate);
    return outputIslamicDate;
  }

  public async getPrayerTimes(day: number, month: number, year: number): Promise<any> {
    return new Promise(async (resolve) => {
      try {
        this.geolocation.getCachedCoordinates(false).then(position => {
          const usrPosition = new google.maps.LatLng(position.latitude, position.longitude);
          const params: IOmniPrayerTimeRequest = {
            date: day.toString() + '/' + month.toString() + '/' + year.toString(),
            // "timeZone":"Cairo/Egypt",
            latitude: usrPosition.lat(),
            longitude: usrPosition.lng(),
          };
          this.omniPull.returnPrayTime(params).then((res: any) => {
            const result = res; // we will have array of days of that specific month
            this.logger.log(result);
            resolve(result);
          });
        }, error => {
          this.geolocation.goBack(error, 'prayer');
        });

      } catch (error) {
        this.omniPull.omniCommon.common.logger.error(error);
      }
    });
  }

  // ARagab : use to get the pryers time
  // GRadwan: update method to use the prayerTime service
  async getPrayers(dy = null, mth = null, yr = null): Promise<IPrayerDate> {

    try {
      const d = new Date();

      let day: any = dy || d.getDate();
      let month: any = mth || d.getMonth() + 1; // 0-11
      const year = yr || d.getFullYear();

      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      const psDatePipe = new PsDateFormatPipe();
      const timeInputFormat = 'h:mm:ss';
      const timeOutputFormat = 'hh:mm A';

      let pryerDate;

      return new Promise(async (resolve, reject) => {

        this.getPrayerTimes(day, month, year)
          .then(result => {
            // const theDate = new Date(data.date.timestamp * 1000);
            // Commented/Added by Richie to fix the date format since ios was crashing when calling localnotification.schedule() since the date is coming as 'yyyy-MM-dd'
            // pryerDate = theDate.toISOString().split('T')[0];
            pryerDate = year + '/' + month + '/' + day;
            // End Richie
            const prayers = [];
            prayers.push(
              {
                id: 'Fajr',
                time: psDatePipe.transform(result.fajar, 'LT', timeInputFormat),
                formattedTime: psDatePipe.transform(result.fajar, timeOutputFormat, timeInputFormat),
                originalTime: result.fajar
              },
              {
                id: 'Dhuhr',
                time: psDatePipe.transform(result.zuhar, 'LT', timeInputFormat),
                formattedTime: psDatePipe.transform(result.zuhar, timeOutputFormat, timeInputFormat),
                originalTime: result.zuhar
              },
              {
                id: 'Asr',
                time: psDatePipe.transform(result.asser, 'LT', timeInputFormat),
                formattedTime: psDatePipe.transform(result.asser, timeOutputFormat, timeInputFormat),
                originalTime: result.asser
              },
              {
                id: 'Maghrib',
                time: psDatePipe.transform(result.maghrib, 'LT', 'h:mm:ss'),
                formattedTime: psDatePipe.transform(result.maghrib, timeOutputFormat, timeInputFormat),
                originalTime: result.maghrib
              },
              {
                id: 'Isha',
                time: psDatePipe.transform(result.ishaa, 'LT', 'h:mm:ss'),
                formattedTime: psDatePipe.transform(result.ishaa, timeOutputFormat, timeInputFormat),
                originalTime: result.ishaa
              });

            resolve({
              prayersTimeTable: prayers,
              prayersDate: pryerDate,
              hijriDate: result.hijriDate

            });
          }, error => {
            reject(error);
          })
          .catch(error => {
            this.omniPull.omniCommon.common.logger.error(error);
            reject(error);
          });
      });
    } catch (error) {
      this.omniPull.omniCommon.common.logger.error(error);
    }
  }

  // set notification for single prayers
  public async setSinglePrayerNotific(selectedPrayer?) {
    if (selectedPrayer) {
      const now = new Date();
      const pryerDate = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
      const prayertime = new Date(pryerDate + ' ' + selectedPrayer.originalTime); // prayerDate + prayerTime
      this.pushPrayerNotification(selectedPrayer, prayertime);
    }
  }

  // set notification for all prayers
  public async initPrayersService() {
    const prayersdata: IPrayerDate = await this.getPrayers();
    if (prayersdata && prayersdata.prayersTimeTable) {
      for (const prayer of prayersdata.prayersTimeTable) {
        const prayertime = new Date(prayersdata.prayersDate + ' ' + prayer.originalTime);
        this.pushPrayerNotification(prayer, prayertime);
      }
    }
  }

  pushPrayerNotification(prayer, prayertime) {
    const now = new Date();
    const id = this.notificationID;

    // Ghada Radwan #1036372 to allow the system sending notification reminder for Fajr Prayer time.
    if (now.getTime() > prayertime.getTime()) {
      prayertime.setDate(prayertime.getDate() + 1);
    }

    // islam sayed 22012020
    prayertime.setMinutes(prayertime.getMinutes() - ConstantCommon.REMIND_BEFORE);
    const selectedPrayers = this.notifactionPrayers.filter(x => x.data.prayer === prayer.id);
    if (selectedPrayers.length === 0) {
    this.notifactionPrayers.push(
      {
        id,
        title: 'Attention',
        text: CommonUtils.translate('it_is_now_the_time_of_key') + ' ' + prayer.id.toString() +  ' ' + CommonUtils.translate('prayer_key'),
        data: {
          prayer: prayer.id
        },
        sound: 'null',
        trigger: { at: prayertime },
        actions: [
          { id: 'ok', title: 'OK', type: ILocalNotificationActionType.BUTTON },
        ]
      }
    );
    this.notificationID++;
    this.logger.log('GTestnotifactionPrayers', this.notifactionPrayers);
    this.localNotifications.schedule(this.notifactionPrayers);
  }
  }
}

