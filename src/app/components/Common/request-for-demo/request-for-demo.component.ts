import { Component, OnInit, SimpleChanges, ViewContainerRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { CampusService } from '../../../services/common/landing-pages/campus-landing/campus.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
import { tokenNotExpired } from 'angular2-jwt';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import {ScoraLandingService } from '../../../services/common/landing-pages/scora-landing/scora-landing.service';

import * as $ from 'jquery';
import * as AOS from 'aos';
@Component({
  selector: 'app-request-for-demo',
  templateUrl: './request-for-demo.component.html',
  styleUrls: ['../landing-pages/campus-landing-page/campus-landing-page.component.css']
})
export class RequestForDemoComponent implements OnInit, OnChanges {

  @Input() showSignup;
  @Input() showForgotPassword;
  @Output() showSignupChange = new EventEmitter<boolean>();
  @Output() showForgotPasswordChange = new EventEmitter<boolean>();
  loginData: any = {};
  // loading = false;
  returnUrl: string;
  campus: any = {};
  campusLoginResponse: any;
  hide = true;
  request: any = {};
  campusData: any;
  campusform: FormGroup;
  token: any;
  basic: any;
  loading = false;
  cacheLookupData: any;
  cacheAllData: any;
  showLoginDetails = true;
showForgotDetails = false;
successResponse: any;
  // positionClass='toast-top-center';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campusLogin: CampusService,
    private cookieService: CookieService,
    private campusService: CampusService,
    private scoraLandingService: ScoraLandingService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.showSignup) {

    }
    if (this.showForgotPassword) {

    }
  }
  ngOnInit() {
    this.clearCredentils();
    AOS.init({
      // duration: 3000,
    });
  }

  clearCredentils() {
    this.campusService.logout();

  }

  requestForDemo(requestForDemoform: NgForm) {
    // console.log(JSON.stringify(this.landingpageContact));
    //  this.request.mobileNumber = +this.request.mobileNumber;
        this.request.flag = 'demo';
      this.scoraLandingService.createContactUs(this.request).subscribe(data => {
       this.successResponse = data;
       this.toastr.success('Thanks for reaching out to us!!! Our team will get in touch with you to schedule a demo');
      //  alert('Thanks for Contacting Us,Will get back to you soon!!!!!');
       requestForDemoform.resetForm();
       // this.empPer = this.personDetails[0];
     });
   }

  setSignUpStatus(status: boolean) {
    // alert('hsh');
    this.showSignup = status;
    this.showSignupChange.emit(this.showSignup);
    // alert("hhh" +this.showSignup);
  }

  Signin() {
    this.showLoginDetails = false;
    this.showForgotDetails = false;
  }

}
