import {Project} from './project';
import {Rule} from "./rule";
import {Record} from './record';

export class Measure {
  public _id:string;
  public type:string;
  public text:string;
  public values:string[]; // maybe extend the model here
  public records:Record[];
  public project:Project;
  public rules:Rule[];


  constructor(project:Project) {
    this.type = 'Ja / Nein   ';
    this.values = [];
    this.records = [];
    this.project = project;
    this.rules = [new Rule(8, 18, 1)];
  }
}
