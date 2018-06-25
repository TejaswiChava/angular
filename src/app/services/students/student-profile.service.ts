import { Injectable } from '@angular/core';
import { Request, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {AppSettings} from './../../apiUrl';
@Injectable()
export class StudentProfileService {

  data: any[];
  endpointUrl: string = AppSettings.API_ENDPOINT;
  constructor(private httpClient: HttpClient) { }

  getPersonalInfo(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Students/getStudent?studentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  getSkillInfo(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `StudentSkills/getStudentSkill?studentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }



  getInterestInfo(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `StudentInterests/getStudentInterest?studentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }


// returns hobbies and profile data of students

  getProfileInfo(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Students/studentProfile?studentId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }


getSocialMediaUrls(id):  Observable<any> {
  return this.httpClient.get(this.endpointUrl + `StudentAttributes/getStudentAttribute?studentId=` + id)
  .map(
    (response: Response) => {
      const data = response;
      return data;
    }
  );
}


getAdditionalInfo(id, catCode): Observable<any> {
  return this.httpClient.get(this.endpointUrl
    + `StudentAdditionalInfos/getStudentAdditionalInfo?studentId=` + id + `&catcode=` + catCode)
  .map(
    (response: Response) => {
      const data = response;
      return data;
    }
  );
}


getDegreeInfo(id): Observable<any> {
  return this.httpClient.get(this.endpointUrl + 'Enrollments/getEnrollmentDetails?studentId=' + id )
  .map(
    (response: Response) => {
      const data = response;
      return data;
    }
  );
}

decideStrength(strength) {
  let strength_image;
 if (strength >= 0 && strength < 10 ) {
     return   strength_image = 'assets/images/Profile_Page_Icons/strength_01.png';
  }else if ( strength >= 10 && strength < 20 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_02.png';
  }else if (strength >= 20 && strength < 30 ) {
     return  strength_image = 'assets/images/Profile_Page_Icons/strength_03.png';
  }else if (strength >= 30 && strength < 40 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_04.png';
  }else if (strength >= 40 && strength < 50 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_05.png';
  }else if (strength >= 50 && strength < 60 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_06.png';
  }else if (strength >= 60 && strength < 70 ) {
    return strength_image = 'assets/images/Profile_Page_Icons/strength_07.png';
  }else if (strength >= 70 && strength < 80 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_07.png';
  }else if (strength >= 80 && strength < 90 ) {
     return strength_image = `assets/images/Profile_Page_Icons/strength_09.png`;
  }else if (strength >= 90 && strength < 99 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_09.png';
  }else if (strength >= 99 && strength <= 100 ) {
     return strength_image = 'assets/images/Profile_Page_Icons/strength_10.png';
  }
}




}
