import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '@services/auth-service/auth.service';
import { ApiService } from "@services/api-service/api.service";
import { environment } from '@environments/environment';
import { IFolder } from "@interfaces/folder-interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public folders$ = new BehaviorSubject<IFolder[]>(undefined);
  private readonly token: string;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
    this.getFolders();
  }

  public getFolders(): void {
    this.apiService.get(environment.apiUrl + `folders`)
      .subscribe((folders: IFolder[]) => {
        this.folders$.next(folders);
      });
    this.folders$.next([{name:'1212', id: 'dsdff'}]);
  }

  public getFolderInfo(folderId: string): Observable<any> {
    return this.apiService.get(environment.apiUrl + `folder?folderId=${folderId}`);
  }

  public createFolder(folderName: string, originFolderId?: string): void {
    this.apiService.post(environment.apiUrl + `folder`, { folderName, originFolderId: originFolderId || '' })
      .subscribe((newFolder: IFolder) => {
        this.folders$.next(this.folders$.getValue().concat(newFolder));
      });
  }

  public editFolderName(newName: string, folderId: string): void {
    this.apiService.patch(environment.apiUrl + `folder/name`, { folderId, newName }).subscribe(() => {
        let folders = this.folders$.getValue();
        folders.map(folder => {
        if (folder.id === folderId) {
          folder.name = newName;
        }
      });
      this.folders$.next(folders);
    });
  }

  public deleteFolder(folderId: string): void {
    this.apiService.delete(environment.apiUrl + `folder?folderId=${folderId}`)
      .subscribe(() => {
        this.folders$.next(this.folders$.value.filter(folder => folder.id !== folderId));
      });
  }
}
