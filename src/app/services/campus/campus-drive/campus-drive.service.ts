
import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusDriveService {
  constructor(private _http: Http, private httpClient: HttpClient) { }

  /**************** services for getting employer Drive details starts ******************************/
  getCampusDriveDetails(campusId) {
  //  campusDriveId = 897980;

  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `CampusDrives/getCampusDriveDetails?campusId=` + campusId + `` ).map((res: Response) => res);
  }

  createCampusDrive(data) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `CampusDrives` , data ).map((res: Response) => res);
}
getDriveType() {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"17"}}`).map((res: Response) => res);
}

getStatusType() {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"18"}}`).map((res: Response) => res);
}
getdepartmentDetails(campusId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=` + campusId + `` ).map((res: Response) => res);
}

updateCampusDrive(data) {
  return this.httpClient.put
  (AppSettings.API_ENDPOINT + `CampusDrives/updateCampusDrive` , data ).map((res: Response) => res);
}
}
