import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-dashboard-summary',
  templateUrl: './company-dashboard-summary.component.html',
  styleUrls: ['./company-dashboard-summary.component.css']
})
export class CompanyDashboardSummaryComponent implements OnInit {


  @Input() activeDrives =  4;
  @Input() eventsSchedules = 4;
  @Input() eventsInProgress = 2;
  @Input() eventsClosed = 1;
  @Input() openPosition = 10;
  @Input() positionFilled = 90;

  constructor() { }

  ngOnInit() {
  }

}
