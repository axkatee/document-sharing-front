import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "@modules/shared/shared.module";
import { DashboardRoutingModule } from "@modules/dashboard/dashboard-routing.module";
import { TokenInterceptor } from "@token-interceptor";
import { FilesComponent } from '@components/dashboard/files/files.component';
import { FoldersComponent } from "@components/dashboard/folders/folders.component";
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { OpenFileModalComponent } from '@modals/open-file-modal/open-file-modal.component';
import { ShareFileModalComponent } from '@modals/share-file-modal/share-file-modal.component';
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';



@NgModule({
  declarations: [
    FilesComponent,
    FoldersComponent,
    DashboardComponent,
    OpenFileModalComponent,
    ShareFileModalComponent,
    DeleteFileModalComponent,
    EditFileNameModalComponent,
    CreateFolderModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        DashboardRoutingModule,
        MatTooltipModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [
    DashboardComponent,
    OpenFileModalComponent,
    ShareFileModalComponent,
    DeleteFileModalComponent,
    EditFileNameModalComponent,
    CreateFolderModalComponent
  ]
})
export class DashboardModule { }
