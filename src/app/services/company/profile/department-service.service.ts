import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';

@Injectable()
export class DepartmentServiceService {

  endpointUrl: string = AppSettings.API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  getDepartmentProfile(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `Departments/departmentProfile?departmentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  getDepartmentGraph(id: number): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Departments/departmentGraphData?departmentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }
}
