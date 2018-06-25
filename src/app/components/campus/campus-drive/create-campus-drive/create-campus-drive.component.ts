
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewContainerRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
// import { employerDriveModel } from '../drive-data-model';
import { CampusDriveListViewComponent } from '../campus-drive-list-view/campus-drive-list-view.component';
import { EmployerDriveService } from '../../../../services/company/employerDrive/employer-drive.service';
import { CampusDriveService } from '../../../../services/campus/campus-drive/campus-drive.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-campus-drive',
  templateUrl: './create-campus-drive.component.html',
  styleUrls: ['./create-campus-drive.component.css']
})
export class CreateCampusDriveComponent implements OnInit, OnChanges {
  existingdrives: any= [];
  checkStatusName: boolean;
  @Input() driveList;
  @Input() driveList1 = true;
  @Input() getSearchStatus: boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();
  @Input() notVisible: boolean;
  @Output() hideShowSA = new EventEmitter<boolean>();
  @Input() showFilter: any;
  @Output() showFilterChange = new EventEmitter<any>();
  employerDriveForm: FormGroup;
  // myControl: FormControl = new FormControl();
  editButton = false;
  drive: any = {};
  labelData: any;
  loginData: any;
  ContactLookups: any;
  showListView = false;
  jobRoles: any;
  driveType: any;
  driveOrg: any;
  employeDriveResponse: any;
  empDriveStatus: any;
  TotalData: any = [];
  cancelBtn: any;
  TotalData1: any;
  updateData: any;
  showSubmitBtn = true;
  data: any;
  allCampusData: any;
  readonly = false;
  showBtn = true;
  fieldreadonly: boolean;
  fieldreadonly1 = true;
  showGetCampuslist = false;
  getJobRoles: any;
  empDriveId: any;
  departmentDetails: any;

  constructor(private router: Router,
    private location: Location,
    private cookieService: CookieService,
    private fb: FormBuilder,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private CampusDriveListViewComponent: CampusDriveListViewComponent,
    private CampusDriveService: CampusDriveService,
    private EmployerDriveService: EmployerDriveService, ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.loginData = this.cookieService.getObject('loginResponce');
    this.createForm();
  }

  createForm() {
    this.employerDriveForm = this.fb.group({
      driveName: ['', Validators.required],
      description: [''],
      driveTypeValueId: ['', Validators.required],
      driveStatusValueId: [231, Validators.required],
      campusId: this.loginData.campusId,
      createUserId: this.loginData.userId,
      startDate: '2017-08-21T00:00:00.000Z',
      endDate: '2017-08-21T00:00:00.000Z',
    });

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.driveList) {
      this.employerDriveForm.patchValue({
        driveName: this.driveList.driveName,
        description: this.driveList.description,
        driveTypeValueId: this.driveList.driveTypeValueId,
        driveStatusValueId: this.driveList.driveStatusValueId,
        campusId: this.driveList.campusId,
        createUserId: this.driveList.createUserId,
        startDate: this.driveList.startDate,
        endDate: this.driveList.endDate,
      });
      this.readonly = this.driveList.readonly;
      this.fieldreadonly = this.driveList.readonly;
      this.empDriveId = this.driveList.empDriveId;
      this.fieldreadonly1 = this.driveList.readonly;
    } else {
      // this.driveList['empDriveId'] = '';
    }

    if (this.getSearchStatus) {
    }
  }
  ngOnInit() {
    if(this.router.url === '/campus/createDrive') {
      this.cancelBtn = true;
    } else if(this.router.url === '/campus/placement/campusDrive'){
      this.cancelBtn = false;
    }
    console.log(this.router.url);
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.CampusDriveService.getDriveType().subscribe(data => this.driveType = data);
    this.CampusDriveService.getStatusType().subscribe(data => this.empDriveStatus = data);
    // this.CampusDriveService.getdepartmentDetails(this.loginData.campusId).subscribe((data: any) =>
    //   this.departmentDetails = data.data);
    console.log('this  is drivelist' +  JSON.stringify( this.driveList));
    if (this.driveList) {
      this.editButton = true;
    } else {
      this.editButton = false;
    }
    this.CampusDriveService.getCampusDriveDetails(this.loginData.campusId).subscribe((data: any) => {
      this.existingdrives = data.data;
      console.log('existinggggggggg' + JSON.stringify(this.existingdrives) );
    }
    );
  }
  removeDriveDuplicates(){
    if(this.existingdrives.length === 0){
   this.checkStatusName = true;
    }
    if (this.existingdrives.length > 0) {
      for (let k = 0; k < this.existingdrives.length; k++) {
        if(this.existingdrives[k].campusDriveId !== this.employerDriveForm.value.campusDriveId){
        if (this.existingdrives[k].driveName.toLowerCase() === this.employerDriveForm.value.driveName.toLowerCase()) {
          this.toastr.warning('Drive Already Exists!', 'Alert!');
          this.checkStatusName = false;
          break;
        } else {
          this.checkStatusName = true;
        }
      }else {
        this.checkStatusName = true;
      }
    }
    } 
  }
  submitCampusDrive(event) {
    event.target.disabled = true;
    this.TotalData = this.employerDriveForm.value;
    this.removeDriveDuplicates();
    if (this.checkStatusName) {
    this.TotalData['createUserId'] = this.loginData.userId;
    this.CampusDriveService.createCampusDrive(this.TotalData).subscribe(data => {
      this.employeDriveResponse = data;
      this.toastr.success('Drive Successfully Created!', 'Success!');
      // setTimeout(() => {
        this.afterSaveOrUpdate(false);
      // }, 2000);
    },
      error => {
        this.toastr.error('Server Not Found!', 'Oops!');
        event.target.disabled = false;
        // console.log('error', error);
      }
    );
  }else{
    event.target.disabled = false;
  }
  }

  updateCampusrDrive() {
    this.showListView = true;
    this.showSubmitBtn = false;

    this.updateData = this.employerDriveForm.value;
    this.updateData.campusDriveId = this.driveList.campusDriveId;
     this.removeDriveDuplicates();
     if(this.checkStatusName){
    this.updateData.createUserId = this.driveList.createUserId;
    this.CampusDriveService.updateCampusDrive(this.updateData).subscribe(data => {
      this.toastr.success('Drive Successfully Updated!', 'Success!');
      setTimeout(() => {
        this.afterSaveOrUpdate(false);

      }, 1000);
      this.employeDriveResponse = data;

    },
      error => {
        this.toastr.error('Error While Updating!', 'Oops!');
      }
    );

  }
}

  clearForm(){
    this.employerDriveForm.reset({
      driveName: '',
      description: '',
      driveTypeValueId: '',
      driveStatusValueId: 231,
      campusId: this.loginData.campusId,
      createUserId: this.loginData.userId,
      startDate: '2017-08-21T00:00:00.000Z',
      endDate: '2017-08-21T00:00:00.000Z',
    });
  }

  cancelDrive(status) {
    this.getSearchStatus = status;
    this.getSearchStatusChange.emit(status);
    this.showFilter = false;
    this.showFilterChange.emit(this.showFilter);
    // this.CampusDriveListViewComponent.getCampusList();
    this.router.navigated = false;
    this.location.back();
    // this.router.navigateByUrl('campus/placement/campusDrive');
  }

  afterSaveOrUpdate(status) {
    this.getSearchStatus = status;
    this.getSearchStatusChange.emit(status);
    this.showFilter = false;
    this.showFilterChange.emit(this.showFilter);
    // this.CampusDriveListViewComponent.getCampusList();
    this.router.navigated = false;
    // this.location.back();
    this.router.navigateByUrl('campus/placement/campusDrive');
  }

  editList() {
    this.fieldreadonly = false;
    this.readonly = true;
    this.driveList1 = false;
    //  this.fieldreadonly1 = false;
  }
}

