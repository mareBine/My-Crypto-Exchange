import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { WithdrawComponent } from './account/withdraw/withdraw.component';
import { DepositComponent } from './account/deposit/deposit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    WithdrawComponent,
    DepositComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
