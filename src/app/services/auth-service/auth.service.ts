import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { notificationConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private notification: MatSnackBar
  ) { }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('auth_data') || '';
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.get(environment.apiUrl + `auth/signin?email=${email}&password=${password}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message || 'Error with sign in', 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  signUp(fullName: string, email: string, password: string, avatar?: string, displayName?: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', { fullName, displayName: displayName || '', email, password }).pipe(
      catchError(error => {
        this.notification.open(error.error.message || 'Error with sign up', 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
