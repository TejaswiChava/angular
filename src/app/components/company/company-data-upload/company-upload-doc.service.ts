import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CompanyUploadDocService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  // ----service call to get city list
  getCompanyUploadedDocs(companyId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `CompanyUploadLogs/getAllUploads?companyId=` + companyId)
    .map((res: Response) => res);
  }

  downloadFile(location): Observable<Blob> {
    // const options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.httpClient.get(AppSettings.API_ENDPOINT + location + '', { responseType: 'blob' }
  ).map(res => res);
  }

}
