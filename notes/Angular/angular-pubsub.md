## Pub Sub


 ```Typescript
 //  SOURCE: http://jasonwatmore.com/post/2017/04/19/angular-2-4-router-animation-tutorial-example

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';


@Injectable()
export class PubSubService {

  /* SHARE DATA SYNCRONOUSLY WITH an Object */
  storeSync: { [key: string]: any } = {};

  set(key: string, data: any) {
    this.storeSync[key] = data;
  }

  get(key: string) {
    if (key in this.storeSync) {
      let x = this.storeSync[key];
      delete this.storeSync[key];  // is removed after being passed...
      return x;
    }
    return null;
  }

  /* SHARE DATA WITH BehaviorSubject */
  private subjects: BehaviorSubject<any> = new BehaviorSubject(undefined);

  publishSub(eventName: string, what: any) {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new BehaviorSubject(undefined);
    // publish event
    this.subjects[eventName].next(what);
    // this.subjects[eventName].complete();
  }

  onSub(eventName: string): Observable<any> {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new BehaviorSubject(undefined);
    // return observable
    return this.subjects[eventName].asObservable();
  }

  /* SHARE DATA WITH REPLAYSUBJECT */
  private replay: ReplaySubject<any> = new ReplaySubject(1);

  publishRep(eventName: string, what: any) {
    // ensure a subject for the event name exists
    this.replay[eventName] = this.replay[eventName] || new BehaviorSubject(undefined);
    // publish event
    this.replay[eventName].next(what);
    // this.replay[eventName].complete();
  }

  onRep(eventName: string): Observable<any> {
    // ensure a subject for the event name exists
    this.replay[eventName] = this.replay[eventName] || new BehaviorSubject(undefined);
    // return observable
    return this.replay[eventName].asObservable();
  }
}

 ```

 ## APP CONFIG

 ```Typescript
 /*

  Source: https://github.com/angular/angular-cli/issues/2508

  For those who need an easily modifiable "App config" object, this is how I ended up doing it:
  Link in an app-constants.js file in my index.html which sets a global variable called APP_CONSTANTS (a JS object with configuration data)
  In my AppModule, I have a

*/

import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export function appConstantFactory(): AppConfig {
  return <AppConfig>window['APP_CONSTANTS'];
}


providers: [
    {provide: APP_CONFIG, useFactory: appConstantFactory},
    ...
]
  
/*

  with APP_CONFIG being an OpaqueToken, as per https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#opaquetoken, 
  and from there on, it's a fully "Angularized", injectable and mockable resource.
 */

  ```


   ## COMUNICAZIONE TRA COMPONENTI

 ```Typescript
 // SOURCE: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

// MESSAGE SERVICE
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class MessageService {
    private subject = new Subject<any>();
 
    sendMessage(message: string) {
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

// COMPONENTS THAT RECEIVES MSG
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
 
import { MessageService } from './_services/index';
 
@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
 
export class AppComponent implements OnDestroy {
    message: any;
    subscription: Subscription;
 
    constructor(private messageService: MessageService) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    }
 
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}

// COMPONENT SENDING MSG
import { Component } from '@angular/core';
 
import { MessageService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent {
    constructor(private messageService: MessageService) {}
     
    sendMessage(): void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage('Message from Home Component to App Component!');
    }
 
    clearMessage(): void {
        // clear message
        this.messageService.clearMessage();
    }
}
 ```
