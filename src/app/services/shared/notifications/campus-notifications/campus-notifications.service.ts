import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/retry';
@Injectable()
export class CampusNotificationsService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  getNotificatons(input) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + 'NotificationDetails/pullNotification', input).map((res: Response) => res);
  }
  updateNewNotificatons(input) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'NotificationDetails', input).map((res: Response) => res);
  }

  getPersonsDetails(employerPersonId, companyId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `EmployerPeople/getEmployerPerson?employerPersonId=` + employerPersonId + `&companyId=` + companyId)
      .retry(2)
      .map((res: Response) => res);
  }

  getPersonsInstDetails(eduPersnId, campusId) {
    return this.httpClient.get
        (AppSettings.API_ENDPOINT + `EducationPeople/getEducationPerson?educationPersonId=` + eduPersnId + `&campusId=` + campusId)
        .retry(2)
        .map((res: Response) => res);
  }

  eventAction(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'CampusEvents/campusBussinessLogic', data).map((res: Response) => res);
  }
}
