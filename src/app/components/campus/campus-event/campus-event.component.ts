import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {CreateCampusEventComponent} from './create-campus-event/create-campus-event.component';

@Component({
  selector: 'app-campus-event',
  templateUrl: './campus-event.component.html',
  styleUrls: ['./campus-event.component.css']
})
export class CampusEventComponent implements OnInit {
  list = false;
  addEve=false;
  filterQuery: any;
  isSearchActive = false;
  
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      this.addEve=false;
      return false;
   };
  }
  ngOnInit() {
  }

  addEveData(value:boolean){
    this.addEve=value;
  }
  addEvent() {
    this.list = true;
    this.addEve = true;
    this.isSearchActive = true;
  }
  cancelEvents() {
    this.list = false;
    this.addEve = false;
    this.isSearchActive =false;
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

}
