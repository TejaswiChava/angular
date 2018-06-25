
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }
  getCityList(stateSelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
  }

  getStateList(countrySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`).map((res: Response) => res);
  }
  getCountryList() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Countries`).map((res: Response) => res);
  }
  getPostalList(citySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
  }
  getContactLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`).map((res: Response) => res);
  }
  getAddressLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"5"}}`).map((res: Response) => res);
  }
  getDepartmentDetails(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=` + campusId + `` ).map((res: Response) => res);
  }
  orgCreate(orgDetails) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + `Departments`, orgDetails).map((res: Response) => res);
  }
  departmentAddressCreate(departmentAddressDetails) {
    return this.httpClient.post(
      // tslint:disable-next-line:max-line-length
      AppSettings.API_ENDPOINT + `DepartmentAddresses/createDepartmentAddress`,  departmentAddressDetails).map((res: Response) => res);
  }
  updateDepartmentProfile(departmentDetails) {
     return this.httpClient.put(AppSettings.API_ENDPOINT + 'Departments/updateDepartment',  departmentDetails).map((res: Response) => res);
   }
   updateDepartmentAddress(campusdetails) {
      return this.httpClient.put(AppSettings.API_ENDPOINT + `DepartmentAddresses/updateDepartmentAddress`,  campusdetails)
      .map((res: Response) => res);
  }
  geDepartmentDetails(campusId) {
    // return this.httpClient.get(
    //   AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=`
    //   + campusId + `&departmentId=` + deptId + `` ).map((res: Response) => res;
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=`
      + campusId ).map((res: Response) => res);
  }
  geDepartmentDetailsById(campusId, deptId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=`
      + campusId + `&departmentId=` + deptId + `` ).map((res: Response) => res);

  }
  deptContactCreate(contactDetails) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + `DepartmentContacts/createDepartmentContact`,  contactDetails).map((res: Response) => res);
  }
  updateDepartContact(campusdetails) {
      return this.httpClient.put(AppSettings.API_ENDPOINT + 'DepartmentContacts/updateDepartmentContact',  campusdetails)
      .map((res: Response) => res);

   }
   getDepartmentTotalDetails(campusID) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=` + campusID + `` ).map((res: Response) => res);
  }
  getDeptAddressListByDeptID(OrgCompanyId, orgId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT +
      `DepartmentAddresses/getCampusDeptAddress?campusId=`
      + OrgCompanyId + `&departmentId=` + orgId + ``).map((res: Response) => res);
  }

getDeptContactListByDeptID(OrgCompanyId,  orgId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `DepartmentContacts/getCampusDeptContact?campusId=`
       + OrgCompanyId + `&departmentId=` + orgId + ``).map((res: Response) => res);
  }
  // tslint:disable-next-line:member-ordering


}
