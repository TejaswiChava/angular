import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() rows: any = [];
  @Input() columns: any = [];
  loadingIndicator = false;
  reorderable = true;

  // rows = [
  //   { 'Event Name': 'Electronics', 'Date': '25/05/1994', 'Event Type': 'Off Campus', 'No of Students': 15},
  //   { 'Event Name': 'Computer', 'Date':  '25/05/1994', 'Event Type': 'On Campus', 'No of Students': 25},
  //   { 'Event Name': 'Computer', 'Date':  '25/05/1994', 'Event Type': 'Off Campus', 'No of Students': 35},
  //   { 'Event Name': 'Electronics', 'Date':  '25/05/1994', 'Event Type': 'Off Campus', 'No of Students': 20},
  //   { 'Event Name': 'Computer', 'Date':  '25/05/1994', 'Event Type': 'On Campus', 'No of Students': 18},
  //   { 'Event Name': 'Computer', 'Date':  '25/05/1994', 'Event Type': 'On Campus', 'No of Students': 23},
  // ];

  // columns = [
  //   { prop: 'Event Name' },
  //   { prop: 'Date' },
  //   { prop : 'Event Type'},
  //   { prop : 'No of Students'}
  // ];

  constructor() { }

  ngOnInit() {
  }

}
