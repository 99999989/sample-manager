import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Project} from "../../models/project";
import {UserService} from "../../services/user-service";
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {Question} from '../../models/question';
import {CHART_DIRECTIVES} from 'ng2-charts';

@Component({
  selector: 'project-detail',
  templateUrl: 'app/components/project-detail/project-detail.html',
  styleUrls: ['app/components/project-detail/project-detail.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
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

  public getSelectableValues(question) {
    return question.answerValues.split(',');
  }

  public saveData(question) {
    //alert('data saved');
  }

  public getIconByType(type) {
    return type !== 'Lautstärke' ? type === 'Lokalisierung' ? 'place' : 'help_outline' : 'hearing'
  }
  public getAnswerCount(question:Question) {
    let counter:number = 0;
    if (!question.rules || question.rules.length === 0) {
      for (let i = 0; i < question.rules.length; i++) {
        //counter += question.rules[i].answers.length;
      }
    }
    return counter;
  }
  // Doughnut
  private doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  private doughnutChartData = [350, 450, 100];
  private doughnutChartType = 'Doughnut';

  public navigateBack() {
    this.router.navigate(['ProjectList'])
  }
  public repeatEntries = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];

  public timeEntries = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00'
  ]

}
