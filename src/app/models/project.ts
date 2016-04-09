import {Question} from './question';
import {User} from './user';

export class Project {
  public _id:string;
  public name:string;
  public created:string;
  public questions:Question[];
  public users:User[];
  public imageUrl:string;

  constructor() {
  }
}
