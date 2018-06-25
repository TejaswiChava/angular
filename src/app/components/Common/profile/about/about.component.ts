import { Component, OnInit } from '@angular/core';
import { AboutCompanyService } from './../../../../services/company/profile/about-company.service';

@Component({
  selector: 'app-about-company',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutCompanyComponent implements OnInit {

  constructor(private companyService: AboutCompanyService) { }

    ngOnInit() {
    }
}
