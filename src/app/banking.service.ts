import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// TODO: premaknit v svoj class
type Currency = Array<{ id: number, currency: string }>;

@Injectable()
export class BankingService {

  private apiUrl = 'http://localhost:3000';  // URL za json-server api

  // TODO: prestavit v svoj messenger service
  private _messenger = new Subject();
  messenger$ = this._messenger.asObservable();

  sendMessage(message) {
    this._messenger.next(message);
  }

  // /////////////////

  constructor(private http: HttpClient) {
  }

  /**
   * vrne vse valute ki so na voljo
   * @returns {Currency}
   */
  getCurrencies(): Currency {
    return [
      {id: 1, currency: 'EUR'},
      {id: 2, currency: 'JPY'},
      {id: 3, currency: 'GBP'},
      {id: 4, currency: 'USD'},
    ];
  }

  /**
   * dobi vse transakcije
   * @returns {Observable<any>}
   */
  getTransactions(): Observable<any> {
    return this.http.get(this.apiUrl + '/transactions');
  }

  /**
   * zapiše transakcijo z amountom
   * @param data
   * @returns {Observable<any>}
   */
  depositAmount(data): Observable<any> {
    return this.http.post(this.apiUrl + '/transactions', data, httpOptions);
  }

}
