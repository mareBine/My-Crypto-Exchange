import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  amount: number;

  constructor() { }

  ngOnInit() {
  }

  deposit(): void {
    console.log('deposit', this.amount);
    // TODO: api klic za deposit
  }
}
