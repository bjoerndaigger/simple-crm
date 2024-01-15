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

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.resetMailSent$.subscribe(status => {
      if (status === true) {
        this.resetMailSent = true;
        this.email.reset();
      }
    })
  }

  email = new FormControl('',
    [Validators.required,
    Validators.email,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]);

  sendMail() {
    const email = this.email.value;
    this.loginService.resetPassword(email);
  }

  openSignUpForm() {
    this.loginService.showSignUpForm = true;
    this.loginService.showPasswordReset = false;
  }

  closePasswordResetForm() {
    this.loginService.showPasswordReset = false;
  }
}
