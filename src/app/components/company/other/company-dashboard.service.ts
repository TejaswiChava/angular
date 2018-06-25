import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../apiUrl';
import { TotalJobRoleData, JobRoleSummary } from './company-dashboard.model';

@Injectable()
export class CompanyDashboardService {


  data: any[];
  endpointUrl: string = AppSettings.API_ENDPOINT;
  constructor(
    private httpClient: HttpClient,
  ) { }

  getJobRole(id): Observable<TotalJobRoleData> {
    return this.httpClient.get(this.endpointUrl + `JobRoles/getTotalJobsBasedOnRole?companyId=` + id)
      .map(
      (response: TotalJobRoleData) => {
        const data = response;
        return data;
      }
      );
  }

  getUpcomingEvents(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Companies/upCommingEvents?companyId=` + id)
      .map(
      (response: Response) => {
        const data = response;
        return data;
      }
      );
  }

  getRecentRecruitment(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Companies/getRecentRecruitment?companyId=` + id)
      .map(
      (response: Response) => {
        const data = response;
        return data;
      }
      );
  }

  getCampusHiringPieChart(id, orgId): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Companies/getCampusHiringData?companyId=` + id + `&organizationId=` + orgId)
      .map(
      (response: Response) => {
        const data = response;
        return data;
      }
      );
  }

  getDriveDetails(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Companies/driveDetails?companyId=` + id)
      .map(
      (response: Response) => {
        const data = response;
        return data;
      }
      );
  }


  getColumn(dataTable: any = []) {
    dataTable = Object.keys(dataTable[0]);
    return dataTable.map(function (item) {
      return { prop: item };
    });
  }
  /**
   *  function will take input as getTotalJobRole will return graphs all three different graphs
   *
   * @param {*} jobRoleInfo=[]
   * @param {string} labelValue1
   * @param {string} labelValue2
   * @param {boolean} graphTypeFlag
   * @returns
   * @memberof CompanyDashboardService
   */
  formatGraphDataMulti(jobRoleInfo: JobRoleSummary[], labelValue1: string, labelValue2: string, graphTypeFlag: string) {
    if (graphTypeFlag === 'Vacancy') {
      return jobRoleInfo.map(function (jobRoleItem) {
        const seriesArray = [];
        seriesArray.push({ name: labelValue1, value: jobRoleItem.openPostions ? jobRoleItem.openPostions : 0 },
          { name: labelValue2, value: jobRoleItem.postionsFilled ? jobRoleItem.postionsFilled : 0 });
        return { name: jobRoleItem.jobRoleName, series: seriesArray };
      });
    } else if (graphTypeFlag === 'Effectiveness') {
      return jobRoleInfo.map(function (jobRoleItem) {
        const seriesArray = [];
        seriesArray.push({ name: labelValue1, value: jobRoleItem.shortlisted ? jobRoleItem.shortlisted : 0 },
          { name: labelValue2, value: jobRoleItem.totalStudentsInvolved ? jobRoleItem.totalStudentsInvolved : 0 });
        return { name: jobRoleItem.jobRoleName, series: seriesArray };
      });
    }
  }

  formatGraphDataSingle(jobRoleInfo: any = []) {
    return jobRoleInfo.map(function (jobRoleItem) {
      return { name: jobRoleItem.jobRoleName, value: jobRoleItem.averageComp ? jobRoleItem.averageComp : 0 };
    });
  }

  formatDatatableColumns(upcomingEvents: any = [], columns) {
    columns = Object.keys(upcomingEvents[0]);
    columns = this.getColumn(columns);
  }


  formatCampusHiringGraph(campusData: any = []) {
    return campusData.map(function (item) {
      return { name: item.campusName, value: item.totalOffers ? item.totalOffers : 0 };
    });
  }





  getOrganizationsDetail(companyId): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Organizations/getOrganizationDetails?companyId=` + companyId)
      .map((resp: Response) => {
        const data = resp;
        return data;
      });

  }



  minimizeObjects(result) {
    let offers;
    let topNineCampus = [];
    result.sort(this.getSortOrder("value"));
    if (result.length > 9) {
      topNineCampus = result.splice(0, 8);
      for (let i = 9; i < result.length; i++) {
        offers = offers + result[i].value;
      }
      return topNineCampus.push({ "name": "Others", "value": offers });
    }
    else
      return result;
  }

  getSortOrder(totalOffers) {
    return function (a, b) {
      if (a[totalOffers] > b[totalOffers]) {
        return -1;
      } else if (a[totalOffers] < b[totalOffers]) {
        return 1;
      }
      return 0;
    }
  }
}
