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
import { FormService } from '@services/form-service/form.service';
import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';
import { AccountComponent } from '@components/account/account.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { SidenavMenuComponent } from '@components/sidenav-menu/sidenav-menu.component';
import { FolderContentComponent } from '@components/folder-content/folder-content.component';
import { OpenFileModalComponent } from '@modals/open-file-modal/open-file-modal.component';
import { ShareFileModalComponent } from '@modals/share-file-modal/share-file-modal.component';
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    AccountComponent,
    DashboardComponent,
    SidenavMenuComponent,
    FolderContentComponent,
    OpenFileModalComponent,
    ShareFileModalComponent,
    DeleteFileModalComponent,
    EditFileNameModalComponent,
    CreateFolderModalComponent
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
  providers: [FormService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
