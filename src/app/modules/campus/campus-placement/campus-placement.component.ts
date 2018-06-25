import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campus-placement',
  templateUrl: './campus-placement.component.html',
  styleUrls: ['./campus-placement.component.css']
})
export class CampusPlacementComponent implements OnInit {

  constructor(private router: Router) {
   
  }


  ngOnInit() {
  //   if (window.location.href.indexOf('campus/placement') > -1) {
  //   //  alert('init')
  //     this.router.navigateByUrl('campus/placement/campusDrive');
  // }
  }

  


}
