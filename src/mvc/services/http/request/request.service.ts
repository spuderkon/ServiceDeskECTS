import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl: string = 'https://localhost:5001/crud/Request';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) { }
}
