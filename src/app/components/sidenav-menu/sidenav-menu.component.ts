import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.less']
})
export class SidenavMenuComponent {

  constructor(
    private readonly router: Router
  ) { }

  public navigateTo(path: string, signOut: boolean): void {
    if (signOut) {
      localStorage.removeItem('auth_data');
    }
    this.router.navigate([path]).then();
  }
}
