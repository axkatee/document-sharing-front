import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth-service/auth.service';
import { ApiService } from '@services/api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly token: string;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
  }

  public getFolders(): Observable<any> {
    return this.apiService.get(`folders`);
  }

  public getFolderInfo(folderId: string): Observable<any> {
    return this.apiService.get(`folder?folderId=${folderId}`);
  }

  public createFolder(folderName: string, originFolderId?: string): Observable<any> {
    return this.apiService.post(`folder`, { folderName, originFolderId: originFolderId || '' });
  }

  public editFolderName(newName: string, folderId: string): Observable<any> {
    return this.apiService.patch(`folder/name`, { folderId, newName });
  }

  public deleteFolder(folderId: string): Observable<any> {
    return this.apiService.delete(`folder?folderId=${folderId}`);
  }
}
