import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  filterQuery: any;
  list = false;
  isSearchActive = false;
  showFilter = false;
  constructor(
    private router: Router,
    private EventListComponent: EventListComponent
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  ngOnInit() {}

  addEvent() {
    this.list = true;
    this.isSearchActive = true;
  }
  cancelEvents() {
    this.list = false;
    this.isSearchActive = false;
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }
}
