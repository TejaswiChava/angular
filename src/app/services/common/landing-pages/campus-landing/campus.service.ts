
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';
import {AppSettings} from '../../../../apiUrl';
import { tokenNotExpired } from 'angular2-jwt';
import * as jwtDecode from 'jwt-decode';
import {CookieService} from 'angular2-cookie/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusService implements CanActivate {

  constructor(private _http: Http, private router: Router , private cookieService: CookieService,
    private httpClient: HttpClient) { }
  postLogin(loginData) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers/login`, loginData)
          .map((res: Response) => res);
  }

  // login(credentials): Observable<Response> {
  //   return this.http.post(`${API_URL}/users/authenticate`, credentials);
  // }

  campusSignup(campusContDetails) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers`, campusContDetails)
          .map(response => response);

  }

  campusForgotPassword(campusForgotPasswordDeatils) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers/reset`, campusForgotPasswordDeatils)
          .map(response => response);

  }


  finishAuthentication(token, loginResponce): void {
    this.cookieService.putObject('token', token);
    // localStorage.setItem('token', token);
    if (loginResponce.campusId) {
      this.router.navigate(['campus/dashboard']);
    } else if (loginResponce.companyId) {
      this.router.navigate(['company/dashboard']);
    } else if (loginResponce.role == "SYSADMIN") {
      this.router.navigate(['scora']);
    }else {
      this.router.navigate(['scoraLandingPage']);
    }
  }

  isAuthenticated(): boolean {
    // return tokenNotExpired('token');
    if (this.cookieService.getObject('token')) {
      return true;
    }else {
      return false;
    }
  }

  logout(): void {
    // localStorage.removeItem('token');
    this.cookieService.remove('token');
    this.cookieService.removeAll();
  }


  isAdmin(): boolean {
    return jwtDecode(this.getToken()).scope === 'admin';
  }

  getToken() {
    // return localStorage.getItem('token');
    return this.cookieService.getObject('token');
  }

  getLoginData() {
    return this.cookieService.getObject('loginResponce');
  }

  canActivate() {
    // if (localStorage.getItem('token')) {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['scoraLandingPage']);
    }
  }

  getLookUpData() {
    return this.httpClient.get(AppSettings.API_CACHE + `getLookUpData` ).map((res: Response) => res);
  }

  getAllData() {
    return this.httpClient.get(AppSettings.API_CACHE + `getAllData` ).map((res: Response) => res);
  }
}


