import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  firestore: Firestore = inject(Firestore);

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.{8,}$/)
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^.{8,}$/),
    this.passwordsMatchValidator.bind(this)  
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
      const auth = getAuth();

      console.log('E-Mail:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registrierung erfolgreich
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Fehlerbehandlung
        });
    }
  }

  passwordsMatchValidator(control: FormControl) {
    const password = this.passwordFormControl.value;
    const confirmPassword = control.value;
  
    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }
  
    return null;
  }

  closeSignUpForm() {
    location.reload();
  }
}
