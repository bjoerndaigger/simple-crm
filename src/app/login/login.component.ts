import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    showSignUpForm: boolean = false;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            emailFormControl: ['', [Validators.required, Validators.email]],
            passwordFormControl: ['', [Validators.required]]
        });
    }

    submit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.value.emailFormControl;
            const password = this.loginForm.value.passwordFormControl;

            console.log('E-Mail:', email);
            console.log('Password:', password);

            this.loginService.loginUser(email, password);
        }
    }

    openSignUpForm() {
        this.showSignUpForm = true;
    }
}
