import { EventDetailsModel } from './event-detail.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  name = 'vijay';
  EventDetail: EventDetailsModel = {
    companyName: this.name,
    cgpa: 4,
    eventDescription: 'Ding Dong',
    comanyEventName: 'Dong Ding',
    jobRole: 'engineer',
  };


  constructor(
  ) { }

  ngOnInit() {
  }

}
