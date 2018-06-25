import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CampusProfileServiceService } from './campus-profile-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
import { AppSettings } from '../../../../apiUrl';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { Jsonp } from '@angular/http/src/http';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { forEach } from '@angular/router/src/utils/collection';

import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-campus-profile',
  templateUrl: './campus-profile.component.html',
  styleUrls: ['./campus-profile.component.css'],
})
export class CampusProfileComponent implements OnInit {
  uploadSuccess:boolean;
  empPer: any;
  oldImageName: any;
  saveButton: boolean;
  sampleCityData: any;
  cityData: any;
  personPrefixLookupArray: any[];
  personTypeLookupArray: any[];
  contactLookupArray: any[];
  cacheDataForLookup: any;
  value: any;
  key: any;

  eduPer: any = {};
  eduPerAdd: any = {};
  eduPerCont: any = {};
  personType: any;
  updatedEduData: any;
  eduPerAddNew: any = [];
  eduPerContNew: any = [];
  ContactLookups: any;
  AddressLookup: any = [];
  countrySelect: any;
  stateSelect: any;
  citySelect: any;
  countryList: any;
  cityList: any;
  stateList: any;
  postalList: any;
  EduaddData: any;
  EduContData: any;
  EduPerAddList: any;
  EduData: any;
  readonlyCountry = true;
  PersonAddress: any;
  showEditAddress = false;
  btnaddressreadonly = false;
  totalPerAdress: any;
  updatedAddressData: any;
  contactList: any = [];
  showEditContact = false;
  totalPerContact: any;
  btnContactreadonly = false;
  adBtncontact = false;
  adBtnAddress = false;
  eduPersonAddress: any;
  btnreadonly = true;
  readonly = true;
  personDetails: any;
  btncancel = true;
  showContactImagDisable = true;
  showAddImagDisable = true;
  loginData: any;
  btnedit = true;
  btnupdate = false;
  prefixLookups: any;
  createdPersonContact: any = {};
  createdPersonAddress: any = {};
  updatedPersonAddress: any = {};
  personTypeInfo: any= [];
  option: string;

  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  updatedAddData: any;
  apiEndPoint: any;
  addressLookupArray: any = [];
  countryCacheList: any;
  stateCacheList: any;

  constructor(private router: Router, private eduPerson: CampusProfileServiceService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookupvalueService: LookupvalueService,
    private viewContainerRef: ViewContainerRef,
    private uiAttachmentsService: UiAttachmentsService, private cookieService: CookieService) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     };
     }

  ngOnInit() {

    this.loginData = this.cookieService.getObject('loginResponce');

    this.apiEndPoint = AppSettings.API_ENDPOINT;
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    this.sampleCityData = JSON.parse(localStorage.getItem('allData'));
    this.cityData = this.sampleCityData.City;
    if (this.cacheDataForLookup) {
      this.countryCacheList = this.cacheDataForLookup.Country;
      this.stateCacheList = this.cacheDataForLookup.State;
    }

    // ---- service call to get contact lookup
    this.ContactLookups = this.lookupvalueService.getContactLookup();
    this.loadContactArrayLookups();
    // this.eduPerson.getContactLookup().subscribe(data => this.ContactLookups = data);
console.log('cityyyyyyyyyyyyy data', this.cityData);
    // ---- service call to get address lookup
    this.AddressLookup = this.lookupvalueService.getAddressLookup();
    this.loadAdderssArrayLookups();
    this.eduPerAdd.countryCode = 'IN';
    this.getStateDet(this.eduPerAdd.countryCode);

    // ---- service call to get country list
    this.eduPerson.getCountryList().subscribe(data => this.countryList = data);

    // ---- service call to get person type lookup
    this.personType = this.lookupvalueService.getPersonTypeLookup();
    this.loadPersonTypeArrayLookups();
    // this.eduPerson.getPersonType().subscribe(data => this.personType = data);

    // ---- service call to get person prefix lookups
    this.prefixLookups = this.lookupvalueService.getPersonPrefixLookup();
    this.loadPersonPrefixArrayLookups();
    // this.eduPerson.getPrefixLookup().subscribe(data => this.prefixLookups = data);

    this.personTypeInfo = [
      {'id': 1, 'disImgSrc': 'assets/images/male_disable.png', 'enaImgSrc': 'assets/images/male_enable.png'},
      {'id': 2, 'disImgSrc': 'assets/images/female_disable.png', 'enaImgSrc': 'assets/images/female_enable.png'},
      {'id': 3, 'disImgSrc': 'assets/images/unclassified_disable.png', 'enaImgSrc': 'assets/images/unclassified_enable.png'},
    ];

    // ---- service call to get total profile
    this.getProfile1();

    // ---- service call to get get education person address
    this.getAddress();

    // ---- service call to get get education person contact
    this.getContact();

  }
  // end ng-Init

  loadAdderssArrayLookups() {
    if (this.AddressLookup) {
      this.addressLookupArray = [];
      for (const key in this.AddressLookup) {
       if (this.AddressLookup.hasOwnProperty(key)) {
         this.addressLookupArray.push(this.AddressLookup[key]);
       }
      }
    }
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

  loadPersonTypeArrayLookups() {
    if (this.personType) {
      this.personTypeLookupArray = [];
      for (const key in this.personType) {
       if (this.personType.hasOwnProperty(key)) {
         this.personTypeLookupArray.push(this.personType[key]);
       }
      }
    }
  }

  loadPersonPrefixArrayLookups() {
    if (this.prefixLookups) {
      this.personPrefixLookupArray = [];
      for (const key in this.prefixLookups) {
       if (this.prefixLookups.hasOwnProperty(key)) {
         this.personPrefixLookupArray.push(this.prefixLookups[key]);
       }
      }
    }
  }

  
  onSelect(option: string) {
    this.option = option;
  }

  // ---- functionality for add new address
  addNew() {
    this.eduPerAdd = {};
    this.eduPerAddNew = [];
    this.eduPerAdd.countryCode = 'IN';
    this.getStateDet(this.eduPerAdd.countryCode);
    this.eduPerAddNew.push(this.eduPerAdd);
    this.adBtnAddress = true;
    this.showEditAddress = true;
    this.saveButton =  true;
  //  this.btnContactreadonly = true;
    this.btnaddressreadonly = true;
  }

  // ---- functionality for add new contact
  addNewContact() {
    this.eduPerCont = {};
    this.showEditContact = true;
    // this.eduPerContNew.push(this.eduPerCont);
    this.adBtncontact = true;
    this.btnContactreadonly = false;
    this.onSelect('Contact Type');
    this.option = 'Contact Type';
  }

  getProfile1() {
    this.eduPerson.getPersonsDetails(this.loginData.educationPersonId, this.loginData.campusId).subscribe((data: any) => {
      this.personDetails = data.data;
      this.eduPer = this.personDetails[0];
      console.log('this.eduPer' + this.eduPer);
    });
  }

  getAddress() {
    this.eduPerson.getPersonAddress(this.loginData.educationPersonId, this.loginData.campusId).subscribe((data: any) => {
      this.PersonAddress = data.data;
      console.log(JSON.stringify(this.PersonAddress[10]));
    });
  }

  getContact() {
    this.eduPerson.getPersonContact(this.loginData.educationPersonId, this.loginData.campusId).subscribe((data: any) => {
    
      this.contactList = data.data;
      console.log('contact::::::::;'+JSON.stringify( this.contactList));
    });
  }

  // ---- service call to get the state details
  getStateDet(countryDet) {
    this.stateList = [];
    if (this.stateCacheList) {
      for (let i = 0; i < this.stateCacheList.length; i++) {
        if (this.stateCacheList[i].countryCode === countryDet) {
          this.stateList.push(this.stateCacheList[i]);
        }
      }
    }
    // this.eduPerson.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
  }

  // ---- service call to get the city details
  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.eduPerson.getCityList(this.stateSelect).subscribe(data => {
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

  // ---- functionality for edit address
  editAddress(data, j) {
    // alert("kldsl");
    this.showEditAddress = true;
    this.totalPerAdress = data;
    this.getStateDet(data.educationPersonAddress.countryCode);
    this.getCityDet(data.educationPersonAddress.stateCode);
    this.eduPerAdd = data.educationPersonAddress;
    this.eduPerAddNew = [];
    this.eduPerAddNew.push(this.eduPerAdd);
    this.btnaddressreadonly = false;
    this.saveButton = false;
    this.adBtnAddress = true;
  }

  // ---- functionality for edit contact
  editContact(data, k) {
    this.showEditContact = true;
    this.totalPerContact = data;
    this.eduPerCont = data.educationPersonContact;
    // this.eduPerContNew = [];
    // this.eduPerContNew.push(this.eduPerCont);
    // alert(this.option);
    //  this.option = option
    this.btnContactreadonly = true;
    this.adBtncontact = true;
    if (this.eduPerCont.contactTypeValueId) {
      this.onSelect(this.eduPerCont.contactTypeValueId);
      this.option = this.eduPerCont.contactTypeValueId;
    }
  }

  cancelSubmit1() {
    // alert("dhkhgdk");
    this.readonly = true;
    // this.btnedit = true;
    this.btnreadonly = true;
    this.btncancel = false;
    this.getProfile1();
    this.deleteImage(this.eduPer.pictureUrl);
  }

  // ---- cancel button functionality for Addresss
  cancelAddress() {
    this.showEditAddress = false;
    this.adBtnAddress = false;
    this.getAddress();
    this.btnaddressreadonly = false;
  }

  // ---- cancel button functionality for Contact
  cancelContact() {
    this.showEditContact = false;
    this.adBtncontact = false;
    this.eduPerCont = {};
    this.getContact();
    this.btnContactreadonly = false;
  }


  /******* Total Profile functionality starts *********/

  // ---- functionality for edit profile
  editSubmit() {
    // this.eduPer.genderValueId = '1';
    this.readonly = false;
    this.btnreadonly = false;
    this.btncancel = false;
  }
  // ------------------------profile submit

  eduPersonSubmit() {
    this.eduPer.userId = this.eduPer.id;
    delete this.eduPer.id;
    if (this.eduPer.prefixValueId == '') {
      this.eduPer.prefixValueId = null;
    }
    if (this.eduPer.personTypeValueId == '') {
      this.eduPer.personTypeValueId = null;
    }

    if (this.eduPer.genderValueId === '') {
      this.eduPer.genderValueId = null;
    } else if (this.eduPer.genderValueId) {
      this.eduPer.genderValueId = +this.eduPer.genderValueId;
    }
    console.log('done' + JSON.stringify(this.eduPer));
    
    this.eduPerson.updateEduPerson(this.eduPer).subscribe(data => {
      // console.log('Updated data' + JSON.stringify(data));
      this.EduData = data;
      this.readonly = true;
      this.btnreadonly = true;
      this.btncancel = true;
      console.log('this is old image' + this.oldImageName);
      if (this.oldImageName) {
      this.deleteImage(this.oldImageName);
      }
      this.toastr.success('Education Person Profile Updated Successfully!', 'Success!');
       this.refreshPage();
      this.getProfile1();
       this.refreshPage();
    },
    error => {
      this.toastr.error('Error While Updating!', 'Oops!');
      console.log('error', error);
    });

  }
/**
 * method to refresh the header component so that new image appears in header.
 * 
 * @memberof CampusProfileComponent
 */
refreshPage() {
    this.router.navigated = false;
    this.router.navigate(['/campus/myProfile']);
  }


  /******* Total Profile functionality ends *********/
  /******* Total Address functionality starts *********/
  // ----------------------address submits



  checkAddress(PersonAddress, eduPerAdd) {
    for (let i = 0; i < PersonAddress.length; i++) {
      console.log('my clickDeptDetails::' + JSON.stringify(this.PersonAddress[i]));
      if (PersonAddress[i].educationPersonAddress.addressTypeValueId === eduPerAdd.addressTypeValueId) {
        if (PersonAddress[i].educationPersonAddress.addressLine1 === eduPerAdd.addressLine1 &&
          PersonAddress[i].educationPersonAddress.cityId === +eduPerAdd.cityId ) {
            return false;
        }
      }
    }
    return true;
 }
 
/**
 * function to validate the duplicate address on update
 * @param {*} PersonAddress
 * @param {*} eduPerAdd
 * @returns
 * @memberof CampusProfileComponent
 */
checkAddressUpdate(PersonAddress: any, eduPerAdd: any) {
      for (let i = 0; i < PersonAddress.length; i++) {
        if (PersonAddress[i].educationPersonAddress.addressTypeValueId === eduPerAdd.addressTypeValueId ) {
            if (PersonAddress[i].educationPersonAddress.addressId !== eduPerAdd.addressId) {
                if (PersonAddress[i].educationPersonAddress.addressLine1 === eduPerAdd.addressLine1 &&
                  PersonAddress[i].educationPersonAddress.cityId === eduPerAdd.cityId) {
                return false;
             }
          }
        }
      }
  return true;
}


  eduPerAddressSubmit(event) {
    event.target.disabled = true;
    const checkAddressInfo = this.checkAddress(this.PersonAddress, this.eduPerAdd);
    if (this.eduPerAdd.postalId === '' || this.eduPerAdd.postalId === undefined || this.eduPerAdd.postalId == null) {
      this.eduPerAdd.postalId = null;
    } else {
      this.eduPerAdd.postalId = +this.eduPerAdd.postalId;
    }

    if (checkAddressInfo) {
    this.createdPersonAddress =  {
      'educationPersonId': this.personDetails[0].educationPersonId,
      'addressTypeValueId': this.eduPerAdd.addressTypeValueId,
      'addressLine1': this.eduPerAdd.addressLine1,
      'addressLine2': this.eduPerAdd.addressLine2,
      'addressLine3': this.eduPerAdd.addressLine3,
      'postalId': this.eduPerAdd.postalId,
      'cityId': +this.eduPerAdd.cityId,
      'stateCode': this.eduPerAdd.stateCode,
      'countryCode': this.eduPerAdd.countryCode,
      'primaryInd': 'N',
      'createUserId': this.personDetails[0].createUserId,
      'updateUserId': this.personDetails[0].updateUserId,
      'campusId':  this.personDetails[0].campusId
    };
      this.eduPerson.eduAddCreate(this.createdPersonAddress).subscribe(data => {this.EduaddData = data;
        if (this.EduaddData) {
          // alert('Address Submitted Succesfully');
          this.toastr.success('Address Successfully Created!', 'Success!');
          console.log(JSON.stringify(this.EduaddData));
          this.showEditAddress = false;
          this.adBtnAddress = false;
          this.EduaddData = {};
          this.getAddress();
        }
      },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Invalid Entry!', 'Oops!');
        console.log('error', error);
        event.target.disabled = false;
      });
  }else {
    this.toastr.warning('Address Information Already Exists', 'Alert!');
    event.target.disabled = false;
  }
}

  /*******************Primary Address indication functionality starts****************************/
  primary(cmpData, k) {
    cmpData.primaryInd = 'Y';
    cmpData['campusId'] = this.loginData.campusId;
    for (let i = 0; i < this.PersonAddress.length; i++) {
      if (i !== k) {
        if (this.PersonAddress[i].primaryInd === 'Y' || this.PersonAddress[i].primaryInd == null) {
          this.PersonAddress[i].primaryInd = 'N';

          this.PersonAddress[i].campusId = this.loginData.campusId;

          const modifiedAdd = this.PersonAddress[i].educationPersonAddress;
          modifiedAdd.campusId = this.loginData.campusId;
          modifiedAdd.primaryInd = this.PersonAddress[i].primaryInd;
          modifiedAdd.educationPersonId = this.PersonAddress[i].educationPersonId;

        //  console.log('changed to no' + JSON.stringify(modifiedAdd));
          this.eduPerson.updateCmpsPersonAdd(modifiedAdd).subscribe(data => {
          this.updatedAddData = data;
            // console.log('changed to no' + JSON.stringify(this.updatedAddData));
          //  console.log('successs' + JSON.stringify(this.updatedAddData));
            // this.toastr.success('Address Primary Indicatior Succesfully Updated!', 'Success!');
          });
        }
      }
    }
    delete this.PersonAddress['cityDetails'];
   // console.log('----------cmpData' + JSON.stringify(cmpData));

    const modifiedAddY = cmpData.educationPersonAddress;
    modifiedAddY.campusId = this.loginData.campusId;
    modifiedAddY.primaryInd = cmpData.primaryInd;
    modifiedAddY.educationPersonId = cmpData.educationPersonId;
  //  console.log('----------modifiedAddY' + JSON.stringify(modifiedAddY));

    this.eduPerson.updateCmpsPersonAdd(modifiedAddY).subscribe(data => {
    this.updatedAddData = data;
    this.toastr.success('Marked Address as Primary!', 'Success!');
      this.PersonAddress['cityDetails'] = {};
      this.getAddress();
      // console.log("changed to yes" + JSON.stringify(this.updatedAddData));
    });
  }

  /*******************Primary Address indication functionality ends****************************/


// update starts

  updatePerAddressSubmit() {
    
    const checkAddressInfo = this.checkAddressUpdate(this.PersonAddress, this.eduPerAdd);
    if (checkAddressInfo) {
    this.showEditAddress = false;
    if (this.eduPerAdd.postalId === '' || this.eduPerAdd.postalId === undefined || this.eduPerAdd.postalId == null) {
      this.eduPerAdd.postalId = null;
    } else {
      this.eduPerAdd.postalId = +this.eduPerAdd.postalId;
    }
    console.log('primary indicatorrrrr' + JSON.stringify(this.eduPerAdd));
    this.updatedPersonAddress =  {
      'addressId': this.totalPerAdress.addressId,
      'educationPersonId': this.personDetails[0].educationPersonId,
      'addressTypeValueId': this.eduPerAdd.addressTypeValueId,
      'addressLine1': this.eduPerAdd.addressLine1,
      'addressLine2': this.eduPerAdd.addressLine2,
      'addressLine3': this.eduPerAdd.addressLine3,
      'postalId': this.eduPerAdd.postalId,
      'cityId': +this.eduPerAdd.cityId,
      'stateCode': this.eduPerAdd.stateCode,
      'countryCode': this.eduPerAdd.countryCode,
      'primaryInd': this.totalPerAdress.primaryInd,
      'createUserId': this.personDetails[0].createUserId,
      'updateUserId': this.personDetails[0].updateUserId,
      'campusId':  this.personDetails[0].campusId
    };
    console.log('submitted data :::::::::::::::::::::;' + JSON.stringify(this.updatedPersonAddress));

    this.eduPerson.updatePersonAddress(this.updatedPersonAddress).subscribe((data: any) => {
      console.log('Updated data' + JSON.stringify(data));
      this.updatedAddressData = data.data;
      if (this.updatedAddressData) {
        this.adBtnAddress = false;
        this.toastr.success('Address Successfully Updated!', 'Success!');
        // alert('Address Updated Succesfully');
        this.btnaddressreadonly = false;
        console.log('my vod::' + JSON.stringify(this.updatedAddressData));
        this.getAddress();
      }
    },
    error => {
      // alert('Invalid Login Credentials');
      this.toastr.error('Error While Updating!', 'Oops!');
      console.log('error', error);
    });
  } else {
    this.toastr.warning('Address Information Already Exists', 'Alert!');
  }
  }

  /******* Total Address functionality ends *********/
  /******* Total contact functionality starts *********/
  // -----------------contact submits
  // func for not allowing duplicate contacts while saving starts
  inArray(contactList, eduPerCont) {
    for (let i = 0; i < contactList.length; i++) {
      if (contactList[i].educationPersonContact.contactInfo === eduPerCont.contactInfo) {
        return false;
      }
    }
    return true;
  }
  // func for not allowing duplicate contacts while saving ends


  // func for not allowing duplicate contacts while updating starts
  inArrayUpdate(contactList, eduPerCont) {
    for (let i = 0; i < contactList.length; i++) {
   //   console.log('contactList' + JSON.stringify(contactList[i]));
   //   console.log('companyCont' + JSON.stringify(companyCont));
      if (contactList[i].educationPersonContact.contactId !== eduPerCont.contactId) {
        if (contactList[i].educationPersonContact.contactInfo === eduPerCont.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }
// func for not allowing duplicate contacts while updating ends


  eduPerContactSubmit(event) {
  //  console.log('done' + JSON.stringify(this.eduPerCont));
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.contactList, this.eduPerCont);
    if (checkContactInfo) {
    this.createdPersonContact = {
        'educationPersonId': this.personDetails[0].educationPersonId,
        'campusId': this.personDetails[0].campusId,
        'contactInfo': this.eduPerCont.contactInfo,
        'contactTypeValueId': +this.eduPerCont.contactTypeValueId,
        'primaryInd': 'N',
        'createUserId': this.personDetails[0].createUserId,
        'updateUserId': this.personDetails[0].updateUserId
    };

    this.eduPerson.eduContCreate(this.createdPersonContact).subscribe(data => {
    this.EduContData = data;
      if (this.EduContData) {
        // alert('Contact Submitted Succesfully');
        this.toastr.success('Contact Successfully Created!', 'Success!');
        console.log(JSON.stringify(this.EduContData));
        this.showEditContact = false;
        this.adBtncontact = false;
        this.EduContData = {};
        event.target.disabled = true;
        this.getContact();
      }
    },
    error => {
      // alert('Invalid Login Credentials');
      this.toastr.error('Invalid Input!', 'Oops!');
      event.target.disabled = false;
      console.log('error', error);
    });
  }else {
    this.toastr.warning('Contact Information Already Exists.', 'Alert!');
    event.target.disabled = false;
  }
}

  // -------- Update Contacts
  updatePersonContactSubmit(eduPerCont) {
      const checkContactupdateInfo = this.inArrayUpdate(this.contactList, eduPerCont);
          if (checkContactupdateInfo) {
            this.showEditContact = false;
            this.eduPerCont.createUserId = this.totalPerContact.educationPersonContact.createUserId;
            this.eduPerCont.primaryInd = 'Y';
            this.eduPerCont.contactId = this.totalPerContact.contactId;
            this.eduPerCont.educationPersonId = this.totalPerContact.educationPersonId;
            this.eduPerCont.campusId = this.totalPerContact.campusId;
            this.eduPerson.updatePersonContact(this.eduPerCont).subscribe((data: any) => {
              if (data.data.requestStatus) {
                this.adBtncontact = false;
                this.toastr.success('Contact Successfully Updated!', 'Success!');
                this.getContact();
              }
            },
            error => {
              this.toastr.error('Error While Updating!', 'Oops!');
              console.log('error', error);
            });
          }else {
            this.toastr.warning('Contact Information Already Exists.', 'Alert!');
          }

  }
  /******* Total Contact functionality ends   *********/

  // // start campus uploads
  // uploadDatasource(fileInput: any) {
  //   const fileDetails = fileInput[0];
  //   console.log('fileDetails success' + JSON.stringify(fileDetails));
  //   this.formData.append('fileDetails', fileDetails, fileDetails.name);
  //   this.containerName = 'education-person-profile-picture';

  //   if (this.eduPer.pictureUrl) {
  //     const filename = this.eduPer.pictureUrl.replace(/^.*[\\\/]/, '');
  //     console.log(filename);

  //     // deleting existing image
  //     this.uiAttachmentsService.deleteAttachment(filename, this.containerName)
  //     .subscribe(
  //       data => {
  //         // this.toastr.success('Existed Picture Successfully Deleted!', 'Success!');
  //         this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
  //         .subscribe(
  //         // tslint:disable-next-line:no-shadowed-variable
  //         (data: any) => {
  //           // alert('education-person-profile-picture uploaded Successfully');
  //           this.toastr.success('Profile Picture Uploaded Successfully!', 'Success!');
  //           console.log('data' + JSON.stringify(data));
  //           this.eduPer.pictureUrl = 'Attachments/' +
  //           data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //           this.formData = new FormData();
  //         },
  //         error => {
  //           this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
  //           console.log('error', error);
  //         });
  //       },
  //       error => {
  //         this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
  //         .subscribe(
  //         (data: any) => {
  //           // alert('education-person-profile-picture uploaded Successfully');
  //           this.toastr.success('Profile Picture Uploaded Successfully!', 'Success!');
  //           console.log('data' + JSON.stringify(data));
  //           // this.eduPer.pictureUrl = data.data.result.files.fileDetails[0].name;
  //           this.eduPer.pictureUrl = 'Attachments/' +
  //           data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //           this.formData = new FormData();
  //         },
  //         error1 => {
  //           this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
  //           console.log('error', error1);
  //         });
  //       });
  //   } else {
  //     this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
  //     .subscribe(
  //     (data: any) => {
  //       // alert('education-person-profile-picture uploaded Successfully');
  //       this.toastr.success('Profile Picture Uploaded Successfully!', 'Success!');
  //       console.log('data' + JSON.stringify(data));
  //       this.eduPer.pictureUrl = 'Attachments/' +
  //       data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //       // this.eduPer.pictureUrl = data.data.result.files.fileDetails[0].name;
  //       this.formData = new FormData();
  //     },
  //     error => {
  //       this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
  //       console.log('error', error);
  //     });
  //   }
  // }
  uploadImage(fileInput: any) {
    this.oldImageName = this.eduPer.pictureUrl;
    const fileDetails = fileInput.target.files[0];
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-education-person-profile-picture';
    if (this.eduPer.pictureUrl) {
      console.log('this is in if');
      const filename = this.eduPer.pictureUrl.replace(/^.*[\\\/]/, '');
      // deleting existing image
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            this.toastr.success('Picture Uploaded Successfully!', 'Success!');
            this.eduPer.pictureUrl = 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
            this.formData = new FormData();
          });
          // error1 => {
          //   this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
          // });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
      .subscribe(
      (data: any) => {
        this.toastr.success('Picture Uploaded Successfully!', 'Success!');
        this.eduPer.pictureUrl = 'Attachments/' +
        data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
        this.formData = new FormData();
      },
      error1 => {
        this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
      });
  }
  }
  
  deleteImage(imageURL) {
      const filename = imageURL.replace(/^.*[\\\/]/, '');
      this.uiAttachmentsService.deleteAttachment(filename, this.containerName)
      .subscribe();
  }



  }

