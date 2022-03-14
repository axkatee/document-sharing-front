import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '@services/dashboard-service/dashboard.service';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';
import { IFolder } from '@interfaces/folder-interface';
import { IFile } from '@interfaces/file-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public folders$ = new BehaviorSubject<IFolder[]>([]);
  public files$ = new BehaviorSubject<IFile[]>([]);
  public title$ = new BehaviorSubject<string>('');
  public folderId: number;
  public originFolderId: number;
  public isContentLoaded = false;

  constructor(
    public readonly dashboardService: DashboardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router:  Router,
    private readonly notification: MatSnackBar,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(() => this.getCurrentFolderInfo());
  }

  public navigateToOriginFolder(): void {
    this.router.navigate([`dashboard/${this.originFolderId}`]).then();
  }

  public openCreateFolderModal(): void {
    const dialogRef = this.dialog.open(CreateFolderModalComponent);
    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        this.dashboardService.createFolder(folderName, this.folderId).subscribe((newFolder: IFolder) => {
          this.folders$.next(this.folders$.getValue().concat(newFolder));
        });
      }
    });
  }

  private getCurrentFolderInfo(): void {
    this.folderId = +this.activatedRoute.snapshot.paramMap.get('folderId') || 0;
    this.dashboardService.getFolderInfo(this.folderId).subscribe(res => {
      this.originFolderId = res.originFolderId;
      this.folders$.next(res.folders as IFolder[]);
      this.files$.next(res.files as IFile[]);
      if (this.folderId !== 0) {
        this.title$.next(res.name);
      } else {
        this.title$.next('Dashboard');
      }
      this.isContentLoaded = true;
    });
  }
}
