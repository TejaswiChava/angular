
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/core';
import { JobRoleService } from '../../../../services/company/ControlData/job-role/job-role.service';
import { Http, Response, RequestOptions } from '@angular/http';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-job-role',
  templateUrl: './jobrole.component.html',
})
export class JobRoleComponent implements OnInit {
  checkStatusName: boolean;
  fieldreadonly = false;


  companyJobrole: any = {};
  jobRoleData: any;
  jobRoleList: any = [];
  jobRoleDetails: any = [];
  addJobBtn = false;
  showJobEdit = false;
  getAllJobRoleData: any;
  jobRoleTotalData: any;
  jobTypeList: any;
  showImagDisable = true;
  jobRoleArray: any;
  btnreadonly = false;
  companyJobroleDuplicate: any;
  data: any = [];
  loginData: any;
  labelData: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'jobRoleName';
  public sortOrder = 'asc';


  constructor(private router: Router,
    private jobRole: JobRoleService,
    private _http: Http,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  ngOnInit() {
    // get job role details from services functionality starts
    this.loginData = this.cookieService.getObject('loginResponce');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
 //    console.log('labelData data' + JSON.stringify(this.labelData));
    this.jobRole.GetJobRoleTypeValue().subscribe(data => this.jobTypeList = data);
    this.getAllJobRoleData = function () {

      this.jobRole.getJobRoleDetails(
        this.loginData.companyId
      ).subscribe(data =>
        this.data = data.data);
    };
    this.getAllJobRoleData();
    // get job role details from services functionality ends
  }
  // edit job role details functionality starts
  editJobRole(data, k) {
    this.showJobEdit = true;
    this.jobRoleTotalData = data;
    this.companyJobrole = data;
    this.showJobEdit = true;
    this.fieldreadonly = true;
    this.addJobBtn = true;
    this.btnreadonly = true;
    this.showImagDisable = true;
    this.jobRoleDetails = [];
    this.jobRoleDetails.push(this.companyJobrole);
  }

  editList() {
    this.fieldreadonly = false;
    this.showImagDisable = false;
  }

  cancelJobrole(jobForm: NgForm) {
    this.companyJobrole = {};
    jobForm.resetForm();
  }

  // edit job role details functionality ends
  // update  job role details functionality starts
  updateJobRoleSubmit() {
    console.log('jobroleeeeee' + JSON.stringify(this.data[0].jobRoleName ));
    console.log('enteeddddd' + this.companyJobrole.jobRoleName);
    if (this.jobRoleTotalData) {
      this.companyJobrole.companyId = this.jobRoleTotalData.companyId;
      this.companyJobrole.jobRoleId = this.jobRoleTotalData.jobRoleId;
    }
    this.removeDuplicates();
    if(this.checkStatusName){
    //  console.log('companyJobrole data' + JSON.stringify(this.companyJobrole));
    this.jobRole.updateJobRoleProfile(this.companyJobrole).subscribe(data => {
      //  console.log('Updated data' + JSON.stringify(data));
      this.showJobEdit = false;
      this.getAllJobRoleData();
      this.addJobBtn = false;
      this.toastr.success('Job Role Successfully Updated', 'Success!');
    },
    error => {
      this.toastr.error('Invalid Details!', 'Oops!');
      console.log('error', error);
  });
}
  }
  // update  job role details functionality ends
  // add  job role  functionality starts
  addJobRoleBtn(jobForm: NgForm) {
    this.cancelJobrole(jobForm);
    this.btnreadonly = false;
    this.addJobBtn = true;
    this.fieldreadonly = false;
    this.showJobEdit = true;
    this.companyJobrole = {};
    this.jobRoleDetails = [];
    this.showImagDisable = false;
    this.jobRoleDetails.push(this.companyJobrole);
  }
  // add  job role  functionality ends
  // cancel  job role  functionality starts
  jobRoleCancel() {
 //   alert('Do you want to save the data or not');
    this.getAllJobRoleData();
    this.addJobBtn = false;
    this.showJobEdit = false;
    this.showImagDisable = true;
  }
  // cancel  job role  functionality ends

  cancelProfile() {
    this.companyJobrole = {};
    this.jobRoleDetails = [];
    this.jobRoleDetails.push(this.companyJobrole);
    this.addJobBtn = false;
    this.showJobEdit = false;
    this.showImagDisable = true;
  }

  //  job role  profile submit functionality starts
  jobRoleSubmit(event) {
    event.target.disabled = true;
    this.companyJobrole.companyId = this.loginData.companyId;
    this.companyJobrole.createUserId = this.loginData.userId;
    // this.programContact.departmentId=this.orgData.departmentId;
    // this.programContact.primaryInd='Y';
    this.showJobEdit = false;
  this.removeDuplicates();
    if (this.checkStatusName ) {
    this.jobRole.jobRoleCreate(this.companyJobrole).subscribe(data => {
      event.target.disabled = true;
      this.toastr.success('Job Role is added Successfully', 'Success!');
      this.getAllJobRoleData();
      this.jobRoleCancel();

    },
    error => {
      this.toastr.error('Invalid Login Credentials!', 'Oops!');
      event.target.disabled = false;
      console.log('error', error);
  });
  }else{
    event.target.disabled=false;
  }
}
removeDuplicates(){
  if(this.data.length === 0) {
      this.checkStatusName = true;
  }
  if (this.data.length > 0) {
    for (let k = 0; k < this.data.length; k++) {
      if(this.data[k].jobRoleId !== this.companyJobrole.jobRoleId){
      if (this.data[k].jobRoleName.toLowerCase() === this.companyJobrole.jobRoleName.toLowerCase()) {
        this.toastr.warning('Job role Already Exist!', 'Alert!');
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
}
