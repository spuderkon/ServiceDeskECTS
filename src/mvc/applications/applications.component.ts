import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { now } from 'moment';
import { RequestService } from '../services/http/request/request.service';
import { Request } from '../models/request/request.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  requests: Request[];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.refreshRequests();
  }

  private refreshRequests(): void {
    this.requestService.GetMyAll().subscribe(data =>{
      this.requests = data;
    })
  }

  qwe(){
    console.log('qwe');
  }
}
