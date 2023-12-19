import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  user = new User();
  allUsers = [];
  unsubChanges;

  firestore: Firestore = inject(Firestore);
  usersChange$ = new Subject(); // new observable

  constructor() {
    this.unsubChanges = this.getUserData();
  }

  getUserData() {
    this.unsubChanges = onSnapshot(this.userCollection(), (list) => {
      this.allUsers = []; // clears list before rendering again
      list.forEach((element) => {
        let userData = element.data();
        userData['id'] = element.id;
        this.allUsers.push(userData);
      });
      this.usersChange$.next(this.allUsers); // pass allUsers as an argument to my observable
      this.sortUsersByLastName();
    });
  }

  ngOnDestroy() {
    this.unsubChanges();
  }

  userCollection() {
    return collection(this.firestore, 'users');
  }

  sortUsersByLastName() {
    this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}

