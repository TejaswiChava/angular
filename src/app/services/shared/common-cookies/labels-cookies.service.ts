import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';

import { Data } from '../data/data';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LabelsCookiesService {
  private url: any = 'http://139.162.253.126:3000/apiLabelset';
  projects: any = null;
  lookUp: any;
  constructor(private _http: Http, private httpClient: HttpClient) { }
  dataObject: any = {};
  private data: Data;
  private observable: Observable<any>;

  getData() {
    console.log('getData called');
    if (this.data) {
      console.log('-------------data already available');
      // if `data` is available just return it as `Observable`
      return Observable.of(this.data);
    } else if (this.observable) {
      console.log('-----------------request pending');
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.observable;
    } else {
      console.log('-------------send new request');
      // let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // create the request, store the `Observable` for subsequent subscribers
      this.observable = this.httpClient.get(this.url, {
        // headers: headers
      })
        .map((response: any) =>  {
          console.log('-------------response arrived');
          // when the cached data is available we don't need the `Observable` reference anymore
          this.observable = null;
          if (response.status === 400) {
            return 'FAILURE';
          } else if (response.status === 200) {
            console.log('+++++++++++++' + JSON.stringify(response.json()));
            this.data = new Data(response.json());
            return this.data;
          }
          // make it shared so more than one subscriber can get the result
        })
      .share();
      return this.observable;
    }
  }

  getLabels() {
    this.projects = this.httpClient.get(AppSettings.API_CACHE + 'apiLabelset').map((res: Response) => res);
    return this.projects;
  }
  getLookUp() {
    this.lookUp = this.httpClient.get( AppSettings.API_CACHE + 'getCacheLookUp').map((resLookUp: Response) => resLookUp);
    return this.lookUp;
  }
  getAllData() {
    this.lookUp = this.httpClient.get(AppSettings.API_CACHE + 'getAllData').map((resLookUp: Response) => resLookUp);
    return this.lookUp;
  }
  updateLocalStorage() {
        this.lookUp = this.httpClient.get(AppSettings.API_CACHE + 'data').map((resLookUp: Response) => resLookUp);
        console.log('thisis look', this.lookUp);
    return this.lookUp;
  }
}

