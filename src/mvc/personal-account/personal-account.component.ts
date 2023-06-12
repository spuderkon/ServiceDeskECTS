import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { PersonService } from '../services/http/person/person.service';
import { Person } from '../models/person/person.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit, OnChanges {

  public userName: FormControl;
  public userSurname: FormControl;
  public userLastname: FormControl;
  public userEmail: FormControl;
  public person: Person;

  constructor(public authService: AuthService, private personService: PersonService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.userName = new FormControl({value: '', disabled: this.authService.isClient()}, [Validators.required]);
    this.userSurname = new FormControl({value: '', disabled: this.authService.isClient()}, [Validators.required]);
    this.userLastname = new FormControl({value: '', disabled: this.authService.isClient()}, [Validators.required]);
    this.userEmail = new FormControl({value: '', disabled: this.authService.isClient()}, [Validators.required]);
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
      this.userName.setValue(this.person.name);
      this.userSurname.setValue(this.person.surname);
      this.userLastname.setValue(this.person.lastname);
      this.userEmail.setValue(this.person.email);
    });
  }

  //Изменение доступности FormControl
  public refreshAvailability(value: FormControl): void {
    if (value.disabled) value.enable();
    else value.disable();
  }
  
  //Вызов окна изменения пароля
  public changePassword(): void{
    const dialogRef = this.dialog.open(ChangePassword)

    dialogRef.afterClosed().subscribe(data => {
      if(typeof data == 'string'){
        this.authService.setNewPassword(this.person.userName!, data).subscribe({
          next: (result) => {this.snackBar.open('Пароль изменен', 'Ок', { duration: 5000, panelClass: "classicSnackBar" });},
          error: (error) => {console.log(error)},
        })
      }
    })
  }

  //Сохранение введенных данных, и их отправка
  public savePersonData(): void {
    this.person.name = this.userName.value;
    this.person.surname = this.userSurname.value;
    this.person.lastname = this.userLastname.value;
    this.person.email = this.userEmail.value;
    this.personService.Update(this.person.id!, this.person).subscribe({
      next: (data) => { this.snackBar.open('Данные сохранены', 'Ок', { duration: 5000, panelClass: "classicSnackBar" }); },
      error: (error) => { console.log(error); },
    });
  }
}

//Диалоговое окно с изменением пароля
@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html',
})
export class ChangePassword implements OnInit {

  public newPassword: FormControl;
  public hidePassword: boolean = true;

  constructor(){
    this.newPassword = new FormControl('', [Validators.required]);
  }
 

  ngOnInit(): void {
   
  }

 
}