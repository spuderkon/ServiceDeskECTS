import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../services/client/client.service';
import { Person } from '../models/person/person.model';

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
  person: Person = new Person();

  constructor(public authService: AuthorizationService, private clientService: ClientService) {
    this.isAdmin = this.authService.isAdmin();
    this.userName = new FormControl({ value: this.person.name, disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: '', disabled: true }, [Validators.required]);
  }


  public ngOnInit(): void {
    this.refreshPerson();
  }

  public refreshPerson(): void {
    this.clientService.GetMy().subscribe(data => {
      this.person = data;
      this.refreshFieldsValue();
    });
  }

  public refreshAvailability(value: FormControl): void{
    if(value.disabled) value.enable();
    else value.disable();
  }

  public refreshFieldsValue(): void{
    this.userName = new FormControl({ value: this.person.name, disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: this.person.surname, disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: this.person.lastname, disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: this.person.email, disabled: true }, [Validators.required]);
  }

  public saveUserData(): void {

  }
}
