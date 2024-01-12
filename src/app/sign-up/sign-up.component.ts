import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(public loginService: LoginService) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.{8,}$/)
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.{8,}$/)
  ]);

  register() {
    if (
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid &&
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    ) {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;
      const confirmPassword = this.confirmPasswordFormControl.value;

      console.log('E-Mail:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);

      this.loginService.registerUser(email, password);
    }
  }

  closeSignUpForm() {
    location.reload();
  }
}
