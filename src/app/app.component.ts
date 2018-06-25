import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
// import { ToastsManager } from 'ng2-toastr';
import { LabelsCookiesService } from './services/shared/common-cookies/labels-cookies.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  labels: any;
  urlValues: any;
  campusStatus: any;
  loginCheck: any;
  lookUp: any;
  // public viewContainerRef: ViewContainerRef;
  constructor(private router: Router,
              private appService: LabelsCookiesService,
              private cookieService: CookieService,
              // public toastr: ToastsManager,
              // viewContainerRef: ViewContainerRef
             ) {
  /*** redirecting the page when there is no login details starts */
    this.loginCheck = this.cookieService.getObject('loginResponce');
    this.router = router;
    // this.viewContainerRef = viewContainerRef;

    // this.toastr.setRootViewContainerRef(viewContainerRef);


    // switch (this.loginCheck) {
    //   case !this.loginCheck:

    //   case this.router.url != '/campusLandingPage':
    //   case this.router.url != '/comapanyLandingPage':
    //   case this.router.url != '/scoraLandingPage':
    //   console.log('ggggg');
    //   this.router.navigate(['/']);
    //       break;


    //   default:
    //       console.log('default');

    //       break;
    //   }

    // if (this.loginCheck || this.router.url === '/campusLandingPage'
     // || this.router.url === '/comapanyLandingPage' || this.router.url === '/scoraLandingPage') {
      // this.router.navigate(['campus']);

   // } else {
    //  this.router.navigate(['scoraLandingPage']);
   // }
    /*** redirecting the page when there is no login details starts */

    // if(!this.loginCheck ){
    //   this.router.navigate(['scoraLandingPage']);
    // }
  }

  ngOnInit() {
    this.appService.getLabels().subscribe(data => {
      this.labels = data;
     localStorage.setItem('labelData', JSON.stringify(this.labels));

    });
    this.appService.getLookUp().subscribe(lookUpData => {
      this.lookUp = lookUpData;
     localStorage.setItem('lookUpData', JSON.stringify(this.lookUp));

    });
    this.appService.getAllData().subscribe(lookUpData => {
      this.lookUp = lookUpData;
     localStorage.setItem('allData', JSON.stringify(this.lookUp));

    });
  }
}
