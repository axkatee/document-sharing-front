import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from "@services/dashboard-service/dashboard.service";
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';
import { IFolder } from '@interfaces/folder-interface';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.less']
})
export class FoldersComponent implements OnInit {
  public folders$ = new BehaviorSubject<IFolder[]>([]);
  public title$ = new BehaviorSubject<string>('Dashboard');

  constructor(
    public readonly dashboardService: DashboardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly notification: MatSnackBar,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.setFolders();
  }

  public openFolder(id: string): void {
    this.router.navigate([`dashboard/${id}`]).then();
  }

  public openCreateFolderModal(): void {
    const dialogRef = this.dialog.open(CreateFolderModalComponent);
    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        this.dashboardService.createFolder(folderName).subscribe((newFolder: IFolder) => {
          this.folders$.next(this.folders$.getValue().concat(newFolder));
        });
      }
    });
  }

  public openEditFileNameModal(folder): void {
    const folderId = folder.id;
    const dialogRef = this.dialog.open(EditFileNameModalComponent, { data: folder });
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
    const folderId = folder.id;
    const dialogRef = this.dialog.open(DeleteFileModalComponent, { data: folder });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.dashboardService.deleteFolder(id).subscribe(() => {
          this.folders$.next(this.folders$.value.filter(folder => folder.id !== folderId));
        });
      }
    });
  }

  private setFolders(): void {
    const folderId = this.activatedRoute.snapshot.paramMap.get('id') || '0';
    this.dashboardService.getFolderInfo(folderId).subscribe((folders: IFolder[]) => {
      this.folders$.next(folders);
    });
    if (folderId !== '0') {
      this.title$.next('121212');
    }
    this.folders$.next([{name:'sedfas', id: 'dsdff'}]);
  }
}

