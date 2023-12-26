import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserListService implements OnDestroy {
  user = new User();
  allUsers = [];
  unsubList: any;
  unsubSingleUser: any;
  loading: boolean = false;
  userId: string;
  birthDate: Date = new Date();
  minDate: Date;
  maxDate: Date;

  firestore: Firestore = inject(Firestore);
  userList$ = new ReplaySubject(1); // subscribable observable from type replaysubject, 1 (buffer) saves the last value

  constructor(private router: Router) {
    this.userList();
  }

  // get data from firebase
  userList() {
    return this.unsubList = onSnapshot(this.getUserRef(), (list) => {
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

  // dialog add user
  async addUser() {
    try {
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      await addDoc(this.getUserRef(), this.user.toJSON());
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error adding user data:', error);
    } finally {
      this.loading = false;
    }
  }

  // dialog edit user
  async editUser() {
    try {
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      await updateDoc(this.getSingleUserRef(), this.user.toJSON());
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      this.loading = false;
    }
  }

  // delete user
  async deleteUser(userId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'users', userId));
      console.log('User data deleted successfully');
    } catch (error) {
      console.error('Error delete user data:', error);
    }
    finally {
      this.router.navigate(['user']);
    }
  }

  // user detail component
  getSingleUser(userId: string) {
    this.unsubSingleUser = onSnapshot(doc(this.firestore, 'users', userId), (userDoc) => {
      this.user = new User(userDoc.data());
    });
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleUserRef() {
    return doc(this.firestore, 'users', this.userId);
  }

  defaultSettingsDatePicker() { // allow only birthdate over 18
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, 0, 1);
    this.maxDate = eighteenYearsAgo;
    this.birthDate = eighteenYearsAgo;
  }

  ngOnDestroy() {
    if (this.unsubList) {
      this.unsubList();
    }
    if (this.unsubSingleUser) {
      this.unsubSingleUser();
    }
  }
}

