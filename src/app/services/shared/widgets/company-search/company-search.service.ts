import { AppSettings } from './../../../../apiUrl';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanySearchService {

  constructor(private http: Http, private httpClient: HttpClient) { }


  getStateList(countrySelect) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
    `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`)
    .map(
      (res: Response) => res
    );
  }

  getCityList(field= '') {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT +
      `Cities` + field)
      .map(
        (res: Response) => res
      );
  }

  getUnivList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `Universities`)
      .map((res: Response) => res
    );
  }

  search(i) {
    return this.httpClient.get
     (AppSettings.API_ENDPOINT +
       `CompanySearchVws/searchCompany?companyId=` + i.companyId +
       `&searchName=` + i.searchName +
       `&companySizeValueId=` + i.companySizeValueId +
       `&companyTypeValueId=` + i.companyTypeValueId +
       `&industryTypeValueId=` + i.industryTypeValueId +
       `&stateCode=` + i.stateCode +
       `&cityId=` + i.cityId +
       `&companyStatusValueId=` + i.companyStatusValueId +
       `&regionFlag=` + i.regionFlag +
       `&internshipInd=` + i.internshipInd
      )
       .map(
         (res: Response) => res);
   }

  // campusSearch(data) {
  //   return this.httpClient.get
  //    (AppSettings.API_ENDPOINT +
  //      `CampusSearchVws/searchCampus?universityId=` + data.universityId +
  //      `&averageSalary=` + data.averageSalary +
  //      `&stateCode=` + data.stateCode +
  //      `&cityId=` + data.cityId +
  //      `&regionFlag=` + data.regionFlag)
  //      .map(
  //        (res: Response) => res);
  //  }

    getCompanyTypeLookup() {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
         `LookupValues?filter={"where":{"lookupTypeId":"23"}}`).map((res: Response) => res);
    }
    //  services for company type in lookup tabel ends
    //  services for company size in lookup tabel starts
    getCompanySizeLookup() {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `LookupValues?filter={"where":{"lookupTypeId":"32"}}`).map((res: Response) => res);
    }


}
