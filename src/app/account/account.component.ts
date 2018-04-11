import {Component, OnDestroy, OnInit} from '@angular/core';
import {BankingService} from '../banking.service';
import {Subscription} from 'rxjs/Subscription';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {MessagingService} from '../messaging.service';
import {Account, Currency, ExchangeRate} from '../custom-types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  private alive: boolean; // unsubscribe from TimerObservable
  interval: number;

  moneyAccount: Account = {
    timestamp: 0, amounts: {}
  };
  cryptoAccount: Account = {
    timestamp: 0, amounts: {}
  };
  subMoneyTrans: Subscription;
  subCryptoTrans: Subscription;
  subExchRates: Subscription;
  localCurrency: Currency[];
  cryptoCurrencies: ExchangeRate[];    // TODO: dodat zunanji class

  constructor(private bankingService: BankingService, private messagingService: MessagingService) {
    this.alive = true;
    this.interval = 5000;   // refresh interval za rate polling
    messagingService.getMessage()
      .subscribe(response => this.processMessage(response));
  }

  ngOnInit() {
    this.localCurrency = this.bankingService.getLocalCurrency();

    TimerObservable
      .create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getExchangeRates();
      });
  }

  ngOnDestroy() {
    this.subExchRates.unsubscribe();
    this.subCryptoTrans.unsubscribe();
    this.subMoneyTrans.unsubscribe();
    this.alive = false; // ugasne TimerObservable
  }

  /**
   * osveži podatke
   * @param message
   */
  processMessage(message) {
    // console.log('processMessage', message);
    if (message === 'refreshAccount') {
      this.getMoneyAccountData();
      this.getCryptoAccountData();
    }
  }

  /**
   * gre po exchange rates podatke
   */
  getExchangeRates() {
    this.subExchRates = this.bankingService.getExchangeRates()
      .subscribe(response => {
        this.cryptoCurrencies = this.bankingService.randomizeRates(response);
        // console.log('getExchangeRates', JSON.stringify(this.cryptoCurrencies));
        this.getCryptoAccountData();
        this.getMoneyAccountData();
      });
  }

  /**
   * gre po crypto podatke
   */
  getCryptoAccountData() {
    this.subCryptoTrans = this.bankingService.getCryptoTransactions()
      .subscribe(response => {
        // console.log('getCryptoAccountData', response.length);
        this.cryptoAccount = {
          timestamp: Date.now(),
          amounts: this.calculateAmounts(response)
        };
      });
  }

  /**
   * gre po crypto podatke
   */
  getMoneyAccountData() {
    this.subMoneyTrans = this.bankingService.getMoneyTransactions()
      .subscribe(response => {
        // console.log('getMoneyAccountData', response.length);
        this.moneyAccount = {
          timestamp: Date.now(),
          amounts: this.calculateAmounts(response)
        };
      });
  }

  /**
   * sešteje amounte po valutah pri vseh transakcijah
   * @param data
   * @return {any}
   */
  calculateAmounts(data): any {
    const results = {};
    this.cryptoCurrencies.forEach(o => results[o.from] = 0);
    data.forEach(function (o) {
      results[o.currency] = (results[o.currency] || 0) + parseFloat(o.amount || 0);
    });
    // console.log('calculateAmounts', results);
    return results;
  }

  // TODO: za računanje TOTAL
  // getExchangeRate(curr): number {
  //   return this.cryptoCurrencies.filter(o => o.from === curr)[0].rate;
  // }
  //
  // sumAmounts(data): number {
  //   return Object.values(data)
  //     .map((o, i) => o * this.getExchangeRate(Object.keys(data)[i]))
  //     .reduce((a, b) => a + b, 0);
  // }

}
