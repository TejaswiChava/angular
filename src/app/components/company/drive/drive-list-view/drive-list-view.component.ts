import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { EmployerDriveService } from '../../../../services/company/employerDrive/employer-drive.service';
import { Http, Response, RequestOptions } from '@angular/http';
import { employerDriveModel } from '../drive-data-model';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import { sample } from 'rxjs/operators/sample';
@Component({
  selector: 'app-drive-list-view',
  templateUrl: './drive-list-view.component.html',
  styleUrls: ['./drive-list-view.component.css']
})
export class DriveListViewComponent implements OnInit, OnChanges {
  totalDrives: any;
  finalDetails: any = [];
  sampleDetails: any = [];
  driveDetails: any;
  getCampusList: any;
  drivedata: any = {
    empDriveId: '',
    driveName: '',
    organizationId: '',
    driveTypeValue: '',
    noOfPositions: '',
    jobRoleId: '',
    statusValue: '',
    budget: ''
      }
  constructor(private employerDriveService: EmployerDriveService,
    private cookieService: CookieService,
  private localStorage: LookUpGetAndSetLocalSrorage) { }
  @Input() filterQuery;
  @Input() showFilter: any;
  @Output() showFilterChange = new EventEmitter<any>();
  @Input() listobj;
  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';
  selectedDrive: employerDriveModel;
  loginData: any;
  isSearchActive = false;
  data: any = [];
  showAddBtn: any;
  ngOnInit() {
    // get job role details from services functionality starts
    // ----------service call to get campus List
    this.driveDetails = this.localStorage.getLookUpData('EMPLOYER_DRIVE_TYPE_CODE', null);
    // console.log('driveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.driveDetails)
    this.getUpdatedCampusList();
    this.getCampusList = function () {
      this.loginData = this.cookieService.getObject('loginResponce');
      this.employerDriveService.getCompanyEmployerDriveDetails(
        this.loginData.companyId).subscribe(data => {
          this.totalDrives = data.data;
          this.data = this.totalDrives;
          this.data =  this.data.filter( function(drives) {
           return drives.driveStatusValueId !== 308;
          });
          // this.getValues(data);
        });
    };
    this.getCampusList();
  }
  showInactiveDrives (event) {
    if (event.srcElement.checked) {
       this.data = this.totalDrives;
    } else {
      this.data =  this.totalDrives.filter( function(drives) {
        return drives.driveStatusValueId !== 308;
       });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  // getValues(data) {
  //   for(var i=0; i< data.data.length; i++) {
  //     this.drivedata = {
  //       empDriveId: data.data[i].empDriveId,
  //       driveName: data.data[i].driveName,
  //       organizationId: data.data[i].organizationId,
  //       driveTypeValue: this.driveDetails[data.data[i].driveTypeValueId].lookupValue,
  //       noOfPositions: data.data[i].noOfPositions,
  //       jobRoleId: data.data[i].jobRoleId,
  //       statusValue: data.data[i].employerDriveLookupValue.lookupValue,
  //       budget: data.data[i].budget
  //     }
  //     this.sampleDetails.push(this.drivedata);
  //     console.log('00000000000000000000000000z0z0z0z0zz0', this.sampleDetails);
  //     if( i == data.data.length - 1) {
  //       this.finalDetails = this.sampleDetails;
  //     }
  //   }
  // }

  getUpdatedCampusList() {

  }

  onSelect(driveList): void {
    console.log('----------------------------------------------------------------------------');
    this.selectedDrive = driveList;
    this.selectedDrive.readonly = true;
    this.isSearchActive = true;
    this.showAddBtn = true;
    this.filterQuery = '';
    this.showFilter = true;
    this.showFilterChange.emit(this.showFilter);

  }
}
