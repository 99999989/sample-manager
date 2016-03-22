///<reference path="./../node_modules/angular2/typings/tsd.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {SampleManagerApp} from './app/sample-manager-app';

bootstrap(SampleManagerApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
  .catch(err => console.error(err));
