import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFolderModal } from '../../../interfaces/modal-interface';
import { IFolder } from '../../../interfaces/folder-interface';

@Component({
  selector: 'app-delete-file-modal',
  templateUrl: './delete-file-modal.component.html',
  styleUrls: ['./delete-file-modal.component.less']
})
export class DeleteFileModalComponent {
  public name: string;

  constructor(
    private dialogRef: MatDialogRef<IFolderModal>,
    @Inject(MAT_DIALOG_DATA) public data: IFolder
  ) {
    this.name = this.data.name.length > 10 ? `${this.data.name.substr(0, 10)}..` : this.data.name
  }

  closeDialog(id?: string) {
    this.dialogRef.close(id);
  }
}
