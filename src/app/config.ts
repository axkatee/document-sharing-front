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

export const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id',
    component: FolderContentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];
