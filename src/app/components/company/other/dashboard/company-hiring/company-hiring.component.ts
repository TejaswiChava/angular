import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators,  FormBuilder , NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-hiring',
  templateUrl: './company-hiring.component.html',
  styleUrls: ['./company-hiring.component.css']
})
export class CompanyHiringComponent implements OnInit {

 // Define the chart options here
@Input() data: any = [];
@Input() companyOrgDetails;
view: any[] = [580, 310];
@Output() selectedOrgId: EventEmitter<number> = new EventEmitter<number>();
selOrgId: number;


// options
showLegend = true;
legendTitle = 'Hiring Chart';

colorScheme = {
  domain: ['#6cc3bd', '#5a819e', '#7c7aa1', '#f67e7d', '#ffc1a8', '#ffe5c4']
};

// pie
showLabels = true;
explodeSlices = false;
doughnut = false;



constructor() {
}

onSelect(event) {
  console.log(event);
  
}

onSelectDropdown(organizationId: number){
  this.selOrgId=organizationId;
  this.selectedOrgId.emit(this.selOrgId);
}

  ngOnInit() {
  }

  

}
