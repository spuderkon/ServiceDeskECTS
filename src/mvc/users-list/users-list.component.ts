import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  user: User;
  qwe: string;
  panelOpenState: boolean;
  constructor() {
    this.user = new User();
    this.user.name = 'Matthew'
    this.user.surname = 'Varganov';
    this.user.lastname = 'Ale';
    this.user.email = 'wqe@mail.ru';
    this.user.roleId = 2;
    this.panelOpenState = false;
   }

  ngOnInit(): void {
    console.log(this.user);
  }

}
