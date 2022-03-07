import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DashboardService } from "@services/dashboard-service/dashboard.service";
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';
import { IFolder } from '@interfaces/folder-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  public folders$: Observable<IFolder[]>;

  constructor(
    public dashboardService: DashboardService,
    private readonly router: Router,
    private readonly notification: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    this.folders$ = this.dashboardService.folders$;
  }

  public openFolder(id: string): void {
    this.router.navigate([`dashboard/${id}`]).then();
  }

  public openCreateFolderModal(): void {
    const dialogRef = this.dialog.open(CreateFolderModalComponent);
    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        this.dashboardService.createFolder(folderName);
      }
    });
  }

  public openEditFileNameModal(folder): void {
    const dialogRef = this.dialog.open(EditFileNameModalComponent, { data: folder });
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== folder.name) {
        this.dashboardService.editFolderName(name, folder.id);
      }
    });
  }

  public openDeleteFileModal(folder): void {
    const dialogRef = this.dialog.open(DeleteFileModalComponent, { data: folder });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.dashboardService.deleteFolder(id)
      }
    });
  }
}
