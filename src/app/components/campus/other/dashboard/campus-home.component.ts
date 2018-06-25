import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CampusDashboardService } from './campus-dashboard.service';
import {
  GraphsData,
  CampusDriveDetails,
  GraphandTableData
} from './campus-dashboard.model';
import { ValidateGraphService } from '../../../../services/shared/graph-validation/validat-graph.service';
import { EmptyResponseService } from '../../../../services/shared/empty-response/empty-response.service';
import {
  CampusRecentPlacementSampleData,
  CampusAverageSalarySampleData,
  AllPlacementSampleData,
  ShortlistedStudentSampleData,
  UnattendedStudentSampleData,
  CampusUpcomingEventSampleData,
  CampusDriveDetailsSampleData
} from './sample.data';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
@Component({
  selector: 'app-campus-home',
  templateUrl: './campus-home.component.html',
  styleUrls: ['./campus-home.component.css']
})
export class CampusHomeComponent implements OnInit {
  totalInvolved: any;
  selectedPeople: any;
  summaryData: any;
  eventTypeName: any;
  campusDepartments: any;
  private _campusId: number;
  private loginData: any = {};
  private departmentId: any = [];
  private name: any = [];

  private dashboardSummary: any = [];
  private allPlacement: GraphsData[];
  private unattended: GraphsData[];
  private shortlisted: GraphsData[];
  private hiringGraphData: GraphsData[];

  private upcomingEvevntsData: any = [];
  public upcomingEventsColumn: any = [];

  private recentPlacementData: any = [];
  public recentPlacementColumn: any = [];

  private averageOfferRow: any = [];
  private averageOfferColumn = [
    { prop: 'Department Name' },
    { prop: 'Average Salary' },
  ];

  private driveDetails: CampusDriveDetails[];
  public driveDetailsColumn: any = [];

  private graphsData: any = [];

  private numberOfStudentsPlaced: number;
  private averageOffer: number;
  private maximumOffer: number;
  private totatVisitedCompany: number;
  private totalStudentsgraduated: number;

  public AllPlacementFlag = false;
  public UnAttendedFlag = false;
  public shortListedFlag = false;
  public campusHiringFlag = false;
  public recentPlacementFlag = false;
  public averageSalaryFlag = false;
  public driveFlag = false;
  public upcomingEventsFlag = false;
  public campusDepartment: GraphsData[];
  constructor(
    private campusDashboard: CampusDashboardService,
    private cookieService: CookieService,
    private checkZero: ValidateGraphService,
    private isEmpty: EmptyResponseService,
    public lookUp: LookUpGetAndSetLocalSrorage,
    private lookupValue: LookupvalueService
  ) { }

  ngOnInit() {
    this.eventTypeName = this.lookUp.getLookUpData('EMPLOYER_EVENT_TYPE_CODE', null);
    this.setUserContext();
    this.setcampusId(this.loginData);
    const id = this.getcampusId();
    this.getGraphsData(id);
    this.getRecentRecruitment(id);
    this.getUpcomingEvents(id);
    this.getDriveDetails(id);
    this.getDepartments(id);
    this.getCampusHiringPieGraph(id, 0);
    // this.getDashboardSummary(id);
  }

  setUserContext() {
    this.loginData = this.cookieService.getObject('loginResponce');
  }

  // getDashboardSummary(campusId) {
  //   this.campusDashboard.getDashboardSummary(campusId).subscribe(
  //     (res) => {
  //       const data = res;
  //       this.setdashboardSummary(res);
  //       this.averageOffer = data.averageComp ? data.averageComp : 0;
  //       this.maximumOffer = data.maxComp ? data.maxComp : 0;
  //       this.totatVisitedCompany = data.visited ? data.visited : 0;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  childDepartments(departmentId: number) {
    this.getCampusHiringPieGraph(this._campusId, departmentId);
  }

  getCampusHiringPieGraph(campusId, departmentId) {
    this.campusDashboard.getCampusHiringPieGraph(campusId, departmentId).subscribe(
      (res: Response) => {
        res = this.campusDashboard.minimizePiechart(res);
          this.setPieChartData(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDepartments(campusId) {
    this.campusDashboard.getDepartments(campusId).subscribe(
      (res) => {
        this.campusDepartments = this.campusDashboard.formatDepartmentData(res.data);
      },
      error => {
        console.log(error);
      }
    );
  }



  getGraphsData(campusId) {
    this.campusDashboard.getGraphsData(campusId).subscribe(
      (res: Response) => {
        if (!this.isEmpty.checkResponse(res)) {
          const sampleAllPlacement = Object.assign([], AllPlacementSampleData);
          const sampleUnattended = Object.assign([], UnattendedStudentSampleData);
          const sampleShortlisted = Object.assign([], ShortlistedStudentSampleData);
          const sampleAverageSalary = Object.assign([], CampusAverageSalarySampleData);


          this.AllPlacementFlag = true;
          this.UnAttendedFlag = true;
          this.shortListedFlag = true;
          this.averageSalaryFlag = true;


          this.setallPlacement(sampleAllPlacement);
          this.setunattended(sampleUnattended);
          this.setshortlisted(sampleShortlisted);
          this.averageOfferRow = sampleAverageSalary.rows;
        } else {
          const totalStudentsInvolved = res['totalStudentsFinalYear'];
          this.setTotalInvolved(totalStudentsInvolved);
          const selectedInCampusData = res['totalSelected'];
          this.setSelected(selectedInCampusData);
          this.averageOffer = res['averageCompForCampus'] ? Math.floor(res['averageCompForCampus']) : 0;
          this.maximumOffer = res['maxComp'] ? res['maxComp'] : 0;
          this.totatVisitedCompany = res['visited'] ? res['visited'] : 0;
          this.setgraphsData(res['graphsDataForGraph']);
          const graphsData = this.getgraphsData();
          this.setAllGraphsData(graphsData);
          this.averageOfferRow = this.getAverageOfferRow(res['graphsDataForGraph']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

setTotalInvolved(involved: any) {
  this.totalInvolved = involved;
}
getTotalInvolved() {
  return this.totalInvolved;
}
setSelected(involved: any) {
  this.selectedPeople = involved;
}
getSelected() {
  return this.selectedPeople;
}
  getRecentRecruitment(campusId) {
    this.campusDashboard.getRecentPlacement(campusId).subscribe(
      (res: Response) => {
        if (this.isEmpty.checkResponse(res)) {
          this.setrecentPlacementData(res);
          this.recentPlacementColumn = this.campusDashboard.dataTableColumn(
            this.recentPlacementData
          );
        } else {
          this.recentPlacementFlag = true;
          const sampleData = Object.assign({}, CampusRecentPlacementSampleData);
          this.setrecentPlacementData(sampleData.rows);
          this.recentPlacementColumn = sampleData.columns;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getUpcomingEvents(campusId) {
    this.campusDashboard.getUpcomingEvents(campusId).subscribe(
      (res: Response) => {
        if (this.isEmpty.checkResponse(res)) {
          this.setupcomingEvevntsData(res);
          this.upcomingEventsColumn = this.campusDashboard.dataTableColumn(
            this.upcomingEvevntsData
          );
        } else {
          this.upcomingEventsFlag = true;
          const sampleUpcomingEventData = Object.assign({}, CampusUpcomingEventSampleData);
          this.setupcomingEvevntsData(sampleUpcomingEventData.rows);
          this.upcomingEventsColumn = sampleUpcomingEventData.columns;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getDriveDetails(campusId) {
    this.campusDashboard.getDriveDetails(campusId).subscribe(
      (res: CampusDriveDetails[]) => {
        if (this.isEmpty.checkResponse(res)) {
          this.setdriveDetails(res);
          this.driveDetailsColumn = this.campusDashboard.dataTableColumn(
            this.driveDetails
          );
        } else {
          this.driveFlag = true;
          const sampleData = Object.assign({}, CampusDriveDetailsSampleData);
          this.setdriveDetails(sampleData.rows);
          this.driveDetailsColumn = sampleData.columns;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public getnumberOfStudentsPlaced() {
    return this.numberOfStudentsPlaced;
  }

  public getaverageOffer() {
    return this.averageOffer;
  }

  public getmaximumOffer() {
    return this.maximumOffer;
  }

  public gettotatVisitedCompany() {
    return this.totatVisitedCompany;
  }

  public gettotalStudentsgraduated() {
    return this.totalStudentsgraduated;
  }
  public getDepartmentInfo() {
    return this.campusDepartments;
  }
  public setdriveDetails(value: any) {
    this.driveDetails = value;
  }

  public getdriveDetails(): any {
    return this.driveDetails;
  }
  public getdashboardSummary(): any {
    return this.dashboardSummary;
  }

  public setdashboardSummary(value: any) {
    this.dashboardSummary = value;
  }

  public getcampusId(): any {
    return this._campusId;
  }

  public setcampusId(value: any) {
    this._campusId = value.campusId;
  }

  public getupcomingEvevntsData(): any {
    return this.upcomingEvevntsData;
  }

  public setupcomingEvevntsData(value: any) {
    if (!this.upcomingEventsFlag) {
      this.formatUpcomingEventData(value);
      this.upcomingEvevntsData = value;
       }else {
        this.upcomingEvevntsData = value;
       }
  }

  public getrecentPlacementData(): any {
    return this.recentPlacementData;
  }

  public setrecentPlacementData(value: any) {
    this.recentPlacementData = value;
  }

  public gethiringGraphData(): any {
    return this.hiringGraphData;
  }

  public sethiringGraphData(value: any) {
    console.log('hhhhhhhhhhhhhhhhhhhh', value);
    this.hiringGraphData = value;
  }

  public getgraphsData(): any {
    return this.graphsData;
  }

  public setgraphsData(value: any) {
    this.graphsData = value;
  }

  public getallPlacement(): any {
    return this.allPlacement;
  }

  public setallPlacement(value: any) {
    this.allPlacement = value;
  }

  public getunattended(): any {
    return this.unattended;
  }

  public setunattended(value: any) {
    this.unattended = value;
  }

  public getshortlisted(): any {
    return this.shortlisted;
  }

  public setshortlisted(value: any) {
    this.shortlisted = value;
  }

  setAllGraphsData(graphsData) {
    const selected = 'Selected';
    const unattended = 'Unattended';
    const shortlisted = 'Involved';
    let zeroCheckFlag = false;
    let result: GraphsData[];

    result = this.campusDashboard.formatGraphData(graphsData, selected);
    zeroCheckFlag = this.checkZero.validateBarGraph(result);
    if (zeroCheckFlag === true) {
      const sampleAllPlacement = Object.assign([], AllPlacementSampleData);
      this.AllPlacementFlag = true;
      this.setallPlacement(sampleAllPlacement);
      zeroCheckFlag = false;
    } else {
      this.setallPlacement(result);
    }

    result = this.campusDashboard.formatGraphData(graphsData, unattended);
    zeroCheckFlag = this.checkZero.validateBarGraph(result);
    if (zeroCheckFlag === true) {
      const sampleUnattendedStudent = Object.assign([], UnattendedStudentSampleData);
      this.UnAttendedFlag = true;
      this.setunattended(sampleUnattendedStudent);
      zeroCheckFlag = false;
    } else {
      this.setunattended(result);
    }

    result = this.campusDashboard.formatGraphData(graphsData, shortlisted);
    zeroCheckFlag = this.checkZero.validateBarGraph(result);
    if (zeroCheckFlag === true) {
      const sampleShortlisted = Object.assign([], ShortlistedStudentSampleData);
      this.shortListedFlag = true;
      this.setshortlisted(sampleShortlisted);
      zeroCheckFlag = false;
    } else {
      this.setshortlisted(result);
    }
  }

  getAverageOfferRow = Department => {
    if (Department.length > 0) {
      return Department.map(function (item) {
        return {
          'Department Name': item.departmentName ? item.departmentName : 0,
          'Average Salary': item.averageComp ? item.averageComp : 0
        };
      });
    } else {
      this.averageSalaryFlag = true;
      return [{
        'Department Name': 'Sample Department',
        'Average Salary': '0'
      }];
    }
  }

  getAverageOfferDataRow() {
    return this.averageOfferRow;
  }
  getAverageOfferDataColumn() {
    return this.averageOfferColumn;
  }

  setPieChartData(graphsData) {
    const hiring = 'Hiring';
    let result: GraphsData[];
    let zeroCheckFlag = false;
    if (this.isEmpty.checkResponse(graphsData)) {
      console.log('hearrrrrrrrrrrrr');
      result = this.campusDashboard.formatGraphData(graphsData, hiring);
      zeroCheckFlag = this.checkZero.validateBarGraph(result);
      if (zeroCheckFlag === true) {
        const sampleData = Object.assign([], ShortlistedStudentSampleData);
        this.campusHiringFlag = true;
        this.sethiringGraphData(sampleData);
        zeroCheckFlag = false;
      } else {
        console.log('otherrrrrrrrrr');
        this.campusHiringFlag = false;
        this.sethiringGraphData(result);
      }
    } else {
      console.log('rrrrrrrrrrrrr');
      const sampleData = Object.assign([], ShortlistedStudentSampleData);
      this.campusHiringFlag = true;
      this.sethiringGraphData(sampleData);
    }

  }
  formatUpcomingEventData(value) {
    for (let i = 0; i < value.length; i++) {
     const eventId = value[i]['Event Type'];
     value[i]['Event Type'] =  this.eventTypeName[eventId].lookupValue;
    }
 }
}
