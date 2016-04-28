import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Trigger} from "../../models/trigger";
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {TriggerService} from '../../services/trigger-service';
import {Trigger} from '../../models/trigger';
import {SharedService} from '../../services/shared-service';
import {Project} from '../../models/project';

@Component({
  selector: 'trigger-detail',
  templateUrl: 'app/components/trigger-detail/trigger-detail.html',
  styleUrls: ['app/components/trigger-detail/trigger-detail.css'],
  providers: [TriggerService],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  pipes: []
})

export class TriggerDetail {
  public trigger:Trigger;
  public showLoadingSpinner:boolean = true;
  public newTrigger:Trigger;
  public tempTrigger:any;
  public newValue:string;

  private _router:Router;
  private _triggerService:TriggerService;
  private _triggerService:TriggerService;
  private _routeParams:RouteParams;

  constructor(routeParams:RouteParams, triggerService:TriggerService, router:Router, private sharedService:SharedService) {
    this._router = router;
    this._triggerService = triggerService;
    this._routeParams = routeParams;
  }

  ngOnInit() {
    if (this._routeParams.get('triggerId') === 'neu') {
      let project:Project = new Project();
      project._id = this._routeParams.get('projectId');
      this.tempTrigger = new Trigger(project);
    } else {
      this.refreshTrigger();
    }

  }

  ngOnDestroy() {
    this.sharedService.notify<Trigger>('currentTrigger', null);
    this.sharedService.notify<Project>('currentProject', null);
  }

  private refreshTrigger() {
    this._triggerService.getTriggerById(this._routeParams.get('triggerId')).subscribe(
      trigger => {
        this.tempTrigger = trigger;
      },
      error =>  Materialize.toast(error, 4000),
      () => {
        this.showLoadingSpinner = false;
        this.sharedService.notify<Trigger>('currentTrigger', this.tempTrigger);
        this.sharedService.notify<Project>('currentProject', this.tempTrigger.project);
      }
    );
  }

  public getSelectableValues(trigger) {
    return trigger.values.split(',');
  }

  public getIconByType(type):string {
    return type.trim() !== 'Lautstärke' ? type.trim() === 'Standort' ? 'place' : 'help_outline' : 'hearing'
  }
  public getAnswerCount(trigger:Trigger) {
    let counter:number = 0;
    if (trigger.rules && trigger.rules.length > 0) {
      for (let i = 0; i < trigger.rules.length; i++) {
        //counter += question.rules[i].answers.length;
      }
    }
    return counter;
  }
  public addAnswer() {
    this.tempTrigger.values.push(this.newValue);
    this.newValue = '';
  }

  public removeAnswer(value) {
    this.tempTrigger.values.splice(this.tempTrigger.values.indexOf(value), 1);
  }

  public saveTrigger(trigger:Trigger) {
    if (trigger._id) {
      this._triggerService.updateTrigger(trigger).subscribe(
        trigger => {
          Materialize.toast('Trigger aktualisiert', 4000);
          this.refreshTrigger();
        },
        error =>  Materialize.toast(error, 4000)
      );
    } else {
      this._triggerService.createTrigger(trigger).subscribe(
        trigger => {
          Materialize.toast('Trigger erstellt', 4000);
          this.refreshTrigger();
        },
        error =>  Materialize.toast(error, 4000)
      );
    }
  }

  public navigateBack() {
    this._router.navigate(['TriggerList'])
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
