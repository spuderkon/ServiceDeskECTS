import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { now } from 'moment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
    let token = this.authService.getDecodedAccessToken();
    console.log(localStorage.getItem('token'));
    console.log(token.exp);
    console.log( token.exp * 1000)
    console.log(this.authService.getExpiration());
  }

}
