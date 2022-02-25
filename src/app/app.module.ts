import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormService } from "./services/form-service/form.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {OverlayModule} from "@angular/cdk/overlay";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    HttpClientModule
  ],
  providers: [FormService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
