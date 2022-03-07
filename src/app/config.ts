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
    redirectTo: 'dashboard'
  },
];
