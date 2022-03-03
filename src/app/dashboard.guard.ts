import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardGuard implements CanActivate {
  private readonly token: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if (this.token) {
      this.router.navigate(['/dashboard']).then();
      return false;
    }
    return true;
  }
}
