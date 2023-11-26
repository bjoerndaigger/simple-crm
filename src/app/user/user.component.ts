import { Component, inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot, Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  user = new User();
  allUsers = [];
  unsubChanges: Unsubscribe;

  constructor(public dialog: MatDialog) {
    this.unsubChanges = onSnapshot(collection(this.firestore, 'users'), (changes) => {
      console.log('Received changes from DB: ', changes);
      this.allUsers = changes.docs.map((doc) => doc.data());
      console.log('All Users: ', this.allUsers);
    });
  }

  ngOnDestroy() {
    if (this.unsubChanges) {
      this.unsubChanges();
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

