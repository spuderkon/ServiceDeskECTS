import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  //login and password formcontrols
  login: FormControl;
  password: FormControl;

  constructor() {
    this.login = new FormControl('', [Validators.required, Validators.email])
    this.password = new FormControl('', [Validators.required])
   }

  ngOnInit(): void {
  }

  clearValue(value: FormControl): void{
    value.setValue('');
  }
}
