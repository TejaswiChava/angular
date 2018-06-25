import { Component, OnInit, Input } from '@angular/core';
import { single, multi } from './data';

@Component({
  selector: 'app-com-event-calender',
  templateUrl: './com-event-calender.component.html',
  styleUrls: ['./com-event-calender.component.css']
})
export class ComEventCalenderComponent implements OnInit {

   // Define the chart options here
   single: any[];
  @Input() multi: any = [];
   // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
   view: any[] = [289, 250];

   // Options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = false;
   showXAxisLabel = false;
   xAxisLabel = 'Job Role';
   showYAxisLabel = false;
   yAxisLabel = 'Open/Filled Position';

   colorScheme = {
     domain: ['#7c7aa1', '#f67e7d']
   };

   constructor() {
   }

   onSelect(event) {
     console.log(event);
   }

  ngOnInit() {
  }

}
