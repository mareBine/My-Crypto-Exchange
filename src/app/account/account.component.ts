import {Component, OnDestroy, OnInit} from '@angular/core';
import {BankingService} from '../banking.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  // @Input() newAmount = new EventEmitter<string>();

  account = {};
  obsSubs: Subscription;
  currencies: any;

  constructor(private bankingService: BankingService) {
    bankingService.messenger$
      .subscribe(response => this.processMessage(response));
  }

  ngOnInit() {
    this.currencies = this.bankingService.getCurrencies();
    // gre po podatke o stanju na računu
    this.getAccountData();
  }

  ngOnDestroy() {
    this.obsSubs.unsubscribe();
  }

  /**
   * procesira message:
   * - osvežitev podatkov
   * @param message
   */
  processMessage(message) {
    console.log('processMessage', message);
    if (message === 'refreshAccount') {
      // setTimeout(() => {
      this.getAccountData();      // osveži podatke
      // }, 250);
    }
  }

  /**
   * gre po podatke
   */
  getAccountData() {
    console.log('getAccountData');
    this.obsSubs = this.bankingService.getTransactions()
      .subscribe(response => this.processAccountData(response));
  }

  /**
   * iz vseh transakcij izračuna stanje
   * @param data
   */
  processAccountData(data) {
    console.log(data);
    this.account = {
      timestamp: Date.now(),
      amounts: this.calculateAmounts(data)
    };
  }

  /**
   * sešteje amount pri vseh transakcijah
   * @param data
   * @return {number}
   */
  calculateAmounts(data): any {
    // return data
    //     .map(e => parseFloat(e.amount || 0))
    //     .reduce((a, b) => a + b, 0);

    // TODO: da zna seštevat po currency

    const results = {};
    data.forEach(function (o) {
      results[o.currency] = (results[o.currency] || 0) + parseFloat(o.amount);
    });
    return results;

  }

}
