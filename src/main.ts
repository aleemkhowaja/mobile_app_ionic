import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = () => { };
    window.console.warn = () => { };
    window.console.error = () => { };
    window.console.info = () => { };
    window.console.debug = () => { };
    window.console.trace = () => { };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {}); // console.log(err));
