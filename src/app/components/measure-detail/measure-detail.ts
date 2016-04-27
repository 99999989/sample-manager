import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Measure} from "../../models/measure";
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {MeasureService} from '../../services/measure-service';
import {Measure} from '../../models/measure';
import {SharedService} from '../../services/shared-service';
import {Project} from '../../models/project';

@Component({
  selector: 'measure-detail',
  templateUrl: 'app/components/measure-detail/measure-detail.html',
  styleUrls: ['app/components/measure-detail/measure-detail.css'],
  providers: [MeasureService],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  pipes: []
})

export class MeasureDetail {
  public measure:Measure;
  public showLoadingSpinner:boolean = true;
  public newMeasure:Measure;
  public tempMeasure:any;
  public newValue:string;

  private _router:Router;
  private _measureService:MeasureService;
  private _measureService:MeasureService;
  private _routeParams:RouteParams;

  constructor(routeParams:RouteParams, measureService:MeasureService, router:Router, private sharedService:SharedService) {
    this._router = router;
    this._measureService = measureService;
    this._routeParams = routeParams;
  }

  ngOnInit() {
    if (this._routeParams.get('measureId') === 'neu') {
      let project:Project = new Project();
      project._id = this._routeParams.get('projectId');
      this.tempMeasure = new Measure(project);
    } else {
      this.refreshMeasure();
    }

  }

  ngOnDestroy() {
    this.sharedService.notify<Measure>('currentMeasure', null);
    this.sharedService.notify<Project>('currentProject', null);
  }

  private refreshMeasure() {
    this._measureService.getMeasureById(this._routeParams.get('measureId')).subscribe(
      measure => {
        this.tempMeasure = measure;
      },
      error =>  Materialize.toast(error, 4000),
      () => {
        this.showLoadingSpinner = false;
        this.sharedService.notify<Measure>('currentMeasure', this.tempMeasure);
        this.sharedService.notify<Project>('currentProject', this.tempMeasure.project);
      }
    );
  }

  public getSelectableValues(measure) {
    return measure.values.split(',');
  }

  public getIconByType(type):string {
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
    this.tempMeasure.values.push(this.newValue);
    this.newValue = '';
  }

  public removeAnswer(value) {
    this.tempMeasure.values.splice(this.tempMeasure.values.indexOf(value), 1);
  }

  public saveMeasure(measure:Measure) {
    if (measure._id) {
      this._measureService.updateMeasure(measure).subscribe(
        measure => {
          Materialize.toast('Messung aktualisiert', 4000);
          this.refreshMeasure();
        },
        error =>  Materialize.toast(error, 4000)
      );
    } else {
      this._measureService.createMeasure(measure).subscribe(
        measure => {
          Materialize.toast('Messung erstellt', 4000);
          this.refreshMeasure();
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
    this._router.navigate(['MeasureList'])
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
