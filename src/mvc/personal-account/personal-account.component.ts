import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
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
  formPerson: Person;

  constructor(public authService: AuthorizationService, private clientService: PersonService) {
    this.isAdmin = this.authService.isAdmin();
    this.userName = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: '', disabled: true }, [Validators.required]);
  }


  public ngOnInit(): void {
    this.refreshPerson();
    
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('data changed')
  }

  change(): void {
    console.log(123)
  }

  public personDataHasChanged(): boolean {
    
    return false;
  }

  //Рефреш данных пользователя
  public refreshPerson(): void {
    this.clientService.GetMy().subscribe(data => {
      this.person = new Person(data);
      this.formPerson = new Person(data);
      console.log(this.personDataHasChanged());
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
    this.userName = new FormControl({ value: this.formPerson.name, disabled: true }, [Validators.required]);
    this.userSurname = new FormControl({ value: this.formPerson.surname, disabled: true }, [Validators.required]);
    this.userLastname = new FormControl({ value: this.formPerson.lastname, disabled: true }, [Validators.required]);
    this.userEmail = new FormControl({ value: this.formPerson.email, disabled: true }, [Validators.required]);
  }

  public savePersonData(): void {
    this.userName.defaultValue;
  }

  //Проверка на изменение полей
  public dataEditingActivated(): boolean {

    return false;
  }
}
