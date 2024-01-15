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

  ngOnInit() {
    this.loginService.registrationSuccessful$.subscribe(status => {
      if (status === true) {
        this.registrationSuccesful = true;
        this.signUpForm.reset();
      }
    })
  }

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { validators: this.passwordsMatchValidator });

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
  
    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }
  
    return null;
  }
  
  register() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.loginService.registerUser(email, password);
  }

  closeSignUpForm() {
    this.loginService.showSignUpForm = false;
  }
}
