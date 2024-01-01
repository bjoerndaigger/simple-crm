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

  firestore: Firestore = inject(Firestore); // Instance of Firestore service
  userList$ = new ReplaySubject(1); // // ReplaySubject observable for user list data (1 (buffer) saves the last value)

  constructor(private router: Router) {
    this.userList();
  }

  /**
   * Retrieves user data from Firebase Firestore.
   * @returns {Function} Unsubscribe function for the snapshot listener.
   * Update observers with the latest user list.
   * Calls a function to sort the users by last name.
   */
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

  /**
   * Sorts the users by their last names.
   */
  sortUsersByLastName() {
    this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  /**
   * Adds a new user to the Firestore database.
   */
  async addUser() {
    try {
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      await addDoc(this.getUserRef(), this.user.toJSON());
    } catch (error) {
      console.error('Error adding user data:', error);
    } finally {
      this.loading = false;
      this.clearUserData();
    }
  }

  /**
   * Updates an existing user's data in the Firestore database.
   */
  async editUser() {
    try {
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      await updateDoc(this.getSingleUserRef(), this.user.toJSON());
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      this.loading = false;
      this.router.navigate(['user']);
      this.clearUserData();
    }
  }

  /**
   * Deletes a user from the Firestore database.
   * @param {string} userId - ID of the user to delete
   */
  async deleteUser(userId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'users', userId));
    } catch (error) {
      console.error('Error delete user data:', error);
    }
    finally {
      this.router.navigate(['user']);
      this.clearUserData();
    }
  }

  /**
   * Clears the input fields for user data.
   */
  clearUserData() {
    this.user = new User();
    this.birthDate = new Date();
  }

  /**
   * Retrieves a single user's details from Firestore.
   * @param {string} userId - ID of the user
   */
  getSingleUser(userId: string) {
    this.unsubSingleUser = onSnapshot(doc(this.firestore, 'users', userId), (userDoc) => {
      this.user = new User(userDoc.data());
    });
  }

  /**
   * Retrieves a single user's details from Firestore.
   * @param {string} userId - ID of the user
   */
  getUserRef() {
    return collection(this.firestore, 'users');
  }

  /**
   * Returns a reference to a single user in Firestore.
   * @returns {DocumentReference} Reference to a single user
   */
  getSingleUserRef() {
    return doc(this.firestore, 'users', this.userId);
  }

  /**
   * Sets default settings for the date picker.
   * Allows only birthdates over 18 years ago.
   */
  defaultSettingsDatePicker() { // allow only birthdate over 18
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, 0, 1);
    this.maxDate = eighteenYearsAgo;
    this.birthDate = eighteenYearsAgo;
  }

  /**
   * Lifecycle hook - performs cleanup when the component is destroyed.
   * Unsubscribes from snapshot listeners.
   */
  ngOnDestroy() {
    if (this.unsubList) {
      this.unsubList();
    }
    if (this.unsubSingleUser) {
      this.unsubSingleUser();
    }
  }
}

