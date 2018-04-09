import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BankingService} from '../../banking.service';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

    @Input() type: string;

    // @Output() newAmount = new EventEmitter<string>();

    amount: number;
    currency: string;
    currencies: any;

    constructor(private bankingService: BankingService) {

    }

    ngOnInit() {
        this.currencies = this.bankingService.currencies;

    }

    deposit(): void {
        // api klic za deposit
        if (this.amount > 0) {
            this.bankingService.depositAmount({
                timestamp: Date.now(),
                amount: this.amount,
                currency: this.currency,
                type: this.type     // buy or sell
            }).subscribe(this.afterDeposit());
        }
    }

    afterDeposit(): any {
        this.amount = null;
        // TODO: osvežitev podatkov na parentu / emit
        console.log('afterDeposit refreshAccount');
        this.bankingService.sendMessage('refreshAccount');
    }
}
