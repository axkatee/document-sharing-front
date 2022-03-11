import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from "@angular/material/dialog";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TokenInterceptor} from "@token-interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    OverlayModule,
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [MatSnackBar, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
