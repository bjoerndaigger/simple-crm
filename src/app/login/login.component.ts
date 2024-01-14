import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, public loginService: LoginService, private router: Router) {
        this.loginForm = this.fb.group({
            emailFormControl: ['', [Validators.required, Validators.email]],
            passwordFormControl: ['', [Validators.required]]
        });
    }

    submit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.value.emailFormControl;
            const password = this.loginForm.value.passwordFormControl;
            this.loginService.loginUser(email, password);
        }
    }

    openSignUpForm() {
        this.loginService.showSignUpForm = true;
    }

    guestLogin() {
        this.router.navigate(['/dashboard']);
        this.loginService.showMenu = true;
    }
}
