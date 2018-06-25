
import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JobRoleService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  /**************** services for getting job role details starts ******************************/
  getJobRoleDetails(companyId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `JobRoles/getJobRoleDetails?companyId=`
      + companyId).map((res: Response) => res);
  }
  /**************** services for getting job role details ends ****************************/
  /**************** services for getting job role type from lookup tabel starts **********/
  GetJobRoleTypeValue() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"29"}}`).map((res: Response) => res);
  }
  /**************** services for getting job role type from lookup tabel ends **********/
  /**************** services for updating job role profile starts **********/
  updateJobRoleProfile(Details) {

    return this.httpClient.put(AppSettings.API_ENDPOINT + 'JobRoles/updateJobRole', Details).map(res => res);

  }
  /**************** services for updating job role profile ends **********/
  /**************** services for createing job role profile starts **********/
  jobRoleCreate(contactDetails) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + `JobRoles`, contactDetails).map((res: Response) => res);
  }
  /**************** services for createing job role profile ends **********/
}

