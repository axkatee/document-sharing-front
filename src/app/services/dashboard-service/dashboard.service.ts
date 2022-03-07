import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '@services/auth-service/auth.service';
import { environment } from '@environments/environment';
import { ErrorCodes, notificationConfig } from '@config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly token: string;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly notification: MatSnackBar
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
  }

  public getFolders(): Observable<any> {
    return this.http.get(environment.apiUrl + ``).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error, please reload page', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public getFolderInfo(folderId: string): Observable<any> {
    return this.http.get(environment.apiUrl + ``).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error, please reload page', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public createFolder(name: string): Observable<any> {
    return this.http.post(environment.apiUrl + ``, {  }).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error, can\'t create folder', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public editFolderName(name: string, folderId: string): Observable<any> {
    return this.http.patch(environment.apiUrl + ``, {  }).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error, can\'t edit name', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public deleteFolder(folderId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + ``).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error, can\'t delete', 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
