import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-com-drive',
  templateUrl: './com-drive.component.html',
  styleUrls: ['./com-drive.component.css']
})
export class ComDriveComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;

  @Input() rows: any = [];
  @Input() columns: any = [];

  // rows = [
  //   { 'Drive Name': 'QA Hiring', 'No. of Events': 8, 'Events Scheduled': 2, 'Events in Progress': 2 },
  //   { 'Drive Name': 'Node Hiring', 'No. of Events': 5, 'Events Scheduled': 2, 'Events in Progress': 2 },
  //   { 'Drive Name': 'FrontEnd Developers', 'No. of Events': 4, 'Events Scheduled': 2, 'Events in Progress': 2 },
  //   { 'Drive Name': 'BackEnd Developers', 'No. of Events': 6, 'Events Scheduled': 2, 'Events in Progress': 2 },
  //   { 'Drive Name': 'Angular Hiring', 'No. of Events': 7, 'Events Scheduled': 2, 'Events in Progress': 2 },
  //   { 'Drive Name': 'FullStack Developer', 'No. of Events': 3, 'Scheduled and Progress': 2, 'Events in Progress': 2 },
  // ];

  // columns = [
  //   { prop: 'Drive Name' },
  //   { prop: 'No. of Events'},
  //   { prop: 'Events Scheduled' },
  //   { prop: 'Events in Progress' }
  // ];


  constructor() { }

  ngOnInit() {
  }

}
