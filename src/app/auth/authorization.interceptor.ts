import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { CampusService } from '../services/common/landing-pages/campus-landing/campus.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class  AuthorizationInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private toastr: ToastrService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
   * Will get the current user data
   */
    const loginData: any = this.cookieService.getObject('loginResponce');
    if (loginData) {
      // alert(JSON.stringify(loginData));
      // console.log(JSON.stringify(loginData));
      if (loginData.campusId) {
        request = request.clone({headers: request.headers.set('X-Scora-Auth', loginData.jwtToken.toString())
        .set('campusid', loginData.campusId.toString())
        .set('role', loginData.role)
        .set('educationPersonId', loginData.educationPersonId.toString())
        .set('userId', loginData.userId.toString())});
      } else if (loginData.companyId) {
        request = request.clone({headers: request.headers.set('X-Scora-Auth', loginData.jwtToken.toString())
        .set('companyid', loginData.companyId.toString())
        .set('role', loginData.role)
        .set('employerPersonId', loginData.employerPersonId.toString())
        .set('userId', loginData.userId.toString())});
      } else if (loginData.role === 'SYSADMIN') {
        request = request.clone({headers: request.headers.set('X-Scora-Auth', loginData.jwtToken.toString())
        .set('role', loginData.role)
        .set('userId', loginData.userId.toString())});
      }
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // console.log('event ----> ', event);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.error.error && (err.error.error.message === 'Campus Name instance is already present'
        || err.error.error.message === 'Company Name instance is already present')) {

        } else if (err.status === 0) {

        } else if (JSON.parse(err.error).error.message === 'login failed') {

        } else if (err.status === 401) {
            this.cookieService.remove('token');
            this.cookieService.removeAll();
            this.toastr.error('Session Expired Please Login Again');
            setTimeout(() => {
                if (loginData.campusId) {
                 window.location.replace('/campusLandingPage');
                } else if (loginData.companyId) {
                  window.location.replace('/comapanyLandingPage');
                } else if (loginData.role === 'SYSADMIN') {
                  window.location.replace('/scoraLandingPage');
                }
            }, 2000);
          // redirect to the login route
          // or show a modal
          }
      }
    });
  }
}
