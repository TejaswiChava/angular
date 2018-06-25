import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getCityList(stateSelect) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
  }
  // ----service call to get state list
  getStateList(countrySelect) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`, ).map((res: Response) => res);
  }
  // ----service call to get country list
  getCountryList() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `Countries`).map((res: Response) => res);
  }
  // ----service call to get postal list
  getPostalList(citySelect) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`).map((res: Response) => res);
  }

  eventTypeLookup() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"27"}}`).map((res: Response) => res);
  }

  eventStatusLookupCompany() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"28"}}`).map((res: Response) => res);
  }
  eventStatusLookup() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"20"}}`).map((res: Response) => res);
  }

  getDriveList(id) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerDrives/getEmployerDriveDetails?companyId=` + id + ``).map((res: Response) => res);
  }

  getJobPref(cId, jId) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `JobRoles/getJobRoleDetails?companyId=` + cId + `&jobRoleId=` + jId + ``).map((res: Response) => res);
  }

  createEvent(data) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `EmployerEvents/createCompleteEmployerEvent`, data).map((res: Response) => res);
  }

  getEmployercampus(cId, eDId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EmployerDriveCampuses/getEmployerDriveCampus?campusId=` +
    cId + `&empDriveId=` + eDId)
    .map((res: Response) => res);
  }

  editEmployerCampus(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `EmployerDriveCampuses`, data).map((res: Response) => res);
  }

  updateEvent(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `EmployerEvents/updateEmployerEvent`, data).map((res: Response) => res);
  }

  eventActions(data) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `EmployerEvents/createEmployerEventAction`, data)
    .map((res: Response) => res);
  }

  getDataByEventAndDrive(data) {
    return this.httpClient.post
      (AppSettings.API_ENDPOINT + `EmployerCampusListDtls/getCampusByEvent`, data).map((res: Response) => res);
  }
  notify(data) {
    return this.httpClient.post
      (AppSettings.API_ENDPOINT + `NotificationMessageTemplates/pushNotification`, data).map((res: Response) => res);
  }

  getEventByIdtoPatch(cEID) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EmployerEvents/getAllEvents?empEventId=` + cEID)
    .map((res: Response) => res);
  }
getEventList(id) {
  return this.httpClient.get(AppSettings.API_ENDPOINT + `EmployerEvents/getAllEvents?companyId=` + id)
  .map((res: Response) => res);
}

}
