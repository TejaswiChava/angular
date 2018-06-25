import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input()data: any[];
  // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
  view: any[] = [ 483, 310 ];

  // Options
  gradient = false;
  showLegend = false;
  showLabels = true;
  doughnut = false;

  colorScheme = {
    domain: ['#6cc3bd', '#5a819e', '#7c7aa1', '#f67e7d', '#ffc1a8', '#ffe5c4', '#DC143C']
  };

  constructor() {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

  }

}
