import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.css']
})
export class DashboardSummaryComponent implements OnInit {

  @Input() numberOfStudentPlaced: number;
  @Input() totalStudentgraduated: number;
  @Input() averageOffers: number;
  @Input() maximumOffers: number;
  @Input() totalVisitedCompanies: number;

  constructor() { }

  ngOnInit() {
  }

}
