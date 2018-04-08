import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = {
    id: 1,
    amount: 5000
  };

  constructor() { }

  ngOnInit() {
    // TODO: gre po podatke o stanju na računu / izračuna iz transakcij:
    // TODO: getInitialBalance(accId) + getTransactions(accId)
    // account.amount = 4500;
  }

}
