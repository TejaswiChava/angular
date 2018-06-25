import { Organization } from './../../../Common/profile/company-profile.model';
import { GetCampusListViewComponent } from './../get-campus-list-view/get-campus-list-view.component';

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewContainerRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
import { employerDriveModel } from '../drive-data-model';
import { DriveListViewComponent } from '../drive-list-view/drive-list-view.component';
import { SharedDriveService } from '../shared-drive.service';
// import { ToastsManager } from 'ng2-toastr';
import { DriveComponent } from '../drive.component';
import { ToastrService } from 'ngx-toastr';

import { EmployerDriveService } from '../../../../services/company/employerDrive/employer-drive.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
@Component({
  selector: 'app-create-drive',
  templateUrl: './create-drive.component.html',
  styleUrls: ['./create-drive.component.css']
})
export class CreateDriveComponent implements OnInit, OnChanges {
  totalCount: any;
  checkStatusName: boolean;
  // listobj: any= [];
  updatecollegesList: any;
  resp: any;

  // tslint:disable-next-line:max-line-length
  collegesList: { 'empDriveId': any; 'companyId': any; 'listId': any; 'campusId': any; 'createDatetime': Date; 'updateDatetime': Date; 'empDriveStatusValueId': any; 'createUserId': any; 'updateUserId': any; };
  sendData: any;
  formDriveData1: any;
  @Input() driveList: employerDriveModel;
  @Input() getSearchStatus: boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();
  @Input() sendDataList: any;
  @Output() sendDataListChange = new EventEmitter<any>();
  @Input() listobj: any;
  @Output() listobjChange = new EventEmitter<any>();
  employerDriveForm: FormGroup;
  // myControl: FormControl = new FormControl();
  drive: any = {};
  editBtnStatus: any = true;
  allCampusList: any = [];
  labelData: any;
  loginData: any;
  ContactLookups: any;
  showListView = false;
  jobRoles: any;
  driveType: any;
  driveOrg: any;
  employeDriveResponse: any;
  empDriveStatus: any;
  TotalData: any;
  TotalData1: any;
  updateData: any;
  cancelBtn: any;
  bottomClearBtn = false;
  showSubmitBtn = true;
  data: any;
  jobroleStatus = false;
  cListStatus = false;
  getCListBtn = false;
  allCampusData: any;
  readonly = false;
  showBtn = true;
  fieldreadonly=false;
  fieldreadonly1 = true;
  showGetCampuslist = false;
  getJobRoles: any;
  empDriveId: any;
  getSearchStatus1: boolean;
  isSearchActive = false;
  constructor(private router: Router,
    private location: Location,
    private DriveComponent: DriveComponent,
    private cookieService: CookieService,
    private fb: FormBuilder, private _sharedService: SharedDriveService,
    private DriveListViewComponent: DriveListViewComponent,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private employerDriveService: EmployerDriveService,
    private localStorage: LookUpGetAndSetLocalSrorage) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.loginData = this.cookieService.getObject('loginResponce');
    this.createForm();
    this.getAllListData();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
      }
  }

  createForm() {
    // alert('hi')
    this.employerDriveForm = this.fb.group({
      driveName: ['', Validators.required],
      organizationId: [''],
      description: [''],
      driveTypeValueId: ['', Validators.required],
      jobRoleId: ['', Validators.required],
      noOfPositions: '',
      budget: '',
      driveStatusValueId: [305, Validators.required],
      companyId: this.loginData.companyId,
      createUserId: this.loginData.userId,
      startDate: '2017-08-21T00:00:00.000Z',
      endDate: '2017-08-21T00:00:00.000Z',
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.driveList) {
      this.employerDriveForm.patchValue({
        driveName: this.driveList.driveName,
        organizationId: this.driveList.organizationId,
        description: this.driveList.description,
        driveTypeValueId: this.driveList.driveTypeValueId,
        jobRoleId: this.driveList.jobRoleId,
        noOfPositions: this.driveList.noOfPositions,
        budget: this.driveList.budget,
        driveStatusValueId: this.driveList.driveStatusValueId,
        companyId: this.driveList.companyId,
        createUserId: this.driveList.createUserId,
        startDate: this.driveList.startDate,
        endDate: this.driveList.endDate,
      });
      this.readonly = this.driveList.readonly;
      this.fieldreadonly = this.driveList.readonly;
      this.empDriveId = this.driveList.empDriveId;
      this.fieldreadonly1 = true;
      this.employerDriveService.getDriveListByDrive(this.empDriveId, false).subscribe(data => {
        this.TotalData = data;
        if (this.TotalData) {
          this.showGetCampuslist = true;
        } else {
          this.toastr.warning('Please select another job role!', 'Alert!');
        }
      },
        error => {
        }
      );
    } else {
    }

    if (this.getSearchStatus) {
      this.isSearchActive = this.getSearchStatus;
    }
  }
  ngOnInit() {
    if(this.router.url === '/company/createDrive') {
      this.cancelBtn = true;
    } else if(this.router.url === '/company/recruitment/employerDrive'){
      this.cancelBtn = false;
    }
    this.jobroleStatus = false;
    this.localStorage.getLookUpData('COMP_APPROVAL_STATUS_CODE', null);
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.getJobRoles = function () {

      this.employerDriveService.getJobRole(this.loginData.companyId).subscribe(data => {
        this.jobRoles = data.data;
      });
    };
    this.employerDriveService.getCompanyOrg(this.loginData.companyId).subscribe((data: any) => this.driveOrg = data.data);
    this.employerDriveService.getDriveType().subscribe(data => this.driveType = data);
    this.employerDriveService.getEmpStatusCode().subscribe(data => this.empDriveStatus = data);
    this.getJobRoles();
  }

  clearForm() {
    this.employerDriveForm.reset({
      companyId: this.loginData.companyId,
      driveName: '',
      driveTypeValueId: '',
      noOfPositions: '',
      description: '',
      organizationId: '',
      jobRoleId: '',
      budget: '',
      driveStatusValueId: 305,
      createUserId: this.loginData.userId,
      startDate: '2017-08-21T00:00:00.000Z',
      endDate: '2017-08-21T00:00:00.000Z',
    });
    // this.createForm();
    this.cListStatus = true;
    this.getCListBtn = true;
    this.bottomClearBtn = false;
  }

  getAllListData() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.employerDriveService.getCompanyEmployerDriveDetails(
      this.loginData.companyId).subscribe((data: any) => {

        this.listobj = data.data;
        this.listobjChange.emit(this.listobj);
      });
  }


  getCampusList() {
    this.cListStatus = false;
    this.bottomClearBtn = true;
    this.showListView = true;
    this.showSubmitBtn = false;
    this.showBtn = false;
    this.TotalData1 = this.employerDriveForm.value;
    this.getCollegesList(this.TotalData1);

  }
  updateEmployerDriveCampuses() {
    this.updateData = this.employerDriveForm.value;
    this.updateData.empDriveId = this.driveList.empDriveId;
    this.removeDuplicates();
    if(this.checkStatusName){
    this.employerDriveService.updateEmpDrive(this.updateData).subscribe((data: any) => {
      this.employeDriveResponse = data.data;

      if (this.sendDataList) {
        this.UpdateDrivecampusesList(this.employeDriveResponse);
      }
      this.toastr.success('Drive Updated Successfully!', 'Success!');
      // setTimeout(() => {
        this.afterSaveOrUpdate(false);
      // }, 1000);

    },
      error => {
        console.log('error', error);
      }
    );
  }
  }

  UpdateDrivecampusesList(employeDriveResponse) {
    console.log('xxx' + JSON.stringify(this.sendDataList));
    let resultArray: any;
    if (this.TotalData) {
      resultArray  = this.campusesFilter(this.TotalData.data, this.sendDataList);
      console.log('result' + JSON.stringify(resultArray));
      for (let j = 0; j < resultArray.length; j++) {
        const campusListObj = {
          'empDriveId': employeDriveResponse.empDriveId,
          'companyId': resultArray[j].companyId,
          'listId': resultArray[j].listId,
          'campusId': resultArray[j].campusId,
          'createDatetime': new Date(),
          'updateDatetime': new Date(),
          'empDriveStatusValueId': employeDriveResponse.driveStatusValueId,
          'createUserId': employeDriveResponse.createUserId,
          'updateUserId': employeDriveResponse.updateUserId
        };
        // this.ModifiedUpdateDrivecampusesList.push(campusListObj);
        this.employerDriveService.updateCampusesListOnDrive(campusListObj).subscribe(data => {
          // console.log('...' + j);
          this.resp = data;
        },
        error => {
          this.toastr.error('Error While Creating!', 'Oops!');
        });
      }
    }
    // setTimeout(() => {
    //   this.cancelDrive(false);
    // }, 1000);

  }


  campusesFilter (oldCampuses, newCampusses) {

    // tslint:disable-next-line:prefer-const
    let resultCampusFilter =
      newCampusses.filter(newCampus => !oldCampuses.find(oldcampus => newCampus.campusId === oldcampus.campusId));
    return (resultCampusFilter);
  }

  getCollegesList(employerDriveData) {
    this.employerDriveService.getCampuslistByJobRole(employerDriveData.jobRoleId).subscribe(data => {
      this.data = data;
      this.allCampusData = this.data;
      console.log('1' + JSON.stringify(this.allCampusData));
      if (this.TotalData) {
        if (this.TotalData.data.length > 0) {
          let allCampuses = this.allCampusData.data;
          let selectedCampuses = this.TotalData.data;

          this.allCampusData.data = this.deleteDuplicates(allCampuses, selectedCampuses);
        }
      }
      console.log('2' + JSON.stringify(this.allCampusData));
      this.totalCount = 0;
      if (this.allCampusData) {
        if (this.allCampusData.data.length > 0) {
          this.totalCount = this.allCampusData.data.length;
        }
      }
      if (!this.allCampusData) {
        alert('Please select another job role');
      } else {
        this.showGetCampuslist = true;
      }
      console.log(' allCampusData sendin create::' + JSON.stringify(this.data));
    },
      error => {
        this.toastr.error('Error While getting!', 'Oops!');
      });

  }
/**
 * To comapare two arrays, remove the duplicate objects
 * @param {any} allCampuses is all campuses
 * @param {any} selectedCampuses selected campuses
 * @returns all campuses
 * @memberof CreateDriveComponent
 */
deleteDuplicates(allCampuses, selectedCampuses) {

  let unique = [];
  for (let i = 0; i < allCampuses.length; i++) {
      let found = false;

      for (let j = 0; j < selectedCampuses.length; j++) { // j < is missed;
       if (allCampuses[i].campusId === selectedCampuses[j].campusId) {
        found = true;
        break;
      }
     }
     if (found === false) {
      unique.push(allCampuses[i]);
    }
  }


    return unique;
  }

  cancelDrive(status) {

    this.isSearchActive = status;
    this.getSearchStatus = status;
    this.getSearchStatusChange.emit(this.getSearchStatus);
    this.getAllListData();
    // this.DriveListViewComponent.getCampusList();
    this.router.navigated = false;
    this.location.back();
    // this.router.navigate([this.router.url]);

  }

  afterSaveOrUpdate(status){
    this.isSearchActive = status;
    this.getSearchStatus = status;
    this.getSearchStatusChange.emit(this.getSearchStatus);
    this.getAllListData();
    // this.DriveListViewComponent.getCampusList();
    this.router.navigated = false;
    // this.location.back();
    this.router.navigate(['/company/recruitment/employerDrive']);
  }
  editList() {
    this.editBtnStatus = false;
    this.fieldreadonly = false;
    this.readonly = true;
    this.fieldreadonly1 = false;
  }
 removeDuplicates() {
   if(this.listobj.length === 0){
   this.checkStatusName  = true;
   }
  if (this.listobj.length > 0) {
    for (let k = 0; k < this.listobj.length; k++) {
      if(this.listobj[k].empDriveId !== this.employerDriveForm.value.empDriveId) {
      if (this.listobj[k].driveName.toLowerCase() === this.employerDriveForm.value.driveName.toLowerCase()) {
        this.toastr.warning('Drive Already Exist!', 'Alert!');
        this.checkStatusName = false;
        break;
      }else {
        this.checkStatusName = true;
      }
    }else {
      this.checkStatusName = true;
    }
   }
  }
 }
  submitCampusList(status, event) {
    event.target.disabled = true;
    this.formDriveData1 = this.employerDriveForm.value;
    if (this.formDriveData1.noOfPositions) {
      this.formDriveData1.noOfPositions = Number(this.formDriveData1.noOfPositions);
    } else {
      this.formDriveData1.noOfPositions = null;
    }

    if (this.formDriveData1.budget === '') {
      delete this.formDriveData1.budget;
    }
    if (this.formDriveData1.organizationId === '') {
      delete this.formDriveData1.organizationId;
    }
    this.removeDuplicates();
    if (this.checkStatusName) {
         console.log(':::::sendDataList  finaliy:::::::::::::::' + JSON.stringify(this.sendDataList));

      if (this.sendDataList !== '' && this.sendDataList !== undefined && this.sendDataList.length !== 0) {
        this.employerDriveService.createEmployerDrive(this.formDriveData1).subscribe((data: any) => {
          this.employeDriveResponse = data.data;
          this.toastr.success('Drive Saved Successfully!', 'Success!');
          //  this.DriveComponent.cancelDrive();
          //    console.log(':::::sendDataList  finaliy:::::::::::::::' + JSON.stringify(this.sendDataList));
          //    if (this.sendDataList) {
          for (let i = 0; i < this.sendDataList.length; i++) {
            this.collegesList = {
              'empDriveId': this.employeDriveResponse.empDriveId,
              'companyId': this.sendDataList[i].companyId,
              'listId': this.sendDataList[i].listId,
              'campusId': this.sendDataList[i].campusId,
              // -----------------------rohini code comented start
              // 'companyId': this.sendDataList[i].listDetails.companyId,
              // 'listId': this.sendDataList[i].listDetails.listId,
              // 'campusId': this.sendDataList[i].campusList.campusId,
              // -----------------------rohini code comented end
              'createDatetime': new Date(),
              'updateDatetime': new Date(),
              'empDriveStatusValueId': this.formDriveData1.driveStatusValueId,
              'createUserId': this.employeDriveResponse.createUserId,
              'updateUserId': this.employeDriveResponse.updateUserId
            };
            this.allCampusList.push(this.collegesList);
          }
          const allcmapusListObj = {
                       'companyId' : this.loginData.companyId,
                        'data' : this.allCampusList
                    };
          // submitting campusses list
          this.employerDriveService.submitCampusesListForDrive(allcmapusListObj).subscribe(data => {
            //   alert('Saved Successfully');
            // this.toastr.success('Saved Successfully!', 'Success!');
            // setTimeout(() => {
              this.afterSaveOrUpdate(false);
            // }, 1000);

            this.resp = data;
          },
            error => {
              this.toastr.error('Error While Creating!', 'Oops!');

            }
          );

        },
          error => {
            this.toastr.error('Error While Creating!', 'Oops!');
            event.target.disabled = false;
          }
        );
           this.router.navigateByUrl('company/recruitment/employerDrive');
      } else {
        this.toastr.warning('Please Select atleast one campus list!', 'Alert!');
        event.target.disabled = false;
      }
    }else{
      event.target.disabled = false;
    }
  }

  changedStatus() {
    this.allCampusData = [];
    this.showGetCampuslist = false;
    this.showBtn = true;
    console.log('changes in job role');
  }
}

