import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BankingService {

  private apiUrl = 'http://localhost:3000';  // URL za json-server api

  constructor(private http: HttpClient) {
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
