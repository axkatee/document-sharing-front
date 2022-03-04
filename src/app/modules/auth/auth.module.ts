import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent
  ]
})
export class AuthModule { }
