import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-campus-search-list-view',
  templateUrl: './campus-search-list-view.component.html',
  styleUrls: ['./campus-search-list-view.component.css']
})
export class CampusSearchListViewComponent implements OnInit, OnChanges {
  @Input() campusSearchList;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'campusName';
  public sortOrder = 'asc';
  data: any = [];

  constructor() { }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.campusSearchList) {
      //  this.data = this.campusSearchList;

      // you will get the parent component details here
    }

  }
}
