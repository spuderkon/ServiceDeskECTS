import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, share, shareReplay, tap } from 'rxjs/operators';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl: string = 'https://localhost:44399/';
  private params = new HttpParams()

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(this.apiUrl + 'Auth/Authorize', this.params).pipe(
      tap((token: any) => this.setSession(token.token)),
    );
  }

  private setSession(token: string) {
    localStorage.setItem('token', token);
    const decodedToken = this.getDecodedAccessToken();
    const expiresAt = moment().add(decodedToken.exp, 'second');
    localStorage.setItem('role',decodedToken.role);
    localStorage.setItem("expires_At", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem('role')
    localStorage.removeItem("expires_At");
    this.router.navigate(['/auth']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }


  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem('token')!);
    } catch (Error) {
      return null;
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_At");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  getRole(): string {
    try {
      const role = localStorage.getItem('role');
      return String(role);
    }
    catch (Error) {
      return '';
    }
  }
}
