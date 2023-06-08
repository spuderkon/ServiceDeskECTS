import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/http/request/request.service';
import { Request } from '../models/request/request.model';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  request: Request;
}

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  public activeRequests: Array<Request>;
  public completedRequests: Array<Request>;
  public completedRequestsLoaded: boolean;

  constructor(private requestService: RequestService, public dialog: MatDialog) {
    this.activeRequests = new Array<Request>;
    this.completedRequests = new Array<Request>;
    this.completedRequestsLoaded = false;
  }

  ngOnInit(): void {
    this.refreshActiveRequests();
  }

  private refreshActiveRequests(): void {
    this.requestService.GetMyByImpActiveAll().subscribe(data => {
      this.activeRequests = data;
      console.log(this.activeRequests);
    });
  }

  public refreshCompletedRequests(): void {
    this.requestService.GetMyCompletedAll().subscribe(data => {
      this.completedRequests = data;
      this.completedRequestsLoaded = true;
    });
  }

  // public openRequestInfo(request: Request) {
  //   const dialogRef = this.dialog.open(RequestInfoDialogA, { data: { request } })
  // }

  // public completeRequest(request: Request) {
  //   const dialogRef = this.dialog.open(CompleteRequestDialogA);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == true) {
  //       request.isComplete = true;
  //       this.requestService.Update(request).subscribe(
  //         {
  //           next: (data) => {
  //             this.activeRequests.splice(this.activeRequests.indexOf(request, 0), 1);
  //             this.completedRequests.push(request);
  //           },
  //           error: (error) => { console.log(error) },
  //         }
  //       )
  //     }
  //   });
  // }

  // public changeRequest(request: Request) {
  //   const dialogRef = this.dialog.open(ChangeRequestDialogA, { data: { request } }); 
  // }
}
