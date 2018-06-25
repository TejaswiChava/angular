import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyLoginService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  postLogin(loginData) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers/login`, loginData).map((res: Response) => res);
  }

  // campusSignup(campusContDetails) {
  //   return this._http.post(AppSettings.API_ENDPOINT + `ScoraUsers`, campusContDetails).map(response => response.json());

  // }

}
