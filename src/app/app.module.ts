import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { DepositComponent } from './account/deposit/deposit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AppRoutingModule } from './app-routing.module';

import { BankingService } from './banking.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DepositComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BankingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
