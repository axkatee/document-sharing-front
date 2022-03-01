import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormService } from './services/form-service/form.service';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OpenFileModalComponent } from './components/modals/open-file-modal/open-file-modal.component';
import { EditNameModalComponent } from './components/modals/edit-name-modal/edit-name-modal.component';
import { ShareFileModalComponent } from './components/modals/share-file-modal/share-file-modal.component';
import { DeleteFileModalComponent } from './components/modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from './components/modals/edit-file-name-modal/edit-file-name-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    EditNameModalComponent,
    ShareFileModalComponent,
    DeleteFileModalComponent,
    EditFileNameModalComponent,
    OpenFileModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    HttpClientModule
  ],
  providers: [FormService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
