import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { tokenInterceptor } from './token.interceptor';
import { errorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
  providers: [
    provideRouter (routes), provideClientHydration(),
    provideHttpClient (withInterceptors ([tokenInterceptor, errorInterceptor])), provideAnimationsAsync ()
    ]
};
