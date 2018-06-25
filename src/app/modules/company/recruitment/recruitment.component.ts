import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { MatTab, MatTabLink } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  masterValue: any;
  status: any;
  router: any;
  routeLinks: any = [];
  activeLinkIndex = 0;
  labelData: any;
  RecruitmentMenuActive: any;

  constructor(private _router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {

    this.RecruitmentMenuActive = activatedRoute.snapshot.children[0].url;

    if (window.location.href.indexOf('campus') > -1) {
      this.status = '/campus';
      console.log(this.status);
    } else if (window.location.href.indexOf('company') > -1) {
      this.status = '/company';
    } else {
      this.router = _router;
      console.log(this.router.url);
    }

    switch (this.status) {
      case '/campus':
      case '/campus/campusMaster':

        this.masterValue =
          [

            {

              'urlLink': 'campusDrive',
              'urlName': 'Drive'
            },
            {

              'urlLink': 'campusEvent',
              'urlName': 'Event'
            },


          ];


        break;
      case '/company':
        this.masterValue =
          [

            {

              'urlLink': 'employerDrive',
              'urlName': 'Drive'
            },
            {

              'urlLink': 'employerEvent',
              'urlName': 'Event'
            },


          ];
        break;


      default:
        console.log('default');
        this.masterValue =
          [

            {

              'urlLink': 'employerDrive',
              'urlName': 'Drive'
            },
            {

              'urlLink': 'employerEvent',
              'urlName': 'Event'
            },


          ];
        break;
    }
  }
  RecMenuActiveFun(list): void {
    // alert('hhh'+list);
this.RecruitmentMenuActive = list;
}

  ngOnInit() {
    // ----------service call to get dynamic labels list
    //     this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // this.routeLinks = [
    //   { label: this.labelData.drive, link: 'employerDrive' },
    //   { label: this.labelData.event, link: 'employerEvent' },

    // ];
  }






}
