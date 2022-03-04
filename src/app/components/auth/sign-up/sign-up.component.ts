import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { FormService } from '@services/form-service/form.service';
import { AuthService } from '@services/auth-service/auth.service';
import { notificationConfig } from '@config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  public imagePath = new BehaviorSubject<string | ArrayBuffer>('');
  public isUserHasAvatar = new BehaviorSubject<boolean | ArrayBuffer>(false);
  public readonly registrationForm: FormGroup;
  public readonly acceptedExtensions = '.png, .jpg, .jpeg, .gif';

  constructor(
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly notification: MatSnackBar,
    private readonly authService: AuthService
  ) {
    this.registrationForm = this.formService.registrationForm();
  }

  public signUp(): void {
    const fullName = this.registrationForm.controls['fullName'].value.toString();
    const displayName = this.registrationForm.controls['displayName'].value.toString();
    const email = this.registrationForm.controls['email'].value.toString();
    const password = this.registrationForm.controls['password'].value.toString();

    this.authService.signUp(fullName, email, password, this.imagePath.value.toString(), displayName).subscribe(() => {
      this.navigateToSignIn();
    });
  }

  public navigateToSignIn(): void {
    this.router.navigate(['login']).then();
  }

  public getImage(file = this.fileInput.nativeElement.files[0]): void {
    const extension = `.${file?.type.split('/').pop()}`;
    let allowedExtensions = this.acceptedExtensions.split(', ');
    if (!allowedExtensions.includes(extension)) {
      this.notification.open('Wrong file extension!', 'ok', notificationConfig);
      this.imagePath.next('');
      this.isUserHasAvatar.next(false);
      return;
    }
    if (file?.size > 700000) {
      this.notification.open('Image size too large!', 'ok', notificationConfig);
      this.imagePath.next('');
      this.isUserHasAvatar.next(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath.next(reader.result);
      this.isUserHasAvatar.next(true);
    }
  }

  public clearImage(): void {
    this.imagePath.next('');
    this.isUserHasAvatar.next(false);
  }
}
