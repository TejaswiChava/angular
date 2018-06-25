import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from './../../apiUrl';
import { EmptyResponseService } from './empty-response/empty-response.service';
import { LookUpGetAndSetLocalSrorage } from '../../lookup.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LookupvalueService {

  private skills: any;
  private interest: any;
  allLookupData: any;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private lookUp: LookUpGetAndSetLocalSrorage,
    private emptyResponse: EmptyResponseService
  ) { }

  getLookupValue(lookUpTypeid: number): Observable<any> {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `LookupValues?filter={"where":{"lookupTypeId":"` + lookUpTypeid + `"}}`)
      .map((res: Response) => res);
  }

// ================ Skills ==================
  setSkills() {
    this.skills = this.lookUp.getLookUpData('SKILL_TYPE_CODE', null);
    console.log('Inside Set Skills');
  }

  getSkills() {
    let tempSkill: any;
    if (this.emptyResponse.checkResponse(this.skills)) {
      console.log('Inside Get Skills');
      tempSkill = this.skills;
      return tempSkill;
    } else {
      this.setSkills();
      this.getSkills();
    }
  }

// ================ Interests =================
  setInterest() {
    this.interest = this.lookUp.getLookUpData('INTEREST_TYPE_CODE', null);
  }
  getInterest() {
    if (this.emptyResponse.checkResponse(this.interest)) {
      return this.interest;
    } else {
      this.setInterest();
      this.getInterest();
    }
  }

  loadArrayLookups(lookups) {
    if (lookups) {
      let templookups = [];
      for (const key in lookups) {
       if (lookups.hasOwnProperty(key)) {
         templookups.push(lookups[key]);
       }
      }
      return templookups;
    }
  }
  setAllData() {
    this.allLookupData = JSON.parse(localStorage.getItem('cacheDataForLookup'));
  }

  getCountry() {
    let country = this.allLookupData.Country;
    country.sort(this.compareCountry);
    return country;
  }
  getState() {
    return this.allLookupData.State;
  }

  getCity() {
      let city = this.allLookupData.City;
    city.sort(this.compareCity);
    return city;
  }

  getUniversity() {
    let university = this.allLookupData.University;
    university.sort(this.compareUniversity);
    return university;
  }

  compareUniversity(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  compareCountry(a, b) {
    if (a.countryName < b.countryName) {
      return -1;
    }
    if (a.countryName > b.countryName) {
      return 1;
    }
    return 0;
  }

  compareCity(a, b) {
    if (a.cityName < b.cityName) {
      return -1;
    }
    if (a.cityName > b.cityName) {
      return 1;
    }
    return 0;
  }

  comparLookUpValue(a, b) {
    if (a.lookupValue < b.lookupValue) {
      return -1;
    }
    if (a.lookupValue > b.lookupValue) {
      return 1;
    }
    return 0;
  }


  getLookupSorted(lookUpTypeCode) {
    let result = this.lookUp.getLookUpData(lookUpTypeCode, null);
    result = this.loadArrayLookups(result);
    result.sort(this.comparLookUpValue);
    return result;
  }

  getLookupArray(lookUpTypeCode) {
    let result = this.lookUp.getLookUpData(lookUpTypeCode, null);
    result = this.loadArrayLookups(result);
    return result;
  }

  getLookup(lookUpTypeCode) {
    return this.lookUp.getLookUpData(lookUpTypeCode, null);
  }

  getAddressLookup() {
    return this.lookUp.getLookUpData('ADDRESS_TYPE_CODE', null);
  }

  getContactLookup() {
    return this.lookUp.getLookUpData('CONTACT_TYPE_CODE', null);
  }

  getProgramLookupType() {
    return this.lookUp.getLookUpData('PROGRAM_TYPE_CODE', null);
  }

  getProgramMajorLookupType() {
    return this.lookUp.getLookUpData('PROGRAM_MAJOR', null);
  }

  getProgramClassificationLookupType() {
    return this.lookUp.getLookUpData('PROGRAM_CLASSIFICATION_CODE', null);
  }

  getProgramCatTypeLookupType() {
    return this.lookUp.getLookUpData('PROGRAM_CATEGORY_CODE', null);
  }

  getPersonPrefixLookup() {
    return this.lookUp.getLookUpData('PREFIX_CODE', null);
  }

  getPersonTypeLookup() {
    return this.lookUp.getLookUpData('PERSON_TYPE_CODE', null);
  }

  getCampusDocumentTypeLookup() {
    return this.lookUp.getLookUpData('CAMPUS_UPLOAD_TYPE', null);
  }


}
