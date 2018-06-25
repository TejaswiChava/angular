import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {AppSettings} from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UiAttachmentsService {

  constructor(private _http: Http, private httpClient: HttpClient) { }

  uploadAttachments(payload, containerName) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `Attachments/` + containerName + '/upload', payload)
    .map((res: Response) => res);
  }

  deleteAttachment(fileName, containerName) {
    // console.log('sericessss uploaddd'+ JSON.stringify(fileName));
    return this.httpClient.delete(AppSettings.API_ENDPOINT + `Attachments/` + containerName + '/files/' + fileName)
    .map((res: Response) => res);
  }
}
