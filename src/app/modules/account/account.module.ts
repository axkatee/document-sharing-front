import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "@token-interceptor";
import { SharedModule } from "@modules/shared/shared.module";
import { AuthRoutingModule } from "@modules/auth/auth-routing.module";
import { AccountComponent } from '@components/account/account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
