import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortlisted-student',
  templateUrl: './shortlisted-student.component.html',
  styleUrls: ['./shortlisted-student.component.css']
})
export class ShortlistedStudentComponent implements OnInit {

  // Define the chart options here
  data: any[];
  // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
  view: any[] = [289, 250];

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Subject';
  showYAxisLabel = false;
  yAxisLabel = 'Student';

  colorScheme = {
    domain: ['#6cc3bd', '#5a819e', '#7c7aa1', '#f67e7d', '#ffc1a8', '#ffe5c4']
  };

  constructor() {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
