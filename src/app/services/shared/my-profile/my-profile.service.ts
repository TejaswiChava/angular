import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyProfileService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  getPersonsDetails(currentUserData) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'EducationPeople/getEducationPerson?educationPersonId=' +
    currentUserData.educationPersonId + '&campusId=' + currentUserData.campusId)
    .map((res: Response) => res);
  }










  getPersonType() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"6"}}`)
    .map((res: Response) => res);
  }
  updateEduPerson(eduPersonDet) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `EducationPeople/updateEducationPerson`, eduPersonDet)
    .map((res: Response) => res);
  }
  getCityList(stateSelect) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect   + `"}}`)
    .map((res: Response) => res);
  }

  getStateList(countrySelect) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"`   + countrySelect + `"}} `, )
    .map((res: Response) => res);
  }
  getCountryList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Countries`).map((res: Response) => res);
  }
  getPostalList(citySelect) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`)
    .map((res: Response) => res);
  }
  getContactLookup() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`)
    .map((res: Response) => res);
  }
  getAddressLookup() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"5"}}`)
    .map((res: Response) => res);
  }
  eduAddCreate(eduAdd) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `EducationPersonAddresses/createEducationPersonAddress`,  eduAdd)
    .map((res: Response) => res);
  }
  eduContCreate(eduCnt) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `EducationPersonContacts/createEducationContact`,  eduCnt)
    .map((res: Response) => res);
  }
  getEduPerAddList(eduPerId,  eduCmpId , eduAddId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EducationPersonAddresses/getEducationPersonAddress?educationPersonId=` +
    eduPerId + `&campusId=` + eduCmpId + `&addressId=` + eduAddId + ``)
    .map((res: Response) => res);
  }
  getPersonAddress(eduPerId, eduCmpId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EducationPersonAddresses/getEducationPersonAddress?educationPersonId=` +
    eduPerId + `&campusId=` + eduCmpId + ``).map((res: Response) => res);
  }
  updatePersonAddress(UpdtPerAddDet) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `EducationPersonAddresses/updateEducationPersonAddress`, UpdtPerAddDet)
    .map(res => res);
  }
  getPersonContact(eduPerId, eduCmpId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EducationPersonContacts/getEducationPersonContact?educationPersonId=` +
    eduPerId + `&campusId=` + eduCmpId + ``).map((res: Response) => res);
  }
  updatePersonContact(UpdtPerContDet) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `EducationPersonContacts/updateEducationPersonContact`, UpdtPerContDet)
    .map(res => res);
  }

}
