import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { routes } from './app.routes';

import { UserManagerSettings } from 'oidc-client-ts';
import { initOidc, OIDC_ROUTES } from '@edgeflare/ng-oidc';

// Define OIDC configuration
const oidcConfig: UserManagerSettings = {
  authority: "https://iam-PROJECT_ID.PROJECT_REGION.edgeflare.dev",
  client_id: "CLIENT_ID",
  redirect_uri: "http://localhost:4200/signin/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:4200/signout/callback",
  automaticSilentRenew: true,
  silentRequestTimeoutInSeconds: 30,
  silent_redirect_uri: "http://localhost:4200/silent-refresh-callback.html",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...initOidc(oidcConfig),
    provideRouter(OIDC_ROUTES),
  ]
};
