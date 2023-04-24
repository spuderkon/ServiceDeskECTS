import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  id: number;

  constructor(private currentRoute: ActivatedRoute) {
    this.id = currentRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
