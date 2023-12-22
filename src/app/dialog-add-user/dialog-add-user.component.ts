import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userListService: UserListService) {
    
    this.defaultSettingsDatePicker();
  } 

  addUser() {
    this.userListService.addUser();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  defaultSettingsDatePicker() { // allow only birthdate over 18
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());  
    this.userListService.birthDate = new Date(this.maxDate);  
  }
}
