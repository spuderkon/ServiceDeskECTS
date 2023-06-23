import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/http/place/place.service';
import { Place } from '../models/place/place.model';
import { PersonService } from '../services/http/person/person.service';
import { Person } from '../models/person/person.model';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { Request } from '../models/request/request.model';
import { RequestService } from '../services/http/request/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  public places: Place[];
  public person: Person;
  public persons: Person[];

  public selectedPlace: FormControl;
  public selectedPerson: FormControl;
  public desription: FormControl;

  public filteredPersons: Observable<Person[]>;
  public filteredPlaces: Observable<Place[]>;

  constructor(private placeService: PlaceService, private personService: PersonService,
    public authSerivce: AuthService, private requestService: RequestService,
    private snackBar: MatSnackBar, private router: Router) {
    this.selectedPlace = new FormControl('', [Validators.required]);
    this.desription = new FormControl('', [Validators.required]);
    this.selectedPerson = new FormControl({ value: '', disabled: this.authSerivce.isClient() }, [Validators.required]);
    this.filteredPersons = new Observable<Person[]>;
    this.filteredPlaces = new Observable<Place[]>;
  }

  ngOnInit(): void {
    this.refreshPlaces();
    this.refreshPerson();
    if(!this.authSerivce.isClient()){
      this.refreshPersons();
    }
  }

  private refreshPlaces(): void {
    this.placeService.GetAll().subscribe(data => {
      this.places = data;
      this.filteredPlaces = this.selectedPlace.valueChanges.pipe(
        startWith(''),
        map(place => (this.filterPlaces(place || ''))),
      );
    });
  }

  private refreshPerson(): void {
    this.personService.GetMy().subscribe(data => {
      this.person = data;
      this.selectedPerson.setValue(this.person);
    });
  }

  private refreshPersons(): void {
    this.personService.GetAll().subscribe(data => {
      this.persons = data;
      this.filteredPersons = this.selectedPerson.valueChanges.pipe(
        startWith(''),
        map(person => (this.filterPersons(person || ''))),
      );
    });
  }

  private filterPersons(value: any): Person[] {
    let filterValue = '';
    try {
      filterValue = value.toLowerCase();
    }
    catch {
      filterValue = (value.surname + ' ' + value.name + ' ' + value.lastname).toLowerCase();
    }
    return this.persons.filter(person => (person.surname! + ' ' + person.name! + ' ' + person.lastname!).toLowerCase().includes(filterValue));
  }

  private filterPlaces(value: any): Place[] {
    let filterValue = '';
    try {
      filterValue = value.toLowerCase();
    }
    catch {
      if(value.description == null) filterValue = ('Кабинет №' + value.name).toLowerCase();
      else filterValue = (value.description + ' №' + value.name).toLowerCase();
    }
    if(value.description == null) return this.places.filter(place => ('Кабинет №' + place.name!).toLowerCase().includes(filterValue));
    return this.places.filter(place => (place.name!).toLowerCase().includes(filterValue));
  }

  public displayPersonFn(person: Person): string {
    if (person.name == undefined) return '';
    return person.surname + ' ' + person.name + ' ' + person.lastname;
  }

  public displayPlaceFn(place: Place): string {
    if (place.name == undefined) return '';
    else if (place.description == null) return 'Кабинет ' + '№' + place.name;
    return place.description + ' №' + place.name;
  }

  public sendApplication(): void {
    if (this.person == this.selectedPerson.value) {
      this.requestService.AddMy(this.desription.value, this.selectedPlace.value.id)
        .subscribe({
          next: (data) => {
            this.snackBar.open('Заявка отправлена', 'Ок', { duration: 5000, panelClass: "classicSnackBar" }).afterDismissed().subscribe(
              {
                next: () => { this.router.navigate(['/submittedRequests']) },
                error: () => { }
              }
            )
          },
          error: (error) => { this.snackBar.open('Ошибка', 'Далее', { duration: 5000, panelClass: "classicSnackBar" }) },
        });
    }
    else {
      this.requestService.Add(this.selectedPerson.value.id, this.desription.value, this.selectedPlace.value.id)
        .subscribe({
          next: (data) => {
            this.snackBar.open('Заявка отправлена', 'Ок', { duration: 5000, panelClass: "classicSnackBar" }).afterDismissed().subscribe(
              {
                next: () => { this.router.navigate(['/submittedRequests']) },
                error: () => { }
              }
            )
          },
          error: (error) => { this.snackBar.open('Ошибка', 'Далее', { duration: 5000, panelClass: "classicSnackBar" }) },
        });
    }
  }
  
  public isObject(value: Object): boolean{
    if(typeof value === 'object') return true;
    return false;
  }
}
