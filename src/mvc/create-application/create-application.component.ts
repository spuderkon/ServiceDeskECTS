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

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  public places: Place[];
  public person: Person;
  public persons: Person[];

  public selectedPlace: FormControl;
  public selectedPerson: FormControl;
  public desription: FormControl;

  public personCtrl = new FormControl;
  public filteredPersons: Observable<Person[]>;

  constructor(private placeService: PlaceService, private personService: PersonService, public authSerivce: AuthService, private requestService: RequestService) {
    this.selectedPlace = new FormControl('', [Validators.required]);
    this.desription = new FormControl('', [Validators.required]);
    this.selectedPerson = new FormControl({ value: '', disabled: this.authSerivce.isClient() }, [Validators.required])
  }

  ngOnInit(): void {
    this.refreshPlace();
    this.refreshPerson();
    this.refreshPersons();
  }

  private refreshPlace(): void {
    this.placeService.GetAll().subscribe(data => {
      this.places = data;
      console.log(this.places[0]);
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
      console.log(this.persons);
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

  public displayFn(person: Person): string {
    if (person.name == undefined) return '';
    return person.surname + ' ' + person.name + ' ' + person.lastname;
  }

  public sendApplication(): void {
    console.log(this.selectedPlace.value, this.selectedPerson.value.id, this.desription.value);
    let request: Request = new Request();
    request.placeId = this.selectedPlace.value.id;
    request.declarantId = this.selectedPerson.value.id;
    request.description = this.desription.value;
    request.place = this.selectedPlace.value;
    request.declarant = this.selectedPerson.value
    console.log(request);
    this.requestService.AddMy(request).subscribe(response => {
      console.log(response);
    })
  }
}
