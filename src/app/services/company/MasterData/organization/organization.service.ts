import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrganizationService {

  constructor(private _http: Http, private httpClient: HttpClient) { }
  getOrgDetailsByOrgID(OrgCompanyId, orgId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Organizations/getOrganizationDetails?organizationId=` + orgId + `&companyId=` + OrgCompanyId + ``)
    .map((res: Response) => res);
  }
  getCityList(stateSelect) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
  }
  getStateList(countrySelect) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`).map((res: Response) => res);
  }
  getCountryList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Countries`).map((res: Response) => res);
  }
  getPostalList(citySelect) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
  }
  getContactLookup() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"4"}}`).map((res: Response) => res);
  }
  getAddressLookup() {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"5"}}`).map((res: Response) => res);
  }
  orgCreate(orgDetails) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `Organizations`, orgDetails).map((res: Response) => res);
  }
  orgAddCreate(orgDetails) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `OrganizationAddresses/createOrganizationAddress`, orgDetails).map((res: Response) => res);
  }

  orgContCreate(orgCntDetails) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `OrganizationContacts/createOrganizationContact`, orgCntDetails).map((res: Response) => res);
  }
  getOrganisationDetails(companyID) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Organizations/getOrganizationDetails?companyId=` + companyID + `` ).map((res: Response) => res);
  }
  updateOrganisationProfile(OrganisationDetails) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'Organizations/updateOrganization',OrganisationDetails).map(res=>res);
  }
  getOrgAddressListByOrgID(OrgCompanyId, orgId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `OrganizationAddresses/getOrganizationAddress?companyId=` + OrgCompanyId + `&organizationId=` + orgId + ``)
    .map((res: Response) => res);
  }
  updateOrganisationAddress(updtOrgDetails) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `OrganizationAddresses/updateOrganizationAddress`, updtOrgDetails)
    .map((res: Response) => res);
  }
  getOrgContactListByOrgID(OrgCompanyId, orgId) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `OrganizationContacts/getOrganizationContact?companyId=` + OrgCompanyId + `&organizationId=` + orgId + ``)
    .map((res: Response) => res);
  }
  updateOrganisationContact(orgContDet) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'OrganizationContacts/updateOrganizationContact', orgContDet).map(res => res);
  }

}





