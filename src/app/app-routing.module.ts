import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions/transactions.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
