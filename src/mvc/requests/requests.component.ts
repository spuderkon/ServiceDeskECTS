import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { now } from 'moment';
import { RequestService } from '../services/http/request/request.service';
import { Request } from '../models/request/request.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WorkOnRequest } from '../models/workOnRequest/work-on-request.model';
import { WorkOnRequestService } from '../services/http/workOnRequest/work-on-request.service';
import { Place } from '../models/place/place.model';
import { Person } from '../models/person/person.model';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../services/http/person/person.service';
import { PlaceService } from '../services/http/place/place.service';
import { Router } from '@angular/router';

export interface DialogData {
  request: Request;
}

export interface LaborantsRequests {
  laborant: Person;
  activeRequests: Request[];
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public activeRequests: Array<Request>;
  public completedRequestsLoaded: boolean;

  public laborants: Person[];
  public laborantsRequests: LaborantsRequests[];

  constructor(private requestService: RequestService, public dialog: MatDialog, private snackBar: MatSnackBar,
    private personService: PersonService, private workOnRequestService: WorkOnRequestService,
    public authService: AuthService) {
    this.activeRequests = new Array<Request>;
    this.laborantsRequests = new Array<LaborantsRequests>;
    this.laborants = new Array<Person>;
    this.completedRequestsLoaded = false;
  }

  ngOnInit(): void {
    this.refreshActiveRequests();
    if (this.authService.isAdmin()) {
      this.refreshLaborantsRequests();
    }
  }

  public appointImplementer(implementer: Person, request: Request, importance: number): void {
    request.importance = importance;
    request.requestStatusId = 3;
    this.requestService.Update(request).subscribe({
      next: (result) => {
        console.log(result);
        this.workOnRequestService.Add(request, 4, implementer).subscribe({
          next: (result) => {
            this.activeRequests.splice(this.activeRequests.indexOf(request, 0), 1);
            this.laborantsRequests.find(x => x.laborant == implementer)?.activeRequests.push(request);
            this.snackBar.open('Заявка назначена', 'Ок', { duration: 5000, panelClass: 'classicSnackBar' });
          },
          error: (error) => {
            console.log(error.error);
          }
        });
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  private refreshActiveRequests(): void {
    this.requestService.GetActiveAll().subscribe({
      next: (data) => {
        this.activeRequests = data;
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  private refreshLaborantsRequests(): void {
    this.personService.GetAllLaborants().subscribe({
      next: (data) => {
        this.laborants = data;
        this.laborants.forEach(item => {
          this.requestService.GetByImpActiveAll(item.id!).subscribe(data => {
            this.laborantsRequests.push({ laborant: item, activeRequests: data });
          })
        });
      },
      error: (error) => {
        console.log(error.error);
      },
    })
  }

  public openRequestInfo(request: Request) {
    const dialogRef = this.dialog.open(RequestInfoDialogR, { data: { request } })
  }

  public acceptRequest(request: Request, importance: number) {
    request.importance = importance;
    this.requestService.Update(request).subscribe({
      next: (result) => {
        this.workOnRequestService.AddMyAccepted(request.id!).subscribe({
          next: (result) => {
            this.activeRequests.splice(this.activeRequests.indexOf(request, 0), 1);
            this.snackBar.open('Заявка принята', 'Ок', { duration: 5000, panelClass: 'classicSnackBar' });
          },
          error: (error) => { console.log(error.error); }
        });
      },
      error: (error) => {
        console.log(error.error);
      },
    });

  }

  public completeRequest(request: Request) {
    const dialogRef = this.dialog.open(CompleteRequestDialogR);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        request.isComplete = true;
        this.requestService.Update(request).subscribe(
          {
            next: (data) => {
              this.activeRequests.splice(this.activeRequests.indexOf(request, 0), 1);
              this.snackBar.open('Заявка завершена', 'Ок', { duration: 5000, panelClass: ['classicSnackBar'] })
            },
            error: (error) => { console.log(error.error) },
          }
        )
      }
    });
  }

  public changeRequest(request: Request) {
    const dialogRef = this.dialog.open(ChangeRequestDialogR, { data: { request } });
  }
}

@Component({
  selector: 'change-request-dialog-r',
  templateUrl: 'change-request-dialog-r.html',
})
export class ChangeRequestDialogR implements OnInit {

  public request: Request;

  public persons: Person[];

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
    this.refreshPersons();
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
      if (value.description == null) filterValue = ('Кабинет №' + value.name).toLowerCase();
      else filterValue = (value.description + ' №' + value.name).toLowerCase();
    }
    if (value.description == null) return this.places.filter(place => ('Кабинет №' + place.name!).toLowerCase().includes(filterValue));
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

  public changeRequest(): void {
    this.request.placeId = this.selectedPlace.value.id;
    this.request.place = this.selectedPlace.value;
    this.request.description = this.desription.value;
    this.request.declarantId = this.selectedPerson.value.id;
    this.request.declarant = this.selectedPerson.value;

    this.requestService.Update(this.request).subscribe({
      next: (data) => {
        this.snackBar.open('Заявка изменена', 'Ок', { panelClass: "classicSnackBar" })
      },
      error: (error) => { console.log(error); },
    });
  }

  public isObject(value: Object): boolean {
    if (typeof value === 'object') return true;
    return false;
  }
}

@Component({
  selector: 'complete-request-dialog-r',
  templateUrl: 'complete-request-dialog-r.html',
})
export class CompleteRequestDialogR implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'request-info-dialog-r',
  templateUrl: 'request-info-dialog-r.html',
})
export class RequestInfoDialogR implements OnInit {

  public request: Request;
  public worksOnRequest: WorkOnRequest[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private workOnRequestService: WorkOnRequestService) {
    this.request = data.request;
    this.worksOnRequest = new Array<WorkOnRequest>;
  }

  ngOnInit(): void {
    this.refreshWorkOnRequest();
  }

  public refreshWorkOnRequest(): void {
    this.workOnRequestService.GetByRequestAll(this.request.id!).subscribe(data => {
      this.worksOnRequest = data;
      console.log(this.worksOnRequest);
    })
  }
}