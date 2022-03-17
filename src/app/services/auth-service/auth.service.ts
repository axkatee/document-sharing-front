import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorCodes, notificationConfig } from '@config';
import { ApiService } from "@services/api-service/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly apiService: ApiService,
    private readonly notification: MatSnackBar,
    private readonly router: Router
  ) { }

  public getTokenFromLocalStorage(): string {
    const authData = localStorage.getItem('auth_data');
    return JSON.parse(authData)?.accessToken  || '';
  }

  public isLoggedIn(): Promise<boolean> {
    const token = this.getTokenFromLocalStorage();
    return new Promise(resolve => {
      return resolve(!!token);
    });
  }

  public signIn(email: string, password: string): Observable<any> {
    return this.apiService.get(`auth/signin?email=${email}&password=${password}`);
  }

  public signUp(fullName: string, email: string, password: string, avatar?: string, displayName?: string): Observable<any> {
    return this.apiService.post('auth/signup', { fullName, displayName: displayName || '', email, password, avatarImage: avatar || '' });
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.apiService.post(`auth/token`, { refreshToken }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.notification.open('Session expired', 'ok', notificationConfig);
          this.router.navigate(['login']).then();
          localStorage.removeItem('auth_data')
        }
        return throwError(error);
      }));
  }
}
