import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import {Trigger} from '../models/trigger';
import {HttpService} from './http-service';

@Injectable()
export class TriggerService {
  private url:string = 'api/triggers/';
  private http:HttpService;

  constructor(private http: HttpService) {
    this.http = http;
  }

  /**
   * Get all triggers
   * @returns {Observable<R>}
     */
  public getTriggers(): any {
    return this.http.get(this.url)
      .map((res) => <Trigger[]> res.json())
      .catch(this.handleError);
  }

  /**
   * Get trigger by id
   * @param id
   * @returns {Observable<R>}
     */
  public getTriggerById(id: string): any {
    return this.http.get(this.url + id)
      .map((res) => <Trigger> res.json())
      .catch(this.handleError);
  }

  /**
   * Create a trigger
   * @param trigger
   * @returns {Observable<R>}
     */
  public createTrigger(trigger: Trigger): any {
    return this.http.post(this.url, trigger)
      .map((res) => <Trigger> res.json())
      .catch(this.handleError);
  }

  /**
   * Update a trigger
   * @param trigger
   * @returns {Observable<R>}
     */
  public updateTrigger(trigger: Trigger): any {
    return this.http.put(this.url, trigger)
      .map((res) => <Trigger> res.json())
      .catch(this.handleError);
  }

  /**
   * Delete a trigger
   * @param id
   * @returns {Observable<R>}
     */
  public deleteTrigger(id: string): any {
    return this.http.delete(this.url + id)
      .map((res) => <Trigger> res.json())
      .catch(this.handleError);
  }

  /**
   * Handle request errors
   * @param error
   * @returns {Observable<T>}
     */
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'TriggerService: Server error');
  }
}
