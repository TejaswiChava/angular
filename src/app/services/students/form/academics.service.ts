import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Academic } from './../../../components/student/datamodels/student-enrollment.model';
import {AppSettings} from './../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AcademicsService {

  constructor(private http: Http, private httpClient: HttpClient) { }

      postAcademicsData(AcademicsData) {
        return this.httpClient.post(AppSettings.API_ENDPOINT + `StudentAdditionalInfos`, AcademicsData)
                        .map((res: Response) => res);
      }
}
