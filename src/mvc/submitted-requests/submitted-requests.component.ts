import { Component, Inject, OnInit } from '@angular/core';
import { Request } from '../models/request/request.model';
import { RequestService } from '../services/http/request/request.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Person } from '../models/person/person.model';
import { PlaceService } from '../services/http/place/place.service';
import { PersonService } from '../services/http/person/person.service';
import { Place } from '../models/place/place.model';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkOnRequest } from '../models/workOnRequest/work-on-request.model';
import { WorkOnRequestService } from '../services/http/workOnRequest/work-on-request.service';

export interface DialogData {
  request: Request;
}

@Component({
  selector: 'app-submitted-requests',
  templateUrl: './submitted-requests.component.html',
  styleUrls: ['./submitted-requests.component.css']
})
export class SubmittedRequestsComponent implements OnInit {

  public activeRequests: Array<Request>;
  public completedRequests: Array<Request>;
  public completedRequestsLoaded: boolean;

  constructor(private requestService: RequestService, public dialog: MatDialog) {
    this.activeRequests = new Array<Request>;
    this.completedRequests = new Array<Request>;
    this.completedRequestsLoaded = false;
  }

  ngOnInit(): void {
    this.refreshActiveRequests();
  }

  private refreshActiveRequests(): void {
    this.requestService.GetMyActiveAll().subscribe(data => {
      this.activeRequests = data;
    });
  }

  public refreshCompletedRequests(): void {
    this.requestService.GetMyCompletedAll().subscribe(data => {
      this.completedRequests = data;
      this.completedRequestsLoaded = true;
    });
  }

  public openRequestInfo(request: Request) {
    const dialogRef = this.dialog.open(RequestInfoDialogSR, { data: { request } })
  }

  public completeRequest(request: Request) {
    const dialogRef = this.dialog.open(CompleteRequestDialogSR);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        request.isComplete = true;
        this.requestService.Update(request).subscribe(
          {
            next: (data) => {
              this.activeRequests.splice(this.activeRequests.indexOf(request, 0), 1);
              this.completedRequests.push(request);
            },
            error: (error) => { console.log(error) },
          }
        )
      }
    });
  }

  public changeRequest(request: Request) {
    const dialogRef = this.dialog.open(ChangeRequestDialogSR, { data: { request } }); 
  }

}

@Component({
  selector: 'change-request-dialog-s-r',
  templateUrl: 'changeRequestDialogSR.html',
})
export class ChangeRequestDialogSR implements OnInit {

  public request: Request;
  public persons: Person[]

  public places: Place[];
  public place: Place;

  public selectedPlace: FormControl;
  public selectedPerson: FormControl;
  public desription: FormControl;

  public filteredPersons: Observable<Person[]>;
  public filteredPlaces: Observable<Place[]>;

  constructor(private placeService: PlaceService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private personService: PersonService, public authSerivce: AuthService, private requestService: RequestService,
              private snackBar: MatSnackBar, private router: Router) {
    this.request = data.request;
    this.persons = new Array<Person>;
    this.places = new Array<Place>;
    this.selectedPlace = new FormControl(this.request.place, [Validators.required]);
    this.desription = new FormControl(this.request.description, [Validators.required]);
    this.selectedPerson = new FormControl({ value: this.request.declarant, disabled: this.authSerivce.isClient() }, [Validators.required]);
    this.filteredPersons = new Observable<Person[]>;
    this.filteredPlaces = new Observable<Place[]>;
  }

  ngOnInit(): void {
    this.refreshPlaces();
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
    if (place == undefined) return '';
    else if (place.description == null) return 'Кабинет ' + '№' + place.name;
    return place.description + ' №' + place.name;
  }

  public changeApplication(): void {
    this.request.placeId = this.selectedPlace.value.id;
    this.request.place = this.selectedPlace.value;
    this.request.description = this.desription.value;
    this.request.declarantId = this.selectedPerson.value.id;
    this.request.declarant = this.selectedPerson.value;

    this.requestService.Update(this.request).subscribe({
      next: (data) => {
        this.snackBar.open('Заявка изменена','Ок', {panelClass: "classicSnackBar"})
      },
      error: (error) => {console.log(error);},
    });
  }

  public isObject(value: Object): boolean{
    if(typeof value === 'object') return true;
    return false;
  }
}

@Component({
  selector: 'complete-request-dialog-s-r',
  templateUrl: 'completeRequestDialogSR.html',
})
export class CompleteRequestDialogSR implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'request-info-dialog-s-r',
  templateUrl: 'requestInfoDialogSR.html',
})
export class RequestInfoDialogSR implements OnInit {

  public request: Request;
  public workOnRequests: WorkOnRequest[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private workOnRequestService:WorkOnRequestService) {
    this.request = data.request;
    this.workOnRequests = new Array<WorkOnRequest>;
  }

  ngOnInit(): void {
    this.refreshWorkOnRequest();
  }

  public refreshWorkOnRequest(): void {
    this.workOnRequestService.GetByRequestAll(this.request.id!).subscribe(data => {
      this.workOnRequests = data;
      console.log(this.workOnRequests);
    })
  }
}
