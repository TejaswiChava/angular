import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusListService {

  constructor(private http: Http, private httpClient: HttpClient) { }
// ----------------service to get compensation package details
  getCompensationPckg(companyId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `CompensationPackages/getAllCompensation?companyId=` + companyId)
    .map((res: Response) => res);
  }

  // ----------------service to job role details
  getJobRole(companyID) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `JobRoles/getJobRoleDetails?companyId=` + companyID + `` ).map((res: Response) => res);
}
  // ---------------- service to get Feild Labels
  getLabels() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `FieldLabels`).map((res: Response) => res);
    }

    getApprovalStatusLookup() {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"30"}}`).map((res: Response) => res);
    }

    postCampusList(data) {
      return this.httpClient.post
      (AppSettings.API_ENDPOINT + `EmployerCampusListHdrs/createCompleteEmployerCampusList`, data ).map((res: Response) => res);
    }

    // getCompanyCampusListDetails(companyId) {
    //   return this.http.get
    //   (AppSettings.API_ENDPOINT + `EmployerCampusListHdrs?filter={"where":{"companyId":` + companyId +`}}` )
    // .map((res: Response) => res);
    // }

    getCompanyCampusListDetails(companyId) {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerCampusListHdrs/getCampusListWithCompany?companyId=` + companyId ).map((res: Response) => res);
    }

    getCListHeaderDetails(listId) {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerCampusListHdrs/getEmployerCampusListHdrDetails?listId=` + listId + `` )
      .map((res: Response) => res);
    }

    getCListDtls(listId) {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getEmployerCampusListDtl?listId=` + listId + `` ).map((res: Response) => res);
    }

    getCompPackage(listId) {
      return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerCampusListCompPkgs/getEmployerCampusListCompPkg?listId=` + listId + `` )
      .map((res: Response) => res);
    }
    updateCampusList(data) {
      return this.httpClient.put
      (AppSettings.API_ENDPOINT + `EmployerCampusListHdrs/updateEmployerCampusListHdr`, data ).map((res: Response) => res);
    }
    addNewCompPckgInEdit(data) {
      return this.httpClient.post
      (AppSettings.API_ENDPOINT + `EmployerCampusListCompPkgs/createEmployerCampusListCompPkg`, data ).map((res: Response) => res);
    }
    addCompPckgInUpdate(data) {
      return this.httpClient.post
      (AppSettings.API_ENDPOINT + 'EmployerCampusListCompPkgs/createEmployerCampusListCompPkg', data)
      .map((res: Response) => res);
    }

    addNewCampusInEdit(data) {
      return this.httpClient.post(AppSettings.API_ENDPOINT + `EmployerCampusListDtls/createEmployerCampusListDtl`, data ).map((res: Response) => res);
    }
    addCampusInUpdate(data) {
      return this.httpClient.post(AppSettings.API_ENDPOINT + 'EmployerCampusListDtls/createEmployerCampusListDtl', data)
      .map((res: Response) => res);
    }
    deleteComp(id) {
      console.log('iddddddddddddddddddddddddddddddddd', id);
      // tslint:disable-next-line:max-line-length
      return this.httpClient.delete
      (AppSettings.API_ENDPOINT + `EmployerCampusListCompPkgs/` + id ).map((res: Response) => res);
    }

    deleteComp_1(id) {
      console.log('iddddddddddddddddddddddddddddddddd', id);
      // tslint:disable-next-line:max-line-length
      return this.httpClient.delete
      (AppSettings.API_ENDPOINT + `EmployerCampusListCompPkgs/deleteCompensationPackage?listCompPkgId=` + id ).map((res: Response) => res);
    }
  }



