import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { MatTab, MatTabLink } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  masterValue: any;
  status: any;
  router: any;
  routeLinks: any = [];
  activeLinkIndex = 0;
  labelData: any;
  MasterMenuActive : any;

  constructor(private _router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {


  // console.log('ssssssssssssssssssss' + activatedRoute.snapshot.url);
  // console.log('aaaaaaaaaaaaaaaaaaaaaaa' + activatedRoute.snapshot.children[0].url);
  this.MasterMenuActive = activatedRoute.snapshot.children[0].url;
  

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

              'urlLink': 'institutes',
              'urlName': 'Institute'
            },
            {

              'urlLink': 'department',
              'urlName': 'Department'
            },
            {

              'urlLink': 'programme',
              'urlName': 'Programme'
            },


          ];


        break;
      case '/company':
        this.masterValue =
          [

            {

              'urlLink': 'companies',
              'urlName': 'Company'
            },
            {

              'urlLink': 'organization',
              'urlName': 'Organization'
            },


          ];
        break;


      default:
        console.log('default');
        this.masterValue =
          [

            {

              'urlLink': 'companyMaster',
              'urlName': 'Master Data'
            },
            // {

            //   'urlLink': '/dfdfdff',
            //   'urlName': 'Control Data'
            // },
            // {

            //   'urlLink': '/dfdfdff',
            //   'urlName': 'Recruitment'
            // },


          ];

        break;
    }
    
  }

  MenuActiveFun(list): void {
    // alert('hhh'+list);
this.MasterMenuActive = list;
}

  ngOnInit() {
         // ----------service call to get dynamic labels list
    //     this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
         this.routeLinks = [
          { label: this.labelData.institute, link: 'institutes' },
          { label: this.labelData.department, link: 'department' },
          { label: this.labelData.programme, link: 'programme' },
        ];      
  }











}
