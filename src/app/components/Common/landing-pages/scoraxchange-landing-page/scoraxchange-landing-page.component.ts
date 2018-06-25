import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  NavigationEnd
} from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import { ScoraLandingService } from '../../../../services/common/landing-pages/scora-landing/scora-landing.service';
import { CampusService } from '../../../../services/common/landing-pages/campus-landing/campus.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scoraxchange-home-page',
  templateUrl: './scoraxchange-landing-page.component.html',
  styleUrls: ['./scoraxchange-landing-page.component.css']
})
export class ScoraxchangeHomePageComponent implements OnInit {
  loginData: any = {};
  loginResponce: any;
  token: any;
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private cookieService: CookieService,
    private campusService: CampusService,
    private scoraLandingService: ScoraLandingService
  ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  login() {
    this.scoraLandingService.postLogin(this.loginData).subscribe(
      (data: any) => {
        this.loginResponce = data.data;
        this.token = this.loginResponce.id;
        this.campusService.finishAuthentication(this.token, this.loginResponce);
        this.cookieService.putObject('loginResponce', this.loginResponce);
        this.toastr.success('successfully loggedIn!', 'Success!');
      },
      error => {
        this.toastr.error('Invalid Login Credentials!', 'Oops!');
        console.log('error', error);
      }
    );
  }
}
