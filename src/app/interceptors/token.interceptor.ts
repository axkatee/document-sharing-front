import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from '@services/auth-service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string;

  constructor(
    private readonly authService: AuthService
  ) { }


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.authService.getTokenFromLocalStorage();
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`)
    });


    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleTokenError(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handleTokenError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = localStorage.getItem('auth_data')
    const refreshToken = JSON.parse(authData).refreshToken;

    return this.authService.refreshToken(refreshToken).pipe(switchMap(res => {
      localStorage.setItem('auth_data', JSON.stringify(res.authData));
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${res.authData.accessToken}`)
      });
      return next.handle(newRequest);
    }));
  }
}
