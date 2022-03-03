import { TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { FormService } from '@services/form-service/form.service';

describe('FormService', () => {
  let service: FormService;
  let loginForm: FormGroup;
  let editNameForm: FormGroup;
  let registrationForm: FormGroup;

  let nameControl: AbstractControl;

  let logEmailControl: AbstractControl;
  let logPasswordControl: AbstractControl;

  let regEmailControl: AbstractControl;
  let regFullNameControl: AbstractControl;
  let regPasswordControl: AbstractControl;
  let regDisplayNameControl: AbstractControl;
  let regRepeatPasswordControl: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ]
    });
    service = TestBed.inject(FormService);

    loginForm = service.loginForm();
    editNameForm = service.editNameForm();
    registrationForm = service.registrationForm();

    nameControl = editNameForm.get('name');

    logEmailControl = loginForm.get('email');
    logPasswordControl = loginForm.get('password');

    regEmailControl = registrationForm.get('email');
    regPasswordControl = registrationForm.get('password');
    regFullNameControl = registrationForm.get('fullName');
    regDisplayNameControl = registrationForm.get('displayName');
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
    expect(registrationForm.contains('email')).toBeTruthy();
    expect(registrationForm.contains('fullName')).toBeTruthy();
    expect(registrationForm.contains('password')).toBeTruthy();
    expect(registrationForm.contains('displayName')).toBeTruthy();
    expect(registrationForm.contains('repeatPassword')).toBeTruthy();
  });

  it('should mark loginForm as valid', () => {
    logEmailControl.setValue('1@1.com');
    logPasswordControl.setValue('valid');
    expect(loginForm.valid).toBeTruthy();
  });

  it('should mark loginForm as invalid', () => {
    logEmailControl.setValue('invalid');
    logPasswordControl.setValue('');
    expect(loginForm.valid).toBeFalsy();
  });

  it('should mark registrationForm as valid', () => {
    regFullNameControl.setValue('valid');
    regEmailControl.setValue('1@1.com');
    regPasswordControl.setValue('valid');
    regRepeatPasswordControl.setValue('valid');
    expect(registrationForm.valid).toBeTruthy();
  });

  it('should mark registrationForm as invalid because password fields are not same', () => {
    regEmailControl.setValue('valid');
    regFullNameControl.setValue('valid');
    regPasswordControl.setValue('valid');
    regDisplayNameControl.setValue('valid');
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

  it('should mark name field in editNameForm as invalid', () => {
    nameControl.setValue('sam');
    expect(nameControl.valid).toBeFalsy();
  });

  it('should mark name field in editNameForm as valid', () => {
    nameControl.setValue('valid');
    expect(nameControl.valid).toBeTruthy();
  });
});
