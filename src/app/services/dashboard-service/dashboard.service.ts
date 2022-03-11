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

  public getFolderInfo(folderId: number): Observable<any> {
    return this.apiService.get(`folders?folderId=${folderId}`);
  }

  public createFolder(folderName: string, originFolderId?: number): Observable<any> {
    return this.apiService.post(`folders`, { folderName, originFolderId: originFolderId || 0 });
  }

  public editFolderName(newName: string, folderId: number): Observable<any> {
    return this.apiService.patch(`folders`, { folderId, newName });
  }

  public deleteFolder(folderId: number): Observable<any> {
    return this.apiService.delete(`folders?folderId=${folderId}`);
  }

  public editFileName(newName: string, fileId: number): Observable<any> {
    return this.apiService.patch(`file`, { fileId, newName });
  }

  public deleteFile(fileId: number): Observable<any> {
    return this.apiService.delete(`file?fileId=${fileId}`);
  }
}
