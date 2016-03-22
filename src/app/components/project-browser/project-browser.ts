import {Component} from 'angular2/core';
import {Router, RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';

import {ProjectDetail} from '../project-detail/project-detail';
import {ProjectList} from "../project-list/project-list";

@Component({
  selector: 'project-browser',
  templateUrl: 'app/components/project-browser/project-browser.html',
  styleUrls: ['app/components/project-browser/project-browser.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

@RouteConfig([
  new Route({ path: '/', component: ProjectList, name: 'ProjectList', useAsDefault: true }),
  new Route({ path: '/:projectId', component: ProjectDetail, name: 'ProjectDetail' })
])

export class ProjectBrowser {

  private _router:Router;

  constructor(private router: Router) {
    this._router = router;
  }


}
