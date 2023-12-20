import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserListService } from '../firebase-services/user-list.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog, public userListService: UserListService) {
  }

  ngOnInit(): void {
    this.userListService.userList();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

