import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
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
  public folders = new BehaviorSubject<IFolder[]>([{'id': '123456', 'name': 'qwerty'}, {'id': '111111', 'name': 'abcdef'}, {'id': '222222', 'name': 'photos'}]);

  constructor(
    private readonly router: Router,
    private readonly notification: MatSnackBar,
    private readonly dialog: MatDialog
  ) { }

  public openModal(modalName: string, folder?: IFolder): void {
    let folders = this.folders.getValue();
    switch (modalName) {
      case 'createFolder': {
        this.openCreateFolderModal(folders);
        break;
      }
      case 'share': {
        break;
      }
      case 'edit': {
        this.openEditFileNameModal(folder, folder.id, { data: folder }, folders);
        break;
      }
      case 'delete': {
        this.openDeleteFileModal(folder, folder.id, { data: folder }, folders);
        break;
      }
      default: {
        this.notification.open('This modal does not exist');
      }
    }
  }

  private openCreateFolderModal(folders: IFolder[]): void {
    const dialogRef = this.dialog.open(CreateFolderModalComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        folders.push({ id: '1111', name });
        this.folders.next(folders);
      }
    });
  }

  private openDeleteFileModal(folder: IFolder, folderId: string, data, folders: IFolder[]): void {
    const dialogRef = this.dialog.open(DeleteFileModalComponent, data);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        folders = folders.filter(folder => folder.id !== folderId);
        this.folders.next(folders);
      }
    });
  }

  private openEditFileNameModal(folder: IFolder, folderId: string, data, folders: IFolder[]): void {
    const dialogRef = this.dialog.open(EditFileNameModalComponent, data);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== folder.name) {
        folders.map(folder => {
          if (folder.id === folderId) {
            folder.name = name;
          }
        });
        this.folders.next(folders);
      }
    });
  }

  public openFolder(id: string): void {
    this.router.navigate([`dashboard/${id}`]).then();
  }
}
