import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFolderModal } from '@interfaces/modal-interface';
import { IFolder } from '@interfaces/folder-interface';
import { IFile } from "@interfaces/file-interface";

@Component({
  selector: 'app-delete-file-modal',
  templateUrl: './delete-file-modal.component.html',
  styleUrls: ['./delete-file-modal.component.less']
})
export class DeleteFileModalComponent {
  public name: string;

  constructor(
    private readonly dialogRef: MatDialogRef<IFolderModal>,
    @Inject(MAT_DIALOG_DATA) public readonly data: IFolder | IFile
  ) {
    this.name = 'displayName' in data ? data.displayName: data.name;
  }

  public closeDialog(id?: number) {
    this.dialogRef.close(id);
  }
}
