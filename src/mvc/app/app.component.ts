import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceDeskECTS';

  constructor(public router:Router, private authService: AuthService){

  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
  }
}
