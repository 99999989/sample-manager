import {Project} from './project';

export class User {
  private id:string;
  private username:string;
  private email:string;
  private password:string;
  private projects:Project[];

  constructor() {
  }
}
