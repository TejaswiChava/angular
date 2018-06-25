import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CampusEventStudentListService {
  public studentsData: any[];

  constructor(private http: Http, private httpClient: HttpClient) { }

  getDepartments(campusID) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=` + campusID + `` )
      .map((res: Response) => res);
  }
  compareDepartmentDetails(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  getDriveDetails(campusID, driveId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `CampusDrives/getCampusDriveDetails?campusId=` + campusID +
      `&campusDriveId=` + driveId + ``)
      .map((res: Response) => res);
  }
  getProgramDetails(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Programs/getProgramDetails?campusId=` + campusId + ``)
      .map((res: Response) => res);
  }
  getProgramDetailsWithDepartmentId(campusId, departmentId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Programs/getProgramDetails?campusId=` + campusId + `&&departmentId=` + departmentId)
      .map((res: Response) => res);
  }
  compareProgramDetails(a, b) {
    if (a.programName < b.programName) {
      return -1;
    }
    if (a.programName > b.programName) {
      return 1;
    }
    return 0;
  }

  studentSearch(data, campusId, flag = 'N') {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `CampusEventStudentSearchVws/campusStudentSearchVw?campusId=` + campusId +
        `&firstName=` + data.firstName +
        `&departmentId=` + data.departmentId +
        `&lastName=` + data.lastName +
        `&programId=` + data.programId +
        `&cgpaScore=` + data.cgpa + '&flag=Y')
        .map((res: Response) => res);
  }

  getStudentDetailsByEventId(id) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `EventStudentLists/getStudentsByEventId?campusEventId=` + id + ``)
      .map(
        (res: Response) => res
      );
  }

  getCompensationDetails(campusEventId, campusId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
    `CompensationPackages/getCompensationDetails?empEventId=` + campusEventId + `&campusId=` + campusId)
    .map((res: Response) => res);
  }

  getExportStudentPath(campusEventId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `Companies/getEventStudentList?campusEventId=` + campusEventId + ``)
      .map((res: Response) => res);
  }

  updateEventAction(statusData) {
    return this.httpClient.put(AppSettings.API_ENDPOINT +
      `EventStudentLists/unregStudentEventActions`, statusData)
      .map((res: Response) => res);
  }

  getCampusCandidateStatusArray(candidateStatusArray, eventStatusId) {
    const screenings = 376;
    const closed = 244;
    const scheduled = 243;
    const shortlisted = 242;
    const published = 241;
    const sharedWithCompany = 240;
    const initial = 238;
    const inProgress = 239;

    console.log('eventStatusId' + eventStatusId);
    if (eventStatusId === screenings) {
      return candidateStatusArray.filter( function(statusObject) {
        return statusObject.lookupValueId !== 380 &&
               statusObject.lookupValueId !== 381 &&
               statusObject.lookupValueId !== 382;
      });
    } else if (eventStatusId === published || eventStatusId === sharedWithCompany ||  eventStatusId === initial) {
      return candidateStatusArray.filter( function(statusObject) {
        return statusObject.lookupValueId === 376 ||
                statusObject.lookupValueId === 514;
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

  removeStudentFromEvent(id) {
    return this.httpClient.delete(
      AppSettings.API_ENDPOINT + `/EventStudentLists/` + id)
      .map(
        (res: Response) => res
      );
  }
  setDeleteStudents(students) {
      this.studentsData = students;
  }
  getDeleteStudents() {
    console.log('students data for delete', this.studentsData);
    return this.studentsData;
  }
}
