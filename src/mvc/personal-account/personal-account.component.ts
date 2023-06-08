import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { PersonService } from '../services/http/person/person.service';
import { Person } from '../models/person/person.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  person: Person;

  constructor(public authService: AuthService, private personService: PersonService, private snackBar: MatSnackBar) {
    this.userName = new FormControl('', [Validators.required]);
    this.userSurname = new FormControl('', [Validators.required]);
    this.userLastname = new FormControl('', [Validators.required]);
    this.userEmail = new FormControl('', [Validators.required]);
  }


  public ngOnInit(): void {
    this.refreshPerson();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('data changed')
  }

  //Рефреш данных пользователя
  public refreshPerson(): void {
    this.personService.GetMy().subscribe(data => {
      this.person = new Person(data);
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
    this.userName = new FormControl( this.person.name, [Validators.required]);
    this.userSurname = new FormControl(this.person.surname, [Validators.required]);
    this.userLastname = new FormControl(this.person.lastname, [Validators.required]);
    this.userEmail = new FormControl(this.person.email, [Validators.required, Validators.email]);
  }

  public savePersonData(): void {
    this.person.name = this.userName.value;
    this.person.surname = this.userSurname.value;
    this.person.lastname = this.userLastname.value;
    this.person.email = this.userEmail.value;
    this.personService.Update(this.person.id!, this.person).subscribe({
      next: (data) => { this.snackBar.open('Данные сохранены', 'Ок', { duration: 5000, panelClass: "classicSnackBar" });},
      error: (error) => {console.log(error);},
    });
  }
}
