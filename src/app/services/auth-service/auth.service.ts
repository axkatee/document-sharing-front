import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
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
    return localStorage.getItem('auth_data') || '';
  }

  public isLoggedIn(): Promise<boolean> {
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
    return this.apiService.get(environment.apiUrl + `auth/signin?email=${email}&password=${password}`);
  }

  public signUp(fullName: string, email: string, password: string, avatar?: string, displayName?: string): Observable<any> {
    return this.apiService.post(environment.apiUrl + 'auth/signup', { fullName, displayName: displayName || '', email, password, avatarImage: avatar || '' });
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.apiService.get(environment.apiUrl + ``).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.notification.open(ErrorCodes[error.error.code] || 'Session expired', 'ok', notificationConfig);
          this.router.navigate(['login']).then();
        }
        return throwError(error);
      }));
  }
}
