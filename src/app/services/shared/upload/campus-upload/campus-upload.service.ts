import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusUploadService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  getCampusDocumentTypeValue() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"39"}}`).map((res: Response) => res);
  }

  getCampusProgramTypeValue() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"16"}}`).map((res: Response) => res);
  }



  geDepartmentDetails(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Departments/getDepartmentDetails?campusId=` + campusId + `` ).map((res: Response) => res);
  }

  getProgramDetails(campusId,deptId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Programs/getProgramDetails?campusId=` + campusId + `&departmentId=`+ deptId).map((res: Response) => res);
  }

  getUnregisteredEvents(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `CampusEvents/getCampusUnregisteredEvents?campusId=` + campusId + `` ).map((res: Response) => res);
  }


  uploadCampusDatasource(payload): Observable<any[]> {
    return this.httpClient.post(AppSettings.API_ENDPOINT+`Attachments/scora-campus-upload/upload`, payload)
    .map((res: Response) => res)
    .catch(error => Observable.throw(error));
  }


  sendStudentEnrollementCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'StudentsMassUploadWorks/studentMassUpload',uploadObject ).map((res: Response) => res);
  }

  sendStudentAssessmentCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'StudentsAssessmentUploadWorks/studentAssessmentMassUpload', uploadObject )
      .map((res: Response) => res);
  }

  sendPlacementAggregatesCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'CampusPlacementAggregatesWorks/campusPlacementUpload', uploadObject ).map((res: Response) => res);
  }

  sendEventStudentShortlistCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'EventStudentLists/updateCandidateUpload', uploadObject ).map((res: Response) => res);
  }
  downloadSampleCsv(fileNameData): Observable<Blob> {
    // const options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'Attachments/scora-sample-upload-files/download/' +
     fileNameData + '.csv', { responseType: 'blob' }
  ).map(res => res);
  }

}
