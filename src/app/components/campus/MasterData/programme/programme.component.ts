import { Router } from '@angular/router';
import { NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DepartmentService } from '../../../../services/campus/MasterData/department/department.service';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

import { ProgramService } from '../../../../services/campus/MasterData/programme/program.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
import {
  AppSettings
} from '../../../../apiUrl';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import {
  InstituteService
} from '../../../../services/campus/MasterData/institute/institute.service';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})

export class ProgrammeComponent implements OnInit {
  programMajorLookupArray: any[];
  programCatLookupArray: any[];
  programClassificationLookupArray: any[];
  programTypeLookupArray: any[];
  contactLookupArray: any[];
  checkStatusName: boolean;
  programme: any = {};
  programmeData: any = [];
  addDepartmentbtn: any;
  showContactImagDisable = true;
  ContactLookups: any;
  programUpload: any;
  AddressLookup: any;
  countrySelect: any;
  stateSelect: any;
  citySelect: any;
  countryList: any;
  cityList: any;
  stateList: any;
  postalList: any;
  programData: any;
  adBtnAddress = false;
  adMain = false;
  btnreadonly = false;
  disableDate = true;
  readonly = false;
  // readonly12 = true;
  btnaddressreadonly = false;
  programContact: any = {};
  departmentContact: any = [];
  instituteEstDate: any;
  programTotalList: any;
  adBtnContact = false;
  btnContactreadonly = false;
  programContact1: any = {};
  clickProgrammeDetails: any;
  data: any = [];
  programContactList: any;
  totaldeptAdress: any;
  totalProgramContact: any;
  showEditDetails = false;
  updateBtn = false;
  totaldeptContact: any;
  showEditContact = false;
  showEditAdress = false;
  addCancelBtn =  true;
  programLoopup: any;
  getprogramLoopupType: any;
  programClassLoopup: any;
  programMajLoopup: any;
  programCatLoopup: any;
  showEditImag = true;
  loginData: any;
  labelData: any;
  deptList: any = [];
  programmeContact: any = [];
  modifiedProgramme: any = [];
  // public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'programName';
  public sortOrder = 'asc';
  order = 'programName';
  createdDeptid: any;
  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  offCampusType: any;
  apiEndPoint: any;
  constructor(private router: Router, private campusProgram: ProgramService, private uiAttachmentsService: UiAttachmentsService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private campusDetails: InstituteService,
    private viewContainerRef: ViewContainerRef,
    private lookupvalueService: LookupvalueService,
    private departmentService: DepartmentService, private cookieService: CookieService) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  option: string;
  // order: string;
  showBtnDetails = false;
  showContactForm = false;
  showcancelbtn = false;

  onSelect(option: string) {
    this.option = option;
    // this.programContact.contactInfo = '';

  }

  ngOnInit(): void {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.apiEndPoint = AppSettings.API_ENDPOINT;
    this.offCampusType = [
      { 'value': 'y', 'indicatorName': 'YES' },
      { 'value': 'n', 'indicatorName': 'NO' },
    ];

    // ----------service call to get dynamic labels list
    // this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));

    // getting Contact  data from look up table
    this.ContactLookups = this.lookupvalueService.getContactLookup();
    this.loadContactArrayLookups();
    // this.campusProgram.getContactLookup().subscribe(data => this.ContactLookups = data);

    // getting program type  data from look up table
    this.programLoopup = this.lookupvalueService.getProgramLookupType();
    this.loadProgramTypeArrayLookups();
    // this.getprogramLoopupType = function () {
    //   this.campusProgram.getProgrameTypeLookup().subscribe(data => this.programLoopup = data);
    // };
    // this.getprogramLoopupType();

    // getting program classification  data from look up table
    this.programClassLoopup = this.lookupvalueService.getProgramClassificationLookupType();
    this.loadProgramClassificationArrayLookups();
    // this.campusProgram.getProgrameClassLookup().subscribe(data => this.programClassLoopup = data);

    // getting program major data from look up table
    this.programMajLoopup = this.lookupvalueService.getProgramMajorLookupType();
    this.loadProgramMajorArrayLookups();
    // this.campusProgram.getProgrameMajLookup().subscribe(data => this.programMajLoopup = data);

    // getting prgoram catagory data from look up table
    this.programCatLoopup = this.lookupvalueService.getProgramCatTypeLookupType();
    this.loadProgramCatArrayLookups();
    // this.campusProgram.getProgrameCatLookup().subscribe(data => this.programCatLoopup = data);


    // getting program country list from look up table
    this.campusProgram.getCountryList().subscribe(data => this.countryList = data);

    this.getAllProgramProfile();

    this.getAllDeptDetails();
  }
// end NgInIt

loadContactArrayLookups() {
  if (this.ContactLookups) {
    this.contactLookupArray = [];
    for (const key in this.ContactLookups) {
     if (this.ContactLookups.hasOwnProperty(key)) {
       this.contactLookupArray.push(this.ContactLookups[key]);
     }
    }
  }
}

loadProgramTypeArrayLookups() {
  if (this.programLoopup) {
    this.programTypeLookupArray = [];
    for (const key in this.programLoopup) {
     if (this.programLoopup.hasOwnProperty(key)) {
       this.programTypeLookupArray.push(this.programLoopup[key]);
     }
    }
  }
}

loadProgramMajorArrayLookups() {
  if (this.programMajLoopup) {
    this.programMajorLookupArray = [];
    for (const key in this.programMajLoopup) {
     if (this.programMajLoopup.hasOwnProperty(key)) {
       this.programMajorLookupArray.push(this.programMajLoopup[key]);
     }
    }
  }
}

loadProgramClassificationArrayLookups() {
  if (this.programClassLoopup) {
    this.programClassificationLookupArray = [];
    for (const key in this.programClassLoopup) {
     if (this.programClassLoopup.hasOwnProperty(key)) {
       this.programClassificationLookupArray.push(this.programClassLoopup[key]);
     }
    }
  }
}

loadProgramCatArrayLookups() {
  if (this.programCatLoopup) {
    this.programCatLookupArray = [];
    for (const key in this.programCatLoopup) {
     if (this.programCatLoopup.hasOwnProperty(key)) {
       this.programCatLookupArray.push(this.programCatLoopup[key]);
     }
    }
  }
}


  // To get all programs
  getAllProgramProfile(): void {
    this.campusProgram.getProgramTotalDetails(this.loginData.campusId).subscribe((data: any) => {
      this.data = data.data;
       console.log('entire prog:: data' + JSON.stringify(this.data));
    });
  }

  // To get current programs
  getProgramProfileDetails(): void  {
    this.campusProgram.getProgramProfileDetails(this.programme.programId,
      this.loginData.campusId, this.programme.departmentId).subscribe((data: any) => {
        this.programmeData = data.data;
    });
  }

  // To get current program contact list
  getProgramContactList(): void  {
    if (this.clickProgrammeDetails) {
      this.campusProgram.getDeptContactListByDeptID(this.clickProgrammeDetails.programId).subscribe((data: any) => {
        this.programContactList = data.data;
      });
    } else {
      this.campusProgram.getDeptContactListByDeptID(this.programData.programId).subscribe((data: any) => {
        this.programContactList = data.data;
      });
    }
  }

  // add functionality for  program starts
  addProgramme() {
    this.disableDate = false;
    this.showEditImag = false;
    this.btnreadonly = false;
   // this.readonly12 = false;
    this.programme = {};
    this.programme.offCampusInd = '';
    this.programmeData = [];
    this.showEditContact = false;
    this.programContactList = [];
    this.programmeData.push(this.programme);
    this.adMain = true;
    this.readonly = false;
    this.showEditDetails = true;
    this.showcancelbtn = true;
    this.showBtnDetails = false;
    // console.log('showBtnDetails', this.showBtnDetails);
    // this.showAddImagDisable = true;
    this.showContactImagDisable = false;
  }

  getAllDeptDetails() {
    this.departmentService.getDepartmentTotalDetails(
      this.loginData.campusId).subscribe((data: any) => this.deptList = data.data);
  }

  // get program contact details  function ends
  // cancel button functionality for total screen starts
  cancelbtn() {
    this.filterQuery = '';
    this.adMain = false;
    this.showEditDetails = false;
    this.programmeData = [];
    this.getAllProgramProfile();
    this.showcancelbtn = false;
    this.addCancelBtn = true;
  }
  // cancel button functionality for total screen ends
  // getting state data details starts
  getStateDet(countryDet) {
    this.countrySelect = countryDet;
    this.campusProgram.getStateList(
      this.countrySelect).subscribe(data => this.stateList = data);
  }
  // getting state data details ends

  // getting city data details starts
  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.campusProgram.getCityList(this.stateSelect).subscribe(data => this.cityList = data);
  }

  // getting postal code data details starts
  getPostalDet(cityDet) {
    this.citySelect = cityDet;
    this.campusProgram.getPostalList(this.citySelect).subscribe(data => this.postalList = data);
  }

  /*********************total program profile details ends***************************** */
  // creating program profile functionality starts
  programProfileSubmit(event) {
//     console.log(':: data' + JSON.stringify(this.data));
    if (this.data != '') {
      for (let k = 0; k < this.data.length; k++) {
        //   console.log('this.data[k].departmentCampusDetails.name::::::::::'+this.data[k].name);
        // console.log('this.orgs.name'+ this.orgs.name);
        if (this.data[k].programName.toLowerCase() == this.programme.programName.toLowerCase() && 
        this.data[k].departmentId == this.programme.departmentId) {

          this.toastr.warning('Programme already exist in the same department!', 'Alert!');
          this.checkStatusName = false;
          break;
        } else {

          this.checkStatusName = true;
        }
      }

    } else {
      this.checkStatusName = true;
    }
    if (this.checkStatusName) {
    event.target.disabled = true;
    this.modifiedProgramme = {
      'campusId': this.loginData.campusId,
      'departmentId': this.programme.departmentId,
      'programName': this.programme.programName,
      'description': this.programme.description,
      'programTypeValueId': this.programme.programTypeValueId,
      'programClassValueId': this.programme.programClassValueId,
      'programCatValueId': this.programme.programCatValueId,
      'numberOfStudents': +this.programme.numberOfStudents,
      'startDate': this.programme.startDate,
      'createUserId': this.loginData.userId,
      'updateUserId': this.loginData.userId,
      'programMajorValueId': this.programme.programMajorValueId,
      'offCampusInd': this.programme.offCampusInd
    };

    this.createdDeptid = this.programme.departmentId;

    // console.log('saveddddDataaaaa' + JSON.stringify(this.modifiedProgramme));
    const date1 = new Date();
    this.programme.startDate.setMinutes((date1.getTimezoneOffset() * -1));
    this.campusProgram.createProgram(this.modifiedProgramme)
      .subscribe(
      (data: any) => {
        console.log('submitted data' + JSON.stringify(data.data));
        this.toastr.success('Programme Successfully Created!', 'Success!');
        this.programData = data.data;
        this.clickProgrammeDetails = data.data;
        this.showContactImagDisable = true;
        this.showEditImag = true;
        // this.orgs = data.data;
        this.showBtnDetails = true;
        //    this.btnreadonly = true;
        this.readonly = true;
      },
      error => {
        if (error.status === 500) {
          this.toastr.warning('You cannot create Programm until your selected Department has Address!', 'Alert!');
        }
        event.target.disabled = false;
        console.log('error///', error);
        // console.log('error _body', error._body);
        // console.log('error _body error', error._body.name);
        // console.log('error name', error._body.error.name);
      });
    }

  }
  // creating program profile functionality ends

  // edit program profile functionality starts
  editProgramSubmit() {
    this.showEditImag = false;
    this.disableDate = false;
    this.readonly = false;
    this.updateBtn = true;
    this.btnreadonly = true;
    this.showBtnDetails = false;
    this.addCancelBtn = false;
  }

  // edit program profile functionality ends
  // cancel button functionality for profile starts
  cancelProgramSubmit() {
    this.showEditImag = true;
    this.readonly = true;
    this.getProgramProfileDetails();
    this.updateBtn = true;
    this.addCancelBtn = true;


    //  this.showImagDisable = true;
    this.showBtnDetails = true;
    // this.getAllProgramProfile();
  }
  // cancel button functionality for profile ends


  // update program profile functionality starts
  updateProgramSubmit() {

    // console.log(' Updated data ' + JSON.stringify(this.clickProgrammeDetails));
    delete this.clickProgrammeDetails['programTypeValueLookupValue'];
    delete this.clickProgrammeDetails['programCatValueLookupValue'];
    delete this.clickProgrammeDetails['programClassValueLookupValue'];
    delete this.clickProgrammeDetails['programMajorValueLookupValue'];
    delete this.clickProgrammeDetails['departmentDetails'];
    const date = new Date();
    this.programme.startDate = new Date(this.programme.startDate);
    this.programme.startDate.setMinutes((date.getTimezoneOffset() * -1));
    // if (this.programme.description == null) {
    //   this.programme.description = '';
    // }

    if (this.clickProgrammeDetails) {
      this.programme.campusId = this.clickProgrammeDetails.campusId;
      this.programme.departmentId = this.clickProgrammeDetails.departmentId;
      this.programme.programId = this.clickProgrammeDetails.programId;
    } else {
      this.programme.campusId = this.programData.campusId;
      this.programme.departmentId = this.programData.departmentId;
      this.programme.programId = this.programData.programId;
    }
    // this.campusAdd.primaryInd='Y';
    this.campusProgram.updateProgramProfile(this.programme).subscribe(data => {
      //  console.log('Updated data' + JSON.stringify(data));
      this.readonly = true;
      this.showEditImag = true;
      this.getAllProgramProfile();
      this.showBtnDetails = true;
      this.showContactImagDisable = true;
      this.toastr.success('Programme Successfully Updated!', 'Success!');
    },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      });
  }
  // update program profile functionality ends


  /*********************total program profile details ends***************************** */
  /*********************total program contact details starts***************************** */
  // add program contact functionality starts
  addProgramContact() {
    this.departmentContact = [];
    this.programContact = {};
    this.programContact.contactTypeValueId = '';
    this.departmentContact.push(this.programContact);
    this.adBtnContact = true;
    this.onSelect('Contact Type');
    this.option = 'Contact Type';
    this.showEditContact = true;
    this.showContactForm = true;
    this.showContactImagDisable = false;
    this.btnContactreadonly = false;
  }
  // add program contact functionality ends



  // create program contact functionality starts
  inArray(programContactList, programContact) {
    for (let i = 0; i < programContactList.length; i++) {
      console.log('programContactList' + JSON.stringify(this.programContactList[i]));
      console.log('programContact' + JSON.stringify(this.programContact));
      if (programContactList[i].programContact.contactInfo === programContact.contactInfo) {
        return false;
      }
    }
    return true;
  }

  inArrayUpdate(programContactList, programContact) {
    for (let i = 0; i < programContactList.length; i++) {
   //   console.log('companyContactList' + JSON.stringify(programContactList[i]));
   //   console.log('companyCont' + JSON.stringify(companyCont));
      if (programContactList[i].programContact.contactId !== programContact.contactId) {
        if (programContactList[i].programContact.contactInfo === programContact.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }

  programContactSubmit(event) {
  //  console.log('contact::::::data::::' + JSON.stringify(this.programContact));
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.programContactList, this.programContact);
    if (checkContactInfo) {
      this.programmeContact = {
        'programId': this.clickProgrammeDetails.programId,
        'campusId': this.loginData.campusId,
        'departmentId': this.clickProgrammeDetails.departmentId,
        'contactTypeValueId': this.programContact.contactTypeValueId,
        'contactInfo': this.programContact.contactInfo,
        'primaryInd': 'N',
        'createUserId': this.clickProgrammeDetails.createUserId,
        'updateUserId': this.clickProgrammeDetails.updateUserId
      };
      console.log('contact::::::data submitted::::' + JSON.stringify(this.programmeContact));
      this.campusProgram.deptContactCreate(this.programmeContact).subscribe((data: any) => {
        this.showContactImagDisable = true;
        this.btnContactreadonly = true;
        this.getProgramContactList();
        this.showEditContact = false;
        this.adBtnContact = false;
        //  this.showContactForm = false;
        // console.log("Org Cont data" + JSON.stringify(data));
        this.programContact1 = data.data;
        event.target.disabled = true;
        this.toastr.success('Contact Successfully Created!', 'Success!');
      },
        error => {
          this.toastr.error('Invalid Input Parameters!', 'Oops!');
          event.target.disabled = false;
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Contact Already Exists.', 'Alert!');
      // alert('alrdy exitst');
    }
  }
  // create program contact functionality ends






  // update program contact functionality starts
  updateProgramContactSubmit() {
    const checkUpdateContactInfo = this.inArrayUpdate(this.programContactList, this.programContact);
    if (checkUpdateContactInfo) {
    this.programContact.createUserId = this.loginData.userId;
    this.programContact.primaryInd = 'Y';
    if (this.clickProgrammeDetails && this.totalProgramContact == null) {
      this.programContact.campusId = this.clickProgrammeDetails.campusId;
      this.programContact.programId = this.clickProgrammeDetails.programId;
      this.programContact.contactId = this.clickProgrammeDetails.contactId;
    } else {
      this.programContact.contactId = this.totalProgramContact.contactId;
      this.programContact.programId = this.totalProgramContact.programId;
      this.programContact.campusId = this.totalProgramContact.campusId;
    }

    this.campusProgram.updateProContact(this.programContact).subscribe(data => {
      this.getProgramContactList();
      this.showEditContact = false;
      this.showContactImagDisable = true;
      this.showContactForm = false;
      this.toastr.success('Contact Successfully Updated!', 'Success!');
    },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      });
    }else {
      this.toastr.warning('Contact Information Already Exits!', 'Alert!');
    }
  }
  // update program contact functionality ends
  // cancel program contact functionality starts
  cancelProgramContact() {
    this.getProgramContactList();
    this.showEditContact = false;
    this.showContactForm = false;
    this.showContactImagDisable = true;
  }
  // cancel program contact functionality ends
  // edit program contact functionality starts

  editProgramContact(data, k) {
    this.totalProgramContact = data;
    this.programContact = data.programContact;
    this.departmentContact = [];
    this.getStateDet(data.countryCode);
    this.getCityDet(data.stateCode);
    this.getPostalDet(data.cityName);
    this.departmentContact.push(this.programContact);
    if (this.programContact.contactTypeValueId) {
      this.onSelect(this.programContact.contactTypeValueId);
      this.option = this.programContact.contactTypeValueId;

    }
    this.btnContactreadonly = true;
    this.showEditContact = true;
    this.showContactForm = true;
    this.showContactImagDisable = true;


  }
  // edit program contact functionality ends
  /*********************total program contact details ends***************************** */
  /***************Edit functionality for total screen  starts***********************/
  programmeEdit(currentProgramm) {
    this.campusDetails.getCampusDetailsByLogin(
      this.loginData.campusId).subscribe(
      data => {
        this.instituteEstDate = data['data'][0].establishedDate;
      });
    this.programme = currentProgramm;
    this.programmeData = [];
    this.adMain = true;
    this.clickProgrammeDetails = currentProgramm;
    console.log('clicked programm:::' + JSON.stringify(this.clickProgrammeDetails));
    this.getProgramContactList();
    this.programme = this.clickProgrammeDetails;
    // this.programme.startDate = new Date().toLocaleDateString();
    const date = new Date();
    this.programme.startDate = new Date(this.programme.startDate);
    this.programme.startDate.setMinutes((date.getTimezoneOffset() * -1));
    console.log('ffffff:: date:::' + this.programme.startDate);
    this.programmeData.push(this.programme);
    this.showEditDetails = true;
    this.btnreadonly = true;
    this.showEditImag = true;
    this.readonly = true;
    this.updateBtn = false;
    this.showBtnDetails = true;
    this.showcancelbtn = true;
    this.addCancelBtn = false;
    this.showContactImagDisable = true;
  }
  /***************Edit functionality for total screen  ends***********************/

  // reset program submit
  resetProgramSubmit(organisationform: NgForm) {
    // this.programme.offCampusInd = 'y';
    organisationform.resetForm();
  }




  // end campus uplods

}





