import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessagingService {
  // message: Subject<any> = new Subject();
  private _messenger = new Subject();
  messenger$ = this._messenger.asObservable();

  sendMessage(message) {
    this._messenger.next(message);
  }

  constructor() {
  }

  // getMessage(): Observable<any> {
  //     return
  // }

  //clearMessage()

}
