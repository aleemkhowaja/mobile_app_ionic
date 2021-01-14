import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { MissingTranslationHandler, TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PsAuthenticationMatrixComponentModule } from './commonBussinessSRC/psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.module';
import { MaterialModule } from './commonSRC/psComponents/material.module';
import { PsComponentsModule } from './commonSRC/psComponents/ps-components.module';
import { PsSplashScreenPageModule } from './commonSRC/psPages/ps-splash-screen/ps-splash-screen.module';
import { ErrorHandlerService } from './commonSRC/psServices/errorhandler/errorhandler.service';
import { MissinTranslationsService } from './commonSRC/psServices/missing-translation/missing-translation';
import { PsCommonSettings } from './commonSRC/psServices/models/ps-common.settings';
import { PS_COMMON_SERVICES } from './commonSRC/psServices/ps-common-services';
import { PsTemplateAlertControllerModule } from './commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.module';
import { PsTemplateLandingWebPageModule } from './commonSRC/psTemplates/ps-template-landing-web/ps-template-landing-web.template.module';
import { PsTemplatePopupMessagePageModule } from './commonSRC/psTemplates/ps-template-popup-message/ps-template-popup-message.module';
import { SharedModule } from './commonSRC/shared.module';



export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.get('jwt_token'),
    whitelistedDomains: ['localhost:8180']
  };
}
// let config:IonicConfig = {}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: true,
      animated: false
      /* autoFocusAssist: true */
    }),
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    PsAuthenticationMatrixComponentModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forRoot(
      {
        missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissinTranslationsService }
      }
    ),
    IonicStorageModule.forRoot({
      name: '_path_solutions',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    SharedModule,
    PsComponentsModule,
    AppRoutingModule,
    PsSplashScreenPageModule,
    PsTemplatePopupMessagePageModule,
    PsTemplateLandingWebPageModule,
    PsTemplateAlertControllerModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // FacebookModule.forRoot(),
    // NgProgressModule,
    // RecaptchaModule.forRoot()

  ],
  providers: [
    PS_COMMON_SERVICES,
    File,
    FileOpener,
    FirebaseCrashlytics,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    SocialSharing
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    PsCommonSettings.injector = injector;
  }
}

