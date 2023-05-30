import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  ngOnInit(): void {
  }


  openCreateUserDialog(): void{
    
  }
}

@Component({
  selector: 'createUserDialog',
  templateUrl: 'createUserDialog.html',
})

export class CreateUserDialog {

}