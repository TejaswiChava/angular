import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';
@Injectable()
export class AboutCampusService {

  endpointUrl: string = AppSettings.API_ENDPOINT;
  constructor(private httpClient: HttpClient) { }

  getCampusProfile(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `Campuses/getCampusProfile?campusId=` + id)
      .map(
        (response: Response) => {
          const data = response;
          return data;
        }
      );
  }

  decideStudents(NoOfStudents) {
    if (NoOfStudents == null) {
          return  NoOfStudents = 0;
        }
  }


  decideGraduated(graduates) {
    if (graduates == null) {
          return  graduates = 0;
        }
  }



  getCampusGraph(id: number): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Campuses/getGraphAndTableData?campusId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }


  getDriveDetailsCampus(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `CampusDrives/getAllDriveDetails?campusId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  formatHeader = function(headerValues){
    return {
      studentsGraduated: headerValues.totalStudentsgraduated.totalStudentsgraduated,
      studentsPlaced: headerValues.offer.numberOfStudentsPlaced,
      totalVisited: headerValues.visited.totalCompanies,
      highestOffer: headerValues.offer.maximumOffer
    };
};


companyDecide(total) {
  if (total === null) {
    return  total = 0;
    }
    return total;
}


  getEventDetails(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `CampusEvents/getAllEventsOfMyCampus?campusId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  formatAvgOffer = function(averageOffer) {
    return averageOffer.map(function (item) {
        return {'name': item.academic_year, 'value':  item.averageComp};
    });
};

  formatjobRoleDetails = function(jobDetails) {
  return jobDetails.map(function (item) {
      return {'name': (item.compName) ? item.compName : 'Sample Company', 'value': item.noOfStudents};
  });
};


}



