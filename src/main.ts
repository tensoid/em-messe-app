import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // Popup window to confirm closing or refreshing the webpage in production mode
  window.addEventListener("beforeunload", (e) => e.returnValue = null);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
