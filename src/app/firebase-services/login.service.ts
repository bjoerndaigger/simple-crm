import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showMenu: boolean = false;
  showSignUpForm: boolean = false;
  activeUser: string | any;
  errorMessage: string = '';
  errorEmailInUse: string = '';
  
  firestore: Firestore = inject(Firestore);
  registrationSuccessful$ = new Subject();

  constructor(private router: Router) {

  }

  registerUser(email: string, password: string) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.registrationSuccessful$.next(true);
        this.errorEmailInUse = '';
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          this.errorEmailInUse = 'The email address is already in use. Please select another one.';
        }
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.activeUser = user;
        this.router.navigate(['/dashboard']);
        this.showMenu = true;
      })
      .catch(() => {
        this.errorMessage = 'Wrong email or password. Please try again.';
      });
  }

  showActiveUser() {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const userMail = user.email;
        this.activeUser = userMail;
      }
    });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.activeUser = null;
      this.showMenu = false;
      this.errorMessage = '';
    }).catch((error) => {
      console.log(error.code);
    });
  }
}
