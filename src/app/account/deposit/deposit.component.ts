import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BankingService} from '../../banking.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  @Input() type: string;
  @Output() newAmount = new EventEmitter<string>();

  amount: number;

  constructor(private bankingService: BankingService) {
  }

  ngOnInit() {
  }

  deposit(): void {
    // api klic za deposit
    this.bankingService.depositAmount({
      timestamp: Date.now(),
      amount: this.type === 'deposit' ? this.amount : -this.amount      // deposit ali withdraw
    }).subscribe(this.afterDeposit());
  }

  afterDeposit(): any {
    this.amount = null;
    // TODO: osvežitev podatkov na parentu / emit
    this.newAmount.emit('changed');

  }
}
