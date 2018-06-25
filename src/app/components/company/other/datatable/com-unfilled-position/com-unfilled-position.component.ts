import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-com-unfilled-position',
  templateUrl: './com-unfilled-position.component.html',
  styleUrls: ['./com-unfilled-position.component.css']
})
export class ComUnfilledPositionComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;

  rows = [
    { 'Job Role': 'Electronics', 'No. of Positions': 10},
    { 'Job Role': 'Computer', 'No. of Positions': 20},
    { 'Job Role': 'Computer', 'No. of Positions': 30},
    { 'Job Role': 'Electronics', 'No. of Positions': 5},
    { 'Job Role': 'Computer', 'No. of Positions': 6},
    { 'Job Role': 'Computer', 'No. of Positions': 8},
  ];

  columns = [
    { prop: 'Job Role' },
    { prop: 'No. of Positions' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
