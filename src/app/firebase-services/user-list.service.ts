import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  user = new User();
  allUsers = [];
  unsubChanges;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.getUser();
    this.unsubChanges = this.getUser();
  }

  getUser() {
    this.unsubChanges = onSnapshot(this.userCollection(), (list) => {
      this.allUsers = []; // clears list before rendering again
      list.forEach((element) => {
        let userData = element.data();
        userData['id'] = element.id;
        this.allUsers.push(userData);
      });
      // this.sortUsersByLastName();
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
