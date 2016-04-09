import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Project} from "../../models/project";
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ProjectService} from '../../services/project-service';
import {Measure} from '../../models/measure';
import {MeasureService} from '../../services/measure-service';

@Component({
  selector: 'project-detail',
  templateUrl: 'app/components/project-detail/project-detail.html',
  styleUrls: ['app/components/project-detail/project-detail.css'],
  providers: [ProjectService, MeasureService],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  pipes: []
})

export class ProjectDetail {
  public project:Project;
  public showLoadingSpinner:boolean = true;
  public newMeasure:Measure;
  public newValue:string;
  public modalParams = [{dismissible: false, complete: function(){$('.lean-overlay').hide();}}];

  private _router:Router;
  private _projectService:ProjectService;
  private _measureService:MeasureService;
  private _routeParams:RouteParams;

  constructor(routeParams:RouteParams, projectService:ProjectService, measureService:MeasureService, router:Router) {
    this._router = router;
    this._projectService = projectService;
    this._measureService = measureService;
    this._routeParams = routeParams;
  }

  ngOnInit() {
    this.refreshProject();
  }

  private refreshProject() {
    this._projectService.getProjectById(this._routeParams.get('projectId')).subscribe(
      project => {
        this.project = project;
        this.newMeasure = new Measure(project);
        this.showLoadingSpinner = false;
      },
      error =>  Materialize.toast(error, 4000)
    );
  }

  public getSelectableValues(measure) {
    return measure.values.split(',');
  }

  public saveData(question) {
    //alert('data saved');
  }

  public getIconByType(type) {
    return type.trim() !== 'Lautstärke' ? type.trim() === 'Standort' ? 'place' : 'help_outline' : 'hearing'
  }
  public getAnswerCount(measure:Measure) {
    let counter:number = 0;
    if (measure.rules && measure.rules.length > 0) {
      for (let i = 0; i < measure.rules.length; i++) {
        //counter += question.rules[i].answers.length;
      }
    }
    return counter;
  }
  public addAnswer() {
    this.newMeasure.values.push(this.newValue);
    this.newValue = '';
  }

  public removeAnswer(value) {
    this.newMeasure.values.splice(this.newMeasure.values.indexOf(value), 1);
  }

  public saveMeasure(measure:Measure) {
    if (measure._id) {
      this._measureService.updateMeasure(measure).subscribe(
        measure => {
          Materialize.toast('Messung aktualisiert', 4000);
          this.newMeasure = new Measure();
          this.refreshProject();
        },
        error =>  Materialize.toast(error, 4000)
      );
    } else {
      this._measureService.createMeasure(measure).subscribe(
        measure => {
          Materialize.toast('Messung erstellt', 4000);
          this.newMeasure = new Measure();
          this.refreshProject();
        },
        error =>  Materialize.toast(error, 4000)
      );
    }
  }
  // Doughnut
  private doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  private doughnutChartData = [350, 450, 100];
  private doughnutChartType = 'Doughnut';

  public navigateBack() {
    this._router.navigate(['ProjectList'])
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
