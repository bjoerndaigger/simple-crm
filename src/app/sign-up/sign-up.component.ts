import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registrationSuccesful = false;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.registrationSuccessful$.subscribe(status => {
      if (status === true) {
        this.registrationSuccesful = true;
        this.profileForm.reset();
      }
    })
  }

  profileForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/), Validators.minLength(8)]),
    confirmPasswordFormControl: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/), Validators.minLength(8)])
  }, { validators: this.passwordsMatchValidator });

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('passwordFormControl').value;
    const confirmPassword = form.get('confirmPasswordFormControl').value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsNotMatch: true };
    }
  }

  register() {
    if (this.profileForm.hasError('passwordsNotMatch')) {
      this.profileForm.get('confirmPasswordFormControl').setErrors({ passwordsNotMatch: true });
    }
    if (!this.profileForm.hasError('passwordsNotMatch') && this.profileForm.valid) {
      const email = this.profileForm.get('emailFormControl').value;
      const password = this.profileForm.get('passwordFormControl').value;
      this.loginService.registerUser(email, password);
    }
  }

  areAllInputFieldsFilled() {
    if (this.profileForm.get('emailFormControl').value &&
      this.profileForm.get('passwordFormControl').value &&
      this.profileForm.get('confirmPasswordFormControl').value
    ) {
      return true;
    } else {
      return false;
    }
  }

  closeSignUpForm() {
    this.loginService.showSignUpForm = false;
  }
}
