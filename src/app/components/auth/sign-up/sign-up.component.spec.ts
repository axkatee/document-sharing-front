import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth-service/auth.service';
import { SignUpComponent } from './sign-up.component';
import { IFile } from '../../../interfaces/file-interface';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let imagePath: BehaviorSubject<string | ArrayBuffer>;
  let isUserHasAvatar: BehaviorSubject<boolean | ArrayBuffer>;
  let authServiceMock: Partial<AuthService>;
  let file: IFile;
  let fileWithWrongExtension: IFile;
  let fileWithBigSize: IFile;

  beforeEach(async () => {
    authServiceMock = {
      signUp(): Observable<any> {
        return of(1);
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule ],
      providers: [ { provide: AuthService, useValue: authServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    imagePath = component.imagePath;
    isUserHasAvatar = component.isUserHasAvatar;

    imagePath.next('12345');
    isUserHasAvatar.next(true);

    file = {
      lastModified: 1645797937337,
      lastModifiedDate: '',
      name: '274px-Rotating_earth_(large).gif',
      size: 600000,
      type: 'image/gif',
      webkitRelativePath: ''
    };

    fileWithBigSize = JSON.parse(JSON.stringify(file));
    fileWithBigSize.size = 700001;

    fileWithWrongExtension = JSON.parse(JSON.stringify(file));
    fileWithWrongExtension.type = '.qqq';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service sign up function', () => {
    component.signUp();
    expect(authServiceMock.signUp).toBeDefined();
  });

  it('should return error because image is too big', () => {
    component.getImage(fileWithBigSize);
    expect(imagePath.getValue()).toBe('');
    expect(isUserHasAvatar.getValue()).toBeFalsy();
  });

  it('should return error because file extension is incorrect', () => {
    component.getImage(fileWithWrongExtension);
    expect(imagePath.getValue()).toBe('');
    expect(isUserHasAvatar.getValue()).toBeFalsy();
  });

  it('should clear image', () => {
    component.clearImage();
    expect(imagePath.getValue()).toBe('');
    expect(isUserHasAvatar.getValue()).toBeFalsy();
  });
});
