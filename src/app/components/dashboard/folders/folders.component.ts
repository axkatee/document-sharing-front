import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '@services/dashboard-service/dashboard.service';
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { IFolder } from '@interfaces/folder-interface';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.less']
})
export class FoldersComponent {
  @Input() folders$ = new BehaviorSubject<IFolder[]>([]);

  constructor(
    public readonly dashboardService: DashboardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  public openFolder(folderId: number): void {
    this.router.navigate([`dashboard/${folderId}`]).then();
  }

  public openEditFileNameModal(folder): void {
    const folderId = folder.id;
    const dialogRef = this.dialog.open(EditFileNameModalComponent, { data: folder.name });
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== folder.name) {
        this.dashboardService.editFolderName(name, folder.id).subscribe(() => {
          let folders = this.folders$.getValue();
          folders.map(folder => {
            if (folder.id === folderId) {
              folder.name = name;
            }
          });
          this.folders$.next(folders);
        });
      }
    });
  }

  public openDeleteFileModal(folder): void {
    const dialogRef = this.dialog.open(DeleteFileModalComponent, { data: folder });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.dashboardService.deleteFolder(id).subscribe(() => {
          const newFolders = this.folders$.value.filter(folder => folder.id !== id)
          this.folders$.next(newFolders);
        });
      }
    });
  }
}

