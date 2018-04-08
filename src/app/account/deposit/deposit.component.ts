import {Component, OnInit, Input} from '@angular/core';
import {BankingService} from '../../banking.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  @Input() type: string;
  amount: number;

  constructor(private bankingService: BankingService) {
  }

  ngOnInit() {
  }

  deposit(): void {
    console.log('deposit', this.amount);
    // api klic za deposit
    this.bankingService.depositAmount({
      timestamp: Date.now(),    // TODO: timestamp
      amount: this.type === 'deposit' ? this.amount : -this.amount      // deposit ali withdraw
    }).subscribe(this.afterDeposit());
  }

  afterDeposit(): any {
    this.amount = null;
    // TODO: osvežitev podatkov na parentu / emit
  }
}
