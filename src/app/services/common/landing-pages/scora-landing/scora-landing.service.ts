import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScoraLandingService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  postLogin(loginData) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers/login`, loginData).map((res: Response) => res);
  }

  createContactUs(contact) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `UserRoles/sendEmail`, contact).map((res: Response) => res);
  }


}
