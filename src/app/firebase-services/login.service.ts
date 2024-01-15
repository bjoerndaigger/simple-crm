import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showMenu: boolean = false;
  showSignUpForm: boolean = false;
  showPasswordReset: boolean = false;
  activeUser: string | any;
  errorMessage: string = '';
  errorEmailInUse: string = '';
  registrationSuccessful$ = new Subject();
  resetMailSent$ = new Subject();

  firestore: Firestore = inject(Firestore); // Instance of Firestore service
  
  constructor(private router: Router) {}

  /**
   * Registers a new user with the provided email and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's chosen password.
   * @returns {Promise<void>} - Promise that resolves on successful registration.
   */
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

  /**
   * Logs in a user with the provided email and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<void>} - Promise that resolves on successful login.
   */
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

  /**
   * Initiates the process of resetting a user's password by sending a reset email.
   * @param {string} email - User's email address.
   * @returns {Promise<void>} - Promise that resolves on successfully sending the reset email.
   */
  resetPassword(email) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        this.resetMailSent$.next(true);
      })
      .catch((error) => {
        console.log(error.code);
      });
  }
  
  /**
   * Retrieves the currently active user and saves it in the activeUser variable.
   */
  showActiveUser() {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const userMail = user.email;
        this.activeUser = userMail;
      }
    });
  }

  /**
   * Signs out the currently authenticated user.
   * @returns A promise that resolves when the user is successfully signed out.
   */
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
