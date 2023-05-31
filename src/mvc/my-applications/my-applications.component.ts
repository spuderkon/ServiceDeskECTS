import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/http/request/request.service';
import { Request } from '../models/request/request.model';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

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
