import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavMenuComponent } from '@components/sidenav-menu/sidenav-menu.component';
import { routes } from '@config';

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;
  let token: string | null;
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
      declarations: [ SidenavMenuComponent ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.setItem('auth_data', JSON.stringify({ accessToken: '12345', refreshToken: '54321' }));
  });

  it('should remove token', () => {
    component.navigateTo('login', true);
    token = localStorage.getItem('auth_data');
    expect(JSON.parse(token)).toBeNull();
  });

  it('shouldn\'t remove token', () => {
    localStorage.setItem('auth_data', JSON.stringify({ accessToken: '12345', refreshToken: '54321' }));
    component.navigateTo('account', false);
    token = localStorage.getItem('auth_data');
    expect(JSON.parse(token)).not.toBeNull();
  });
});
