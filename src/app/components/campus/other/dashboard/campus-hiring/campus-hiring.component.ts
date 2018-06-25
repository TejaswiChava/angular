import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Data } from './data';

import { CampusDashboardService } from '../campus-dashboard.service';
import { CampusHomeComponent } from '../campus-home.component';
import { CookieService } from 'angular2-cookie/services';
import { GraphsData } from '../campus-dashboard.model';


@Component({
  selector: 'app-campus-hiring',
  templateUrl: './campus-hiring.component.html',
  styleUrls: ['./campus-hiring.component.css']
})
export class CampusHiringComponent implements OnInit {
  loginData: Object;
  departmentId: any;
  campusId: any;
  sethiringGraphData: any;

  // Define the chart options here
  @Input() graphData: any = [];
  @Input() deptData;
  @Output()  childDepartments: EventEmitter<number> = new EventEmitter<number>() ;
  view: any[] = [580, 310];



  // options
  showLegend = true;
  legendTitle = 'Departments Placed';

  colorScheme = {
    domain: ['#6cc3bd', '#5a819e', '#7c7aa1', '#f67e7d', '#ffc1a8', '#ffe5c4']
  };

  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  graphDataResponse: any;
  result: GraphsData[];

  constructor(
    private campusService: CampusDashboardService,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
  }

  onSelectDropDown(departmentId) {
    this.childDepartments.emit(departmentId);
      }

  onSelect(event) {
    console.log(event);
  }
}
