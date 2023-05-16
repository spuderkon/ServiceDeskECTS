import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/mvc/models/person/person.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public apiUrl: string = 'https://localhost:5001/crud/';
  public headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));

  constructor(public http: HttpClient) { 
  }

  public GetMy(): Observable<Person>{
    return this.http.get<Person>(this.apiUrl + 'Person/GetMy', {headers: this.headers});
  }
}
