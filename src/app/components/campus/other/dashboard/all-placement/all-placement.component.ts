import { Component, OnInit, Input } from '@angular/core';
import { Data } from './data';

@Component({
  selector: 'app-all-placement',
  templateUrl: './all-placement.component.html',
  styleUrls: ['./all-placement.component.css']
})
export class AllPlacementComponent implements OnInit {

  @Input() allPlacementData: any = [];
  data: any = [];
  view: any[] = [289, 250];

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#6cc3bd', '#5a819e', '#7c7aa1', '#f67e7d', '#ffc1a8', '#ffe5c4']
  };

  constructor() {
    // Object.assign(this, {Data});
  }

  onSelect(event) {
  }

  ngOnInit() {
  }

}
