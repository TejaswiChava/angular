import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployerDriveService {
    constructor(private _http: Http, private httpClient: HttpClient) { }

    /**************** services for getting employer Drive details starts ******************************/
  getCompanyEmployerDriveDetails(companyId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `EmployerDrives/getEmployerDriveDetails?companyId=`
      + companyId).map((res: Response) => res);
  }

  getJobRole(companyID) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `JobRoles/getJobRoleDetails?companyId=` + companyID + `` ).map((res: Response) => res);
}
getDriveType() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"25"}}`).map((res: Response) => res);
}

getEmpStatusCode() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"26"}}`).map((res: Response) => res);
}
    
getCompanyOrg(companyID) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Organizations/getOrganizationDetails?companyId=` + companyID + `` ).map((res: Response) => res);
}
createEmployerDrive(data) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `EmployerDrives` , data ).map((res: Response) => res);
}
updateEmpDrive(data) {
    return this.httpClient.put
    (AppSettings.API_ENDPOINT + `EmployerDrives/updateEmployerDrive` , data ).map((res: Response) => res);
}
updateEmpDriveCampuses(data) {
    return this.httpClient.put
    (AppSettings.API_ENDPOINT + `EmployerDriveCampuses` , data ).map((res: Response) => res);
}
getCampuslist(jobRoleId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getEmployerCampusList?jobRoleId=` + jobRoleId  ).map((res: Response) => res);
}

getCampuslistByJobRole(jobRoleId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getEmployerCampusListData?jobRoleId=` + jobRoleId  ).map((res: Response) => res);
}

getDriveList(empDriveId, flag) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
        `EmployerCampusListDtls/getEmployerCampusList?empDriveId=` + empDriveId + '&flag=' + flag ).map((res: Response) => res);
}

getDriveListByDrive(empDriveId, flag) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
        `EmployerCampusListDtls/getEmployerCampusListData?empDriveId=` + empDriveId + '&flag=' + flag ).map((res: Response) => res);
}

submitCampusesListForDrive(data) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `EmployerDriveCampuses/createEmpDriveCampuses` , data ).map((res: Response) => res);
}
updateCampusesListOnDrive(data) {
    return this.httpClient.put
    (AppSettings.API_ENDPOINT + `EmployerDriveCampuses` , data ).map((res: Response) => res);
}

}
