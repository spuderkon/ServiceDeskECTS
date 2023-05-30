import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from 'src/mvc/models/place/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private apiUrl: string = 'https://localhost:5001/crud/Place';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) { 

  }

  public GetAll(): Observable<Place[]>{
    return this.http.get<Place[]>(this.apiUrl + '/GetAll', {headers: this.headers});
  }
}
