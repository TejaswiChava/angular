import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../../apiUrl';

@Injectable()
export class AboutCompanyService implements OnInit {

  data: any[];
  endpointUrl: string = AppSettings.API_ENDPOINT;
  constructor(private httpClient: HttpClient) { }

  getCompanyProfile(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Companies/companyProfile?companyId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  getCompanyEvents(id): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `Companies/companyProfile?companyId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  getJobDetails(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `Companies/getJobDetailsOfCompany?companyId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  getDriveDetails(id: number): Observable<any>  {
    return this.httpClient.get(this.endpointUrl + `Companies/totalDriveDetails?companyId=` + id)
    .map(
      (response: Response) => {
        const data = response;
        return data;
      }
    );
  }

  companyContact(contactClickDetails) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + 'NotificationMessageTemplates/pushNotification', contactClickDetails)
    .map(res => res);
  }

  // companyContact(id: number): Observable<any>  {
  //   return this.http.post(this.endpointUrl + `/NotificationMessageTemplates/pushNotification`)
  //   .map(
  //     (response: Response) => {
  //       const data = response;
  //       return data;
  //     }
  //   );
  // }
  formatHeader = function(headerValues){
        return {
          lastYearTotalOffers: headerValues.recurtmentDeatails[0].lastYearToatalOffers,
          lastYearMaxSal: headerValues.recurtmentDeatails[0].lastYearMaximumSalary,
          totalInterns: headerValues.Interns[0].totalIntersLastYear,
          lastYearCampus: headerValues.campusVisited[0].lastYearTotalCampusVisited
        };
  };

  formatAvgOffer = function(averageOffer) {
    return averageOffer.map(function (item) {
        return {'name': item.calendar_year, 'value':  item.averageOffer};
    });
};

  formatjobRoleDetails = function(jobDetails) {
  return jobDetails.map(function (item) {
      return {'name': item.campusName ? item.campusName : 'Sample Company', 'value': item.TotalJobsForThatCampus};
  });
};

// offerDecide( decideGraphs ) {

//   if (decideGraphs.recurtmentDeatails[0].lastYearToatalOffers == null) {
//     decideGraphs.recurtmentDeatails[0].lastYearToatalOffers = 0;
//   }
//   if (decideGraphs.recurtmentDeatails[0].lastYearMaximumSalary == null) {
//     decideGraphs.recurtmentDeatails[0].lastYearMaximumSalary = 0;
//   }
//   if (decideGraphs.Interns[0].totalIntersLastYear == null) {
//     decideGraphs.Interns[0].totalIntersLastYear = 0;
//   }
//   if (decideGraphs.campusVisited[0].lastYearTotalCampusVisited == null) {
//     decideGraphs.campusVisited[0].lastYearTotalCampusVisited = 0;
//   }


// }


campusDecide(total) {
  if (total === null) {
    return  total = 0;
    }
    return total;
}


// getUrl(companyData: any, facebook, twitter, linkedin, youtube) {
//   facebook = companyData.facebook;
//   linkedin = companyData.linkedin;
//   twitter = companyData.twitter;
//   youtube = companyData.youtube;
//   if (facebook === '' && linkedin === '' && twitter === '' && youtube === '') {
//      const socialSection = false;
//     const socialmedia = false;
//   } else {
//     if (facebook) {
//        const fb = true;
//     }
//     if (linkedin) {
//        const linkdn = true;
//     }
//     if (twitter) {
//       const twiit = true;
//     }
//     if (youtube) {
//      const utube = true;
//     }
//   }
// }

otherSlice(jobRoleDetails, slicedArray, final) {
  if (jobRoleDetails.length <= 9) {
    console.log('i am in if' + jobRoleDetails.length);
    jobRoleDetails = this.formatjobRoleDetails(jobRoleDetails);
    console.log('i this is afrer format' + jobRoleDetails);
  }else {
    slicedArray  = jobRoleDetails.slice(0, 8);
    console.log('this is sliced array' + slicedArray.length);
   for (let i = 9; i < jobRoleDetails.length; i++ ) {
  final.TotalJobsForThatCampus += jobRoleDetails[i].TotalJobsForThatCampus;
  }
    slicedArray.push(final);
    jobRoleDetails = this.formatjobRoleDetails(slicedArray);
  }

  return jobRoleDetails;
}


getJobsCount(jobs, campusDefault) {
  console.log(jobs.length + 'this is the length');
  if (jobs.length === 0) {
      campusDefault = false;
  }else {
      campusDefault = true;
  }
return campusDefault;
}


getOfferscount(offers, offerDefault) {
  console.log('this is offers' + offers.length);
  if (offers.length === 0) {
    offerDefault = false;
  }else {
    offerDefault = true;
  }
return offerDefault;
}


  ngOnInit() {

  }
}
