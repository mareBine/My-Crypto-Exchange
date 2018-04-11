import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {BankingService} from '../../banking.service';
import {Subscription} from 'rxjs/Subscription';
import {MessagingService} from '../../messaging.service';
import {Currency, ExchangeRate} from "../../custom-types";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnChanges, OnDestroy {

  @Input() type: string;
  @Input() moneyAmount: number;
  @Input() cryptoAmounts: any;
  @Input() exchangeRates: ExchangeRate[];

  // TODO: boljša rešitev kot @Input lahko z observables, da se naročiš na tistega iz account.component
  // subExchRates: Subscription;

  amount: number;
  cryptoCurrency: string;
  localCurrency: Currency[];
  subExchRates: Subscription;
  exchangeRatesCopy: ExchangeRate[];

  constructor(private bankingService: BankingService, private messagingService: MessagingService) {
  }

  ngOnInit() {
    this.localCurrency = this.bankingService.getLocalCurrency();

    // TODO: boljša rešitev lahko z observables, da se naročiš na tistega iz account.component
    this.subExchRates = this.bankingService.getExchangeRates()
      .subscribe(excrates => {
        this.exchangeRatesCopy = excrates;
        this.cryptoCurrency = this.exchangeRatesCopy[0].from;    // za select box selected option
      });
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.subExchRates.unsubscribe();
  }

  /**
   * 1. preveri če je možen nakup/prodaja
   * 2. bremeni/poveča kripto valuto
   * 3. poveča/bremeni money account
   */
  deposit() {
    if (this.checkAmount(this.type)) {
      this.bankingService.placeCryptoTrans({
        timestamp: Date.now(),
        amount: this.type === 'sell' ? -this.amount : this.amount,
        currency: this.cryptoCurrency,
        type: this.type     // buy or sell
      }).subscribe(() => {
        this.bankingService.placeMoneyTrans({
          timestamp: Date.now(),
          amount: this.calculateMoneyAmount(),
          currency: this.localCurrency[0].currency,   // izbrana lokalna valuta
          type: this.type === 'sell' ? 'buy' : 'sell'     // buy or sell
        }).subscribe(() => {
          this.amount = null;
          // osvežitev podatkov na parentu / messaging
          this.messagingService.sendMessage('refreshAccount');
        });
      });
    }
  }

  /**
   * preveri ali je dovolj denarja za nakup/prodajo
   * @param {string} operation
   * @return {boolean}
   */
  checkAmount(operation: string): boolean {
    console.log('checkAmount: exchRate', this.getExchangeRate(), 'moneyAmount', this.moneyAmount, 'crypto', this.cryptoCurrency);
    if (operation === 'buy') {
      return (this.amount > 0 && (this.moneyAmount >= (this.amount * this.getExchangeRate())));
    } else {
      return (this.amount > 0 && this.amount <= this.cryptoAmounts[this.cryptoCurrency]);
    }
  }

  /**
   * bremenitev money računa
   * @return {number}
   */
  calculateMoneyAmount(): number {
    const multiply = this.type === 'sell' ? 1 : -1;
    return multiply * (this.amount * this.getExchangeRate());
  }

  /**
   * dobi exchange rate za trenutno kriptovaluto
   * @return {number}
   */
  getExchangeRate(): number {
    const exchRateArr = this.exchangeRates.filter(o => o.from === this.cryptoCurrency);
    if (exchRateArr.length > 0 && exchRateArr[0].hasOwnProperty('rate')) {
      return exchRateArr[0].rate;
    }
  }


}
