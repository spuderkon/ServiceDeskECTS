import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person/person.model';
import { PersonService } from '../services/http/person/person.service';

@Component({
  selector: 'app-crud-persons',
  templateUrl: './crud-persons.component.html',
  styleUrls: ['./crud-persons.component.css']
})
export class CrudPersonsComponent implements OnInit {

  persons: Person[]

  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.refreshPersons();
  }

  private refreshPersons(): void {
    this.personService.GetAll().subscribe(data => {
      this.persons = data;
    })
  }

  openCreateUserDialog(){
    
  }

}

@Component({
  selector: 'createUserDialog',
  templateUrl: 'createUserDialog.html',
})

export class CreateUserDialog {

}
