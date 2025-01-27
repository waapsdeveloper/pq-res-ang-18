import { Injectable } from "@angular/core";
import { NgxPubSubService } from "@pscoped/ngx-pub-sub";
import Pusher from 'pusher-js';

@Injectable({
  providedIn: "root",
})
export class EventsService {
  latestEvent = "randomLast";
  historicalEvent = "randomHistory";
  subscriptions: any[] = [];

  constructor(public pubsubSvc: NgxPubSubService) {
    pubsubSvc.registerEventWithHistory(this.historicalEvent, 6);
    pubsubSvc.registerEventWithLastValue(this.latestEvent, undefined);
  }

  publish(key: string, data = {}) {
    this.pubsubSvc.publishEvent(key, data);
  }

  async subscribe(key, handler, unsubPrior = true) {

    if (unsubPrior) {
      const item = this.subscriptions.find((x) => x.key === key);
      if (item) {
        this.unsubscribe(key);
      }
    }

    const subs = this.pubsubSvc.subscribe(key, (data) => handler(data));
    this.subscriptions.push({ key, subs });

  }

  unsubscribe(key) {
    const item = this.subscriptions.find((x) => x.key === key);
    if (item) {
      const subs = item["subs"];
      subs.unsubscribe();

      const index = this.subscriptions.findIndex((x) => x.key === key);
      if (index > -1) {
        this.subscriptions.splice(index, 1);
      }
    }
  }
}
