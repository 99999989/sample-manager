import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Project} from "../../models/project";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'project-detail',
  templateUrl: 'app/components/project-detail/project-detail.html',
  styleUrls: ['app/components/project-detail/project-detail.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

export class ProjectDetail {
  public project:Project;
  private router:Router;
  constructor(routeParams: RouteParams, userService: UserService, router: Router) {
    this.router = router;
    let user = userService.getUser('');
    for (let i = 0; i < user.projects.length; i++) {
      if (user.projects[i].id === routeParams.get('projectId')) {
        this.project = user.projects[i];
        break;
      }
    }
  }

  public navigateBack() {
    this.router.navigate(['ProjectList'])
  }

}
