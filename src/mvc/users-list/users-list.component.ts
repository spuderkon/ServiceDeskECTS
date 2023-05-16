import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  user: User;
  qwe: string;
  panelOpenState: boolean;
  constructor(public dialog: MatDialog) {
    this.user.roleId = 2;
    this.panelOpenState = false;
   }

  ngOnInit(): void {
  }


  openCreateUserDialog(): void{
    const dialogRef = this.dialog.open(CreateUserDialog, {height: '78vh', width: '65vw'})
  }
}

@Component({
  selector: 'createUserDialog',
  templateUrl: 'createUserDialog.html',
})

export class CreateUserDialog {

}