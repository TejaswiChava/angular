import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { EmptyResponseService } from '../../../services/shared/empty-response/empty-response.service';
import { ValidateGraphService } from '../../../services/shared/graph-validation/validat-graph.service';
import { GraphModelMulti, JobRoleSummary, Single, TotalJobRoleData } from './company-dashboard.model';
import { CompanyDashboardService } from './company-dashboard.service';
import {
  AverageSalary,
  CompanyHiringGraph,
  DriveDetails,
  EffectiveMulti,
  RecentPlacements,
  UpcomingEvents,
} from './sample-data';
import { CompanyDashboardSampleDataService } from './sample-data.service';
import { LookUpGetAndSetLocalSrorage } from '../../../lookup.service';
import { LookupvalueService } from '../../../services/shared/lookupvalue.service';



@Component({
  selector: 'app-company-home-dashboard',
  templateUrl: './company-home-dashboard.component.html',
  styleUrls: ['./company-home-dashboard.component.css']
})

export class CompanyHomeDashboardComponent implements OnInit {
  eventTypeName: any= [];
  private orgDetail: any = [];
  loginData: any = {};
  private companyId: number;
  private vacancyStatus: GraphModelMulti[];
  private effectivenessGraph: GraphModelMulti[];
  private averageOffer: Single[];
  private campusHiringGraph: Single[];

  public sampleUpcomingEventFlag = false;
  public sampleRecentPlacementFlag = false;
  public sampleDrives = false;
  public sampleHiringGraphFlag = false;
  public sampleAverageOffer = false;
  public sampleVacancyFlag = false;
  public sampleEffectivenessFlag = false;

  private _inProgress: number;
  private _scheduled: number;
  private _eventClosed: number;
  private _activeDrives: number;
  private _totalNumberOfPositions: number;
  private _positionFilled: number;

  public upcomingEventTableRow: any = [];
  public upcomingEventTableColumn: any = [];
  public recentRecruitmentTableRow: any = [];
  public recentRecruitmentTableColumn: any = [];
  public driveDetailsTableRow: any = [];
  public driveDetailsTableColumn: any = [];

  recentRecruitmentData: any = [];
  campusHiringData: any = [];
  driveDetails: any = [];
  upcomingEvent: any = [];

  jobRoleData: any = [];

  constructor(
    private companydashboard: CompanyDashboardService,
    private cookieService: CookieService,
    private isEmpty: EmptyResponseService,
    private sampleData: CompanyDashboardSampleDataService,
    private checkGraphs: ValidateGraphService,
    public lookUp: LookUpGetAndSetLocalSrorage,
    private lookupValue: LookupvalueService
  ) { }


  ngOnInit() {
    this.setUserContext();
    this.setCompanyId();
    this.eventTypeName = this.lookUp.getLookUpData('EMPLOYER_EVENT_TYPE_CODE', null);
    const companyId = this.getCompanyId();
    this.getJobRolesData(companyId);
    this.getRecentRecruitment(companyId);
    this.getDriveDetails(companyId);
    this.getCampusHiringPieChart(companyId, 0);
    this.getUpcomingevent(companyId);
    this.getOrganizations(companyId);

  }

  setUserContext() {
    this.loginData = this.cookieService.getObject('loginResponce');
  }

  setCompanyId() {
    this.companyId = this.loginData.companyId;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  setVacancyStatus(vacancyStatus) {
    this.vacancyStatus = vacancyStatus;
  }

  getVacancyStatus() {
    return this.vacancyStatus;
  }

  setEffectivenessGraph(effectivenessGraph) {
    this.effectivenessGraph = effectivenessGraph;
  }

  getEffectivenessGraph() {
    return this.effectivenessGraph;
  }

  setAverageOffer(averageOffer) {
    let zeroCheck = false;
    zeroCheck = this.checkGraphs.validateBarGraph(averageOffer);
    if (zeroCheck === true) {
      this.sampleAverageOffer = true;
      this.averageOffer = Object.assign([], AverageSalary);
    } else {
      this.averageOffer = averageOffer;
    }
  }

  getAverageOffer() {
    return this.averageOffer;
  }
  setCampusHiringGraph(campusHiringData) {
    this.campusHiringGraph = campusHiringData;
  }

  getCampusHiringGraph() {
    return this.campusHiringGraph;
  }
  setDriveDetails(driveDetails) {
    this.driveDetailsTableRow = driveDetails;
    this.driveDetailsTableColumn = this.companydashboard.getColumn(driveDetails);
  }

  setDashboardAttributesLast(value: any = {}) {
    this._inProgress = value.inProgress ? value.inProgress : 0;
    this._scheduled = value.scheduled ? value.scheduled : 0;
    this._eventClosed = value.closed ? value.closed : 0;
    this._activeDrives = value.ActiveDrives ? value.ActiveDrives : 0;
  }

  getInProgress() {
    return this._inProgress;
  }

  getScheduled() {
    return this._scheduled;
  }

  getEventClosed() {
    return this._eventClosed;
  }

  getActiveDrives() {
    return this._activeDrives;
  }

  getOpenPosition() {
    return this._totalNumberOfPositions;
  }

  getPositionFilled() {
    return this._positionFilled;
  }
  getDriveDetailsRow() {
    return this.driveDetailsTableRow;
  }

  getDriveDetailsColumn() {
    return this.driveDetailsTableColumn;
  }


  setRecentRecruitment(recentRecruitment) {
    this.recentRecruitmentTableRow = recentRecruitment;
    this.recentRecruitmentTableColumn = this.companydashboard.getColumn(recentRecruitment);
  }

  getRecentRecruitmentRow() {
    return this.recentRecruitmentTableRow;
  }

  getRecentRecruitmentColumn() {
    return this.recentRecruitmentTableColumn;
  }

  setUpcomingEvents(upcomingEvents) {
    if (!this.sampleUpcomingEventFlag) {
   this.formatUpcomingEventData(upcomingEvents);
    this.upcomingEventTableRow = upcomingEvents;
    }else {
      this.upcomingEventTableRow = upcomingEvents;
    }
    this.upcomingEventTableColumn = this.companydashboard.getColumn(upcomingEvents);
  }
   formatUpcomingEventData(value) {
      for (let i = 0; i < value.length; i++) {
       const eventId = value[i]['Event Type'];
       value[i]['Event Type'] =  this.eventTypeName[eventId].lookupValue;
      }
   }

  getUpcomingEventsRow() {
    return this.upcomingEventTableRow;
  }

  getUpcomingEventsColumn() {
    return this.upcomingEventTableColumn;
  }


  setGraphsData(jobRoleData: JobRoleSummary[]) {
    const vacancyFlag = 'Vacancy';
    const effectiveFlag = 'Effectiveness';
    const vacancyLabel1 = 'Open Position';
    const vacancyLabel2 = 'Filled Position';
    const effectiveLabel1 = 'Students Shortlisted';
    const effectiveLabel2 = 'Students Screened';
    let result: any = [];
    let checkZero = false;

    result = this.companydashboard.formatGraphDataMulti(
      jobRoleData,
      vacancyLabel1,
      vacancyLabel2,
      vacancyFlag
    );
    checkZero = this.checkGraphs.MultiBarGraphValidate(result);
    if (checkZero === true) {
      this.sampleVacancyFlag = true;
      const sampleData = Object.assign([], EffectiveMulti);
      this.setVacancyStatus(sampleData);
      checkZero = false;
    } else {
      this.setVacancyStatus(result);
    }


    result = this.companydashboard.formatGraphDataMulti(
      jobRoleData,
      effectiveLabel1,
      effectiveLabel2,
      effectiveFlag
    );
    checkZero = this.checkGraphs.MultiBarGraphValidate(result);
    if (checkZero === true) {
      this.sampleEffectivenessFlag = true;
      const sampleData = Object.assign([], EffectiveMulti);
      this.setEffectivenessGraph(sampleData);
      checkZero = false;
    } else {
      this.setEffectivenessGraph(result);
    }


    result = this.companydashboard.formatGraphDataSingle(
      jobRoleData
    );
    this.setAverageOffer(result);

  }

  getRecentRecruitment(companyId: number) {
    this.companydashboard.getRecentRecruitment(companyId)
      .subscribe((res: Response) => {
        if (this.isEmpty.checkResponse(res)) {
          this.setRecentRecruitment(res);
        } else {
          this.sampleRecentPlacementFlag = true;
          const sampleData = Object.assign([], RecentPlacements.rows);
          this.setRecentRecruitment(sampleData);
        }
      },
      ((error) => console.log(error)));
  }

  getCampusHiringPieChart(companyId: number, orgId) {
    this.companydashboard.getCampusHiringPieChart(companyId, orgId)
      .subscribe((res: Response) => {
        if (this.isEmpty.checkResponse(res)) {
          let result;
          this.sampleHiringGraphFlag = false;
          this.campusHiringData = res;
          result = this.companydashboard.formatCampusHiringGraph(this.campusHiringData);
          result = this.companydashboard.minimizeObjects(result);
          this.setCampusHiringGraph(result);
        } else {
          this.sampleHiringGraphFlag = true;
          const sampleData = Object.assign([], CompanyHiringGraph);
          this.setCampusHiringGraph(sampleData);
        }
      },
      ((error) => console.log(error)));
  }

  getDriveDetails(companyId: number) {
    this.companydashboard.getDriveDetails(companyId)
      .subscribe((res) => {
        if (this.isEmpty.checkResponse(res.DriveInfo)) {
          this.setDriveDetails(res.DriveInfo);
          this.setDashboardAttributesLast(res.counts);
        } else {
          this.sampleDrives = true;
          const sampleData = Object.assign([], DriveDetails.rows);
          this.setDriveDetails(sampleData);
          this.setDashboardAttributesLast(res.counts);
        }
      },
      ((error) => console.log(error)));
  }

  getUpcomingevent(companyId: number) {
    this.companydashboard.getUpcomingEvents(companyId)
      .subscribe((res: Response) => {
        if (this.isEmpty.checkResponse(res)) {
          this.setUpcomingEvents(res);
        } else {
          this.sampleUpcomingEventFlag = true;
          const sampleData = Object.assign([], UpcomingEvents.rows);
          this.setUpcomingEvents(sampleData);
        }
      },
      ((error) => console.log(error)));
  }

  getJobRolesData(id: number): void {
    this.companydashboard.getJobRole(id)
      .subscribe(
      (res: TotalJobRoleData) => {
        this.jobRoleData = res;
        this._totalNumberOfPositions = res.CompanyDetails.totalCompanyCount;
        this._positionFilled = res.CompanyDetails.totalCmpanySelected;
        this.setGraphsData(this.jobRoleData.CompanyDetails.JobRoleSummary);
      },
      (error) => console.log(error)
      );
  }

  selectedOrgId(selOrgIdFromChild: number) {
    this.getCampusHiringPieChart(this.companyId, selOrgIdFromChild);
  }


  formatOrganizationData(value) {
    this.orgDetail = value.data.map(function (obj) {
      let orgIdName = {};
      orgIdName['orgName'] = obj.name;
      orgIdName['orgId'] = obj.organizationId;
      return orgIdName;
    });
  }

  getOrganizations(companyId) {
    this.companydashboard.getOrganizationsDetail(companyId)
      .subscribe((resp: Response) => {
        const orgData = resp;
        this.formatOrganizationData(orgData);
      });
  }
}
