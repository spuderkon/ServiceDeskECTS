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

  public GetMyActiveAll(): Observable<Request[]>{
    return this.http.get<Request[]>(this.apiUrl + '/GetMyActiveAll', {headers: this.headers});
  }

  public GetMyCompletedAll(): Observable<Request[]>{
    return this.http.get<Request[]>(this.apiUrl + '/GetMyCompletedAll', {headers: this.headers});
  }

  public Add(declarantId: number,description: string, placeId: number): Observable<Request>{
    const body = {
                    "declarantId": declarantId,
                    "description": description,
                    "placeId" : placeId,
                  };
    this.params = new HttpParams().set('description', description);
    return this.http.post<Request>(this.apiUrl + '/Add', body, {headers: this.headers})
  }

  public AddMy(description: string, placeId: number): Observable<Request>{
    const body = {
                    "description": description,
                    "placeId" : placeId,
                 };
    this.params = new HttpParams().set('description', description);
    return this.http.post<Request>(this.apiUrl + '/AddMy', body, {headers: this.headers})
  }
}
