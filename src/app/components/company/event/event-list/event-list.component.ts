import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventListService } from '../../../../services/company/event/eventList/event-list.service';
import { CookieService } from 'angular2-cookie/core';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  eventStatus: any;
  totalEvents: any;
  showSearch: boolean;
  @Input() filterQuery;
  @Input() showFilter: any;
  @Output() showFilterChange = new EventEmitter<any>();

  data: any;
  // public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';
  list = false;
  labelData: any;
  sendList: any;
  loginData: any;
  eventTotData: any;
  constructor(private eventList: EventListService, private cookieService: CookieService,
  private localStorage: LookUpGetAndSetLocalSrorage) { }

  ngOnInit() {
    this.eventStatus = this.localStorage.getLookUpData('EMPLOYER_EVENT_STATUS_CODE', null);
    this.loginData = this.cookieService.getObject('loginResponce');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.eventTotData = function () {
      this.eventList.getEvents(this.loginData.companyId).subscribe(data => {
        this.totalEvents = data;
        this.data = this.totalEvents;
        this.data =  this.data.filter( function(events) {
         return events.eventStatusValueId !== 321;
        });
      });
    };
    this.eventTotData();
  }
  showInactiveEvents(event) {
    if (event.srcElement.checked) {
      this.data = this.totalEvents;
   } else {
     this.data =  this.totalEvents.filter( function(events) {
       return events.eventStatusValueId !== 321;
      });
   }
  }
  viewEvent(event) {
    this.list = true;
    this.sendList = event;
    this.showSearch = false;
    this.showFilter = true;
    this.showFilterChange.emit(this.showFilter);
  }

}
