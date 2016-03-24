export class Rule {
  private _id:string;
  private _begin:number;
  private _end:number;
  private _repeats:number;

  constructor(id:string, begin:number, end:number, repeats:number) {
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

  get begin():number {
    return this._begin;
  }

  set begin(value:number) {
    this._begin = value;
  }

  get end():number {
    return this._end;
  }

  set end(value:number) {
    this._end = value;
  }

  get repeats():number {
    return this._repeats;
  }

  set repeats(value:number) {
    this._repeats = value;
  }
}
