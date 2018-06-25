import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Student } from './../../components/student/datamodels/student-enrollment.model';
import {AppSettings} from './../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileFormService {

  constructor(private http: Http, private httpClient: HttpClient) { }

    postStudentSkills(StudentDetails) {
      return this.httpClient.post(AppSettings.API_ENDPOINT + `Student`, StudentDetails)
                      .map((res: Response) => res);
    }

}
