import { Component, OnInit, SimpleChanges, ViewContainerRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { CampusService } from '../../../../services/common/landing-pages/campus-landing/campus.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
import { tokenNotExpired } from 'angular2-jwt';

// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as AOS from 'aos';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../../landing-pages/campus-landing-page/campus-landing-page.component.css']
})
export class SignInComponent implements OnInit, OnChanges {
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
  campusData: any;
  campusform: FormGroup;
  token: any;
  basic: any;
  loading = false;
  cacheLookupData: any;
  cacheAllData: any;
  // positionClass='toast-top-center';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //  private authenticationService: AuthenticationService,
    // private alertService: AlertService
    private campusLogin: CampusService,
    private cookieService: CookieService,
    private campusService: CampusService,
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

  setSignUpStatus(status: boolean) {
    // alert('hsh');
    this.showSignup = status;
    this.showSignupChange.emit(this.showSignup);
    // alert("hhh" +this.showSignup);
  }

  setForgotPasswordStatus(status: boolean) {
    this.showForgotPassword = status;
    this.showForgotPasswordChange.emit(this.showForgotPassword);
    // alert("hhh" +this.showSignup);
  }
  login() {
    // this.loading = true;
    // alert('gggg');
    this.campusLogin.postLogin(this.loginData).subscribe(
      (data: any) => {
        this.campusLoginResponse = data.data;
        this.token = this.campusLoginResponse.id;
        this.campusLogin.finishAuthentication(this.token, this.campusLoginResponse);
        this.cookieService.putObject('loginResponce', this.campusLoginResponse);

        // this.campusLogin.getLookUpData().subscribe(data => {
        //   this.cacheLookupData = data;
        //   console.log('cacheLookupData' + JSON.stringify(this.cacheLookupData));
        //   localStorage.setItem('cacheLookUp', JSON.stringify(this.cacheLookupData));
        // });

        this.campusLogin.getAllData().subscribe(data => {
        this.cacheAllData = data;
          localStorage.setItem('cacheDataForLookup', JSON.stringify(this.cacheAllData));
        });
      },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Invalid Login Credentials!', 'Oops!');
        console.log('error', error);
      });

  }
}
