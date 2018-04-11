import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Currency, ExchangeRate, Transaction} from "./custom-types";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BankingService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:3000';  // URL za json-server api

  /**
   * api error handler
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * lokalna valuta, zaenkrat samo EUR
   * @return {string}
   */
  getLocalCurrency(): Currency[] {
    return [
      {id: 1, currency: 'EUR'}
    ];
  }

  /**
   * dobi vse crypto transakcije
   * @returns {Observable<Transaction[]>}
   */
  getCryptoTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/crypto_transactions')
      .pipe(catchError(this.handleError('getCryptoTransactions', [])));
  }

  /**
   * dobi vse money transakcije (EUR)
   * @returns {Observable<Transaction[]>}
   */
  getMoneyTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/money_transactions')
      .pipe(catchError(this.handleError('getMoneyTransactions', [])));
  }

  /**
   * dobi vse exchange rate
   * @returns {Observable<ExchangeRate[]>}
   */
  getExchangeRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(this.apiUrl + '/exchange_rates')
      .pipe(catchError(this.handleError('getExchangeRates', [])));
  }

  /**
   * zapiše crypto transakcijo
   * @param data
   * @returns {Observable<Transaction[]>}
   */
  placeCryptoTrans(data): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.apiUrl + '/crypto_transactions', data, httpOptions)
      .pipe(catchError(this.handleError('placeCryptoTrans', [])));
  }

  /**
   * zapiše money transakcijo
   * @param data
   * @returns {Observable<Transaction[]>}
   */
  placeMoneyTrans(data): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.apiUrl + '/money_transactions', data, httpOptions)
      .pipe(catchError(this.handleError('placeMoneyTrans', [])));
  }

  /**
   * randomizira exchange rate
   * @param data
   * @return {ExchangeRate[]}
   */
  randomizeRates(data): ExchangeRate[] {
    // factor je iz random intervala -0.05 do +0.05
    const factor = (Math.random() - 0.5) / 10;
    data.forEach(o => {
      const tmp = o.rate;
      o.rate = Math.round((tmp + (factor * tmp)) * 100) / 100;
      o.timestamp = Date.now();
    });
    // console.log('randomizeRates', JSON.stringify(data));
    return data;
  }

}
