import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if (!this.authService.getTokenFromLocalStorage()) {
      this.router.navigate(['/login']).then();
      return false;
    }
    return true;
  }
}
