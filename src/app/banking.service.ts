import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// TODO: premaknit v svoj class
type Currency = Array<{ id: number, currency: string }>;

@Injectable()
export class BankingService {

  private apiUrl = 'http://localhost:3000';  // URL za json-server api



  // /////////////////

  constructor(private http: HttpClient) {
  }

  /**
   * lokalna valuta, zaenkrat samo EUR
   * @return {string}
   */
  getLocalCurrency(): Currency {
    return [
      {id: 1, currency: 'EUR'}
    ];
  }

  /**
   * dobi vse crypto transakcije
   * @returns {Observable<any>}
   */
  getCryptoTransactions(): Observable<any> {
    return this.http.get(this.apiUrl + '/crypto_transactions');
  }

  /**
   * dobi vse money transakcije (EUR)
   * @returns {Observable<any>}
   */
  getMoneyTransactions(): Observable<any> {
    return this.http.get(this.apiUrl + '/money_transactions');
  }

  /**
   * dobi vse money transakcije (EUR)
   * @returns {Observable<any>}
   */
  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl + '/exchange_rates');
  }

  /**
   * zapiše transakcijo z amountom
   * @param data
   * @returns {Observable<any>}
   */
  placeCryptoTrans(data): Observable<any> {
    return this.http.post(this.apiUrl + '/crypto_transactions', data, httpOptions);
  }

  placeMoneyTrans(data): Observable<any> {
    return this.http.post(this.apiUrl + '/money_transactions', data, httpOptions);
  }

  /**
   * da ob vsakem klicu randomizira exchange rate
   * @param data
   * @return {any}
   */
  randomizeRates(data): any {
    // factor je iz random intervala -0.05 do +0.05
    const factor = (Math.random() - 0.5) / 10;
    data.forEach(o => {
      const tmp = o.rate;
      o.rate = Math.round((tmp + (factor * tmp)) * 100) / 100;
      o.timestamp = Date.now();
    });
    //console.log('randomizeRates', JSON.stringify(data));
    return data;
  }

}
