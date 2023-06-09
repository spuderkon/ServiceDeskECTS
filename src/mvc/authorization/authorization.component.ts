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
  userLogin: FormControl;
  userPassword: FormControl;
  dataIsLoading: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.userLogin = new FormControl('PerOleg', [Validators.required, Validators.pattern('^[a-zA-Z]+$')])
    this.userPassword = new FormControl('123', [Validators.required])
  }

  ngOnInit(): void {
    
  }

  login(): void {
    this.dataIsLoading = true
    this.authService.authorize(this.userLogin.value, this.userPassword.value)
      .subscribe({
        next: () => (this.router.navigate(['/'])),
        error: (error) => (
          console.log(error),
          this.snackBar.open('Данные введены неверно', 'Ок', {duration: 5000,panelClass: ['classicSnackBar']}), this.dataIsLoading = false),
      });
  }

  clearValue(value: FormControl): void {
    value.setValue('');
  }

  getLoginErrorMessage(): string {
    if (this.userLogin.hasError('required')) {
      return 'Поле UserName является обязательным';
    }
    return this.userLogin.hasError('pattern') ? 'Только латинские буквы' : '';
  }
}

// @Component({
//   selector: 'snackBarError',
//   templateUrl: 'snackBarError.html',
//   styles: [
//     `
//     :host {
//       display: flex;
//     }

//     .example-pizza-party {
//       color: hotpink;
//     }
//   `,
//   ],
// })
// export class SnackBarError {
//   snackBarRef = inject(MatSnackBarRef);
// }