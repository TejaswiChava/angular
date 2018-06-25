import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { CampusEventService } from '../../../../services/campus/event/campus-event.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';

@Component({
  selector: 'app-campus-event-list',
  templateUrl: './campus-event-list.component.html',
  styleUrls: ['./campus-event-list.component.css'],
})
export class CampusEventListComponent implements OnInit, OnChanges {
  eventStatus: any;
  allEvents: any;
  campusEvents: any;
  loginData: any;
  campusEventList: any;
  data: any;
  list = false;
  sendList: any;
  @Input() filterQuery;
  @Input() addEve;
  @Output() addEveData = new EventEmitter(); 
  // @Output() hideShowSA = new EventEmitter<boolean>();
 // public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';
  constructor(private cEvent: CampusEventService, private cookieService: CookieService,
  private localStorage: LookUpGetAndSetLocalSrorage) {
    this.loginData = this.cookieService.getObject('loginResponce');
   }

  ngOnInit() {
    this.eventStatus = this.localStorage.getLookUpData('EDUCATION_EVENT_STATUS_CODE', null);
    this.cEvent.getCampusEventList(this.loginData.campusId).subscribe(data => {
      this.allEvents = data;
      this.data = this.allEvents;
      this.data = this.data.filter(function(events){
        return events.eventStatusValueId !== 244;
      });
    });
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  showInactiveEvents(event) {
    if (event.target.checked) {
      this.data = this.allEvents;
   } else {
     this.data =  this.allEvents.filter( function(events) {
       return events.eventStatusValueId !== 244;
      });
   }
  }
  viewEvent(eventData) {
    this.list = true;
    this.sendList = eventData;
    this.addEve = true;
    this.addEveData.emit(this.addEve);
  }
}
