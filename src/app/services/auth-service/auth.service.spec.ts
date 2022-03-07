import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { AuthService } from '@services/auth-service/auth.service';
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "@config";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have been called sign in', () => {
    const spy = spyOn(service, 'signIn').and.returnValue(EMPTY);
    service.signIn('', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should have been called sign up', () => {
    const spy = spyOn(service, 'signUp').and.returnValue(EMPTY);
    service.signUp('', '', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should be created', () => {
    const token = service.getTokenFromLocalStorage();
    expect(token).not.toBeNull();
  });
});
