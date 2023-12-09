import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
  user: User;
  loading: boolean = false;
  birthDate: Date;
  userId: string;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }

  async saveUser() {
    try {
      this.loading = true;
      const userDoc = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDoc, this.user.toJSON());
      console.log('User data updated successfully');
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      this.loading = false;
    }
  }
}
