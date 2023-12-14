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
    this.unsubChanges = this.getUser();
   }

  getUser() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = []; // clears list before rendering again
      list.forEach((element) => {
        const userDataWithId = { // builds new object of both values
          id: element.id,
          ...element.data()
        };
        this.allUsers.push(userDataWithId);
      });
      this.sortUsersByLastName();
    });
  }

  ngOnDestroy() {
      this.unsubChanges();
  }

  sortUsersByLastName() {
    this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}
