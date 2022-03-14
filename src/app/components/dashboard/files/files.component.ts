import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '@services/dashboard-service/dashboard.service';
import { EditFileNameModalComponent } from '@modals/edit-file-name-modal/edit-file-name-modal.component';
import { DeleteFileModalComponent } from '@modals/delete-file-modal/delete-file-modal.component';
import { OpenFileModalComponent } from '@modals/open-file-modal/open-file-modal.component';
import { IFile } from '@interfaces/file-interface';
import {
  acceptedImageExtensions,
  acceptedInputFileExtensions,
  acceptedOthersExtensions,
  acceptedTextExtensions,
  acceptedVideoExtensions,
  notificationConfig
} from '@config';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  @Input() files$ = new BehaviorSubject<IFile[]>([]);
  @Input() isContentLoaded;
  public menuTopLeftPosition = { x: '0', y: '0' };
  public readonly acceptedExtensions = acceptedInputFileExtensions;
  public readonly acceptedTextExtensions = acceptedTextExtensions;
  public readonly acceptedVideoExtensions = acceptedVideoExtensions;
  public readonly acceptedImageExtensions = acceptedImageExtensions;
  public readonly acceptedOthersExtensions = acceptedOthersExtensions;

  private folderId: number;

  constructor(
    public readonly dashboardService: DashboardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notification: MatSnackBar,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.folderId = +this.activatedRoute.snapshot.paramMap.get('folderId') || 0;
  }

  public getFileFromUserPC(file = this.fileInput.nativeElement.files[0]): void {
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
    this.fileInput.nativeElement.value = null;
  }

  public onRightClick(event: MouseEvent, file: IFile): void {
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = { file };
    this.matMenuTrigger.openMenu();
  }

  public openFile(file: IFile): void {
    this.acceptedTextExtensions.includes(file.type)
    ? this.router.navigate([`dashboard/${this.folderId}/${file.id}`]).then()
    : this.dialog.open(OpenFileModalComponent, { data: file });
  }

  public openEditFileNameModal(file: IFile): void {
    const fileId = file.id;
    const fileType = `.${file.name.split('.').pop()}`;
    const fileName = file.name.split(fileType)[0]

    const dialogRef = this.dialog.open(EditFileNameModalComponent, { data: fileName });
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== file.name) {
        this.dashboardService.editFileName(name, file.id).subscribe(() => {

        });
        let files = this.files$.getValue();
        files.map(file => {
          if (file.id === fileId) {
            file.name = name + fileType;
          }
        });
        this.files$.next(files);
      }
    });
  }

  public openDeleteFileModal(file: IFile): void {
    const dialogRef = this.dialog.open(DeleteFileModalComponent, { data: file });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.dashboardService.deleteFile(id).subscribe(() => {

        });
        this.files$.next(this.files$.value.filter(folder => folder.id !== id));
      }
    });
  }

  private setTextFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsText(file);
    reader.onload = () => {
      this.files$.next([...this.files$.value, { id: 1, name: file.name, type: extension, content: reader.result }]);
    }
  }

  private setImageFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
      this.files$.next([...this.files$.value, { id: 2, name: file.name, type: extension, content: result }]);
    }
  }

  private setArrayFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.files$.next([...this.files$.value, { id: 3, name: file.name, type: extension, content: reader.result }]);
    }
  }
}
