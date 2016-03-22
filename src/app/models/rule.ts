export class Rule {
  private _id:string;
  private _begin:string;
  private _end:string;
  private _repeats:number;

  constructor(id:string, begin:string, end:string, repeats:number) {
    this._id = id;
    this._begin = begin;
    this._end = end;
    this._repeats = repeats;
  }

  get id():string {
    return this._id;
  }

  set id(value:string) {
    this._id = value;
  }

  get begin():string {
    return this._begin;
  }

  set begin(value:string) {
    this._begin = value;
  }

  get end():string {
    return this._end;
  }

  set end(value:string) {
    this._end = value;
  }

  get repeats():number {
    return this._repeats;
  }

  set repeats(value:number) {
    this._repeats = value;
  }
}
