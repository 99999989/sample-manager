import {Injectable} from 'angular2/core';
import {Http, Headers) from 'angular2/http';


@Injectable()
export class HttpService {
  private http:Http;

  constructor(private http: Http) {
    this.http = http;
  }
  private createHeaders() {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return {headers: headers};
  }

  public get(url:string) {
    return this.http.get(url, this.createHeaders());
  }

  public post(url:string, data:Object) {
    return this.http.post(url, JSON.stringify(data), this.createHeaders());
  }

  public put(url:string, data:Object) {
    return this.http.put(url, JSON.stringify(data), this.createHeaders());
  }

  public delete(url:string) {
    return this.http.delete(url, this.createHeaders());
  }
}
