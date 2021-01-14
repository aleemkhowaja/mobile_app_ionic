import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Market } from '@ionic-native/market/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { IonicRouteStrategy } from '@ionic/angular';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { Deploy } from 'plugins/cordova-plugin-ionic/dist/ngx';
import { InterceptorService } from 'src/app/commonBussinessSRC/psServices/interceptor/interceptor.service';
import { IonicGestureConfig } from '../psDirectives/ps-ionic-gesture/ps-ionic-gesture-config';
import { PsCurrencyPipe } from '../psPipes/ps-currency/ps-currency.pipe';
import { CheckAppService } from './checkApp/checkApp.service';
import { Events } from './Event/event.service';
import { LanguageService } from './language/language.service';
import { LoggerService } from './logger/logger.service';
import { ObjectMapperProvider } from './models/mapper';
import { PsNetworkService } from './network/ps-network.service';
import { PsNotificationsService } from './notifications/ps-notifications.service';
import { PsCommonService } from './ps-common/ps-common.service';
import { SessionService } from './session/session.service';
import { SocialSharingService } from './socialSharing/socialSharing.service';


const NATIVE_PROVIDERS = [
	{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
	StatusBar,
	SplashScreen,
	Keyboard,
	SecureStorage,
	AppVersion,
	Market,
	Deploy,
	Device,
	FingerprintAIO,
	UniqueDeviceID,
	Network,
	FCM,
	Badge,
	AndroidPermissions,
	NativeGeocoder,
	LocationAccuracy,
	CallNumber,
	Geolocation,
	LaunchNavigator,
	InAppBrowser,
	ImagePicker,
	LocalNotifications,
	NativeAudio,
	Camera,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	EmailComposer,
	DeviceOrientation,
	Calendar,
	{
		provide: HAMMER_GESTURE_CONFIG,
		useClass: IonicGestureConfig
	},
	SocialSharing
];
export const PS_COMMON_SERVICES = [
	...NATIVE_PROVIDERS,
	// path-solutions providers:
	PsCommonService,
	LoggerService,
	SessionService,
	LanguageService,
	PsCurrencyPipe,
	DatePipe,
	ObjectMapperProvider,
	PsNetworkService,
	PsNotificationsService,
	CheckAppService,
	SocialSharingService,
	Events
];

