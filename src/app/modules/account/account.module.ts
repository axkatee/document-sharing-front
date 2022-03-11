import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared/shared.module';
import { AccountRoutingModule } from '@modules/account/account-routing.module';
import { AccountComponent } from '@components/account/account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
