import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/http/place/place.service';
import { Place } from '../models/place/place.model';
import { PersonService } from '../services/http/person/person.service';
import { Person } from '../models/person/person.model';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  public places: Place[];
  public person: Person;
  public selectedPlace: FormControl;
  public desription: FormControl;
  
  public fullPersonName: string;

  constructor(private placeService: PlaceService, private personService: PersonService, public authSerivce: AuthService) { 
    this.selectedPlace = new FormControl('', [Validators.required]);
    this.desription = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.refreshPlace();
    this.refreshPerson();
  }

  private refreshPlace(): void{
    this.placeService.GetAll().subscribe(data => {
      this.places = data;
    });
  }

  private refreshPerson(): void{
    this.personService.GetMy().subscribe(data => {
      this.person = data;
      this.fullPersonName = this.person.name + ' ' + this.person.surname + ' ' + this.person.lastname;
    })
  }

  public sendApplication(): void {
    
  }
}
