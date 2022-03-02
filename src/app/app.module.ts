import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormService } from './services/form-service/form.service';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { OpenFileModalComponent } from './components/modals/open-file-modal/open-file-modal.component';
import { ShareFileModalComponent } from './components/modals/share-file-modal/share-file-modal.component';
import { DeleteFileModalComponent } from './components/modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from './components/modals/edit-file-name-modal/edit-file-name-modal.component';
import { CreateFolderModalComponent } from './components/modals/create-folder-modal/create-folder-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ShareFileModalComponent,
    DeleteFileModalComponent,
    EditFileNameModalComponent,
    OpenFileModalComponent,
    SidenavMenuComponent,
    AccountComponent,
    CreateFolderModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        OverlayModule,
        HttpClientModule,
        MatDialogModule,
        MatTooltipModule
    ],
  providers: [FormService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
