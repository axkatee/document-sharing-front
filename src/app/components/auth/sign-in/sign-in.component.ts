import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormService } from "../../../services/form-service/form.service";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth-service/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formService: FormService,
    private authService: AuthService
  ) {
    this.loginForm = this.formService.loginForm();
  }

  navigateToSignUp(): void {
    this.router.navigate(['signup']).then();
  }

  signIn(): void {
    const email = this.loginForm.controls['email'].value.toString();
    const password = this.loginForm.controls['password'].value.toString();

    this.authService.signIn(email, password).subscribe(res => {
      localStorage.setItem('auth_data', res);
    });
  }
}
