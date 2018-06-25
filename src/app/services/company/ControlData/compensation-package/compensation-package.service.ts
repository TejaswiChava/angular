import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompensationPackageService {

  constructor(private _http: Http, private httpClient: HttpClient) { }
// service call to get compensation package lookup
  getCmpPckgeLookup() {
    return this.httpClient.get
     (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"31"}}`).map((res: Response) => res);
  }
// service call to get approval status lookup
    getApprovalStatusLookup() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"30"}}`).map((res: Response) => res);
  }
// service call to get approval status lookup
getCmpPckgeCurrency() {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `Currencies`).map((res: Response) => res);
}
  //  service call to post compensation package
  createCompensationPackage(cmpPckgDet) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `CompensationPackages/CreateCompleteCompensationPackage`, cmpPckgDet).map((res: Response) => res);
  }
  // service call to get packages
  getPckges(companyId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `CompensationPackages/getCompensationPkgDetails?companyId=` + companyId + ``)
    .map((res: Response) => res);
  }
// service call to get package item
  getPckgItem(companyId, compensationPkgId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
      `CompensationPackageItems/getCompensationPkgItemDetails?compPackageId=` + compensationPkgId + `&companyId=` + companyId + ``)
    .map((res: Response) => res);
  }
// service call to update compensation package
  updateCompensationPackage(updateDetails) {
    return this.httpClient.put
    (AppSettings.API_ENDPOINT + `CompensationPackages/updateComp`, updateDetails).map((res: Response) => res);
  }
// service call for post to add individual package item when we are editing a package
  addPckgeItemOnEdit(pckgItemDetails) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `CompensationPackageItems`, pckgItemDetails).map((res: Response) => res);
  }
  deleteCompPakage(id) {
    return this.httpClient.delete
    (AppSettings.API_ENDPOINT + `CompensationPackageItems/` + id ).map((res: Response) => res);
   }
createComp(data) {
  return this.httpClient.post
  (AppSettings.API_ENDPOINT + `CompensationPackageItems/`, data ).map((res: Response) => res);
}

}
