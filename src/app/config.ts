import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardGuard } from './dashboard.guard';

export const notificationConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'end',
  verticalPosition: 'top'
};

export enum ErrorCodes {
  INTERNAL_ERROR = 'Error. Please, reload page or try again later',
  USER_EXIST = 'User with this email already exist',
  VALIDATOR_ERROR = 'Incorrect input values',
  INVALID_USER = 'Invalid email or password',
  INVALID_TOKEN = 'Session expired'
}

export const acceptedVideoExtensions = [
  '.wpd', '.3g2', '.3gp', '.avi', '.flv',
  '.h264', '.m4v', '.mkv', '.mov', '.mp4',
  '.mpg', '.mpeg', '.rm', '.swf', '.vob',
  '.wmv', '.quicktime'
];
export const acceptedTextExtensions = [
  '.msword', '.docx', '.odt', '.pdf', '.rtf',
  '.tex', '.txt', '.plain', '.doc', '.vnd',
  '.x-tex'
];
export const acceptedImageExtensions = [
  '.gif', '.jpg', '.jpeg', '.jfif', '.pjp',
  '.pjpeg', '.png', '.tif', '.webp', '.bmp',
  '.tiff'
];
export const acceptedOthersExtensions = [
  '.7z', '.arj', '.deb', '.pkg', '.rar',
  '.rpm', '.tar.gz', '.z', '.zip', '.bin',
  '.dmg', '.iso', '.tar.xz', '.x-compress',
  '.x-7z-compressed', '.x-arj', '.x-xar',
  '.x-rpm', '.gzip', '.x-xz', '.octet-stream',
  '.x-apple-diskimage', '.x-cd-image'
];

export const acceptedInputFileExtensions = [
  ...acceptedVideoExtensions,
  ...acceptedImageExtensions,
  ...acceptedTextExtensions,
  ...acceptedOthersExtensions];

export const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
