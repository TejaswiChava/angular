import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriveListViewComponent } from './drive-list-view/drive-list-view.component';


@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
})
export class DriveComponent implements OnInit {
  dumyShow = true;
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
    };
  }
  showFilter = false;
  showaddBtn = true;
  filterQuery: any;
  selectedDrive1: any;
  showListComponent: any;
  showListView = true;
  isSearchActive: boolean;
  ngOnInit() {
    this.isSearchActive = false;
    this.filterQuery = '';
  }
  addDrive() {
    // this.showaddBtn = false;
    this.showListView = false;
    this.isSearchActive = true;

  }

  cancelDrive() {
    // this.showaddBtn = true;
    this.showListView = true;
    this.showListComponent = true;
    this.isSearchActive = false;
    this.filterQuery = '';
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }
}
