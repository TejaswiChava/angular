import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-recent-placements',
  templateUrl: './recent-placements.component.html',
  styleUrls: ['./recent-placements.component.css']
})
export class RecentPlacementsComponent implements OnInit {

  @Input() rows: any = [];
  @Input() columns: any = [];
  loadingIndicator = true;
  reorderable = true;

  // rows = [
  //   { 'Student Name': 'Austin', 'Placed in Company': 'TCS', 'Department': 'Swimlane', 'Program': 'Program Name' },
  //   { 'Student Name': 'Dany', 'Placed in Company': 'Wipro', 'Department': 'KFC', 'Program': 'Program Name'},
  //   { 'Student Name': 'Molly', 'Placed in Company': 'Oracle', 'Department': 'Burger King', 'Program': 'Program Name' },
  //   { 'Student Name': 'Austin', 'Placed in Company': 'TCS', 'Department': 'Swimlane', 'Program': 'Program Name' },
  //   { 'Student Name': 'Dany', 'Placed in Company': 'Wipro', 'Department': 'KFC', 'Program': 'Program Name'},
  //   { 'Student Name': 'Molly', 'Placed in Company': 'Oracle', 'Department': 'Burger King', 'Program': 'Program Name' },
  // ];

  // columns = [
  //   { prop: 'Student Name' },
  //   { prop: 'Placed in Company' },
  //   { prop: 'Department' },
  //   { prop: 'Program'}
  // ];

  constructor() { }

  ngOnInit() {
  }

}
