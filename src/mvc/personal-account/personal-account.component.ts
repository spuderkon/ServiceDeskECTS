import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { PersonService } from '../services/http/person/person.service';
import { Person } from '../models/person/person.model';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit, OnChanges {

  userName: FormControl;
  userSurname: FormControl;
  userLastname: FormControl;
  userEmail: FormControl;
  isAdmin: boolean;
  person: Person;

  constructor(public authService: AuthService, private personService: PersonService) {
    this.userName = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: '', disabled: true }, [Validators.required]);
  }


  public ngOnInit(): void {
    this.refreshPerson();
    console.log(localStorage.getItem('token'));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('data changed')
  }

  //Рефреш данных пользователя
  public refreshPerson(): void {
    this.personService.GetMy().subscribe(data => {
      this.person = new Person(data);
      console.log(data, 'person');
      this.refreshFormControlsValue();
    });
  }

  //Изменение доступности FormControl
  public refreshAvailability(value: FormControl): void{
    if(value.disabled) value.enable();
    else value.disable();
  }

  //Обновление значений FormControls
  public refreshFormControlsValue(): void{
    this.userName = new FormControl({ value: this.person.name, disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: this.person.surname, disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: this.person.lastname, disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: this.person.email, disabled: true }, [Validators.required, Validators.email]);
  }

  public savePersonData(): void {
    this.person.name = this.userName.value;
    this.person.surname = this.userSurname.value;
    this.person.lastname = this.userLastname.value;
    this.person.email = this.userEmail.value;
    console.log(this.person);
    this.personService.Update(this.person.id!, this.person).subscribe(data => {
      console.log(data);
    });
    this.userName.disabled;
  }
}
