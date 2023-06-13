import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/mvc/models/service/service.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOnRequestServiceService {

  private apiUrl: string = 'https://localhost:5001/crud/Service';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) {}

  public GetAll(): Observable<Service[]>{
    return this.http.get<Service[]>(this.apiUrl + '/GetAll/', {headers: this.headers});
  }
}
