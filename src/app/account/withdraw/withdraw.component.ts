import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  amount: number;

  constructor() { }

  ngOnInit() {
  }

  withdraw(): void {
    console.log('withdraw', this.amount);
    // TODO: api klic za withdraw
  }

}
