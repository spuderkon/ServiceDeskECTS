import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkOnRequest } from 'src/mvc/models/workOnRequest/work-on-request.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOnRequestService {

  private apiUrl: string = 'https://localhost:5001/crud/WorkOnRequest';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) {}

  public GetByRequestAll(requestId: number): Observable<WorkOnRequest[]>{
    return this.http.get<WorkOnRequest[]>(this.apiUrl + '/GetByRequestAll/' + requestId, {headers: this.headers});
  }

  public AddMy(workOnRequest: WorkOnRequest): Observable<WorkOnRequest>{
    const body = { 
      'serviceId': workOnRequest.serviceId,
      'comment': workOnRequest.comment,
      'requestId': workOnRequest.requestId,
    }
    return this.http.post<WorkOnRequest>(this.apiUrl + '/AddMy', body, {headers: this.headers});
  }
  
  public AddMyAccepted(requestId: number): Observable<WorkOnRequest>{
    const body = { 
      'reqId': requestId
    }
    return this.http.post<WorkOnRequest>(this.apiUrl + '/AddMyAccepted/' + requestId, body, {headers: this.headers});
  }

  public AddMyRefusal(requestId: number): Observable<WorkOnRequest>{
    const body = { 
      'reqId': requestId
    }
    return this.http.post<WorkOnRequest>(this.apiUrl + '/AddMyRefusal/' + requestId, body, {headers: this.headers});
  }
  
  public AddMyComplete(requestId: number): Observable<WorkOnRequest>{
    const body = { 
      'reqId': requestId
    }
    return this.http.post<WorkOnRequest>(this.apiUrl + '/AddMyComplete/' + requestId, body, {headers: this.headers});
  }

  public UpdateMy(workOnRequest: WorkOnRequest): Observable<WorkOnRequest>{
    const body = { 
      'id': workOnRequest.id,
      'serviceId': workOnRequest.serviceId,
      'comment': workOnRequest.comment,
    }
    return this.http.put<WorkOnRequest>(this.apiUrl + '/UpdateMy/' + workOnRequest.id, body, {headers: this.headers});
  }
}
