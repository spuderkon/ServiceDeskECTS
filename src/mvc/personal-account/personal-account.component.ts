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
  userLastname: FormControl;
  userEmail: FormControl;
  isAdmin: boolean;

  constructor(public authService: AuthorizationService) {
    this.isAdmin = this.authService.isAdmin();
    this.userName = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: '', disabled: true }, [Validators.required])
    this.userEmail = new FormControl({ value: '', disabled: true }, [Validators.required])
  }


  public ngOnInit(): void {
    //if(this.authService.isClient)
    console.log(this.authService.getRole());
  }

  public refreshData(): void {

  }

  public refreshAvailability(value: FormControl): void{
    if(value.disabled) value.enable();
    else value.disable();
  }

  public saveUserData(): void {

  }
}
