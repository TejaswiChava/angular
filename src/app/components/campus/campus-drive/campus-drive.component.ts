import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr';
import { CampusDriveListViewComponent } from './campus-drive-list-view/campus-drive-list-view.component';

@Component({
  selector: 'app-campus-drive',
  templateUrl: './campus-drive.component.html',
  styleUrls: ['./campus-drive.component.css'],
})
export class CampusDriveComponent implements OnInit {

  constructor(private router: Router) {
    if (window.location.href.indexOf('campus/placement') > -1) {
      this.router.navigateByUrl('campus/placement/campusDrive');
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   };
  }
hideSearchAdd = false; 
addEve=true;
  showaddBtn = true;
  selectedDrive1: any;
  showListComponent: any;
  showListView = true;
  showFilter = true;
  filterQuery: any;
  driveList1: boolean;
  

  ngOnInit() {
  }

  addEveData(value:boolean){
    this.addEve=value;
  }
  addDrive() {
    this.showListView = false;
    this.driveList1 = false;
    this.hideSearchAdd = true; 
  }

  cancelDrive() {
    this.showListView = true;
    this.showListComponent = true;
    this.hideSearchAdd = false; 
    this.router.navigated = false;
    this.router.navigate([this.router.url]); 
  }
}
