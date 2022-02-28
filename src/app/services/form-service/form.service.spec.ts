import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

describe('FormService', () => {
  let service: FormService;
  let loginForm: FormGroup;
  let registrationForm: FormGroup;

  let logEmailControl: AbstractControl;
  let logPasswordControl: AbstractControl;

  let regFullNameControl: AbstractControl;
  let regDisplayNameControl: AbstractControl;
  let regEmailControl: AbstractControl;
  let regPasswordControl: AbstractControl;
  let regRepeatPasswordControl: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ]
    });
    service = TestBed.inject(FormService);

    loginForm = service.loginForm();
    registrationForm = service.registrationForm();

    logEmailControl = loginForm.get('email');
    logPasswordControl = loginForm.get('password');

    regFullNameControl = registrationForm.get('fullName');
    regDisplayNameControl = registrationForm.get('displayName');
    regEmailControl = registrationForm.get('email');
    regPasswordControl = registrationForm.get('password');
    regRepeatPasswordControl = registrationForm.get('repeatPassword');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create login form', () => {
    expect(loginForm.contains('email')).toBeTruthy();
    expect(loginForm.contains('password')).toBeTruthy();
  });

  it('should create registration form', () => {
    expect(registrationForm.contains('fullName')).toBeTruthy();
    expect(registrationForm.contains('displayName')).toBeTruthy();
    expect(registrationForm.contains('email')).toBeTruthy();
    expect(registrationForm.contains('password')).toBeTruthy();
    expect(registrationForm.contains('repeatPassword')).toBeTruthy();
  });

  it('should mark loginForm as valid', () => {
    logEmailControl.setValue('valid');
    logPasswordControl.setValue('valid');
    expect(loginForm.valid).toBeTruthy();
  });

  it('should mark loginForm as invalid', () => {
    logEmailControl.setValue('');
    logPasswordControl.setValue('');
    expect(loginForm.valid).toBeFalsy();
  });

  it('should mark registrationForm as valid', () => {
    regFullNameControl.setValue('valid');
    regEmailControl.setValue('valid');
    regPasswordControl.setValue('valid');
    regRepeatPasswordControl.setValue('valid');
    expect(registrationForm.valid).toBeTruthy();
  });

  it('should mark registrationForm as invalid because password fields are not same', () => {
    regFullNameControl.setValue('valid');
    regDisplayNameControl.setValue('valid');
    regEmailControl.setValue('valid');
    regPasswordControl.setValue('valid');
    regRepeatPasswordControl.setValue('invalid');
    expect(registrationForm.valid).toBeFalsy();
  });

  it('should mark displayName field as invalid', () => {
    regDisplayNameControl.setValue('sam');
    expect(regDisplayNameControl.valid).toBeFalsy();
  });

  it('should mark empty displayName field as valid', () => {
    regDisplayNameControl.setValue('');
    expect(regDisplayNameControl.valid).toBeTruthy();
  });
});
