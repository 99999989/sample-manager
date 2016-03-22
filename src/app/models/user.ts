import {Project} from './project';

export class User {
  private _id:string;
  private _username:string;
  private _email:string;
  private _password:string;
  private _projects:Project[];

  constructor(id:string, username:string, email:string, password:string, projects:Project[]) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._projects = projects;
  }

  get id():string {
    return this._id;
  }

  set id(value:string) {
    this._id = value;
  }

  get username():string {
    return this._username;
  }

  set username(value:string) {
    this._username = value;
  }

  get email():string {
    return this._email;
  }

  set email(value:string) {
    this._email = value;
  }

  get password():string {
    return this._password;
  }

  set password(value:string) {
    this._password = value;
  }

  get projects():Project[] {
    return this._projects;
  }

  set projects(value:Project[]) {
    this._projects = value;
  }
}
