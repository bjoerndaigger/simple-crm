import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate: Date = new Date();
  loading: boolean = false;
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());    
  } 

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is ', this.user);
    this.loading = true;
    await addDoc(collection(this.firestore, 'users'), this.user.toJSON()).then(
      (result: any) => {
        this.loading = false;
        console.log('Adding user finished ', result);
        this.dialogRef.close();
      }
    );
  }
}
