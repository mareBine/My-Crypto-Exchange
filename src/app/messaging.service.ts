import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessagingService {

  private _messenger = new Subject();

  sendMessage(message) {
    this._messenger.next(message);
  }

  getMessage() {
    return this._messenger.asObservable();
  }

  constructor() {
  }

}
