import {Component} from 'angular2/core';
import {UserService} from '../../services/user-service';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {User} from "../../models/user";
import {Router} from "angular2/router";
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project-service';

@Component({
  selector: 'project-list',
  templateUrl: 'app/components/project-list/project-list.html',
  styleUrls: ['app/components/project-list/project-list.css'],
  providers: [UserService, ProjectService],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  pipes: []
})

export class ProjectList {
  public user:User;
  public showLoadingSpinner:boolean = true;
  public newProject:Project = new Project();
  public projectToDelete:Project = new Project();
  public params = [{dismissible: false, complete: function(){$('.lean-overlay').hide();}}];
  private errorMessage;
  private _router:Router;
  private _userService:UserService;
  private _projectService:ProjectService;

  constructor(userService: UserService, projectService:ProjectService, router: Router) {
    this._router = router;
    this._userService = userService;
    this._projectService = projectService;
  }

  private refreshUser() {
    this.showLoadingSpinner = true;
    this._userService.authorizeUser().subscribe(
      user => {
        this.user = user;
        this.showLoadingSpinner = false;
      },
      error =>  this.showLoadingSpinner = false
    );
  }

  ngOnInit() {
    this.refreshUser();
  }

  public createProject(project:Project) {
    this._projectService.createProject(project).subscribe(
      project => {
        Materialize.toast('Projekt ' + project.name + ' erstellt', 4000);
        this.newProject = new Project();
        this.refreshUser();
      },
      error =>  Materialize.toast(error, 4000)
    );
  }

  public deleteProject(project:Project) {
    this._projectService.deleteProject(project._id).subscribe(
      project => {
        Materialize.toast('Projekt ' + project.name + ' gelöscht', 4000);
        this.refreshUser();
      },
      error =>  Materialize.toast(error, 4000)
    );
  }

  public navigateToProject(id:string) {
    this._router.navigate(['ProjectDetail', {projectId: id}]);
  }
}
