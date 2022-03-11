import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IFile } from "@interfaces/file-interface";

@Component({
  selector: 'app-open-file-modal',
  templateUrl: './open-file-modal.component.html',
  styleUrls: ['./open-file-modal.component.less']
})
export class OpenFileModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: IFile
  ) {
    console.log(this.data)
  }

}
