import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/mvc/models/role/role.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl: string = 'https://localhost:5001/crud/Role';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) { }

  public GetAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl + '/GetAll', { headers: this.headers })
  }
}
