import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent {
  userId = '';

  /**
   * Creates an instance of UserDetailComponent.
   * @param route - The activated route for retrieving route information.
   * @param dialog - The dialog service for displaying dialogs.
   * @param userListService - The service handling customer list data.
  */
  constructor(private route: ActivatedRoute, public dialog: MatDialog, public userListService: UserListService) { }

  /** 
   * Lifecycle hook that initializes the component.
   */
  ngOnInit(): void {
    this.getUserId();
  }

  /**
   * Extracts the customer ID from the current Route and fetches the corresponding user details.
   */
  getUserId() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userListService.getSingleUser(this.userId);
  }

  /** 
   * Opens a dialog to edit customer details 
   */
  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.userListService.user = new User(this.userListService.user.toJSON());
    dialog.componentInstance.userListService.userId = this.userId;
  }

  /** 
   * Deletes the customer
   */
  deleteUser() {
    this.userListService.deleteUser(this.userId);
  }
}









