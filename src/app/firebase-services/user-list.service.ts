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
  unsubList;

  firestore: Firestore = inject(Firestore);
  userList$ = new Subject<User[]>(); // subscribable observable from type subject with data from type user

  constructor() {
    this.unsubList = this.userList();
  }

  userList() {
    this.unsubList = onSnapshot(this.getUserRef(), (list) => {
      this.allUsers = []; // clears list before rendering again
      list.forEach((element) => {
        let userData = element.data();
        userData['id'] = element.id;
        this.allUsers.push(userData);
      });
      this.userList$.next(this.allUsers); // pass allUsers as an argument to my observers with the next method
      this.sortUsersByLastName();
    });
  }

  ngOnDestroy() {
    if (this.unsubList) {
      this.unsubList.unsubscribe();
    }
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  sortUsersByLastName() {
    this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}

