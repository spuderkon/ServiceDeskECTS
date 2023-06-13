import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  //login and password formcontrols
  public userLogin: FormControl;
  public userPassword: FormControl;
  public dataIsLoading: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.userLogin = new FormControl('PerOleg', [Validators.required, Validators.pattern('^[a-zA-Z]+$')])
    this.userPassword = new FormControl('123', [Validators.required])
  }

  ngOnInit(): void {

  }

  public login(): void {
    this.dataIsLoading = true
    this.authService.authorize(this.userLogin.value, this.userPassword.value)
      .subscribe({
        next: (data) => {
          if (this.authService.getRole() == 'admin' || this.authService.getRole() == 'laborant') {
            this.router.navigate(['/requests'])
          }
          else {
            this.router.navigate(['/submittedRequests'])
          }
        },
        error: (error) => (
          console.log(error.error),
          this.snackBar.open('Данные введены неверно', 'Ок', { duration: 5000, panelClass: ['classicSnackBar'] }), this.dataIsLoading = false),
      });
  }

  public clearValue(value: FormControl): void {
    value.setValue('');
  }

  public getLoginErrorMessage(): string {
    if (this.userLogin.hasError('required')) {
      return 'Поле UserName является обязательным';
    }
    return this.userLogin.hasError('pattern') ? 'Только латинские буквы' : '';
  }
}