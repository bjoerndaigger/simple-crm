import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc } from '@angular/fire/firestore';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserListService implements OnDestroy {
  user = new User();
  allUsers = [];
  unsubList;
  birthDate: Date = new Date();
  loading: boolean = false;

  firestore: Firestore = inject(Firestore);
  userList$ = new ReplaySubject(1); // subscribable observable from type replaysubject, 1 (buffer) saves the last value

  constructor() {
    this.unsubList = this.userList();
  }

  // get data from firebase
  userList() {
    return onSnapshot(this.getUserRef(), (list) => {
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

  sortUsersByLastName() {
    this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  ngOnDestroy() {
    if (this.unsubList) {
      this.unsubList.unsubscribe();
    }
  }

  // dialog add user
  async addUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is ', this.user);
    this.loading = true;
    await addDoc(this.getUserRef(), this.user.toJSON()).then(
      (result: any) => {
        this.loading = false;
        console.log('Adding user finished ', result);
      }
    );
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}

