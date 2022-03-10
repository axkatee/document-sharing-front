import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from "@angular/material/dialog";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


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
    providers: [MatSnackBar],
    exports: [ ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
