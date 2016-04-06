///<reference path="./../node_modules/angular2/typings/tsd.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {SampleManagerApp} from './app/sample-manager-app';
import {HttpService} from './app/services/http-service';

bootstrap(SampleManagerApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, HttpService])
  .catch(err => console.error(err));
