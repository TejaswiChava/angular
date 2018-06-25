import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampusUploadDocService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  // ----service call to get city list
  getCampusUploadedDocs(campusId) {
    return this.httpClient.get(AppSettings.API_ENDPOINT +
      `CampusUploadLogs/getAllUploads?campusId=` + campusId).map((res: Response) => res);
  }

  downloadFile(location): Observable<Blob> {
    // let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.httpClient.get(AppSettings.API_ENDPOINT + location + '', { responseType: 'blob'})
        .map(res => res);
  }

  exportStudentListFile(filename, containerName): Observable<Blob> {
    // let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'attachments/' + containerName + '/download/' +
    filename + '', { responseType: 'blob'})
        .map(res => res);
  }
}
