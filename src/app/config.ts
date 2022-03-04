import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardGuard } from './dashboard.guard';
import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';
import { AccountComponent } from '@components/account/account.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { FolderContentComponent } from '@components/folder-content/folder-content.component';

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
    path: 'login',
    component: SignInComponent,
    canActivate: [DashboardGuard],
    children: [{ path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [DashboardGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
  {
    path: 'dashboard/:id',
    component: FolderContentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];
