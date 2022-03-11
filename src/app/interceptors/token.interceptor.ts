import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from '@services/auth-service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly token: string;

  constructor(
    private readonly authService: AuthService
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
  }


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

    this.authService.refreshToken(refreshToken).subscribe(res => {
      localStorage.removeItem('auth_data');
      localStorage.setItem('auth_data', JSON.stringify(res.authData));
    });
    return next.handle(req);
  }
}
