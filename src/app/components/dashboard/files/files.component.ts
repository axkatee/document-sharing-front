import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from 'rxjs';
import {
  acceptedImageExtensions,
  acceptedInputFileExtensions,
  acceptedOthersExtensions,
  acceptedTextExtensions,
  acceptedVideoExtensions,
  notificationConfig
} from '@config';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  public files$ = new BehaviorSubject<any>([]);
  public readonly acceptedExtensions = acceptedInputFileExtensions;
  public readonly acceptedTextExtensions = acceptedTextExtensions;
  public readonly acceptedVideoExtensions = acceptedVideoExtensions;
  public readonly acceptedImageExtensions = acceptedImageExtensions;
  public readonly acceptedOthersExtensions = acceptedOthersExtensions;

  constructor(
    private readonly notification: MatSnackBar,
    private readonly sanitizer: DomSanitizer
  ) { }

  public getFile(file = this.fileInput.nativeElement.files[0]): void {
    if (!file) return;
    const extension = `.${file.type.split('/').pop().split('.')[0]}`;
    const reader = new FileReader();
    if (this.acceptedTextExtensions.includes(extension)) {
      this.setTextFile(reader, file, extension);
    } else if (this.acceptedImageExtensions.includes(extension)
      || this.acceptedVideoExtensions.includes(extension)) {
      this.setImageFile(reader, file, extension);
    } else if (this.acceptedOthersExtensions.includes(extension)) {
      this.setArrayFile(reader, file, extension);
    } else {
      this.notification.open('Can\'t load file with this extension', 'ok', notificationConfig);
    }
  }

  private setTextFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsText(file);
    reader.onload = () => {
      this.files$.next([...this.files$.value, { name: file.name, type: extension, content: reader.result }]);
    }
  }

  private setImageFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
      this.files$.next([...this.files$.value, { name: file.name, type: extension, content: result }]);
    }
  }

  private setArrayFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.files$.next([...this.files$.value, { name: file.name, type: extension, content: reader.result }]);
    }
  }
}
