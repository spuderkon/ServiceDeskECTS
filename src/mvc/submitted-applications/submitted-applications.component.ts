import { Component, Inject, OnInit } from '@angular/core';
import { Request } from '../models/request/request.model';
import { RequestService } from '../services/http/request/request.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import localeRu from '@angular/common/locales/ru';
import { Person } from '../models/person/person.model';
import { PlaceService } from '../services/http/place/place.service';
import { PersonService } from '../services/http/person/person.service';
import { Place } from '../models/place/place.model';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface DialogData {
  request: Request;
}

@Component({
  selector: 'app-submitted-applications',
  templateUrl: './submitted-applications.component.html',
  styleUrls: ['./submitted-applications.component.css']
})
export class SubmittedApplicationsComponent implements OnInit {

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
    const dialogRef = this.dialog.open(RequestInfoDialog, { data: { request } })
  }

  public completeRequest(request: Request) {
    const dialogRef = this.dialog.open(CompleteRequestDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        request.isComplete = true;
        this.requestService.UpdateMy(request).subscribe(
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
    const dialogRef = this.dialog.open(ChangeRequestDialog, { data: { request } });
  }

}

@Component({
  selector: 'change-request-dialog',
  templateUrl: 'changeRequestDialog.html',
})
export class ChangeRequestDialog implements OnInit {

  public request: Request;

  public person: Person;
  public persons: Person[]

  public places: Place[];
  public place: Place;

  public selectedPlace: FormControl;
  public selectedPerson: FormControl;
  public desription: FormControl;

  public filteredPersons: Observable<Person[]>;

  constructor(private placeService: PlaceService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private personService: PersonService, public authSerivce: AuthService, private requestService: RequestService,
              private snackBar: MatSnackBar, private router: Router) {
    this.request = data.request;
    this.place = this.request.place;
    this.persons = new Array<Person>;
    this.places = new Array<Place>;
    this.selectedPlace = new FormControl('', [Validators.required]);
    this.desription = new FormControl(this.request.description, [Validators.required]);
    this.selectedPerson = new FormControl({ value: '', disabled: this.authSerivce.isClient() }, [Validators.required]);
    this.filteredPersons = new Observable<Person[]>;
  }

  ngOnInit(): void {
    this.refreshPlaces();
    this.refreshPerson();
    this.refreshPersons();
    this.selectedPlace.setValue(this.place);
  }

  private refreshPlaces(): void {
    this.placeService.GetAll().subscribe(data => {
      this.places = data;
      this.selectedPlace.setValue(this.request.place);
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

  public displayPersonFn(person: Person): string {
    if (person.name == undefined) return '';
    return person.surname + ' ' + person.name + ' ' + person.lastname;
  }

  public sendApplication(): void {
    if (this.person == this.selectedPerson.value) {
      this.requestService.AddMy(this.desription.value, this.selectedPlace.value.id)
        .subscribe({
          next: (data) => {
            this.snackBar.open('Заявка отправлена', 'Ок', { duration: 5000, panelClass: "classicSnackBar" }).afterDismissed().subscribe(
              {
                next: () => { this.router.navigate(['/submittedApplications']) },
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
                next: () => { this.router.navigate(['/submittedApplications']) },
                error: () => { }
              }
            )
          },
          error: (error) => { this.snackBar.open('Ошибка', 'Далее', { duration: 5000, panelClass: "classicSnackBar" }) },
        });
    }
  }
}

@Component({
  selector: 'complete-request-dialog',
  templateUrl: 'completeRequestDialog.html',
})
export class CompleteRequestDialog implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'request-info-dialog',
  templateUrl: 'requestInfoDialog.html',
})
export class RequestInfoDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {

  }
}
