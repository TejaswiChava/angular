import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { GraphsData, CampusDriveDetails } from './campus-dashboard.model';

@Injectable()
export class CampusDashboardService {
   public  ninecompanies = [];
   public sumValue ;

  endpointUrl: string = AppSettings.API_ENDPOINT;
  constructor(
    private httpClient: HttpClient) {}


  /**
   * This function is  responsible for updating the status of campusdashboard service
   * @param {any} id It passes the value depending on the called function
   * @returns {Observable<any>} notifies the changes in the function
   * @memberof CampusDashboardService
   */
  getUpcomingEvents(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Campuses/upCommingEvents?campusId=` + id)
      .map(
        (response: Response) => {
          return response;
        }
      );
  }

  getRecentPlacement(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Campuses/getRecentPlacements?campusId=` + id)
      .map(
        (response: Response) => {
          return response;
        }
      );
  }

  getGraphsData(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Campuses/getCampusGraphDataForDashboard?campusId=` + id)
      .map(
        (response: Response) => {
          return response;
        }
      );
  }

   getDepartments(id): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Departments/getDepartmentDetails?campusId=` + id)
    .map(
      (response: Response) => {
        return response;
      }
    );
   }

   getCampusHiringPieGraph(campusId, departmentId?): Observable<any> {
    return this.httpClient.get(this.endpointUrl + `Campuses/getCampusHiringData?campusId=` + campusId + `&departmentId=` + departmentId)
      .map(
        (response: Response) => {
          return response;
        }
      );
  }

  // getDashboardSummary(id): Observable<any> {
  //   return this.httpClient.get(this.endpointUrl + `Campuses/dashBordSummaryData?campusId=` + id)
  //     .map(
  //       (response: Response) => {
  //         return response;
  //       }
  //     );
  // }
  getDriveDetails(id): Observable<CampusDriveDetails[]> {
    return this.httpClient.get<CampusDriveDetails[]>(this.endpointUrl + `CampusDrives/getAllDriveDetailsCampusDashbord?campusId=` + id)
      .map(
        (response: CampusDriveDetails[]) => {
          const data = response;
          return data;
        }
      );
  }

  getColumn(keys: any = []) {
    return keys.map(function (item){
      return { prop: item };
    });
  }
/**
 * Function will format the Input for various types of Graphs
 * Will accept graphsData and graphsType as input and will return object that can be fed to graph,qw
 * @memberof CampusDashboardService
 */
formatGraphData = (graphData: any = [], graphType: string): GraphsData[] => {
    if (graphType === 'Selected') {
      return graphData.map(function (item) {
        return { name: item.departmentName ? item.departmentName : '', value: item.selected ? item.selected : 0 };
        });
    } else if (graphType === 'Unattended') {
      return graphData.map(function (item) {
        return { name: item.departmentName ? item.departmentName : '', value: item.unAttendedStudents ? item.unAttendedStudents : 0 };
        });
    } else if (graphType === 'Involved') {
      return graphData.map(function (item) {
        // tslint:disable-next-line:max-line-length
        return { name: item.departmentName ? item.departmentName : '', value: item.totalStudentsInvolvedInEvents ? item.totalStudentsInvolvedInEvents : 0 };
        });
    } else if (graphType === 'Hiring') {
      return graphData.map(function (item) {
        return { name: item.companyName ? item.companyName : '', value: item.totalOffers ? item.totalOffers : 0 };
        });
    }
  }
/**
 * The following function gives the numberofcolumns dependig on  the numberof dataitems
 *
 * @memberof CampusDashboardService
 */
dataTableColumn = (dataTableItem: any = []) => {
    let columns: any = [];
    columns = Object.keys(dataTableItem[0]);
    columns = this.getColumn(columns);
    return columns;
  }
  formatDepartmentData = (departmentData: any = []): GraphsData[] => {
   return departmentData.map(function (item){
      return { name: item.name ? item.name : '', value : item.departmentId ? item.departmentId : 0 };

  });
  }
  minimizePiechart(result) {
    result.sort(this.sortDepartment);
    if (result.length > 9) {
     this.ninecompanies = result.slice(0, 9);
      for (let  i = 9 ; i < result.length; i++) {
          this.sumValue = this.sumValue + result[i].totalOffers;
      }
      this.ninecompanies.push({name: 'others', value: this.sumValue});
      return this.ninecompanies;
   }else {
     return result;
   }
   }
   sortDepartment = function(a, b) {
     if (a.totalOffers > b.totalOffers) {
       return -1;
     }
     if (a.totalOffers < b.totalOffers) {
       return 1;
     }
     return 0;
   };

}
