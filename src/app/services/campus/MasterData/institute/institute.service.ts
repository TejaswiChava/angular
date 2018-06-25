
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
/*  import { HttpModule } from '@angular/http';*/
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InstituteService {

constructor(private _http: Http, private httpClient: HttpClient) { }

// ----service call to create campus
campusCreate(campusdetails) {
  return this.httpClient.post(AppSettings.API_ENDPOINT + 'Campuses', campusdetails).map((res: Response) => res);

}

// ----service call to create campus address
campAddCreate(campAddDetails) {
  return this.httpClient.post(AppSettings.API_ENDPOINT + `CampusAddresses/createCampusAddress`, campAddDetails)
  .map((response: Response) => response);
}
// ----service call to create campus contact
campusContCreate(campusContDetails) {
  return this.httpClient.post(
    AppSettings.API_ENDPOINT + `CampusContacts/createCampusContact`, campusContDetails).map((response: Response) => response);

}
// ----service call to get University List
 getUnivList() {
  return this.httpClient.get(AppSettings.API_ENDPOINT + `Universities`).map((res: Response) => res);
}
// ----service call to get city list
getCityList(stateSelect) {
  return this.httpClient.get(
    AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
}
// ----service call to get state list
getStateList(countrySelect) {
  return this.httpClient.get(
    AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`).map((res: Response) => res);
}
// ----service call to get country list
getCountryList() {
  return this.httpClient.get(AppSettings.API_ENDPOINT  + `Countries`).map((res: Response) => res);
}
// ----service call to get postal list
getPostalList(citySelect) {
  return this.httpClient.get(
    AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
}
// ----service call to get contact lookup
getContactLookup() {
  return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`)
  .map((res: Response) => res);
}
// ----service call to get address lookup
getAddressLookup() {
  return this.httpClient.get(
    AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"5"}}`).map((res: Response) => res);
}
// ----service call to get address list
getCampusAddList(i) {
  // alert(i);
  return this.httpClient.get(
    AppSettings.API_ENDPOINT + `CampusAddresses/getCampusAddress?campusId=` + i + ``).map((res: Response) => res);
}
// ----service call to update campus details
updateCmps(campusdetails) {
  return this.httpClient.put(AppSettings.API_ENDPOINT + 'Campuses/updateCampus', campusdetails).map((res: Response) => res);

}
// ----service call to update campus address
updateCmpsAdd(campusdetails) {
  delete campusdetails['cityDetails'];
  return this.httpClient.put(AppSettings.API_ENDPOINT + `CampusAddresses/updateCampusAddress`, campusdetails)
  .map((res: Response) => res);
}
// ----service call to get campus contact
getCampusContact(i) {
  return this.httpClient.get(AppSettings.API_ENDPOINT + `CampusContacts/getCampusContact?campusId=` + i + ``)
  .map((res: Response) => res);
}
// ----service call to update campus address
updateCampusAddress(campusdetails) {
  return this.httpClient.put(AppSettings.API_ENDPOINT + 'Campuses/updateCampusAddress', campusdetails).map((res: Response) => res);

}
// ----service call to update campus contact
updateCampusContact(campusdetails) {
   return this.httpClient.put(AppSettings.API_ENDPOINT + 'CampusContacts/updateCampusContact', campusdetails)
   .map((res: Response) => res);
 }
 // ----service call to get campus details by loggin
 getCampusDetailsByLogin(campusId) {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `Campuses/getCampus?campusId=` + campusId + `` ).map((res: Response) => res);
 }
 // ----service call to get campus address details by address
 getAddress(campusId) {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `CampusAddresses/getCampusAddress?campusId=` + campusId + `` ).map((res: Response) => res);
 }
 // ----service call to get campus contact details by
 getContact(campusId) {
  return this.httpClient.get
  (AppSettings.API_ENDPOINT + `CampusContacts/getCampusContact?campusId=` + campusId + `` ).map((res: Response) => res);
 }


}
