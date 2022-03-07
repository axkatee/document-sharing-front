import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private readonly token: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.token = this.authService.getTokenFromLocalStorage();
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    return this.authService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['login']).then();
        return false;
      }
    });
  }
}
