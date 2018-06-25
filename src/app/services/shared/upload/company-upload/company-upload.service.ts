import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import {AppSettings} from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyUploadService {

  constructor(private _http: Http, private httpClient: HttpClient) { }


  getCompanyDocumentTypeValue() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"40"}}`).map((res: Response) => res);
  }


  getCompanyEvents(companyId) {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `EmployerEvents/getAllEvents?companyId=` + companyId).map((res: Response) => res);
  }

  uploadCompanyDatasource(payload): Observable<any[]> {
    return this.httpClient.post(AppSettings.API_ENDPOINT+`Attachments/scora-company-upload/upload`, payload)
    .map((res: Response) => res)
    .catch(error => Observable.throw(error));
  }

  sendTestScoreCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'EventTestScoreWorks/eventTestScoreUpload',uploadObject ).map((res: Response) => res);
  }

  sendHiringAggregatesCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'CompanyHiringAggregates/companyHiringMassUpload',uploadObject ).map((res: Response) => res);
  }

  sendEventStudentsCsvRequest(uploadObject) {
    return this.httpClient.post(
      AppSettings.API_ENDPOINT + 'UnregisterCampusStudentWorks/unregisteredCampusStudentUpload',uploadObject ).map((res: Response) => res);
  }
  downloadSampleCsv(fileNameData): Observable<Blob> {
    // const options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'Attachments/scora-sample-upload-files/download/' +
     fileNameData + '.csv', { responseType: 'blob' }
  ).map(res => res);
  }
}
