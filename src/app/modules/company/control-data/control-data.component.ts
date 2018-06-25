import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTab, MatTabLink } from '@angular/material';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.css']
})
export class ControlDataComponent implements OnInit {

  labelData: any;
  routeLinks: any;
  activeLinkIndex = 0;
  controlMenuActive: any;
  constructor(private _router: Router,
              private cookieService: CookieService, private activatedRoute: ActivatedRoute) {

                this.controlMenuActive = activatedRoute.snapshot.children[0].url;
   }

   controlMenuActiveFun(list): void {
    // alert('hhh'+list);
    this.controlMenuActive = list;
}

  ngOnInit() {
     // ----------service call to get dynamic labels list
    // this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));

    this.routeLinks = [
      { label: 'Job Role', link: 'jobrole' },
      { label: 'Compensation Package', link: 'compensationPackage' },
      { label: 'Campus List', link: 'campusList' },
    ];
  }

}
