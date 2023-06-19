import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/mvc/models/person/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl: string = 'https://localhost:5001/crud/Person';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) {
  }

  public GetMy(): Observable<Person> {
    return this.http.get<Person>(this.apiUrl + '/GetMy', { headers: this.headers });
  }

  public GetAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl + '/GetAll', { headers: this.headers });
  }

  public GetAllLaborants(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl + '/GetAllLaborants', { headers: this.headers });
  }

  public Add(person: Person): Observable<Person> {
    const body = {
      'name': person.name,
      'surname': person.surname,
      'lastname': person.lastname,
      'email': person.email,
      'userName': person.userName,
      'comment': person.comment,
      'postId': person.postId,
      'departmentId': person.departmentId,
      'roleId': person.roleId,
    }
    return this.http.post<Person>(this.apiUrl + '/Add', body, { headers: this.headers });
  }

  public Update(person: Person): Observable<Person> {
    return this.http.put<Person>(this.apiUrl + '/Update/' + person.id, person, { headers: this.headers });
  }

  public Delete(personId: number): Observable<Person> {
    const body = {
      'id': personId,
    }
    return this.http.delete<Person>(this.apiUrl + '/Delete/' + personId, { headers: this.headers })
  }
}
