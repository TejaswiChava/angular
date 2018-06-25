import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import {ScoraLandingService } from '../../../services/common/landing-pages/scora-landing/scora-landing.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ScrollToService } from 'ng2-scroll-to-el';

import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  emailid: string;
  Newsletter:any={};
  successResponse: any;
  urlLinkCommunication: any;
  // request: any = {};
  constructor(
    private scoraLandingService: ScoraLandingService,
    private toastr: ToastrService,
    private route: ActivatedRoute, 
    private router: Router
    // private _router: Router
  ) { 
    
  }
  onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector ( "#" + f )
      if ( element ) element.scrollIntoView ( true )
    });
  }
  ngOnInit() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
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
      $('#col9').click(function() {
        $('html,body').animate({
            scrollTop: $('/scoraLandingPage').offset().top - 65},
            'slow');
      });
      
  // $('#studenticon').addClass('animated flash');  
     });
  }
  NewsletterSubscr(newsletterSubscription: NgForm) {
    console.log(JSON.stringify(this.Newsletter));
    //  this.request.mobileNumber = +this.request.mobileNumber;
    // this.request.emailID = ;
    this.emailid == this.emailid;
       this.scoraLandingService.createContactUs(this.Newsletter).subscribe(data => {
       this.successResponse = data;
       this.toastr.success('Subscription request is successfully sent');
      //  alert('Thanks for Contacting Us,Will get back to you soon!!!!!');
      newsletterSubscription.resetForm();
       // this.empPer = this.personDetails[0];
     });
   }

}
