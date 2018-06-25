import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusListSearchService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  getUnivList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Universities`).map((res: Response) => res);
  }

  search(i, displayFlag) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
      `CampusSearchVws/searchCampus?universityId=` + i.universityId +
      `&searchName=` + i.searchName +
      `&tierValueId=` + i.tierValueId +
      `&regionFlag=` + i.regionFlag +
      `&cityId=` + i.cityId +
      `&programTypeValueId=` + i.programTypeValueId +
      '&programMajorValueId=' + i.programMajorValueId +
      `&stateCode=` + i.state + '&dispayFlag=' + displayFlag + '&skills=' + [i.skills] + '&interests=' + [i.interests] +
    '&minSalary=' + i.minSalary + '&maxSalary=' + i.maxSalary + '')
      .map(
        (res: Response) => res
      );
  }

  getStateList(countrySelect) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`)
    .map((res: Response) => res);
  }

  getCityList() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Cities`).map((res: Response) => res);
  }
  getProgrameTypeLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"13"}}`)
      .map((res: Response) => res);
  }
  getProgrameClassLookup() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"14"}}`)
      .map((res: Response) => res);
  }
  getProgrameMajLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"15"}}`)
      .map((res: Response) => res);
  }
  getProgrameCatLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"12"}}`)
      .map((res: Response) => res);
  }
  getSkillTypeLookup() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"33"}}`)
      .map((res: Response) => res);
  }
  getIntrestTypeLookup() {
    return this.httpClient.get(
    AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"34"}}`)
    .map((res: Response) => res);
  }
}
