import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {BankingService} from '../banking.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // @Input() newAmount = new EventEmitter<string>();

  account = {};

  constructor(private bankingService: BankingService) { }

  ngOnInit() {
    // gre po podatke o stanju na računu
    this.bankingService.getTransactions()
      .subscribe(response => this.processAccount(response));
  }

  /**
   * iz vseh transakcij izračuna stanje
   * @param data
   */
  processAccount(data): void {
    this.account = {
      timestamp: Date.now(),
      amount: data.map(e => parseFloat(e.amount || 0)).reduce((a, b) => a + b, 0)    // sešteje vse transakcije
    };
  }

}
