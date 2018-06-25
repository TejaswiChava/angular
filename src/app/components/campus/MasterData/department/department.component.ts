import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { DepartmentService } from '../../../../services/campus/MasterData/department/department.service';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
import { AppSettings } from '../../../../apiUrl';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Subject } from 'rxjs/Rx';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  contactLookupArray: any[];
  addressLookupArray: any[];
  checkStatusName: boolean;

  addDept: any;
  department: any = [];
  org: any = {};
  departAddres: any = {};
  btnDisabled = false;
  primaryInd: any;
  orgAddData: any;
  ContactLookups: any;
  AddressLookup: any;
  countrySelect: any;
  stateSelect: any;
  citySelect: any;
  countryList: any;
  cityList: any;
  stateList: any;
  postalList: any;
  orgs: any = {};
  orgData: any;
  adBtnAddress = false;
  adMain = false;
  btnreadonly = false;
  readonly = false;
  readonlyCountry = true;
  departmentAddressData: any = [];
  updatedDepartmentdata: any;
  btnaddressreadonly = false;
  updatedDepartmentData: any;
  departAddres1: any;
  departmentList: any;
  departContact: any = {};
  departmentContact: any = [];
  departTotalList: any;
  adBtnContact = false;
  btnContactreadonly = false;
  departContact1: any = {};
  clickDeptDetails: any;
  deptAddressList: any = [];
  deptContactList: any = [];
  totaldeptAdress: any;
  totalDeptContact: any;
  showEditDetails = false;
  updateBtn = false;
  totaldeptContact: any;
  showEditContact = false;
  showEditAdress = false;
  getDepartProfileDetails: any;
  getDepartProfile: any;
  showAddImagDisable = true;
  showEditBtn = true;
  data: any = [];
  btnsave = true;
  modifieDeptContact: any = [];
  modifieDeptAddress: any = [];
  showContactImagDisable = true;
  showEditImag = true;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  cacheLookUp: any;
  loginData: any;
  labelData: any;
  cacheDataForLookup: any;
  image: any = {};
  formData: FormData = new FormData();
  containerName: string;
  updatedAddData: any;
  apiEndPoint: any;
  saveButtonDisable: boolean;
  countryCacheList: any;
  stateCacheList: any;
  constructor(private router: Router, private campusDept: DepartmentService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookupvalueService: LookupvalueService,
    private viewContainerRef: ViewContainerRef,
    private uiAttachmentsService: UiAttachmentsService, private cookieService: CookieService) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  contactObj: any = {};

  option: string;

  onSelect(option: string) {
    this.option = option;
  }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.apiEndPoint = AppSettings.API_ENDPOINT;

    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // this.cacheLookUp = JSON.parse(localStorage.getItem('cacheLookUp'));
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    // if (this.cacheLookUp) {
    //   this.AddressLookup = this.cacheLookUp[0].ADDRESS_TYPE_CODE;
    // }
    this.AddressLookup = this.lookupvalueService.getAddressLookup();
    this.loadAdderssArrayLookups();
    this.ContactLookups = this.lookupvalueService.getContactLookup();
    this.loadContactArrayLookups();

    if (this.cacheDataForLookup) {
      this.countryCacheList = this.cacheDataForLookup.Country;
      this.stateCacheList = this.cacheDataForLookup.State;
    }
    this.departAddres.countryCode = 'IN';
    this.getStateDet(this.departAddres.countryCode);

    this.onSelect = function (option: string) {
      this.option = option;
    };
    // this.campusDept.getContactLookup().subscribe(data => {
    //   this.ContactLookups = data;
    // });
    // getting Address data from look up table
    // this.campusDept.getAddressLookup().subscribe(data => this.AddressLookup = data);
    // getting Country List data from look up table
    this.campusDept.getCountryList().subscribe(data => this.countryList = data);
    // getting department profile details
    this.getDepartProfileDetails = function () {
      this.campusDept.geDepartmentDetails
        (this.loginData.campusId).subscribe(data => {
          this.departmentList = data;
        });
    };
    this.getDepartProfileDetails();


    this.getDepartProfile = function () {
      this.campusDept.geDepartmentDetails
        (this.loginData.campusId, this.orgs.departmentId).subscribe(data => {
          this.orgs = data.data[0];
        });
    };
    //  add department starts
    this.addDept = function () {
      this.btnsave = false;
      this.showEditImag = false;
      this.showEditAdress = false;
      this.showEditBtn = false;
      this.btnreadonly = false;
      this.department = [];
      this.orgs = {};
      this.readonly = false;
      this.department.push(this.orgs);
      this.deptAddressList = [];
      this.departmentAddressData = [];
      this.deptContactList = [];
      this.departAddres = {};
      this.departContact = {};
      this.adMain = true;
      this.showEditDetails = true;
      this.showAddImagDisable = false;

      this.showContactImagDisable = false;

    };
    //  add department ends

    this.getFullDeptDetails();
    //  get full data from department details
  }

  // on clicking  add button department functionality starts
  addDepartmentbtn(companyAddress: NgForm) {
    // this.companyAddress.reset();
    companyAddress.resetForm();
    this.showAddImagDisable = false;
    this.adBtnAddress = true;
    this.showEditAdress = true;
    this.departAddres = {};
    this.btnDisabled = false;
    this.btnaddressreadonly = false;
    this.departmentAddressData = [];
    this.departAddres.countryCode = 'IN';
    this.getStateDet(this.departAddres.countryCode);
    this.departmentAddressData.push(this.departAddres);

  };
  // on clicking  add button department functionality ends

  loadAdderssArrayLookups() {
    if (this.AddressLookup) {
      this.addressLookupArray = [];
      for (const key in this.AddressLookup) {
       if (this.AddressLookup.hasOwnProperty(key)) {
         this.addressLookupArray.push(this.AddressLookup[key]);
       }
      }
    }
    // console.log('convert object to arrayyy' + JSON.stringify(this.addressLookupArray));
  }

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

  getDepartProfileDetailsById() {
    this.campusDept.geDepartmentDetailsById(this.loginData.campusId, this.orgs.departmentId).subscribe((data: any) => {
      this.clickDeptDetails = data.data[0];
      this.orgs = this.clickDeptDetails;
      //
    });
  }
  // get full data from department details
  getFullDeptDetails() {
    this.campusDept.getDepartmentTotalDetails(
      this.loginData.campusId).subscribe((data: any) => this.data = data.data);
  }

  getStateDet(countryDet) {
    this.stateList = [];
    if (this.stateCacheList) {
      for (let i = 0; i < this.stateCacheList.length; i++) {
        if (this.stateCacheList[i].countryCode === countryDet) {
          this.stateList.push(this.stateCacheList[i]);
        }
      }
    }

    // this.countrySelect = countryDet;
    // this.campusDept.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
  }

  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.campusDept.getCityList(this.stateSelect).subscribe(data => {
      this.cityList = data;
      this.cityList.sort(function (a, b) {
        if (a.cityName < b.cityName) {
          return -1;
        }
        if (a.cityName > b.cityName) {
          return 1;
        }
        return 0;
      });
    });
  }
  getPostalDet(cityDet) {
    this.citySelect = cityDet;
    this.campusDept.getPostalList(this.citySelect).subscribe(data => this.postalList = data);
  }
  /*********************************create department profile starts**************/
  DepartmentProfileSubmit(event) {
    // disable the button
    event.target.disabled = true;

   // alert('hii');
  //  console.log('data::::::' + JSON.stringify(this.data));
    // tslint:disable-next-line:one-line
    if (this.data != '') {
      for (let k = 0; k < this.data.length; k++) {
        //   console.log('this.data[k].departmentCampusDetails.name::::::::::'+this.data[k].name);
        // console.log('this.orgs.name'+ this.orgs.name);
        if (this.data[k].name.toLowerCase() == this.orgs.name.toLowerCase()) {

          this.toastr.warning('Department Already Exist!', 'Alert!');
          event.target.disabled = false;
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
      this.btnsave = true;
      this.orgs.campusId = this.loginData.campusId;
      this.orgs.createUserId = this.loginData.userId;
      this.campusDept.orgCreate(this.orgs).subscribe((data: any) => {
        //   console.log('submitted data' + JSON.stringify(data.data));
        event.target.disabled = true;
        this.toastr.success('Department Successfully Created!', 'Success!');
        this.orgData = data.data;
        this.btnreadonly = false;
        this.showEditImag = true;

        this.showAddImagDisable = true;
        this.showContactImagDisable = true;
      },
        error => {
          event.target.disabled = false;
          this.toastr.error('Error While Creating!', 'Oops!');
          console.log('error', error);
        });
      this.btnreadonly = true;
    }
    this.readonly = true;
  }
  /***********************create department profile ends************************************ */
  /**********cancel profile button functionality starts****************/
  cancelDepartmentSubmit() {
    this.showEditImag = true;
    this.readonly = true;
    this.updateBtn = false;
    this.btnreadonly = false;
    this.adBtnContact = false;
    this.getDepartProfileDetailsById();
    // this.showEditDetails = false;
    // this.showEditBtn = true;
    // this.getDepartProfile();
  }
  /**********cancel button functionality ends****************/
  /**********cancel address button functionality starts****************/
  cancelDepartAddress() {
    this.showAddImagDisable = true;
    this.getDepartAddressDetails();
    this.adBtnAddress = false;
    this.showEditAdress = false;
  }
  /**********cancel address button functionality ends****************/
  /**********cancel contact button functionality starts****************/
  cancelDepartContact() {
    this.getDeptContactDetails();
    this.adBtnContact = false;
    this.showEditContact = false;
    this.showContactImagDisable = true;
  }
  /********** cancel contact button functionality ends****************/

  /************************************************************** */

  /**********cancel button functionality starts****************/
  cancelbtn() {
    this.filterQuery = '';
    this.adMain = false;
    this.showEditDetails = false;
    this.adBtnAddress = false;
    this.adBtnContact = false;
    this.showEditBtn = true;
    this.getFullDeptDetails();
    this.deptAddressList = [];
    this.deptContactList = [];
    this.departAddres = {};
    this.departContact = {};
  }
  /**********cancel button functionality ends****************/

  // function for double click
  // dblFunctionAlert(event) {
  //  this.saveButtonDisable = true;
  // }

  updateDepartmentSubmit() {
    if (this.clickDeptDetails) {
      this.orgs.campusId = this.clickDeptDetails.campusId;
      this.orgs.departmentId = this.clickDeptDetails.departmentId;
    } else {
      this.orgs.campusId = this.orgData.campusId;
      this.orgs.departmentId = this.orgData.departmentId;
    }

    //  this.orgs['']
    console.log('orgs data' + JSON.stringify(this.orgs));
    // this.campusAdd.primaryInd='Y';
    this.campusDept.updateDepartmentProfile(this.orgs).subscribe(data => {
      //   console.log('Updated data' + JSON.stringify(data));
      this.toastr.success('Department Successfully Updated!', 'Success!');
      this.updateBtn = true;
      this.readonly = true;
      this.showEditImag = true;
      this.btnreadonly = false;
      //  this.showEditImag = false;
      this.updatedDepartmentdata = data;
    },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      }
    );
  }


/**
 * Function to validate the address existence
 * @param {any} deptAddressList All address
 * @param {any} departAddres // current Address
 * @returns true if no address already exist
 * @memberof DepartmentComponent
 */
inArraySave(deptAddressList, departAddres) {
    if (deptAddressList) {
      for (let i = 0; i < deptAddressList.length; i++) {
        console.log('my clickDeptDetails::' + JSON.stringify(this.deptAddressList[i]));
        if ( deptAddressList[i].addressTypeValueId === departAddres.addressTypeValueId){
          if (deptAddressList[i].addressLine1 === departAddres.addressLine1 &&
            deptAddressList[i].cityId === departAddres.cityId) {
            return false;
          }
        }
      }
    }
    return true;
  }


/**
 * Function to stop duplicate address getting created while updating the address  
 * 
 * @param {any} deptAddressList 
 * @param {any} departAddres 
 * @returns 
 * @memberof DepartmentComponent
 */
inArrayAddressUpdate(deptAddressList, departAddres) {
    if (deptAddressList) {
      for (let i = 0; i < deptAddressList.length; i++) {
        if ( deptAddressList[i].addressTypeValueId === departAddres.addressTypeValueId) {
          if (deptAddressList[i].addressId !== departAddres.addressId ) {
            if (deptAddressList[i].addressLine1 === departAddres.addressLine1 &&
              deptAddressList[i].cityId === departAddres.cityId) {
                return false;
            }
          }
        }
      }
    }
  return true;
}



  /**
   * To create new address
   * @param {any} event submit button - disabled the button on first click
   * @memberof DepartmentComponent
   */
  departmentAddressSubmit(event) {
    event.target.disabled = true;
    this.btnDisabled = true;

    const checkAddressInfo = this.inArraySave(this.deptAddressList, this.departAddres);
  
    if (this.departAddres.postalId === '' || this.departAddres.postalId === undefined || this.departAddres.postalId == null) {
        this.departAddres.postalId = null;
      } else {
        this.departAddres.postalId = +this.departAddres.postalId;
      }

    if (checkAddressInfo) {
      if(this.deptAddressList.length > 0) {
        this.primaryInd = 'N';
      } else {
        this.primaryInd = 'Y';
      }

      if (this.orgData) {
        console.log('dept orgData orgData' + JSON.stringify(this.orgData));

        this.modifieDeptAddress = {
          'addressTypeValueId': this.departAddres.addressTypeValueId,
          'addressLine1': this.departAddres.addressLine1,
          'addressLine2': this.departAddres.addressLine2,
          'addressLine3': this.departAddres.addressLine3,
          'postalId': this.departAddres.postalId,
          'cityId': +this.departAddres.cityId,
          'stateCode': this.departAddres.stateCode,
          'countryCode': this.departAddres.countryCode,
          'primaryInd': this.primaryInd,
          'departmentId': this.orgData.departmentId,
          'campusId': this.loginData.campusId,
          'createUserId': this.orgData.createUserId,
          'updateUserId': this.orgData.updateUserId
        };
      }
      if (this.clickDeptDetails) {
        console.log('clickDeptDetails ::' + JSON.stringify(this.clickDeptDetails));

        this.modifieDeptAddress = {
          'addressTypeValueId': this.departAddres.addressTypeValueId,
          'addressLine1': this.departAddres.addressLine1,
          'addressLine2': this.departAddres.addressLine2,
          'addressLine3': this.departAddres.addressLine3,
          'postalId': this.departAddres.postalId,
          'cityId': +this.departAddres.cityId,
          'stateCode': this.departAddres.stateCode,
          'countryCode': this.departAddres.countryCode,
          'primaryInd': this.primaryInd,
          'departmentId': this.clickDeptDetails.departmentId,
          'campusId': this.loginData.campusId,
          'createUserId': this.clickDeptDetails.createUserId,
          'updateUserId': this.clickDeptDetails.updateUserId
        };
      }
      console.log('dept contact conatctttttttttt' + JSON.stringify(this.modifieDeptAddress));
      this.btnDisabled = true;
      //  alert('ddddddddddddddd')
      this.campusDept.departmentAddressCreate(this.modifieDeptAddress)
        .subscribe(
        (data: any) => {
          // console.log('departmentAddressCreate Address data' + JSON.stringify(data));
          this.toastr.success('Address Successfully Created!', 'Success!');
          this.departAddres = data.data;
          this.showEditAdress = false;
          this.showAddImagDisable = true;
          event.target.disabled = true;
          this.getDepartAddressDetails();
        },
        error => {
          event.target.disabled = false;
          this.toastr.error('Error While Creating!', 'Oops!');
          console.log('error', error);
        });
    } else {
      event.target.disabled = false;
      this.toastr.warning('Address Information Already Exits!', 'Alert!');
    }
  }
  // create depatrment address funcctionality ends

  /*******************Primary Address indication functionality starts****************************/
  primary(cmpData, k) {
    // alert(JSON.stringify(cmpData));
    cmpData.primaryInd = 'Y';
    cmpData['campusId'] = this.loginData.campusId;
    for (let i = 0; i < this.deptAddressList.length; i++) {
      if (i !== k) {
        if (this.deptAddressList[i].primaryInd === 'Y' || this.deptAddressList[i].primaryInd == null) {
          this.deptAddressList[i].primaryInd = 'N';
          this.deptAddressList[i].departmentId = this.clickDeptDetails.departmentId;
          this.deptAddressList[i].campusId = this.loginData.campusId;
          //    alert(this.deptAddressList[i]);
          delete this.deptAddressList[i].cityDetails;
        //  console.log('changed to cmpData-----' + JSON.stringify(this.deptAddressList[i]));
          this.campusDept.updateDepartmentAddress(this.deptAddressList[i]).subscribe(data => {
            this.updatedAddData = data;
            // console.log('changed to no' + JSON.stringify(this.updatedAddData));
        //    console.log('changed to no' + JSON.stringify(this.updatedAddData));
            // this.toastr.success('Succesfully Updated!', 'Success!');
          });
        }
      }
    }
    // delete this.deptAddressList.cityDetails;
    delete cmpData.cityDetails;
    cmpData.departmentId = this.clickDeptDetails.departmentId;
   // console.log('changed to cmpData::::::::::::::;;' + JSON.stringify(cmpData));
    this.campusDept.updateDepartmentAddress(cmpData).subscribe(data => {
      this.updatedAddData = data;
      this.toastr.success('Marked Address as Primary!', 'Success!');
      this.deptAddressList['cityDetails'] = {};
      this.getDepartAddressDetails();
      // this.getdeptAddressList();
      // console.log("changed to yes" + JSON.stringify(this.updatedAddData));
    });
  }

  /*******************Primary Address indication functionality ends****************************/


  // update department address
  updateDepartmentAddressSubmit() {

    this.departAddres.addressId = this.totaldeptAdress.addressId;
    const checkAddressInfo = this.inArrayAddressUpdate(this.deptAddressList, this.departAddres);

   if(checkAddressInfo) {

    if (this.orgData) {
      this.departAddres.departmentId = this.orgData.departmentId;
    } else {
      this.departAddres.departmentId = this.clickDeptDetails.departmentId;
    }
    this.departAddres.campusId = this.loginData.campusId;
    if (this.departAddres.postalId === '' || this.departAddres.postalId === undefined || this.departAddres.postalId == null) {
        this.departAddres.postalId = null;
      } else {
        this.departAddres.postalId = +this.departAddres.postalId;
      }

    this.departAddres.primaryInd = this.totaldeptAdress.primaryInd;
    delete this.departAddres['cityDetails'];
  //  console.log('submitted data :::::::::::::::::::::;' + JSON.stringify(this.departAddres));
    this.departAddres.createUserId = this.loginData.userId;
    this.campusDept.updateDepartmentAddress(this.departAddres).subscribe((data: any) => {
    //  console.log('Updated data' + JSON.stringify(data));
      this.toastr.success('Address Successfully Updated!', 'Success!');
      this.updatedDepartmentData = data.data;
      this.showEditAdress = false;
      this.showAddImagDisable = true;
      this.getDepartAddressDetails();
    },
      error => {
        this.toastr.error('Error While Update!', 'Oops!');
        console.log('error', error);
      }
    );
  } else {
    this.toastr.warning('Address Information Already Exits!', 'Alert!');
  }
  }
  // dept contact
  addDeptContact() {
    this.btnContactreadonly = false;
    this.showContactImagDisable = false;
    this.departmentContact = [];
    this.departContact = {};
    this.departContact.contactTypeValueId = '';
    this.departmentContact.push(this.departContact);
    this.adBtnContact = true;
    this.onSelect('Contact Type');
    this.option = 'Contact Type';
    this.showEditContact = true;

  }

// func for not allowing duplicate contacts while saving starts
  inArray(deptContactList, departContact) {
    for (let i = 0; i < deptContactList.length; i++) {
      if (deptContactList[i].departmentContact.contactInfo === departContact.contactInfo) {
        return false;
      }
    }
    return true;
  }
  // func for not allowing duplicate contacts while saving ends


// func for not allowing duplicate contacts while updating starts
inArrayUpdate(deptContactList, departContact) {
  for (let i = 0; i < deptContactList.length; i++) {
 //   console.log('deptContactList' + JSON.stringify(deptContactList[i]));
 //   console.log('companyCont' + JSON.stringify(companyCont));
    if (deptContactList[i].departmentContact.contactId !== departContact.contactId) {
      if (deptContactList[i].departmentContact.contactInfo === departContact.contactInfo) {
        return false;
      }
    }
  }
  return true;
}
// func for not allowing duplicate contacts while updating ends


  // dept contact submit starts
  departmentContactSubmit(event) {
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.deptContactList, this.departContact);
    if (checkContactInfo) {
      if ( this.clickDeptDetails ) {
        this.modifieDeptContact = {
          'contactTypeValueId': this.departContact.contactTypeValueId,
          'departmentId': this.clickDeptDetails.departmentId,
          'campusId': this.loginData.campusId,
          'contactInfo': this.departContact.contactInfo,
          'primaryInd': 'N',
          'createUserId': this.loginData.userId,
          'updateUserId': this.loginData.userId
        };
      } else {
        this.modifieDeptContact = {
          'contactTypeValueId': this.departContact.contactTypeValueId,
          'departmentId': this.orgData.departmentId,
          'campusId': this.loginData.campusId,
          'contactInfo': this.departContact.contactInfo,
          'primaryInd': 'N',
          'createUserId': this.loginData.userId,
          'updateUserId': this.loginData.userId
        };
      }
      this.campusDept.deptContactCreate(this.modifieDeptContact)
        .subscribe(
        (data: any) => {
          this.getDeptContactDetails();
          this.showEditContact = false;
          this.departContact1 = data.data;
          this.showContactImagDisable = true;
          event.target.disabled = true;
          this.toastr.success('Contact Successfully Created!', 'Success!');
        },
        error => {
          this.toastr.error('Error While Creating!', 'Oops!');
          event.target.disabled = false;
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Contact Information Already Exist!', 'Alert!');
      event.target.disabled = false;
    }
  }
  // dept contact submit ends




  updateDepartmentContactSubmit() {
    const checkUpdateContactInfo = this.inArrayUpdate(this.deptContactList, this.departContact);
       if (checkUpdateContactInfo) {
    this.departContact.createUserId = 1;
    this.showEditContact = false;
    this.departContact.primaryInd = 'Y';
    if (this.clickDeptDetails) {
      this.departContact.campusId = this.clickDeptDetails.campusId;
      this.departContact.departmentId = this.clickDeptDetails.departmentId;
    } else {
      this.departContact.contactId = this.totalDeptContact.contactId;
      this.departContact.departmentId = this.totalDeptContact.departmentId;
    }
    this.departContact.campusId = this.totalDeptContact.campusId;
   // console.log('++++', JSON.stringify(this.departContact));
    this.campusDept.updateDepartContact(this.departContact).subscribe(data => {
      this.showContactImagDisable = true;
      this.getDeptContactDetails();
      // this.updatedData = data;
      this.toastr.success('Contact Successfully Updated!', 'Success!');
    },
      error => {
        this.toastr.error('Error While Updating!', 'Oops!');
      });
    } else {
      this.toastr.warning('Contact Information Already Exits.', 'Alert!');
    }
  }



  // get department address details
  getDepartAddressDetails() {
    // alert('innn');
    if (this.clickDeptDetails) {
      // alert('oooooooooo');
      this.campusDept.getDeptAddressListByDeptID(
        this.clickDeptDetails.campusId, this.clickDeptDetails.departmentId).subscribe((data: any) => {

          this.deptAddressList = (data.addressDetails === undefined) ? [] : data.addressDetails;
       //   console.log('my deptAddressList dept dataa after click::' + JSON.stringify(this.deptAddressList));
        });
    } else {
      this.campusDept.getDeptAddressListByDeptID(
        this.orgData.campusId, this.orgData.departmentId).subscribe((data: any) => {

          this.deptAddressList = data.addressDetails;
       //   console.log('my deptAddressList dept dataa after ceate::' + JSON.stringify(this.deptAddressList));
        });
    }
  }
  // get department ddress details ends
  // get department contact details starts
  getDeptContactDetails() {
    // alert('ff')
    if (this.clickDeptDetails) {
    //  console.log('my clickDeptDetails dept dataa after click::' + JSON.stringify(this.clickDeptDetails));
      this.campusDept.getDeptContactListByDeptID(
        this.clickDeptDetails.campusId, this.clickDeptDetails.departmentId).subscribe((data: any) => {
          this.deptContactList = data.data;

        });
    } else {
    //  console.log('my orgData dept dataa after click::' + JSON.stringify(this.orgData));
      this.campusDept.getDeptContactListByDeptID(
        this.orgData.campusId, this.orgData.departmentId).subscribe((data: any) => {
          this.deptContactList = data.data;
        });
    }
  }
  // get department contact details ends
  // edit dept
  departmentEdit(deptDetails) {
    this.showAddImagDisable = true;
    this.showContactImagDisable = true;
    this.showEditImag = true;
    this.showEditBtn = false;
    this.adMain = true;
    this.clickDeptDetails = deptDetails;
    this.orgs = this.clickDeptDetails;
    this.department = [];
    this.department.push(this.org);
    this.showEditDetails = true;
    this.showEditAdress = false;
    this.showEditContact = false;
    this.btnreadonly = false;
    this.readonly = true;
    this.updateBtn = false;
    this.btnsave = true;
    this.getDepartAddressDetails();
    this.getDeptContactDetails();

  }
  /// edit department address functionality starts
  editDeptAddress(data, j) {
    // console.log('data success' + JSON.stringify(data.departmentAddress));
    this.totaldeptAdress = data;
    this.showAddImagDisable = false;
    this.departAddres = data;
    // this.departmentAddressData=this.departAddres;
    console.log('data this.departAddres:::::::::;' + JSON.stringify(this.departAddres));
    this.getStateDet(this.departAddres.countryCode);
    this.getCityDet(this.departAddres.stateCode);
    this.getPostalDet(this.departAddres.cityId);
    this.departmentAddressData = [];
    this.departmentAddressData.push(this.departAddres);
    this.btnaddressreadonly = true;
    this.showEditAdress = true;
    this.adBtnAddress = true;
    // this.showContactImagDisable = false;
  }

  /// edit department address functionality ends

  /// edit department contact functionality starts
  editDeptContact(data, k) {
    this.totalDeptContact = data;
    this.departContact = data.departmentContact;
    this.departmentContact = [];
    this.departmentContact.push(this.departContact);
    this.btnContactreadonly = true;
    this.showEditContact = true;
    this.showContactImagDisable = false;
    this.adBtnContact = true;
    if (this.departContact.contactTypeValueId) {
      this.onSelect(this.departContact.contactTypeValueId);
      this.option = this.departContact.contactTypeValueId;
    }

  }
  /// edit department contact functionality ends

  // edit department profile functionality starts
  editDepartmentSubmit() {
    this.btnreadonly = true;
    this.showEditImag = false;
    this.readonly = false;
    this.updateBtn = true;
  }
  // edit department profile functionality ends


  // start campus uploads
  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-department-logo';
    if (this.orgs.logo) {
      // deleting existing image
      this.uiAttachmentsService.deleteAttachment(this.orgs.logo, this.containerName)
        .subscribe(
        data => {
          // this.toastr.success('Existed Department Logo Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Department Logo Successfully Uploaded!', 'Success!');
              console.log('data' + JSON.stringify(data));
              this.orgs.logo = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              // this.attachmentName = data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error => {
              this.toastr.error('Error While Uploading!', 'Oops!');
              console.log('error', error);
            });
        },
        error => {
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Department Logo Successfully Uploaded!', 'Success!');
              console.log('data' + JSON.stringify(data));
              this.orgs.logo = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error1 => {
              this.toastr.error('Error While Uploading!', 'Oops!');
              console.log('error', error1);
            });
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
        .subscribe(
        (data: any) => {
          this.toastr.success('Department Logo Successfully Uploaded!', 'Success!');
          console.log('data' + JSON.stringify(data));
          this.orgs.logo = this.apiEndPoint + 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' +
            data.data.result.files.fileDetails[0].name;
          this.formData = new FormData();
        },
        error => {
          this.toastr.error('Error While Uploading!', 'Oops!');
          console.log('error', error);
        });
    }

  }

  cancelDepartment(departmentform: NgForm) {
    this.orgs = {};
    departmentform.resetForm();
  }

  uploadBrandLogo(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-department-branding-image';
    if (this.orgs.brandingImage) {
      // deleting existing image
      this.uiAttachmentsService.deleteAttachment(this.orgs.brandingImage, this.containerName)
        .subscribe(
        data => {
          // this.toastr.success('Existed Department brandingImage Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Department Branding Image  Successfully Uploaded!', 'Success!');
              console.log('data success' + JSON.stringify(data));
              this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error => {
              this.toastr.error('Error While Uploading!', 'Oops!');
              console.log('error', error);
            });
        },
        error => {
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Department Branding Image Successfully Uploaded!', 'Success!');
              console.log('data success' + JSON.stringify(data));
              this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error1 => {
              this.toastr.error('Error While Uploading!', 'Oops!');
              console.log('error', error1);
            });
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
        .subscribe(
        (data: any) => {
          this.toastr.success('Department Branding Image Successfully Uploaded!', 'Success!');
          console.log('data success' + JSON.stringify(data));
          this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' +
            data.data.result.files.fileDetails[0].name;
          this.formData = new FormData();
        },
        error => {
          this.toastr.error('Error While Uploading!', 'Oops!');
          console.log('error', error);
        });
    }


  }

  // end campus uplods


}


