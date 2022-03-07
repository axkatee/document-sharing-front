import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from '@environments/environment';
import { ErrorCodes, notificationConfig } from "@config";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string;
  private readonly defaultErrorMessage = 'Error, please reload page or try again later';

  constructor(
    private readonly http: HttpClient,
    private readonly notification: MatSnackBar
  ) {
    this.baseUrl = environment.apiUrl;
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || this.defaultErrorMessage, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  post(url: string, params = {}): Observable<any> {
    return this.http.post(this.baseUrl + url, params).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || this.defaultErrorMessage, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  patch(url: string, params = {}): Observable<any> {
    return this.http.patch(this.baseUrl + url, params).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || this.defaultErrorMessage, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || this.defaultErrorMessage, 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
