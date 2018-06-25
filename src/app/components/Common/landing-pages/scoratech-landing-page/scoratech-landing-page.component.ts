
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import {FormControl, FormGroup,Validators,FormBuilder, NgForm} from '@angular/forms';
import * as $ from 'jquery';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import {ScoraLandingService } from '../../../../services/common/landing-pages/scora-landing/scora-landing.service';
import * as AOS from 'aos';
import { CampusService } from '../../../../services/common/landing-pages/campus-landing/campus.service';

@Component({
  selector: 'app-scoratech-landing-page',
  templateUrl: './scoratech-landing-page.component.html',
  styleUrls: ['./scoratech-landing-page.component.css'],
})
export class ScoratechLandingPageComponent implements OnInit {
  landingpageContact: any = {};
  successResponse: any;
  returnUrl: string;
  request:any = {};
  cookie: any;
  loginResponce: any;
  constructor(private scoraLandingService: ScoraLandingService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private campusService: CampusService,
    private route: ActivatedRoute,
    private router: Router,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
     }


  ngOnInit() {

    this.cookie = this.campusService.isAuthenticated();
    this.loginResponce = this.campusService.getLoginData();
    
    if (this.cookie && this.loginResponce.campusId) {
      this.router.navigate(['/campus/dashboard']);
    } else if (this.cookie && this.loginResponce.companyId) {
      this.router.navigate(['/company/dashboard']);
    } else if (this.cookie && this.loginResponce.role === 'SYSADMIN') {
      this.router.navigate(['scora']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
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
      $('.first').click(function() {
        $('html,body').animate({
            scrollTop: $('.second').offset().top - 65},
            'slow');
    });
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
      $('#col9').click(function() {
        $('html,body').animate({
            scrollTop: $('.col9').offset().top - 100},
            'slow');
      });
      $('#col10').click(function() {
        $('html,body').animate({
            scrollTop: $('.col10').offset().top - 100},
            'slow');
      });
      $('#col11').click(function() {
        $('html,body').animate({
            scrollTop: $('.col11').offset().top - 100},
            'slow');
      });

  // $('#studenticon').addClass('animated flash');  
     });

  }


  
  requestForDemo(requestForDemoform: NgForm) {
      this.request.flag = "demo";
      this.scoraLandingService.createContactUs(this.request).subscribe(data => {
       this.successResponse = data;
       this.toastr.success('Thanks for reaching out to us!!! Our team will get in touch with you to schedule a demo');
      //  alert('Thanks for Contacting Us,Will get back to you soon!!!!!');
       requestForDemoform.resetForm();
     });
   }


  // landingpageContactSubmit () {
  //   this.landingpageContact.mobileNumber = +this.landingpageContact.mobileNumber;
  //    this.scoraLandingService.createContactUs(this.landingpageContact).subscribe(data => {
  //     this.successResponse = data;
  //     alert('Thanks for Contacting Us,Will get back to you soon!!!!!');
  //   });
  // }

}
