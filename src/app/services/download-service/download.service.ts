import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, Observable, of } from 'rxjs';
import { notificationConfig } from '@config';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private readonly notification: MatSnackBar,
    private readonly http: HttpClient
  ) { }

  public download(href: string, blob: string): Observable<any> {
    return this.http.get(href, { responseType: 'blob' }).pipe(
      map(value => blob = URL.createObjectURL(value)),
      catchError(error => {
        this.notification.open('Can\'t download file or folder', 'ok', notificationConfig);
        return of(href);
      })
    );
  }
}
