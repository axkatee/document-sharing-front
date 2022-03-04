import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from '@services/form-service/form.service';
import { IFolderModal } from '@interfaces/modal-interface';

@Component({
  selector: 'app-create-folder-modal',
  templateUrl: './create-folder-modal.component.html',
  styleUrls: ['./create-folder-modal.component.less']
})
export class CreateFolderModalComponent {
  public readonly editNameForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<IFolderModal>,
    private readonly formService: FormService
  ) {
    this.editNameForm = this.formService.editNameForm();
  }

  public createFolder(): void {
    this.closeDialog(this.editNameForm.get('name').value);
  }

  public closeDialog(name?: string): void {
    this.dialogRef.close(name);
  }
}
