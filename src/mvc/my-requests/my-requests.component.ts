import { Component, Inject, OnInit } from '@angular/core';
import { RequestService } from '../services/http/request/request.service';
import { Request } from '../models/request/request.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { WorkOnRequestServiceService } from '../services/http/workOnRequestService/work-on-request-service.service';
import { Service } from '../models/service/service.model';
import { WorkOnRequestService } from '../services/http/workOnRequest/work-on-request.service';
import { WorkOnRequest } from '../models/workOnRequest/work-on-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    });
  }

  public refreshCompletedRequests(): void {
    this.requestService.GetMyCompletedAll().subscribe(data => {
      this.completedRequests = data;
      this.completedRequestsLoaded = true;
    });
  }

  public createWorkOnRequest(request: Request): void {
    const dialogRef = this.dialog.open(AddWorkOnRequestDialog, {data: {request}, width: '30vw' })
  }
}
@Component({
  selector: 'add-work-on-request-dialog',
  templateUrl: 'add-work-on-request-dialog.html',
})
export class AddWorkOnRequestDialog implements OnInit {

  public services: Service[];

  public service: FormControl;
  public comment: FormControl;

  public workOnRequest: WorkOnRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private workOnRequestService: WorkOnRequestService, 
              private workOnRequestServices: WorkOnRequestServiceService, private dialogRef: MatDialogRef<MyRequestsComponent>,
              private snackBar: MatSnackBar,) {
    this.service = new FormControl('', [Validators.required]);
    this.comment = new FormControl('', [Validators.required]);
    this.services = new Array<Service>;
    this.workOnRequest = new WorkOnRequest();
  }


  ngOnInit(): void {
    this.refreshServices();
  }

  public refreshServices(): void {
    this.workOnRequestServices.GetAll().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        console.log(error.error);
      },
    })
  }

  public createWorkOnRequest(): void {
    this.workOnRequest.serviceId = this.service.value;
    this.workOnRequest.comment = this.comment.value;
    this.workOnRequest.requestId = this.data.request.id;
    this.workOnRequestService.AddMy(this.workOnRequest).subscribe({
      next: (data) => {
        this.snackBar.open('Работа добавлена', 'Ок', { duration: 5000, panelClass: "classicSnackBar" });
      },
      error: (error) => {
        console.log(error.error);
      },
    })
    this.dialogRef.close();
  }
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