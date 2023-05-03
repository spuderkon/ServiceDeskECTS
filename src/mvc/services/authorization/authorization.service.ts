import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, share, shareReplay, tap } from 'rxjs/operators';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl: string = 'https://localhost:44399/';
  private params = new HttpParams()

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string) {
    this.params = new HttpParams().set('username', userName).set('password', password);
    return this.http.post(this.apiUrl + 'Auth/Authorize', this.params).pipe(
      tap((token: any) => this.setSession(token.token, userName, password)),
    );
  }

  private setSession(token: string, userName: string, password: string): void {
    const encrypted = crypto.AES.encrypt(password, 'password');
    localStorage.setItem('token', token);
    const decodedToken = this.getDecodedAccessToken();
    const expiresAt = moment().add(decodedToken.exp, 'seconds');
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', encrypted.toString());
    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem("expires_At", JSON.stringify(expiresAt.valueOf()));
  }

  public refreshToken(): void {
    const bytes = crypto.AES.decrypt(localStorage.getItem('password')!, 'password');
    let userName: string = localStorage.getItem('userName')!;
    let password: string = bytes.toString(crypto.enc.Utf8);
    this.login(userName, password);
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  public isLoggedIn(): boolean {
    if (moment().isBefore(this.getExpiration())) {
      return true;
    }
    else{
      if (localStorage.getItem('userName') != null && localStorage.getItem('password') != null){
        this.refreshToken();
        return true;
      }
      return false;
    }
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }


  public getDecodedAccessToken(): any {
    return jwt_decode(localStorage.getItem('token')!);
  }

  public getExpiration(): moment.Moment {
    const expiration = localStorage.getItem("expires_At");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  public getRole(): string {
    try {
      return String(localStorage.getItem('role'));
    }
    catch (Error) {
      return '';
    }
  }

  public isNotClient(): boolean {
    return this.getRole() != 'client'
  }
}
