import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceDeskECTS';

  constructor(public router:Router, private authService: AuthorizationService){

  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
