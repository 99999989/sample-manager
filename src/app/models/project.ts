import {Question} from './question';
import {User} from './user';

export class Project {
  private _id:string;
  private _name:string;
  private _created:string;
  private _questions:Question[];
  private _users:User[];
  private _imageUrl:string;

  constructor(id:string, name:string, created:string, questions:Question[], users:User[], imageUrl) {
    this._id = id;
    this._name = name;
    this._created = created;
    this._questions = questions;
    this._users = users;
    this._imageUrl = imageUrl;
  }

  get id():string {
    return this._id;
  }

  set id(value:string) {
    this._id = value;
  }

  get name():string {
    return this._name;
  }

  set name(value:string) {
    this._name = value;
  }

  get created():string {
    return this._created;
  }

  set created(value:string) {
    this._created = value;
  }

  get questions():Question[] {
    return this._questions;
  }

  set questions(value:Question[]) {
    this._questions = value;
  }

  get users():User[]{
      return this._users;
      }

  set users(value:User[]){
      this._users=value;
      }

  get imageUrl():string{
      return this._imageUrl;
      }

  set imageUrl(value:string){
      this._imageUrl=value;
      }
}
