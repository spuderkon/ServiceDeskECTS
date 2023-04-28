import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {
  
  userName: FormControl;
  userSurname: FormControl;
  userLastName: FormControl;
  userEmail: FormControl;

  constructor(private authService: AuthorizationService) { 
    this.userName = new FormControl('', [Validators.required]);
    this.userSurname = new FormControl('', [Validators.required]);
    this.userLastName = new FormControl('', [Validators.required])
    this.userEmail = new FormControl('', [Validators.required])
  }


  ngOnInit(): void {
  }

}
