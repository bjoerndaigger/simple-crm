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
  /**
   * Creates an instance of DialogEditUserComponent.
   * @param dialogRef - Reference to the MatDialogRef object.
   * @param userListService - The service handling user list data.
   * @param router - Angular router for navigation.
   */
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userListService: UserListService, private router: Router) {
    this.datePickerSettings();
  }

  /**
   * Saves the user's changes and closes the dialog.
   */
  saveUser() {
    this.userListService.editUser();
    this.dialogRef.close();
  }

  /**
   * Configures date picker settings in user list service.
   */
  datePickerSettings() {
    this.userListService.defaultSettingsDatePicker();
  }

  /**
   * Closes the dialog and navigates to the 'user' route while clearing user data.
   */
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['user']);
    this.userListService.clearUserData();
  }
}
