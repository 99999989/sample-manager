import {Component} from 'angular2/core';
import {Route, RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router'; //Router
import {Home} from './components/home/home';
import {About} from './components/about/about';
import {RepoBrowser} from './components/repo-browser/repo-browser';
import Logger from './utils/logger.service';
import {AppConfig} from './app-config.ts';
import {MaterializeDirective} from 'angular2-materialize';
import {ProjectBrowser} from "./components/project-browser/project-browser";

@Component({
  selector: 'sample-manager-app',
  providers: [],
  styles: [
    `
      .side-nav li {
        padding: 0 !important;
      }

      .app-content {
        padding-left: 65px;
      }
      @media only screen and (max-width : 992px) {
        .app-content {
          padding-left: 0;
        }
      }
      .brand {
        font-size: 16pt;
        padding-left: 10px;
        padding-top: 10px;
      }
    `
  ],
  templateUrl: 'app/sample-manager-app.html',
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  pipes: []
})

@RouteConfig([
  new Route({ path: '/home', component: Home, name: 'Home', useAsDefault: true }),
  new Route({ path: '/projekte/...', component: ProjectBrowser, name: 'Projekte' }),
  new Route({ path: '/github/...', component: RepoBrowser, name: 'RepoBrowser' })
])

export class SampleManagerApp {

  private _log: Logger = new Logger('SampleManagerAppTest');

  constructor( private _router:Router) {
    this._log.info('constructor')(AppConfig);
  }

  private routes = [
    {name: 'Home', icon: 'home'},
    {name: 'Projekte', icon: 'class'}
  ];

  public sayHello(): string {
    return 'hello';
  }

  public isActive(routeName) {
    return this._router.isRouteActive(this._router.generate([routeName]))
  }
}
