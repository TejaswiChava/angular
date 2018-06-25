import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CheckedCampusListService {

  constructor(private http: Http, private httpClient: HttpClient) { }
    getDataByEventAndDrive(data) {
      return this.httpClient.post
      (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getCampusByEvent`, data ).map((res: Response) => res);
  }
  getEventByEventId(data) {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerDriveCampuses/getEmployerDriveCampus?empEventId=` + data).map((res: Response) => res);
  }

  getCampusByDriveId(data) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getEmployerCampusList?empDriveId=` + data + ``  ).map((res: Response) => res);
  }

}
