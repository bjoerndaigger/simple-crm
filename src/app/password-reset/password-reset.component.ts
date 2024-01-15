import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  resetMailSent = false;

  /**
   * Creates an instance of PasswortResetComponent.
   * @param loginService - The service handling login data.
   */
  constructor(public loginService: LoginService) {
  }

  /**
   * Lifecycle hook called after component initialization. 
   * Subscribes to the resetMailSent$ observable to update the component state.
   */
  ngOnInit(): void {
    this.loginService.resetMailSent$.subscribe(status => {
      if (status === true) {
        this.resetMailSent = true;
        this.email.reset();
      }
    })
  }

  /**
   * Form control for the email input, with validation for required, email format, and pattern.
   */
  email = new FormControl('',
    [Validators.required,
    Validators.email,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]);

  /**
   * Sends a password reset email from Firebase using the provided email address.
   */
  sendMail() {
    const email = this.email.value;
    this.loginService.resetPassword(email);
  }

  /**
   * Opens the sign-up form and hides the password reset form.
   */
  openSignUpForm() {
    this.loginService.showSignUpForm = true;
    this.loginService.showPasswordReset = false;
  }

  /**
   * Closes the password reset form.
   */
  closePasswordResetForm() {
    this.loginService.showPasswordReset = false;
  }
}
