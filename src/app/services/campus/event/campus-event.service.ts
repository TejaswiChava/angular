import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../apiUrl';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusEventService {

  constructor(private http: Http, private httpClient: HttpClient,
    // public toastr: ToastsManager
    private toastr: ToastrService) { }
  getDriveList(id) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `CampusDrives/getCampusDriveDetails?campusId=` + id + ``).map((res: Response) => res);
  }

  getCampusEventList(id) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `CampusEvents/getAllCampusEvents?campusId=` + id).map((res: Response) => res);
  }

  postCampusEvent(data) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `CampusEvents/createCampusEvent`, data).map((res: Response) => res);
  }

  updateCampusEvent(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `CampusEvents/updateCampusEvent`, data).map((res: Response) => res);
  }

  getCompanyById(id) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `CompanySearchVws/searchCompany?companyId=` + id + ``).map((res: Response) => res);
  }

  campusStudentList(data) {
    return this.httpClient.post
    (AppSettings.API_ENDPOINT + `EventStudentLists/createEventStudentList`, data).map((res: Response) => res);
  }
  deleteSetOfStudents(data) {
    return this.httpClient.put
    (AppSettings.API_ENDPOINT + `EventStudentLists/deleteSetOfStudents`, data).map((res: Response) => res);
  }
  getStudentDetailsByEventId(id) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `EventStudentLists/getStudentsByEventId?campusEventId=` + id).map((res: Response) => res);
  }

  eventAction(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'CampusEvents/campusBussinessLogic', data).map((res: Response) => res);
  }

  getEveAcceptedCompanyDet(eveId) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `EmployerEvents/getCompanyByEvent`, eveId).map((res: Response) => res);
  }
  getEmployerEventDetails(eveId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `EmployerEvents/getEmployerEventDetails?empEventId=` + eveId)
    .map((res: Response) => res);
  }
  getEventByIdtoPatch(cEID) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `CampusEvents/getAllCampusEvents?campusEventId=` + cEID).
    map((res: Response) => res);
  }
  pushNotification(data) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `NotificationMessageTemplates/pushNotification`, data)
    .map((res: Response) => res);
  }
  getEventList(id) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `CampusEvents/getAllCampusEvents?campusId=` + id).
    map((res: Response) => res);
  }
}
