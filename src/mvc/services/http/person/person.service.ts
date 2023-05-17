import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/mvc/models/person/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public apiUrl: string = 'https://localhost:5001/crud/Person';
  private headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) { 
  }

  public GetMy(): Observable<Person>{
    return this.http.get<Person>(this.apiUrl + '/GetMy', {headers: this.headers});
  }

  public Update(id: number, person: Person): Observable<Person>{
    return this.http.put<Person>(this.apiUrl + '/Update/' + id, person, {headers: this.headers});
  }
}
