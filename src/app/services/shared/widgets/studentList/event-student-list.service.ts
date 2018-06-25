import { Injectable, Input } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { StudentEventStatus } from '../../../../components/shared/widgets/event-student-list/student-event-status.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventStudentListService {
  statusOfButton: boolean;

  constructor(private http: Http, private httpClient: HttpClient) { }
  getEmpStatusCode() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"41"}}`).map((res: Response) => res);
  }
  updateEventAction(data) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + 'EventStudentLists/studentEventActions', data).map(res => res);
  }

  getCollegeListDetails(empEventId) {
    //  empEventId = 75675;
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `EventStudentLists/getStudentsByEventId?empEventId=` + empEventId)
      .map((res: Response) => res);
  }

  getExportStudentPath(employerEventId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `Companies/getEventStudentList?employerEventId=` + employerEventId + ``)
      .map((res: Response) => res);
  }

  getCompensationDetails(empEventId, companyId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
    `CompensationPackages/getCompensationDetails?empEventId=` + empEventId + `&companyId=` + companyId)
    .map((res: Response) => res);
  }

  /**
   * Function to filter various candidateStatusDropDown based on EventStatus
   *
   * @param {Array} candidateStatusArray {Array of all the Candidate Status}
   * @param {number} eventStatusId {Current Event Status}
   * @returns
   * @memberof EventStudentListService
   */
  getCandidateStatusArray(candidateStatusArray, eventStatusId) {
    const screenings = 317;
    const shortlisted = 318;
    const scheduled = 319;
    const inProgress = 320;
    const closed = 321;
    if (eventStatusId === screenings) {
      return candidateStatusArray.filter( function(statusObject) {
        return statusObject.lookupValueId !== 380 &&
               statusObject.lookupValueId !== 381 &&
               statusObject.lookupValueId !== 382 &&
               statusObject.lookupValueId !== 514;
      });
    } else if (eventStatusId === shortlisted || eventStatusId === scheduled) {
      return candidateStatusArray.filter( function(statusObject) {
        return statusObject.lookupValueId === 377 ||
               statusObject.lookupValueId === 378 ||
               statusObject.lookupValueId === 379;
      });
    } else if (eventStatusId === inProgress || eventStatusId === closed) {
      return candidateStatusArray.filter( function(statusObject) {
        return statusObject.lookupValueId === 378 ||
               statusObject.lookupValueId === 379 ||
               statusObject.lookupValueId === 380 ||
               statusObject.lookupValueId === 381;
      });
     } else {
      return [];
    }
  }
  setStatus(status) {
    this.statusOfButton = status;
  }
  getStatus() {
    return this.statusOfButton;
  }
}
