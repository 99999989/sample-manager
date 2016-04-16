import {Component} from 'angular2/core';
import {Route, RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router'; //Router
import {Home} from './components/home/home';
import {About} from './components/about/about';
import {RepoBrowser} from './components/repo-browser/repo-browser';
import Logger from './utils/logger.service';
import {AppConfig} from './app-config.ts';
import {MaterializeDirective} from 'angular2-materialize';
import {ProjectBrowser} from "./components/project-browser/project-browser";
import {LoginRequest} from './models/login-request';
import {User} from './models/user';
import {UserService} from './services/user-service';
import {LoadingSpinner} from './components/common/loading-spinner';
import {NgClass} from 'angular2/common';
import {ProjectDetail} from './components/project-detail/project-detail';
import {WatcherInterface} from './interfaces/watcher-interface';
import {SharedService} from './services/shared-service';
import {Project} from './models/project';

@Component({
  selector: 'sample-manager-app',
  providers: [UserService, SharedService],
  styleUrl: 'app/sample-manager-app.scss',
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
  directives: [ROUTER_DIRECTIVES, MaterializeDirective, LoadingSpinner, NgClass, ProjectDetail],
  pipes: []
})

@RouteConfig([
  new Route({path: '/home', component: Home, name: 'Home', useAsDefault: true}),
  new Route({path: '/projekte/...', component: ProjectBrowser, name: 'Projekte'})
])

export class SampleManagerApp implements WatcherInterface {
  private _log:Logger = new Logger('SampleManagerAppTest');

  public params = [{
    dismissible: true, complete: function () {
      $('.lean-overlay').hide();
    }
  }];
  public user:User = new User();
  public newUser:User = new User();
  public login:LoginRequest = new LoginRequest();
  public authorized:boolean = false;
  public showLoadingSpinner:boolean = false;
  public currentProject:string = '';

  constructor(private _router:Router, private _userService:UserService, private _sharedService:SharedService) {
    this._log.info('constructor')(AppConfig);
  }

  ngOnInit() {
    this._sharedService.subscribe('currentProject', this);
    this._userService.authorizeUser().subscribe(
      user => {
        this.user = user;
        this.authorized = true;
      },
      error =>  Materialize.toast(error, 2000)
    );
  }

  private routes = [
    {name: 'Home', icon: 'home'},
    {name: 'Projekte', icon: 'class'}
  ];

  public isActive(routeName) {
    return this._router.isRouteActive(this._router.generate([routeName]))
  }

  public registerUser(user:User) {
    this.showLoadingSpinner = true;
    this._userService.createUser(user).subscribe(
      user => {
        Materialize.toast('User ' + user.email + ' erfolgreich erstellt!', 4000);
        this.newUser = new User();
        this.showLoadingSpinner = false;
      },
      error => {
        this.showLoadingSpinner = false;
        Materialize.toast(error, 4000);
      }
    );
  }

  public loginUser(login:LoginRequest) {
    this.showLoadingSpinner = true;
    this._userService.loginUser(login).subscribe(
      user => {
        Materialize.toast((user.username || user.email) + ' eingeloggt!', 2000);
        this.user = user;
        this.authorized = true;
        $('#login').closeModal();
      },
      error => {
        Materialize.toast(error, 4000);
      },
      () => this.showLoadingSpinner = false
    );
  }

  public logoutUser() {
    this.showLoadingSpinner = true;
    this._userService.logoutUser().subscribe(
      user => {
        Materialize.toast((user.username || user.email) + ' ausgeloggt!!', 2000);
        this.authorized = false;
        $('#login').closeModal();
        this.user = null;
      },
      error => {
        Materialize.toast(error, 4000);
      },
      () => this.showLoadingSpinner = false
    );
  }

  public onChange<Project>(subscriptionName:string, value:Project):void {
    this.currentProject = value ? value.name : value;
  }
}
