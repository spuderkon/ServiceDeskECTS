import { Component, OnInit } from '@angular/core';
import { Request } from '../models/request/request.model';
import { RequestService } from '../services/http/request/request.service';

@Component({
  selector: 'app-submitted-applications',
  templateUrl: './submitted-applications.component.html',
  styleUrls: ['./submitted-applications.component.css']
})
export class SubmittedApplicationsComponent implements OnInit {

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
  
}
