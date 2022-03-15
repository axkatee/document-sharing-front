import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { routes } from '@config';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store = {};

  beforeEach(async () => {
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule ],
      providers: [ { provide: MatDialog, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('auth_data', JSON.stringify({ accessToken: '12345', refreshToken: '54321' }));
  });

  it('should create with token', () => {
    expect(component).toBeTruthy();
    const token = localStorage.getItem('auth_data');
    const { accessToken } = token;
    expect(accessToken).toBe('12345');
  });
});
