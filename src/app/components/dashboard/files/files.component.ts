import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
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
export class FilesComponent implements AfterViewInit {
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
  private fileElements = [];
  private startIndex: number;
  private endIndex: number;
  private startElement: IFile;

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

  ngAfterViewInit() {
    this.files$.subscribe(files => {
      this.fileElements = [];
      if (files?.length) {
        files.forEach((file, index) => {
          const element = document.getElementsByClassName(`item-${index}`)[0];
          this.fileElements.push(
            element
          );
        })
        this.fileElements = this.fileElements.map((el: HTMLElement, index) => {
          try {
            const data = el.getClientRects();
            return {
              centerX: data.item(0).left + 100,
              centerY: data.item(0).top + 100,
              index
            }
          } catch (e) {
            return el;
          }
        });
      }
    });
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
    const fileType = `.${file.displayName.split('.').pop()}`;
    const fileName = file.displayName.split(fileType)[0]

    const dialogRef = this.dialog.open(EditFileNameModalComponent, { data: fileName });
    dialogRef.afterClosed().subscribe(name => {
      if (name && name !== file.displayName) {
        this.dashboardService.editFileName(name, file.id).subscribe(() => {

        });
        let files = this.files$.getValue();
        files.map(file => {
          if (file.id === fileId) {
            file.displayName = name + fileType;
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
        const newFiles = this.files$.getValue().filter(file => file.id !== id)
        this.files$.next(newFiles);
      }
    });
  }

  public onDragStart(event: DragEvent): void {
    const fileElement = this.getFileElement(event);
    if (!fileElement) return;
    this.startIndex = fileElement.index || 0;
    this.startElement = this.files$.getValue()[this.startIndex];
  }

  public onDragEnter(event: DragEvent): void {
    const fileElement = this.getFileElement(event);
    if (!fileElement) return;

    if (this.files$.getValue().find(el => el.id === 0)) {
      this.files$.next(this.files$.getValue().filter(el => el.id !== 0));
    }

    this.endIndex = fileElement.index || 0;


    const emptyBlock: IFile = { id: 0, displayName: '', type: 'placeholder' };
    let newFiles = this.files$.getValue();
    newFiles.splice(this.endIndex, 0, ...[emptyBlock]);
    this.files$.next(newFiles);
  }

  public onDrop(event: DragEvent): void {
    let newFiles = this.files$.getValue();
    const fileElement = this.getFileElement(event);
    if (!fileElement) {
      newFiles = newFiles.filter(file => file.type !== 'placeholder');
      this.files$.next(newFiles);
      return;
    }
    this.endIndex = fileElement.index || 0;
    newFiles = newFiles.map(el => {
      if (el.type === 'placeholder') {
        el = this.startElement;
        return el;
      }
      return el;
    });
    newFiles = newFiles.filter((file, index) =>
      JSON.stringify(file) !== JSON.stringify(this.startElement) || this.endIndex === index
    );
    this.files$.next(newFiles);
  }

  private setTextFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsText(file);
    reader.onload = () => {
      const newFile = { id: Date.now(), displayName: file.name, type: extension, content: reader.result }
      this.files$.next([...this.files$.getValue(), newFile]);
    }
  }

  private setImageFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
      const newFile = { id: Date.now(), displayName: file.name, type: extension, content: result }
      this.files$.next([...this.files$.getValue(), newFile]);
    }
  }

  private setArrayFile(reader: FileReader, file: File, extension: string): void {
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const newFile = { id: Date.now(), displayName: file.name, type: extension, content: reader.result }
      this.files$.next([...this.files$.getValue(), newFile]);
    }
  }

  private getFileElement(event: DragEvent): any {
    const fileElement = this.fileElements.find((el: any) => {
      const elementX = Math.abs(el?.centerX - event.clientX) <= 100 || false;
      const elementY = Math.abs(el?.centerY - event.clientY) <= 61 || false;
      if (elementX && elementY) {
        return el;
      }
    });
    this.files$.value
    return fileElement;
  }
}
