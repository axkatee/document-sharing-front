import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { notificationConfig } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken: string = '';

  constructor(
    private http: HttpClient,
    private notification: MatSnackBar
  ) { }

  getTokenFromLocalStorage(): void {
    this.authToken = localStorage.getItem('auth_data') || '';
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.get(environment.apiUrl + `auth/login?email=${email}&password=${password}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  signUp(fullName: string, email: string, password: string, avatar?: string, displayName?: string): Observable<any> {
    return this.http.post(environment.apiUrl + '', { fullName, email, password, avatar: avatar || '', displayName: displayName || '' }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
