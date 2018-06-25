import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-com-recent-placements',
  templateUrl: './com-recent-placements.component.html',
  styleUrls: ['./com-recent-placements.component.css']
})
export class ComRecentPlacementsComponent implements OnInit {

  loadingIndicator = true;
  reorderable = true;
  @Input() rows: any = [];
  @Input() columns: any = [];
  // rows = [
  //   { 'Program Name': 'Prg 1', 'Campus Name': 'Campus 1', 'Job Role': 'QA Engineer'},
  //   { 'Program Name': 'Prg 2', 'Campus Name': 'Campus 2', 'Job Role': 'Software Engineer'},
  //   { 'Program Name': 'Prg 3', 'Campus Name': 'Campus 3', 'Job Role': 'Node Developer'},
  //   { 'Program Name': 'Prg 4', 'Campus Name': 'Campus 4', 'Job Role': 'Backend Engineer' },
  //   { 'Program Name': 'Prg 5', 'Campus Name': 'Campus 5', 'Job Role': 'QA Engineer'},
  //   { 'Program Name': 'Prg 6', 'Campus Name': 'Campus 6', 'Job Role': 'Software Engineer' },
  // ];

  // columns = [
  //   { prop: 'Program Name' },
  //   { prop: 'Campus Name' },
  //   { prop: 'Job Role' }
  // ];

  constructor() { }

  ngOnInit() {
  }

}
