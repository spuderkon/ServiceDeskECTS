import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  id: number;

  constructor(private currentRoute: ActivatedRoute) {
    this.id = currentRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
