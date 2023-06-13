import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostOrDepartment } from 'src/mvc/models/postOrDepartment/post-or-department.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl: string = 'https://localhost:5001/crud/Department';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  private params = new HttpParams();

  constructor(private http: HttpClient) { }

  public GetAll(): Observable<PostOrDepartment[]> {
    return this.http.get<PostOrDepartment[]>(this.apiUrl + '/GetAll', { headers: this.headers })
  }
}
