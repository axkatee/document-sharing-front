import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormService } from '@services/form-service/form.service';
import { AuthService } from '@services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  public loginForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.formService.loginForm();
  }

  public navigateToSignUp(): void {
    this.router.navigate(['signup']).then();
  }

  public signIn(): void {
    const email = this.loginForm.controls['email'].value.toString();
    const password = this.loginForm.controls['password'].value.toString();

    this.authService.signIn(email, password).subscribe(res => {
      localStorage.setItem('auth_data', res.authData.accessToken);
     this.router.navigate(['dashboard']).then();
    });
  }
}
