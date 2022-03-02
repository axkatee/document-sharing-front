import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public loginForm(): FormGroup {
    return new FormBuilder().group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(32)
      ])
    });
  }

  public registrationForm(): FormGroup {
    return new FormBuilder().group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      displayName: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(32)
      ]),
      repeatPassword: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(32),

      ]),
    }, {
        validators: this.validatePasswords()
      })
  }

  validatePasswords(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password').value;
      const repeatPassword = control.get('repeatPassword').value;
      return password === repeatPassword ? null : { notSame: true };
    };
  }

  public editNameForm(): FormGroup {
    return new FormBuilder().group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])
    });
  }
}
