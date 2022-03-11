import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '@services/form-service/form.service';
import { IFolderModal } from '@interfaces/modal-interface';

@Component({
  selector: 'app-edit-file-name-modal',
  templateUrl: './edit-file-name-modal.component.html',
  styleUrls: ['./edit-file-name-modal.component.less']
})
export class EditFileNameModalComponent {
  public readonly editNameForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<IFolderModal>,
    private readonly formService: FormService,
    @Inject(MAT_DIALOG_DATA) public readonly data: string
  ) {
    this.editNameForm = this.formService.editNameForm();
    this.editNameForm.get('name').setValue(this.data);
  }

  public editFolderName(): void {
    this.closeDialog(this.editNameForm.get('name').value);
  }

  public closeDialog(name?: string): void {
    this.dialogRef.close(name);
  }
}
