import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
/*  import { HttpModule } from '@angular/http';*/
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScoraEnrollService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  getRoleTypes() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"7"}}`)
    .map((res: Response) => res);
  }

  getCampusUniversities() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Universities`).map((res: Response) => res);
  }

  createEnrollment(enrollObj) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `ScoraUsers`, enrollObj).map((res: Response) => res);
  }

}
