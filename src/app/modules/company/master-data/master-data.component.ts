import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatTab, MatTabLink } from '@angular/material';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {
  routeLinks: any = [];
  activeLinkIndex = 0;
  labelData: any;

  constructor(private router: Router,private cookieService: CookieService) {
}

  ngOnInit() {
    // ----------service call to get dynamic labels list
   // this.labelData = this.cookieService.getObject('labelData');
   this.labelData = JSON.parse(localStorage.getItem('labelData'));;

    this.routeLinks = [
      {label: this.labelData.company, link: 'company'},  
      {label: this.labelData.organisation, link: 'organisation'},
    ];
  }


}
