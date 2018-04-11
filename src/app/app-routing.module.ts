import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {AccountComponent} from './account/account.component';
import {TransacgroupComponent} from './transacgroup/transacgroup.component';

const routes: Routes = [
  {path: '', redirectTo: '/account', pathMatch: 'full'},
  {path: 'transactions', component: TransacgroupComponent},
  // { path: 'transactions/:type', component: TransactionsComponent },
  {path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
