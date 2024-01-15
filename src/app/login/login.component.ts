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
    constructor(public loginService: LoginService, private router: Router) { }

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    submit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;
            this.loginService.loginUser(email, password);
        }
    }

    openSignUpForm() {
        this.loginService.showSignUpForm = true;
    }

    openPasswordReset() {
        this.loginService.showPasswordReset = true;
    }

    guestLogin() {
        this.router.navigate(['/dashboard']);
        this.loginService.showMenu = true;
    }
}

