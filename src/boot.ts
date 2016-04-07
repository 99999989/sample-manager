///<reference path="./../node_modules/angular2/typings/tsd.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {SampleManagerApp} from './app/sample-manager-app';
import {HttpService} from './app/services/http-service';
import {BrowserXhr} from 'angular2/http';
import {CORSBrowserXHR} from './app/services/cors-browser-xhr';
import {provide} from 'angular2/core';

bootstrap(SampleManagerApp, [HTTP_PROVIDERS,provide(BrowserXhr, {useClass: CORSBrowserXHR}), ROUTER_PROVIDERS, HttpService])
  .catch(err => console.error(err));
