import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AccountComponent} from './account/account.component';
import {DepositComponent} from './account/deposit/deposit.component';
import {TransactionsComponent} from './transacgroup/transactions/transactions.component';
import {AppRoutingModule} from './app-routing.module';

import {BankingService} from './banking.service';
import {TransacgroupComponent} from './transacgroup/transacgroup.component';
import {MessagingService} from "./messaging.service";

// import {MessagingService} from "./messaging.service";

@NgModule({
    declarations: [
        AppComponent,
        AccountComponent,
        DepositComponent,
      TransactionsComponent,
      TransacgroupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
  providers: [
    BankingService,
    MessagingService
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
