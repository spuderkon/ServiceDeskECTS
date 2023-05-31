import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/mvc/models/request/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl: string = 'https://localhost:5001/crud/Request';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) {

  }

  public GetMyAll(): Observable<Request[]>{
    return this.http.get<Request[]>(this.apiUrl + '/GetMyAll', {headers: this.headers});
  }

  public AddMy(request: Request){
    return this.http.post<any>(this.apiUrl + '/AddMy', request, {headers: this.headers})
  }
}
