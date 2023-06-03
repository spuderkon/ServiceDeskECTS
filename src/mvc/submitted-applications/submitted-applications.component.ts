import { Component, OnInit } from '@angular/core';
import { Request } from '../models/request/request.model';
import { RequestService } from '../services/http/request/request.service';

@Component({
  selector: 'app-submitted-applications',
  templateUrl: './submitted-applications.component.html',
  styleUrls: ['./submitted-applications.component.css']
})
export class SubmittedApplicationsComponent implements OnInit {

  activeRequests: Request[];
  completedRequests: Request[];

  constructor(private requestService:RequestService) { }

  ngOnInit(): void {
    this.refreshActiveRequests();
  }

  private refreshActiveRequests(): void {
    this.requestService.GetMyActiveAll().subscribe(data =>{
      this.activeRequests = data;
    });
  }

  public refreshCompletedRequests(): void {
    this.requestService.GetMyCompletedAll().subscribe(data =>{
      this.completedRequests = data;
    });
  }

  
  
  public openRequestInfo(request: Request){
    
  }
}
