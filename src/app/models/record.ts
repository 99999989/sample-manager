import {User} from './user';
import {Rule} from "./rule";

export class Record {
  public _id:string;
  public created:string;
  public answerValue:string;
  public location:string;
  public user:User;
  public rule:Rule;

  constructor() {
  }
}
