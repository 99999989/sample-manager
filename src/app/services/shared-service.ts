import {Injectable} from 'angular2/core';
import {WatcherMap} from '../interfaces/watcher-map';
import {WatcherInterface} from '../interfaces/watcher-interface';


@Injectable()
export class SharedService {

  private subscriptions:WatcherMap = {};

  constructor() {
  }

  public notify<T>(subscriptionName:string, value:T) {
    let subscriptions = this.subscriptions[subscriptionName];
    if (subscriptions) {
      for (let i = 0; i < subscriptions.length; i++) {
        subscriptions[i].onChange<T>(subscriptionName, value);
      }
    } else {
      return;
    }
  }

  public subscribe(subscriptionName:string, watcher:WatcherInterface) {
    if (this.subscriptions[subscriptionName]) {
      this.subscriptions[subscriptionName].push(watcher)
    } else {
      this.subscriptions[subscriptionName] = [watcher];
    }
  }

}
