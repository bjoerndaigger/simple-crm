import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, Unsubscribe, doc, onSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User();
  unsubChanges: Unsubscribe;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser(this.userId);
  }

  getUser(userId: string) {
    this.unsubChanges = onSnapshot(doc(this.firestore, 'users', userId), (userDoc) => {
      this.user = new User(userDoc.data());
    });
  }

  ngOnDestroy() {
    if (this.unsubChanges) {
      this.unsubChanges();
    }
  }

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  };
}









