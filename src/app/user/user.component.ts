import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserListService } from '../firebase-services/user-list.service';
import { LoginService } from '../firebase-services/login.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {
  mobile = false;  // Hides email adresses in Mobile version when value is true.

  /**
   * Creates an instance of UserComponent.
   * @param dialog - MatDialog for displaying dialogs.
   * @param userListService - The service handling user list data.
   */
  constructor(public dialog: MatDialog, public userListService: UserListService,  private loginService: LoginService) {
  }

  /**
   * Lifecycle hook invoked after component initialization.
   * Retrieves the user list.
   * Checks if the view is on a mobile device,
   * Sets up a listener for window resize events.
   */
  ngOnInit(): void {
    this.userListService.userList();
    this.loginService.showActiveUser();
    this.checkIfMobile();
    window.addEventListener('resize', () => {
      this.checkIfMobile(); 
    });
  }

  /**
   * Checks if the current viewport width indicates a mobile device and hides the email adresses in DOM.
   */
  checkIfMobile() {
    this.mobile = window.innerWidth <= 768; 
  }

  /**
   * Opens the dialog for adding a new user.
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

