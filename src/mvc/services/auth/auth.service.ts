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
export class AuthService {

  private apiUrl: string = 'https://localhost:5001/Auth';
  private httpParams = new HttpParams();
  private headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) { }

  public authorize(userName: string, password: string) {
    console.log('Loggining');
    this.httpParams = new HttpParams().set('username', userName).set('password', password);
    return this.http.post(this.apiUrl + '/Authorize', this.httpParams).pipe(
      tap((token: any) => (this.setSession(token.token, userName, password)),
    ));
  }

  public setNewPassword(userName: string, password: string){
    this.httpParams = new HttpParams().set('username', userName).set('password', password);
    return this.http.post(this.apiUrl + '/SetNewPassword', this.httpParams, {headers: this.headers})
  }

  private setSession(token: string, userName: string, password: string): void {
    console.log('Setting session')
    const encrypted = crypto.AES.encrypt(password, 'password');
    localStorage.setItem('token', token);
    const decodedToken = this.getDecodedToken();
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', encrypted.toString());
    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem('id', decodedToken.id)
    localStorage.setItem("expires_At", JSON.stringify(decodedToken.exp * 1000));
  }

  public testRefreshingToken(): void {
    //Fake expiration date
    localStorage.setItem("expires_At", JSON.stringify(1684260000* 1000));
  }

  public refreshToken() {
    console.log('refreshing token...')
    const bytes = crypto.AES.decrypt(localStorage.getItem('password')!, 'password');
    let userName: string = localStorage.getItem('userName')!;
    let password: string = bytes.toString(crypto.enc.Utf8);
    this.httpParams = new HttpParams().set('username', userName).set('password', password);
    console.log(this.httpParams);
    this.http.post(this.apiUrl + '/Authorize', this.httpParams).subscribe({
      next: (data: any) => {
        console.log(data.token);
        this.setSession(data.token,userName,password);
      },
      error: (error) => {
        console.log(error.error);
      },
    })
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  public isLoggedIn(): boolean {
    if (this.getExpirationDate() > new Date()) {
      //this.testRefreshingToken();
      return true;
    }
    else {
      if (localStorage.getItem('userName') != null && localStorage.getItem('password') != null) {
        this.refreshToken();
        return true;
      }
      return false;
    }
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }


  public getDecodedToken(): any {
    return jwt_decode(localStorage.getItem('token')!);
  }

  public getExpirationDate(): Date {
    return new Date(Number(localStorage.getItem('expires_At')));
  }

  public getRole(): string {
    return String(localStorage.getItem('role'));
  }

  public isClient(): boolean {
    return this.getRole() == 'client';
  }

  public isAdmin(): boolean {
    return this.getRole() == 'admin';
  }
}
