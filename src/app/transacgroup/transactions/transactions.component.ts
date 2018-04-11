import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {BankingService} from '../../banking.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  @Input() type: string;

  transactions = [];
  //sub: Subscription;
  obsSubs: Subscription;

  constructor(private bankingService: BankingService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // subscription na route parameter
    // this.sub = this.route.params.subscribe(params => this.type = params['type']);
    if (this.type === 'money') {
      this.obsSubs = this.bankingService.getMoneyTransactions()
        .subscribe(transactions => this.transactions = transactions.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      this.obsSubs = this.bankingService.getCryptoTransactions()
        .subscribe(transactions => this.transactions = transactions.sort((a, b) => b.timestamp - a.timestamp));
    }

  }

  ngOnDestroy() {
    this.obsSubs.unsubscribe();
  }

}
