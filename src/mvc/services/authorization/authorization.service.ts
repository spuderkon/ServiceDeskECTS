import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share, shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl: string = 'https://localhost:44399/';
  private params = new HttpParams()

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(this.apiUrl + 'Auth/Authorize', this.params).pipe(
      tap(res => this.setSession(res)),
      shareReplay(),
    );
  }

  private setSession(authResult: any) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("token");
    //localStorage.removeItem("expires_at");
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  public isLoggedIn(){
    return localStorage.getItem('token');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration!);
  //   return moment(expiresAt);
  // }
}
