import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as AOS from 'aos';
@Component({
  selector: 'app-student-landing-page',
  templateUrl: './student-landing-page.component.html',
  styleUrls: ['./student-landing-page.component.css']
})
export class StudentLandingPageComponent implements OnInit {
  constructor(private router: Router,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
    }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });

  AOS.init({
    // duration: 3000,
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
// $('#studenticon').addClass('animated flash');  
   });

  }


  commingsoon(){
    this.toastr.success('Comming soon!!!');
    // alert('Comming soon!!!');
  }


}
