import { Component, OnInit, Input } from '@angular/core';
import { Data } from './data';

@Component({
  selector: 'app-unattended-student',
  templateUrl: './unattended-student.component.html',
  styleUrls: ['./unattended-student.component.css']
})
export class UnattendedStudentComponent implements OnInit {

  @Input() graphData: any = [];

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
    // Object.assign(this, {Data});
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
