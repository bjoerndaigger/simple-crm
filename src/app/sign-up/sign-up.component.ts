import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  register() {
    if (this.nameFormControl.valid && this.emailFormControl.valid && this.passwordFormControl.valid && this.confirmPasswordFormControl) {
      const name = this.nameFormControl.value;
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;
      const confirmPassword = this.confirmPasswordFormControl.value;

      console.log('Name:', name);
      console.log('E-Mail:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
    }
  }

  closeSignUpForm(): void {
    location.reload();
  }
}
