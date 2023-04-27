import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  //login and password formcontrols
  userLogin: FormControl;
  userPassword: FormControl;

  constructor(private authService: AuthorizationService) {
    this.userLogin = new FormControl('GarievDenis', [Validators.required, Validators.pattern('^[a-zA-Z]+$')])
    this.userPassword = new FormControl('123', [Validators.required])
   }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
  }

  login(): void {
    this.authService.login(this.userLogin.value,this.userPassword.value).subscribe(data => {
      console.log(data);
    });
  }

  clearValue(value: FormControl): void{
    value.setValue('');
  }

  getLoginErrorMessage(): string {
    if(this.userLogin.hasError('required')){
      return 'Поле UserName является обязательным';
    }
    return this.userLogin.hasError('pattern') ? 'Только латинские буквы' : '';
  }
}
