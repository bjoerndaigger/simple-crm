import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
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

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('GOT ID', this.userId);
    this.getUser(this.userId);
  }

  async getUser(userId: string) {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      console.log('User data:', userDoc.data());
      this.user = new User(userDoc.data());
      console.log('User Object', this.user);
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent);
  }

  editAddress() {
    this.dialog.open(DialogEditAddressComponent);
  };
}








