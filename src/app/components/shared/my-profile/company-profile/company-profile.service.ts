import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyProfileService {

  constructor(private _http: Http, private httpClient: HttpClient) { }
  getPersonsDetails(employerPersonId, companyId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT
      + `EmployerPeople/getEmployerPerson?employerPersonId=` + employerPersonId
      + `&companyId=` + companyId).map((res: Response) => res);
  }

  getPersonType(){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`LookupValues?filter={"where":{"lookupTypeId":"6"}}`).map((res: Response) => res);
  }
  updateEmpPerson(empPersonDet) {
    return this.httpClient.put(
      AppSettings.API_ENDPOINT + `EmployerPeople/updateEmployeePerson`, empPersonDet)
      .map((res: Response) => res);
  }

  getCityList(stateSelect){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`Cities?filter={"where":{"stateCode":"`+stateSelect+`"}}`)
    .map((res: Response) => res);
  }
  
  getStateList(countrySelect){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`States?filter={"where":{"countryCode":"`+countrySelect+`"}}`,)
    .map((res: Response) => res);
  }
  getCountryList(){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`Countries`).map((res: Response) => res);
  }
  getPostalList(citySelect){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`PostalCodes?filter={"where":{"cityId":"`+citySelect+`"}}`)
    .map((res: Response) => res);
  }
  getContactLookup(){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`LookupValues?filter={"where":{"lookupTypeId":"4"}}`)
    .map((res: Response) => res);
  }
  getAddressLookup(){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`LookupValues?filter={"where":{"lookupTypeId":"5"}}`)
    .map((res: Response) => res);
  }
  empAddCreate(empAdd){
    return this.httpClient.post(AppSettings.API_ENDPOINT+`EmployerPersonAddresses/createEmployerPersonAddress`,empAdd)
    .map((res: Response) => res);
  }
  empContCreate(empCnt){
    return this.httpClient.post(AppSettings.API_ENDPOINT+`EmployerPersonContacts/createEmployerContact`,empCnt).map((res: Response) => res);
  }
  getEduPerAddList(empPerId,empCmpId,eduAddId){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`EducationPersonAddresses/getEducationPersonAddress?educationPersonId=`+
    empPerId+`&campusId=`+empCmpId+`&addressId=`+eduAddId+``).map((res: Response) => res);
  }
  getPersonAddress(empPerId,empCmpId){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`EmployerPersonAddresses/getEmployerPersonAddress?employerPersonId=`+
    empPerId+`&companyId=`+empCmpId+``).map((res: Response) => res);
  }
  updatePersonAddress(UpdtPerAddDet){
    return this.httpClient.put(AppSettings.API_ENDPOINT+`EmployerPersonAddresses/updateEmployeePersonAddress`,UpdtPerAddDet)
    .map(res=>res);
  }
  getPersonContact(empPerId,empCmpId){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`EmployerPersonContacts/getEmployerPersonContact?employerPersonId=`+
    empPerId+`&companyId=`+empCmpId+``).map((res: Response) => res);
  }
  updatePersonContact(UpdtPerContDet){
    return this.httpClient.put(AppSettings.API_ENDPOINT+`EmployerPersonContacts/updateEmployeePersonContact`,UpdtPerContDet)
    .map(res=>res);  
  }
  getPrefixLookup(){
    return this.httpClient.get(AppSettings.API_ENDPOINT+`LookupValues?filter={"where":{"lookupTypeId":"2"}}`)
    .map((res: Response) => res);
  }

}
