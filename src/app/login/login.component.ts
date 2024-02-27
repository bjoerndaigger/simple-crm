import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../firebase-services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    /**
     * Creates an instance of LoginComponent.
     * @param loginService - The service handling login data.
     * @param {Router} router - The Angular router for navigation.
     */
    constructor(public loginService: LoginService, private router: Router) { }

    /**
     * Form group for the login form with email and password fields.
     * @type {FormGroup}
     */
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    /**
     * Handles the form submission, logs in the user if the form is valid.
     */
    submit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;
            this.loginService.loginUser(email, password);
        }
    }

    submitGuest() {
        this.loginService.loginUser('guest@user.de', 'guestuser');
    }

    /**
     * Opens the sign-up form.
     */
    openSignUpForm() {
        this.loginService.showSignUpForm = true;
        this.loginService.errorMessage = '';
    }

    /**
     * Opens the password reset form.
     */
    openPasswordReset() {
        this.loginService.showPasswordReset = true;
        this.loginService.errorMessage = '';
    }
}

