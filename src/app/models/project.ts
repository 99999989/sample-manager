import {Measure} from './measure';
import {User} from './user';

export class Project {
  public _id:string;
  public name:string;
  public created:string;
  public createdDate:Date;
  public questions:Measure[];
  public users:User[];
  public imageUrl:string;

  constructor() {
  }


}
