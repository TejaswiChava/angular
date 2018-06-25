import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avg-salary',
  templateUrl: './avg-salary.component.html',
  styleUrls: ['./avg-salary.component.css']
})
export class AvgSalaryComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;
  @Input() rows: any = [];
  @Input() columns: any = [];
  // rows = [
  //   { 'Department Name': 'Electronics', 'Avg. Sale': 38000},
  //   { 'Department Name': 'Computer', 'Avg. Sale': 38000},
  //   { 'Department Name': 'Computer', 'Avg. Sale': 38000},
  //   { 'Department Name': 'Electronics', 'Avg. Sale': 28000},
  //   { 'Department Name': 'Computer', 'Avg. Sale': 35000},
  //   { 'Department Name': 'Computer', 'Avg. Sale': 3000},
  // ];

  // columns = [
  //   { prop: 'Department Name' },
  //   { prop: 'Avg. Sale' },
  // ];


  constructor() { }

  ngOnInit() {
  }

}
