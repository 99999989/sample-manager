import {Project} from './project';

export class User {
  private id:string;
  private username:string;
  private email:string;
  private password:string;
  private projects:Project[];

  constructor() {
  }

  constructor(id:string, username:string, email:string, password:string, projects:Project[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.projects = projects;
  }


}
