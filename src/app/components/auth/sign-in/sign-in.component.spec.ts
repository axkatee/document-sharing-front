import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from "../../../services/auth-service/auth.service";
import { SignInComponent } from './sign-in.component';
import { routes } from "../../../config";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
    authServiceMock = {
      signIn(): Observable<any> {
        return of(1);
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, FormsModule ],
      providers: [ { provide: AuthService, useValue: authServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set token in local storage', () => {
    component.signIn();
    const token = localStorage.getItem('auth_data');
    expect(token).not.toBeNull();
  });
});
