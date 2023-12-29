import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userListService: UserListService) {
    this.datePickerSettings();
  } 

  addUser() {
    this.userListService.addUser();
    this.dialogRef.close();
  }

  datePickerSettings() {
    this.userListService.defaultSettingsDatePicker();
  }

  closeDialog() {
    this.dialogRef.close();
    this.userListService.clearUserData();
  }
}
