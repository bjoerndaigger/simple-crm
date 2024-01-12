import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  firestore: Firestore = inject(Firestore);
  registrationSuccessful$ = new Subject();

  constructor(private router: Router) {

  }

  registerUser(email: string, password: string) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registration worked: ', user);
        this.registrationSuccessful$.next(true);
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          alert('The email address is already in use');
        }
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login worked: ', user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
          alert('Wrong email or password. Please try again.');
      });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Successfully logged out');
    }).catch((error) => {
      console.log('Log out error');
    });
  }
}
