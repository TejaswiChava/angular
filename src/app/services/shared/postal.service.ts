import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostalService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getCityList(stateSelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Cities?filter={"where":{"stateCode":"` + stateSelect + `"}}`).map((res: Response) => res);
  }

  getStateList(countrySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `States?filter={"where":{"countryCode":"` + countrySelect + `"}}`)
      .map((res: Response) => res);
  }

  getCountryList() {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `Countries`).map((res: Response) => res);
  }

  getPostalList(citySelect) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `PostalCodes?filter={"where":{"cityId":"` + citySelect + `"}}`)
      .map((res: Response) => res);
  }
}
