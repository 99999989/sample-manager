import {User} from './user';
import {Trigger} from "./trigger";
import {Measure} from './measure';

export class Record {
  public _id:string;
  public created:string;
  public value:string;
  public location:[number];
  public answerDuration:number;
  public measure:Measure;
  public user:User;

  constructor() {
  }
}
