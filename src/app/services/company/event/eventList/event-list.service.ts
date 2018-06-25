import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventListService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  getEvents(companyId) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerEvents/getAllEvents?companyId=` + companyId).map((res: Response) => res);
  }

}
