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

  /**
   * Creates an instance of SignUpComponent.
   * @param loginService - The service handling login data.
   */
  constructor(public loginService: LoginService) { }

  /**
   * Lifecycle hook called after component initialization.
   * Subscribes to the registrationSuccessful$ observable to trigger html if registration was succesful.
   */
  ngOnInit() {
    this.loginService.registrationSuccessful$.subscribe(status => {
      if (status === true) {
        this.registrationSuccesful = true;
        this.signUpForm.reset();
      }
    })
  }
  /** 
   * Form group for the login form with email and password match.
   * @type {FormGroup}
   */
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { validators: this.passwordsMatchValidator });

  /**
   * Custom validator to check if passwords match.
   * @param {FormGroup} form - The form containing password and confirmPassword fields.
   * @returns {object | null} - Validation result. Returns an object with 'passwordsNotMatch' property if passwords do not match, otherwise returns null.
   */
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }

    return null;
  }

  /**
   * Registers the user using the provided email and password.
   */
  register() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.loginService.registerUser(email, password);
  }

  /**
   * Closes the sign-up form.
   */
  closeSignUpForm() {
    this.loginService.showSignUpForm = false;
  }
}
