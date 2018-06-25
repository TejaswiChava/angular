import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  //  services for company address starts
    companyAddCreate(companyAddDetails) {
      return this.httpClient.post( AppSettings.API_ENDPOINT +
        `CompanyAddresses/createCompanyAddress`, companyAddDetails).map(response => response);
    }
    //  services for company address ends
    //  services for company contact starts
    companyContCreate(companyContDetails) {
         return this.httpClient.post(AppSettings.API_ENDPOINT
          + `CompanyContacts/createCompanyContact`,companyContDetails).map(response => response);
  
    }
    //  services for company contact ends
  
    //  services for company type in lookup tabel starts
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
    //  services for company size in lookup tabel ends
    //  services for company industry in lookup tabel starts
    getCompanyIndustryLookup() {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `LookupValues?filter={"where":{"lookupTypeId":"24"}}`).map((res: Response) => res);
    }
  //  services for company industry in lookup tabel ends
  //  services for city list starts
    getCityList(stateSelect) {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
    }
  //  services for city list  ends
  //  services for state list  starts
    getStateList(countrySelect) {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
         `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`).map((res: Response) => res);
    }
    //  services for state list in  ends
    //  services for country list  starts
    getCountryList() {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `Countries`).map((res: Response) => res);
    }
    //  services for country list ends
    //  services for postal code list starts
    getPostalList(citySelect) {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
     }
     //  services for postal code list ends
  //  services for gettting company profile list starts
    getCampusList() {
      return this.httpClient.get(AppSettings.API_ENDPOINT
        + `Campuses`).map((res: Response) => res);
    }
    //  services for gettting company profile list ends
    //  services for gettting company contact list starts
    getContactLookup() {
      return this.httpClient.get(
        AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`).map((res: Response) => res);
    }
    //  services for gettting company contact list ends
    //  services for gettting company address list starts
    getAddressLookup() {
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `LookupValues?filter={"where":{"lookupTypeId":"5"}}`).map((res: Response) => res);
    }
  //  services for gettting company address list ends
  //  services for gettting company address list by campusid starts
   getCompanyAddList(i) {
      // alert(i);
      return this.httpClient.get(AppSettings.API_ENDPOINT +
        `Addresses/getCompanyAddress?companyId=` + i + ``).map((res: Response) => res);
    }
    //  services for gettting company address list by campusid ends
    //  services for updating company profile list  starts
    updateCompany(companydetails) {
    //  console.log('update company :::::::::::::::::::' + JSON.stringify(companydetails));
      return this.httpClient.put(AppSettings.API_ENDPOINT
        + 'Companies/updateCompany', companydetails).map(res=>res);
  
    }
    //  services for updating company profile list  ends
    //  services for updating company address list  starts
   updateCompanyAdd(campusdetails) {
     return this.httpClient.put(AppSettings.API_ENDPOINT +
      `CompanyAddresses/updateCompanyAddress`, campusdetails).map(res=>res);
  
   }
   //  services for updating company address list ends
   //  services for updating company contact list  starts
   updateCompanyContact(campusdetails) {
      return this.httpClient.put(AppSettings.API_ENDPOINT +
        'CompanyContacts/updateCompanyContact', campusdetails).map(res=>res);
    }
  //  services for updating company contact list  ends
  //  services for gettting company contact list by campusid starts
    getCompanyContact(i) {
     // alert(k);
     return this.httpClient.get(AppSettings.API_ENDPOINT
      + `Contacts/getCompanyContactDet?companyId=` + i + ``).map((res: Response) => res);
   }
   //  services for gettting company contact list by campusid ends
   //  services for gettting company profile list by campusid starts
   getCompanyProfileData(i) {
    // alert(k);
    return this.httpClient.get(AppSettings.API_ENDPOINT
     + `Companies/getCompany?companyId=` + i + ``).map((res: Response) => res);
  }
  //  services for gettting company profile list by campusid ends

}
