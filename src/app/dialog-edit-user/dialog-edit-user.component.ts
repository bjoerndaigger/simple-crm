import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserListService } from '../firebase-services/user-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userListService: UserListService, private router: Router) {
    this.datePickerSettings();
  }

  saveUser() {
    this.userListService.editUser();
    this.dialogRef.close();
  }

  datePickerSettings() {
    this.userListService.defaultSettingsDatePicker();
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['user']);
    this.userListService.clearUserData();
  }
}
