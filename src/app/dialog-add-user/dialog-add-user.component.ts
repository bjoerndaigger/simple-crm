import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})

export class DialogAddUserComponent {
  /**
   * Creates an instance of DialogAddUserComponent.
   * @param dialogRef - Reference to the MatDialogRef object.
   * @param userListService - The service handling user list data.
   */
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userListService: UserListService) {
    this.datePickerSettings();
  }

  /**
   * Checks if all input fields are filled.
   * @returns {boolean} - Returns true if all input fields are filled, otherwise false.
   */
  areAllInputFieldsFilled() {
    if (
      this.userListService.user.firstName &&
      this.userListService.user.lastName &&
      this.userListService.user.email &&
      this.userListService.user.investment &&
      this.userListService.user.street &&
      this.userListService.user.city &&
      this.userListService.user.zipCode &&
      this.userListService.user.country
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Adds a user and then closes the dialog.
   */
  addUser() {
    this.userListService.addUser();
    this.dialogRef.close();
  }

  /**
   * Configures the settings for the datepicker in user list service.
   */
  datePickerSettings() {
    this.userListService.defaultSettingsDatePicker();
  }

  /**
   * Closes the dialog and clears the user data.
   */
  closeDialog() {
    this.dialogRef.close();
    this.userListService.clearUserData();
  }
}
