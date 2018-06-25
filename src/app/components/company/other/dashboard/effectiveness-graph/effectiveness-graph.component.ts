import { Component, OnInit, Input } from '@angular/core';
import { single, multi } from './data';
@Component({
  selector: 'app-effectiveness-graph',
  templateUrl: './effectiveness-graph.component.html',
  styleUrls: ['./effectiveness-graph.component.css']
})
export class EffectivenessGraphComponent implements OnInit {

   // Define the chart options here
   single: any[];
   @Input() multi: any = [];
   // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
   view: any[] = [289, 250];

   // Options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = false;
   xAxisLabel = 'Job Role';
   showYAxisLabel = false;
   yAxisLabel = 'Selected For/Shortlisted For Position';

   colorScheme = {
     domain: ['#6cc3bd', '#5a819e']
   };

   constructor() {
   }

   onSelect(event) {
     console.log(event);
   }

  ngOnInit() {
  }

}
