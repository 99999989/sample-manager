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
  public users:User[];
  private errorMessage;
  private _router:Router;
  private _userService:UserService;

  constructor(userService: UserService, router: Router) {


    this._router = router;
    this._userService = userService;
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      users => this.users = users,
      error =>  this.errorMessage = <any>error
    );
  }

  public navigateToProject(id:string) {
    this._router.navigate(['ProjectDetail', {projectId: id}]);
  }
}
