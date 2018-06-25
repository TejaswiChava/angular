import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import {FormControl, FormGroup,Validators,FormBuilder, NgForm} from '@angular/forms';
import { CampusService } from '../../../../services/common/landing-pages/campus-landing/campus.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyLoginService } from '../../../../services/common/landing-pages/company-landing/company-login.service';
// import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
// import { ToastsManager } from 'ng2-toastr';
import * as $ from 'jquery';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-landing-page',
  templateUrl: './company-landing-page.component.html',
  styleUrls: ['./company-landing-page.component.css'],
})
export class CompanyLandingPageComponent implements OnInit {
  loginData: any = {};
  returnUrl: string;
  campus: any = {};
  company: any = {};
  token: any = {};
  loginResponce: any;
  forgotPasswordData : any;
  forgotObj: any = {};
  campusData: any;
  campusform: FormGroup;
  showLoginDetails = true;
  showForgotDetails = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyLogin: CompanyLoginService,
    private campusLogin: CampusService,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  AOS.init({
    disable: function () {
      var maxWidth = 1000;
      return window.innerWidth < maxWidth;
    }
  });
  $(document).ready(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
    $('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0}, 800);
      return false;
    });
    $('#col1').click(function() {
      $('html,body').animate({
          scrollTop: $('.col1').offset().top - 65},
          'slow');
    });
    $('#col2').click(function() {
      $('html,body').animate({
          scrollTop: $('.col2').offset().top - 65},
          'slow');
    });
    $('#col3').click(function() {
      $('html,body').animate({
          scrollTop: $('.col3').offset().top - 65},
          'slow');
    });
    $('#col4').click(function() {
      $('html,body').animate({
          scrollTop: $('.col4').offset().top - 65},
          'slow');
    });
    $('#col5').click(function() {
      $('html,body').animate({
          scrollTop: $('.col5').offset().top - 65},
          'slow');
    });
    $('#col6').click(function() {
      $('html,body').animate({
          scrollTop: $('.col6').offset().top - 65},
          'slow');
    });
    $('#col7').click(function() {
      $('html,body').animate({
          scrollTop: $('.col7').offset().top - 65},
          'slow');
    });
// $('#studenticon').addClass('animated flash');  
   });

  AOS.init({
    // duration: 3000,
  });

  $(document).ready(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
    $('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0}, 800);
      return false;
    });
    $('.weConnect').click(function() {
      $('html,body').animate({
          scrollTop: $('.muchMore').offset().top - 65},
          'slow');
  });
  $('.third').click(function() {
    $('html,body').animate({
        scrollTop: $('.fourth').offset().top - 65},
        'slow');
});
 
   });
  }
  signUpSubmit(form: NgForm) {
   // this.company.universityId = 1;
    this.company.indicator = 'Employer';
 //   this.company.createUserId = 1;
 //   this.company.updateUserId = 1;
  //  this.company.password = '123456';
    this.campusLogin.campusSignup(this.company).subscribe(data => { this.campusData = data;
      if (this.campusData) {
        form.resetForm();
      }
      this.campusform.reset();
    },
         error => {
          this.toastr.error('User Already Exists', 'error!');
         }
       );
  }

  forgotPasswordSubmit(campusForgotPasswordform: NgForm) {
    this.campusLogin.campusForgotPassword(this.forgotObj).subscribe(data => { 
      this.forgotPasswordData = data;
      if (this.forgotPasswordData) {
        // alert('working');
        this.toastr.success('A link to reset password has been sent to specified email.');
        // alert('Data submitted successfully');
        campusForgotPasswordform.resetForm();
        }
    },
    error => {
      // alert('invalid');
      // this.toastr.error('Given email is not registered with us. Please check the specified email.','error')
      this.toastr.error('Invalid Login Credentials!', 'Oops!');
      console.log('error', error);
    }
  );
}

  Signin(){
    this.showLoginDetails = false;
    this.showForgotDetails = false;
  }
}
