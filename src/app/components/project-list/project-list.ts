import {Component} from 'angular2/core';
import {UserService} from '../../services/user-service';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {User} from "../../models/user";
import {Router} from "angular2/router";

@Component({
  selector: 'project-list',
  templateUrl: 'app/components/project-list/project-list.html',
  styleUrls: ['app/components/project-list/project-list.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

export class ProjectList {
  public repos: Observable<any>;
  public user:User;

  private _router:Router;

  constructor(userService: UserService, router: Router) {

    this.user = userService.getUser('dd');
    this._router = router;
  }

  public navigateToProject(id:string) {
    this._router.navigate(['ProjectDetail', {projectId: id}]);
  }
}
