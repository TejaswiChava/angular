import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-com-upcoming-events',
  templateUrl: './com-upcoming-events.component.html',
  styleUrls: ['./com-upcoming-events.component.css']
})
export class ComUpcomingEventsComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;
  @Input() rows: any = [];
  @Input() columns: any = [];
  constructor() { }

  ngOnInit() {
  }

}
