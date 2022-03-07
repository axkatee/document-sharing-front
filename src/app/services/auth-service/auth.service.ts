import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { ErrorCodes, notificationConfig } from '@config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly notification: MatSnackBar,
    private readonly router: Router
  ) { }

  public getTokenFromLocalStorage(): string {
    return localStorage.getItem('auth_data') || '';
  }

  isLoggedIn(): Promise<boolean> {
    const token = this.getTokenFromLocalStorage();
    return new Promise(resolve => {
      if (!token) {
        return resolve(false);
      }
      try {
        const parsedToken = JSON.parse(token);
        const { accessToken } = parsedToken;

        if (!accessToken) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      } catch (e) {
        return resolve(false);
      }
    });
  }

  public signIn(email: string, password: string): Observable<any> {
    return this.http.get(environment.apiUrl + `auth/signin?email=${email}&password=${password}`).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error with sign in', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public signUp(fullName: string, email: string, password: string, avatar?: string, displayName?: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', { fullName, displayName: displayName || '', email, password, avatarImage: avatar || '' }).pipe(
      catchError(error => {
        this.notification.open(ErrorCodes[error.error.code] || 'Error with sign up', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.http.get(environment.apiUrl + ``).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.notification.open(ErrorCodes[error.error.code] || 'Session expired', 'ok', notificationConfig);
          this.router.navigate(['login']).then();
        }
        return throwError(error);
      }));
  }
}
