

import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { EmployerDriveService } from '../../../../services/company/employerDrive/employer-drive.service';
import { DriveComponent } from '../drive.component';
import { CreateDriveComponent } from '../create-drive/create-drive.component';
import { DriveListViewComponent } from '../drive-list-view/drive-list-view.component';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { SharedDriveService } from '../shared-drive.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-get-campus-list-view',
  templateUrl: './get-campus-list-view.component.html',
  styleUrls: ['./get-campus-list-view.component.css'],
  providers: [DriveComponent, CreateDriveComponent, DriveListViewComponent]
})
export class GetCampusListViewComponent implements OnInit, OnChanges {
  stateDetails: any;
  allData: any;
  studentStatus: any;
  listobj: any= {};
  @Input() eventType;
  @Input() getSearchStatus: boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();
  @Input() TotalData;
  @Input() campusListFromEvent;
  @Input() campusListDetails;
  @Input() sendDataList;
  @Output() sendDataListChange = new EventEmitter();
  @Input() formDriveData1;
  @Input() empDriveId;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  data: any;
  mockdata: any = [];
  contentEditable: any = [];
  sendData: any;
  resp: any;
  campusListArray: any = [];
  campusListDetailsObject: any={
    campusName: '',
    campusId: '',
    universityName: '',
    cityName: '',
    status: '',
    listName: '',
    state: ''
  };
  campusListDetailsArray: any;
  employeDriveResponse: any;
  collegesList: any;
  allCampusList: any = [];
  updatecollegesList: any = [];
  btnreadonly = false;
  eventHide = true;
  listData: any = [];
  eveCheck = true;
  lookUp: any = {
    lookUpValue: '',
    lookUpValueId: ''
  };
  compStatusValues: any = [];
  selectedAll: any;
  campusAllArray: any;
  loginData: any;

  constructor(private employerDriveService: EmployerDriveService,
    private cookieService: CookieService,
    private DriveComponent: DriveComponent, 
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private _sharedService: SharedDriveService,
    private CreateDriveComponent: CreateDriveComponent,
    private localStorage: LookUpGetAndSetLocalSrorage) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    if (window.location.href.indexOf('company/recruitment/employerEvent') > -1 ||
     window.location.href.indexOf('company/createEvent') > -1 ) {
      this.eventHide = false;
    }
  }
  ngOnInit() {
    this.studentStatus = this.localStorage.getLookUpData('COMP_APPROVAL_STATUS_CODE', null);
  this.allData = JSON.parse(localStorage.getItem('allData'));
  this.stateDetails = this.allData.State;
  this.loginData = this.cookieService.getObject('loginResponce');
}


  ngOnChanges() {

    if (this.campusListDetails) {
      this.data = this.campusListDetails.data;
      // this.getCampusDetails(this.campusListDetails.data);
      console.log('campuslist:::changes::::::::::' + JSON.stringify(this.campusListDetails));
    } else if (this.campusListFromEvent) {
      this.data = this.campusListFromEvent.data;
      // this.listData = this.campusListFromEvent.data;
      console.log('campusListFromEvent:::::::::::::' + JSON.stringify(this.data));
    } else if (this.TotalData) {
      this.data = this.TotalData.data;
    }

    if (this.eventType === 309) {
      this.eveCheck = false;
    } else if (this.eventType === 311) {
      this.eveCheck = true;
    }

  }

  // getCampusDetails(campusDetailsData) {
  //   this.campusListDetailsArray = [];
  //   this.campusListArray = [];
  //   this.studentStatus = this.localStorage.getLookUpData('COMP_APPROVAL_STATUS_CODE', null);
  //   console.log('dnsdsdn.vnmv,.n;vdf.ndfv', this.studentStatus);
  //   for (let i = 0; i < campusDetailsData.length; i++) {
  //     this.campusListDetailsObject = {
  //       campusName: campusDetailsData[i].CampDetails[0].campusName,
  //       campusId: campusDetailsData[i].CampDetails[0].campusId,
  //       universityName: campusDetailsData[i].CampDetails[0].universityName,
  //       cityName: campusDetailsData[i].CampDetails[0].cityName,
  //       status: this.studentStatus[campusDetailsData[i].listDetails.compApprovalStatusValueId].lookupValue,
  //       listName: campusDetailsData[i].listDetails.listName,
  //       state: campusDetailsData[i].CampDetails[0].stateCode,
  //       listId: campusDetailsData[i].listDetails.listId,
  //       companyId: campusDetailsData[i].listDetails.companyId
  //     }
  //     this.campusListArray.push(this.campusListDetailsObject);
  //     if (i == campusDetailsData.length - 1) {
  //       this.campusListDetailsArray = this.campusListArray;
  //     }
  //   }
  //   console.log('data dsdasdS', this.campusListDetailsArray);
  // }

  toggleEditableRadio(event, campusList) {
    const cList = campusList;
    // cList['listId'] = campuslistdetails.listId;
    cList['companyId'] = this.loginData.companyId;
    if (this.contentEditable.length === 1) {
      this.contentEditable = [];
      this.contentEditable.push(cList);
    } else {
      this.contentEditable.push(cList);
    }
    this.sendData = this.contentEditable;
    this.sendDataList = this.sendData;
    this.sendDataListChange.emit(this.sendDataList);
  }
  toggleEditable(event, campusList) {
    const cList = campusList;
    // cList['listId'] = campuslistdetails.listId;
    cList['companyId'] = this.loginData.companyId;
    if (this.contentEditable.find(data => data.campusId === cList.campusId && data.listId === cList.listId)) {

      const index = this.contentEditable.findIndex(data => data.campusId === campusList.campusId);
      this.contentEditable.splice(index, 1);
      console.log('After popping ----> ' + JSON.stringify(this.contentEditable));
    } else {
      this.contentEditable.push(cList);
        console.log(':::::push:::::::::::::::' + JSON.stringify(cList));
    }
    this.selectedAll = this.data.every(function(campus: any) {

    // const selected =  allCampus.CampDetails.every(function(campus: any) {
    //     return campus.selected  === true;
    //   });
      return campus.selected  === true;
    });

    this.sendData = this.contentEditable;
    this.sendDataList = this.sendData;
    this.sendDataListChange.emit(this.sendDataList);
    console.log(':::::sendData:::::final befor get campus::::::::::' + JSON.stringify(this.sendDataList));
  }

  selectAll(event) {
    // data[] , data[i].CampDetails, data[i].listDetails
    this.contentEditable = [];
    if (event.target.checked) {
      for (let i = 0; i < this.data.length; i++) {
        // for (let j = 0; j < this.data[i].length; j++) {
          this.data[i].selected = this.selectedAll;
          const cList = this.data[i];
          // cList['listId'] = this.data[i].listId;
          cList['companyId'] = this.loginData.companyId;
          this.contentEditable.push(cList);
      }
    } else {
      this.contentEditable = [];
      for (let i = 0; i < this.data.length; i++) {
        // for (let j = 0; j < this.data[i].CampDetails.length; j++) {
          this.data[i].selected = this.selectedAll;
        // }
      }

    }
    this.sendData = this.contentEditable;
    this.sendDataList = this.sendData;
    this.sendDataListChange.emit(this.sendDataList);
    console.log(':::::total sendData:::::final befor get campus::::::::::' + JSON.stringify(this.sendDataList));
  }

  updateEmployerDriveCampuses() {
    this.formDriveData1['empDriveId'] = this.empDriveId;
    this.employerDriveService.updateEmpDrive(this.formDriveData1).subscribe((data: any) => {
      // this.cancelDrive(false);
      this.employeDriveResponse = data.data;

      console.log(':::::employe drive campusesesese:::::::::::::::' + JSON.stringify(this.employeDriveResponse));
      console.log('::::::sendData:::::::::::::::' + JSON.stringify(this.sendData));


      this.getSearchStatus = false;
      this.getSearchStatusChange.emit(this.getSearchStatus);
      if (this.sendData && this.sendData != '') {
        for (let i = 0; i < this.sendData.length; i++) {
          this.updatecollegesList = {
            'empDriveId': this.formDriveData1.empDriveId,
            'companyId': this.sendData[i].EmployerCampusListHdr.companyId,
            'listId': this.sendData[i].EmployerCampusListHdr.listId,
            'campusId': this.sendData[i].campusDetails.campusId,
            'empDriveStatusValueId': this.formDriveData1.driveStatusValueId,
            'createUserId': this.employeDriveResponse.createUserId,
            'updateUserId': this.employeDriveResponse.updateUserId
          };
          this.allCampusList.push(this.collegesList);
        }

        this.employerDriveService.updateEmpDriveCampuses(this.updatecollegesList).subscribe(data => {
          this.toastr.success('Updated Successfully!', 'Success!');

        },
          error => {
            this.toastr.error('Error While Updating!', 'Oops!');
            console.log('error', error)
          }
        );
      } else {
        this.toastr.success('Updated Successfully!', 'Success!');

        //  this.CreateDriveComponent.cancelDrive(false);
      }
    },
      error => {
        this.toastr.error('Error While Updating Drive!', 'Oops!');
      }
    );

  }
  submitCampusList(status) {
    // this.CreateDriveComponent.cancelDrive(false);
    // this.getSearchStatus = status;
    // this.getSearchStatusChange.emit(status);
    this.CreateDriveComponent.cancelDrive(false);
    this._sharedService.publishData(status);
    console.log('this.::::::::::::::::::::::::;' + this.getSearchStatus);
    //  this.DriveComponent.cancelDrive();
    //   console.log('::::::data:::::::::::::::' + JSON.stringify(this.sendData));
    //   console.log(':::::formDriveData1:::::::::::::::' + JSON.stringify(this.formDriveData1));
    //   this.employerDriveService.createEmployerDrive(this.formDriveData1).subscribe(data => {
    //     this.employeDriveResponse = data.data;
    //     this.toastr.success('Saved Successfully!', 'Success!');
    //     this.DriveComponent.cancelDrive();
    //     console.log(':::::employeDriveResponse:::::::::::::::' + JSON.stringify(this.employeDriveResponse));
    //     for (let i = 0; i < this.sendData.length; i++) {
    //       this.collegesList = {
    //         'empDriveId': this.employeDriveResponse.empDriveId,
    //         'companyId': this.sendData[i].EmployerCampusListHdr.companyId,
    //         'listId': this.sendData[i].EmployerCampusListHdr.listId,
    //         'campusId': this.sendData[i].campusDetails.campusId,
    //         'createDatetime': new Date(),
    //         'updateDatetime': new Date(),
    //         'empDriveStatusValueId': this.formDriveData1.driveStatusValueId,
    //         'createUserId': this.employeDriveResponse.createUserId,
    //         'updateUserId': this.employeDriveResponse.updateUserId
    //       }
    //       this.allCampusList.push(this.collegesList);
    //     }

    //     console.log(':::::allCampusList:::::::::::::::' + JSON.stringify(this.allCampusList));
    //     // submitting campusses list
    //     this.employerDriveService.submitCampusesListForDrive(this.allCampusList).subscribe(data => {
    //    //   alert('Saved Successfully');
    //       this.toastr.success('Saved Successfully!', 'Success!');
    //       this.DriveComponent.cancelDrive();
    //       this.resp = data;
    //       console.log('submitted campuses data' + JSON.stringify(this.resp));
    //     },
    //       error => {
    //         this.toastr.error('Error While Creating!', 'Oops!');

    //       }
    //     );
    //   },
    //     error => {
    //       console.log('error', error)
    //     }
    //   );
  }
}
