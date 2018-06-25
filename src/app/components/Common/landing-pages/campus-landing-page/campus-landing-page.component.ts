
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, Validators,  FormBuilder , NgForm} from '@angular/forms';
import { CampusService } from '../../../../services/common/landing-pages/campus-landing/campus.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import * as $ from 'jquery';
 import {CookieService} from 'angular2-cookie/core';
 import { tokenNotExpired } from 'angular2-jwt';
 import { CompanyLoginService } from '../../../../services/common/landing-pages/company-landing/company-login.service';
//  import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
 import * as AOS from 'aos';
 import * as $ from 'jquery';
 
@Component({
  selector: 'app-campus-landing-page',
  templateUrl: './campus-landing-page.component.html',
  styleUrls: ['./campus-landing-page.component.css']
})
export class CampusLandingPageComponent implements OnInit {
loginData: any = {};
// loading = false;
returnUrl: string;
campus: any = {};
forgotObj: any = {};
campusLoginResponse: any;
campusData: any;
forgotPasswordData : any;
campusform: FormGroup;
token: any;
basic: any;
showLoginDetails = true;
showForgotDetails = false;
// positionClass='toast-top-center';
constructor(
    private route: ActivatedRoute,
    private router: Router,
  //  private authenticationService: AuthenticationService,
  // private alertService: AlertService
  private companyLogin: CompanyLoginService,
  private campusLogin: CampusService,
 private cookieService: CookieService,
//  public toastr: ToastsManager,
 private toastr: ToastrService,
 private viewContainerRef: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }

ngOnInit() {
    // reset login status
  //  this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.clearCredentils();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  }); 
  
  AOS.init({
    duration: 3000,
  });
  AOS.init({
    disable: function () {
      var maxWidth = 800;
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
    $('.first').click(function() {
      // alert('dhdh');
      $('html,body').animate({
          scrollTop: $('.second').offset().top - 65},
          'slow');
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
    $('#col8').click(function() {
      $('html,body').animate({
          scrollTop: $('.col8').offset().top - 65},
          'slow');
    });

// $('#studenticon').addClass('animated flash');  
   });
}



// onLoginSubmit(credentials) {
//   this.auth.login(credentials)
//     .map(res => res
//     .subscribe(
//       response => this.auth.finishAuthentication(response.token),
//       error => this.errorMessage = error.json().message
//     );
// }
clearCredentils() {
  this.campusLogin.logout();
  this.loginData = {};
}

// login() {
//   this.campusLogin.postLogin(this.loginData).subscribe(
//     data => {
//       this.campusLoginResponse = data.data;
//       this.token = this.campusLoginResponse.id;
//       this.campusLogin.finishAuthentication(this.token, this.campusLoginResponse);
//       this.cookieService.putObject('loginResponce', this.campusLoginResponse);
//       console.log(JSON.stringify(this.campusLoginResponse));
//       this.toastr.success('successfully loggedIn!', 'Success!');
//     },
//     error => {
//       this.toastr.error('Invalid Login Credentials!', 'Oops!');
//       console.log('error', error);
//     });

// }

// signUpSubmit() {
//   this.campus.universityId = 1;
//   this.campus.indicator = 'campus';
//   this.campus.createUserId = 1;
//   this.campus.updateUserId = 1;
//   this.campus.password = '123456';
//    this.campusLogin.campusSignup(this.campus).subscribe(data => this.campusData = data;
//     if (this.campusData) {
//       alert('Data submitted successfully');
//     }
//     this.campusform.reset();
//   //  form.resetForm();
//    },
//     error => alert('User Already Exist')
//   );
  signUpSubmit(form: NgForm) {
   // this.campus.universityId = 1;
    this.campus.indicator = 'Campus';
  //  this.campus.createUserId = 1;
  //  this.campus.updateUserId = 1;
    // this.campus.password = '123456';
    this.campusLogin.campusSignup(this.campus).subscribe(data => { this.campusData = data;
      if (this.campusData) {
        // alert('Data submitted successfully');
        this.toastr.success('Data submitted successfully', 'Success');
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
       this.campusLogin.campusForgotPassword(this.forgotObj).subscribe(data => { this.forgotPasswordData = data;
         if (this.forgotPasswordData) {
          this.toastr.success('A link to reset password has been sent to specified email.');
           campusForgotPasswordform.resetForm();
           }
       },
            error => {
              this.toastr.error('Given email is not registered with us. Please check the specified email.')
            }
          );
  }




  Signin() {
    this.showLoginDetails = false;
    this.showForgotDetails = false;
  }


  

 }

 