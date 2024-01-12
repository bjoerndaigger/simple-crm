import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  firestore: Firestore = inject(Firestore);

  registerUser(email: string, password: string) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registrierung erfolgreich
        const user = userCredential.user;
        // Weitere Aktionen nach erfolgreicher Registrierung
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Fehlerbehandlung
        console.error(`Fehler bei der Registrierung: ${errorCode} - ${errorMessage}`);
        throw error; // Weitergabe des Fehlers an den Aufrufer
      });
  }
}
