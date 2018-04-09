import {Component, OnInit} from '@angular/core';
import {BankingService} from '../banking.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions = [];

  constructor(private bankingService: BankingService) {
  }

  ngOnInit() {
    // api klic za dobit vse transakcije
    this.bankingService.getTransactions()
      .subscribe(transactions => this.transactions = transactions
        .sort((a, b) => b.timestamp - a.timestamp)    // descending sortiranje

      );
  }

}
