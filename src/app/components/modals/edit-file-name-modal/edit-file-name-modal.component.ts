import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../../services/form-service/form.service';
import { IFolderModal } from '../../../interfaces/modal-interface';
import { IFolder } from '../../../interfaces/folder-interface';

@Component({
  selector: 'app-edit-file-name-modal',
  templateUrl: './edit-file-name-modal.component.html',
  styleUrls: ['./edit-file-name-modal.component.less']
})
export class EditFileNameModalComponent {
  public editNameForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<IFolderModal>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: IFolder
  ) {
    this.editNameForm = this.formService.editNameForm();
    this.editNameForm.get('name').setValue(this.data.name);
  }

  editFolderName(): void {
    this.closeDialog(this.editNameForm.get('name').value);
  }

  closeDialog(name?: string): void {
    this.dialogRef.close(name);
  }
}
