import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {

  @Input()data: any[];
  // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
  view: any[] = [ 350 , 350  ];

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;

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
