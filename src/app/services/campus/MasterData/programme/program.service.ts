
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ProgramService {

  constructor(private httpClient: HttpClient) { }
  getCityList(stateSelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT +
      `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
  }
  getStateList(countrySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT
      + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`).map((res: Response) => res);
  }
  getCountryList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT
      + `Countries`).map((res: Response) => res);
  }
  getPostalList(citySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT +
      `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
  }
  getContactLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`).map((res: Response) => res);
  }
  getAddressLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"5"}}`).map((res: Response) => res);
  }
  getProgrameTypeLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"13"}}`).map((res: Response) => res);
  }
  getProgrameClassLookup() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"14"}}`).map((res: Response) => res);
  }
  getProgrameMajLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"15"}}`).map((res: Response) => res);
  }
  getProgrameCatLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"12"}}`).map((res: Response) => res);
  }

  createProgram(orgDetails) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `Programs`, orgDetails).map((res: Response) => res);
  }

  updateProgramProfile(programtDetails) {

    return this.httpClient.put(AppSettings.API_ENDPOINT + 'Programs/updateProgram', programtDetails).map(res => res);

  }

  geDepartmentDetails(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartment?campusId=` + campusId + ``).map((res: Response) => res);
  }
  deptContactCreate(contactDetails) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + `ProgramContacts/createProgramContact`, contactDetails).map((res: Response) => res);
  }
  updateProContact(campusdetails) {

    return this.httpClient.put(AppSettings.API_ENDPOINT + 'ProgramContacts/updateProgramContact', campusdetails).map(res => res);

  }
  getProgramProfileDetails(programId, campusId, deptId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT +
      `Programs/getProgramDetails?programId=`
      + programId + `&&campusId=` + campusId + `&departmentId=` + deptId + ``
    ).map((res: Response) => res);
  }

  getProgramTotalDetails(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Programs/getProgramDetails?campusId=` + campusId + ``).map((res: Response) => res);
  }


  getDeptContactListByDeptID(OrgCompanyId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `ProgramContacts/getProgramContact?programId=` + OrgCompanyId).map((res: Response) => res);
  }


}
