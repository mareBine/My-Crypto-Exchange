import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BankingService {

    private apiUrl = 'http://localhost:3000';  // URL za json-server api

    private _messenger = new Subject();
    messenger$ = this._messenger.asObservable();

    sendMessage(message) {
        this._messenger.next(message);
    }

    constructor(private http: HttpClient) {
    }

    currencies = [
        {id: 1, currency: 'EUR'},
        {id: 2, currency: 'SIT'},
        {id: 3, currency: 'USD'},
    ];


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
