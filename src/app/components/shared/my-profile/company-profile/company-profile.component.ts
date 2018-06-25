import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyProfileService } from './company-profile.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import {CookieService} from 'angular2-cookie/core';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
import { AppSettings } from '../../../../apiUrl';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { EducationPersonModel } from './education-person.model';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['../campus-profile/campus-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {
  oldImageName: any;
  fileInput: any;
  imageUrl: string;
  ImageUrl: string;
  filename: any;
  stateCacheList: any;
  countryCacheList: any;
  cacheDataForLookup: any;
  cityData: any;
  sampleCityData: any;
  addressTypeLookup: any;
  // educationPerson: EducationPersonModel;
  empPer: any = {};
  // empPer: EducationPersonModel;
  empPerAdd: any = {};
  empPerCont: any = {};
  personType: any;
  updatedEduData: any;
  eduPerAddNew: any = [];
  eduPerContNew: any = [];
  addNew: any;
  addNewContact: any;
  ContactLookups: any;
  AddressLookup: any;
  countrySelect: any;
  stateSelect: any;
  citySelect: any;
  countryList: any;
  cityList: any;
  stateList: any;
  postalList: any;
  EmpaddData: any;
  EmpContData: any;
  EduPerAddList: any;
  EmpData: any;
  PersonAddress: any;
  showEditAddress= false;
  btnaddressreadonly= false;
  totalPerAdress: any;
  updatedAddressData: any;
  contactList: any;
  showEditContact= false;
  totalPerContact: any;
  btnContactreadonly= false;
  adBtncontact= false;
  adBtnAddress= false;
  eduPersonAddress: any;
  btnreadonly = true;
  readonly = true;
  readonlyCountry =  true;
  personDetails: any;
  showContactImagDisable = true;
  showAddImagDisable = true;
  loginData: any;
  updatedAddData : any;
  prefixLookups: any;
  createdPersonContact: any= {};
  createdPersonAddress: any = {};
  updatedPersonAddress: any = {};

  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  apiEndPoint: any;
  personTypeInfo: any= [];
  constructor(private router: Router, private empPerson: CompanyProfileService,
    private uiAttachmentsService: UiAttachmentsService, private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookupvalueService: LookupvalueService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     };
    }
  option: string;
  onSelect(option: string) {
    this.option = option;
  }

  ngOnInit() {

    this.onSelect = function (option: string) {
      this.option = option;
    };
    this.loginData = this.cookieService.getObject('loginResponce');

    this.addressTypeLookup = this.lookupvalueService.getLookup('ADDRESS_TYPE_CODE');
    console.log(',,,,' + JSON.stringify(this.addressTypeLookup));

    this.sampleCityData = JSON.parse(localStorage.getItem('allData'));
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    this.cityData = this.sampleCityData.City;
    if (this.cacheDataForLookup) {
      this.countryCacheList = this.cacheDataForLookup.Country;
      this.stateCacheList = this.cacheDataForLookup.State;
    }

    this.apiEndPoint = AppSettings.API_ENDPOINT;
    // ---- service call to get contact lookup
    this.empPerson.getContactLookup().subscribe(data => this.ContactLookups = data);
    // ---- service call to get address lookup
    this.empPerson.getAddressLookup().subscribe(data => this.AddressLookup = data);
    // ---- service call to get country list
    this.empPerson.getCountryList().subscribe(data => this.countryList = data);
    // ---- service call to get person type lookup
    this.empPerson.getPersonType().subscribe(data => this.personType = data);
    this.empPerson.getPrefixLookup().subscribe(data => this.prefixLookups = data);
    this.personTypeInfo = [
      {'id': 1, 'disImgSrc': 'assets/images/female_disable.png', 'enaImgSrc': 'assets/images/female_enable.png'},
      {'id': 2, 'disImgSrc': 'assets/images/male_disable.png', 'enaImgSrc': 'assets/images/male_enable.png'},
      {'id': 3, 'disImgSrc': 'assets/images/unclassified_disable.png', 'enaImgSrc': 'assets/images/unclassified_enable.png'},
    ];


    // ---- service call to get total profile
    this.getProfile1();
    // ---- service call to get get education person address
    this.getAddress();
    // ---- service call to get get education person contact
    this.getContact();

    // ---- functionality for add new address
    this.addNew = function () {
      this.empPerAdd = {};
      this.eduPerAddNew = [];
      this.empPerAdd.countryCode = 'IN';
      this.getStateDet(this.empPerAdd.countryCode);
      this.eduPerAddNew.push(this.empPerAdd);
      this.adBtnAddress = true;
      this.showEditAddress = true;
      this.btnContactreadonly = true;
    };
    // ---- functionality for add new contact
    this.addNewContact = function () {
      this.empPerCont = {};
      this.eduPerContNew = [];
      this.showEditContact = true;
      this.eduPerContNew.push(this.empPerCont);
      this.adBtncontact = true;
      this.btnContactreadonly = false;
      this.onSelect('Contact Type');
      this.option = 'Contact Type';
    };

  }
  // end ng-init

  getProfile1() {
    this.empPerson.getPersonsDetails(this.loginData.employerPersonId, this.loginData.companyId).subscribe((data: any) => {
      this.personDetails = data.data;
      console.log('this is personDetails' + JSON.stringify( this.personDetails));
      this.empPer = this.personDetails[0];
      console.log('this is empPer' + JSON.stringify( this.empPer));
    });
  }

  getAddress() {
    this.empPerson.getPersonAddress(this.loginData.employerPersonId, this.loginData.companyId).subscribe((data: any) => {
      this.PersonAddress = data.data;
    });
  }

  getContact() {
    this.empPerson.getPersonContact(this.loginData.employerPersonId, this.loginData.companyId).subscribe((data: any) => {
      this.contactList = data.data;
    });
  }

  // ---- service call to get the state details
  getStateDet(countryDet) {
    this.countrySelect = countryDet;
    this.empPerson.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
  }

  // ---- service call to get the city details
  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.empPerson.getCityList(this.stateSelect).subscribe(data => this.cityList = data);
  }

  // ---- service call to get the postal details
  getPostalDet(cityDet) {
    this.citySelect = cityDet;
    this.empPerson.getPostalList(this.citySelect).subscribe(data => this.postalList = data);
  }

  // ---- functionality for edit profile
  editSubmit() {
    // this.empPer.genderValueId = '1';
    this.readonly = false;
    this.btnreadonly = false;
  }

 // ------------------------profile submit

empPersonSubmit() {

  this.empPer.userId = this.empPer.id;
  delete this.empPer.id;

  if (this.empPer.prefixValueId == '') {
    this.empPer.prefixValueId = null;
  }
  if (this.empPer.personTypeValueId == '') {
    this.empPer.personTypeValueId = null;
  }

  if (this.empPer.genderValueId === '') {
    this.empPer.genderValueId = null;
  } else if (this.empPer.genderValueId) {
    this.empPer.genderValueId = +this.empPer.genderValueId;
  }
 // this.empPer.genderValueId = +this.empPer.genderValueId;
  // updating person
  this.empPerson.updateEmpPerson(this.empPer).subscribe(
    data => {
      this.toastr.success('Employer Person Profile Successfully Updated!', 'Success!');
      this.readonly = true;
      this.btnreadonly = true;
      if (this.oldImageName) {
      this.deleteImage(this.oldImageName);
      }
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
  this.router.navigate(['/company/myProfile']);
}


  cancelSubmit() {
    // alert("dhkhgdk");
   this.readonly = true;
    // this.btnedit = true;
   this.btnreadonly = true;
  // this.btncancel = true;
    this.getProfile1();

    this.deleteImage(this.empPer.pictureUrl);

  }

 

  // func for not allowing duplicate contacts while saving starts
  inArray(contactList, empPerCont) {
    for (let i = 0; i < contactList.length; i++) {
   //   console.log('contact object::::::' + JSON.stringify(contactList[i]));
      if (contactList[i].employerPersonContact.contactInfo === empPerCont.contactInfo) {
        return false;
      }
    }
    return true;
  }
  // func for not allowing duplicate contacts while saving ends


// func for not allowing duplicate contacts while updating starts
  inArrayUpdate(contactList, empPerCont) {
    for (let i = 0; i < contactList.length; i++) {
      console.log('contactList' + JSON.stringify(contactList[i]));
      console.log('companyCont' + JSON.stringify(empPerCont));
      if (contactList[i].employerPersonContact.contactId !== empPerCont.contactId) {
        if (contactList[i].employerPersonContact.contactInfo === empPerCont.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }
// func for not allowing duplicate contacts while updating ends

 // -----------------contact submits
  empPerContactSubmit(event) {
   // console.log('done' + JSON.stringify(this.empPerCont));
   event.target.disabled = true;
    const checkContactInfo = this.inArray(this.contactList, this.empPerCont);
    if (checkContactInfo) {
    this.createdPersonContact = {
        'employerPersonId': this.personDetails[0].employerPersonId,
        'companyId': this.personDetails[0].companyId,
        'contactInfo': this.empPerCont.contactInfo,
        'contactTypeValueId': +this.empPerCont.contactTypeValueId,
        'primaryInd': 'N',
        'createUserId': this.personDetails[0].createUserId,
        'updateUserId': this.personDetails[0].updateUserId
    };
  //  console.log('person conatctttttttttt' + JSON.stringify(this.createdPersonContact));
    this.empPerson.empContCreate(this.createdPersonContact).subscribe(data => {this.EmpContData = data;
      if (this.EmpContData) {
        // alert('Contact Submitted Succesfully');
        this.toastr.success('Contact Successfully Created!', 'Success!');
        console.log(JSON.stringify(this.EmpContData));
        this.showEditContact = false;
        this.adBtncontact = false;
        this.showContactImagDisable = true;
        this.EmpContData = {};
        event.target.disabled = true;
        this.getContact();
      }
    },
    error => {
      // alert('Invalid Login Credentials');
      this.toastr.error('Invalid Input!', 'Oops!');
      console.log('error', error);
      event.target.disabled = false;
    });
  }else {
    this.toastr.warning('Contact Information Already Exists.', 'Alert!');
    event.target.disabled = false;
  }
  }


  // -------- Update Contacts
  updatePersonContactSubmit() {
    const checkUpdateContactInfo = this.inArrayUpdate(this.contactList, this.empPerCont);
    if (checkUpdateContactInfo) {
    this.showEditContact = false;
    this.empPerCont.createUserId = '1';
    this.empPerCont.primaryInd = 'Y';
    this.empPerCont.contactId = this.totalPerContact.contactId;
    this.empPerCont.employerPersonId = this.totalPerContact.employerPersonId;
    this.empPerCont.companyId = this.totalPerContact.companyId;
    // console.log('++++', JSON.stringify(this.empPerCont));
    this.empPerson.updatePersonContact(this.empPerCont).subscribe(data => {
    // this.updatedData = data;
      if (data) {
        // alert('Contact Updated Successfully');
        this.adBtncontact = false;
        this.toastr.success('Contact Successfully Updated!', 'Success!');
          //  console.log("my vod::"+JSON.stringify(this.updatedCampusData));
      }
    },
    error => {
      // alert('Invalid Login Credentials');
      this.toastr.error('Error While Updating!', 'Oops!');
      console.log('error', error);
    });
  }else {
    this.toastr.warning('Contact Information Already Exits.', 'Alert!');
  }
  }

  // ---- functionality for edit contact
  editContact(data, k) {
    this.showEditContact = true;
    this.totalPerContact = data;
    this.empPerCont = data.employerPersonContact ;
    this.eduPerContNew = [];
    this.eduPerContNew.push(this.empPerCont);
  // alert(this.option);
  //  this.option = option
    this.btnContactreadonly = true;
    this.adBtncontact = true;
    if (this.empPerCont.contactTypeValueId) {
      this.onSelect(this.empPerCont.contactTypeValueId);
      this.option = this.empPerCont.contactTypeValueId;
          }
  }

   // ---- cancel button functionality for Contact
   cancelContact() {
    this.showEditContact = false;
    this.adBtncontact = false;
    this.getContact();
    this.btnContactreadonly = false;
  }

  

  // ---- cancel button functionality for Addresss
 cancelAddress() {
  this.showEditAddress = false;
  this.adBtnAddress = false;
  this.getAddress();
  this.btnaddressreadonly = false;
}







 /*******************Primary Address indication functionality starts****************************/
 primary(cmpData, k) {
  console.log(JSON.stringify(cmpData));
  cmpData.primaryInd = 'Y';
  cmpData.companyId = this.loginData.companyId;
  for (let i = 0; i < this.PersonAddress.length; i++) {
    if (i !== k) {
      if (this.PersonAddress[i].primaryInd === 'Y' || this.PersonAddress[i].primaryInd == null) {
        this.PersonAddress[i].primaryInd = 'N';
        this.PersonAddress[i].companyId = this.loginData.companyId;
        // delete this.PersonAddress[i].cityDetails;

        const modifiedAdd = this.PersonAddress[i].employerPersonAddress;
        modifiedAdd.companyId = this.loginData.companyId;
        modifiedAdd.primaryInd = this.PersonAddress[i].primaryInd;
        modifiedAdd.employerPersonId = this.PersonAddress[i].employerPersonId;

        this.empPerson.updatePersonAddress(modifiedAdd).subscribe(data => {
          this.updatedAddData = data;
        //  console.log('changed to no' + JSON.stringify(this.updatedAddData));
        });
      }
    }
  }

  const modifiedAddY = cmpData.employerPersonAddress;
  modifiedAddY.companyId = this.loginData.companyId;
  modifiedAddY.primaryInd = cmpData.primaryInd;
  modifiedAddY.employerPersonId = cmpData.employerPersonId;

  this.empPerson.updatePersonAddress(modifiedAddY).subscribe(data => {
  this.updatedAddData = data;
  this.toastr.success('Marked Address as Primary!', 'Success!');
  //  console.log('changed to yes' + JSON.stringify(this.updatedAddData));
  });
}


/*******************Primary Address indication functionality ends****************************/

// function for address submit starts

inArray1(PersonAddress, empPerAdd) {
  for (let i = 0; i < PersonAddress.length; i++) {
  //  console.log('my clickDeptDetails::' + JSON.stringify(this.PersonAddress[i]));
  if (PersonAddress[i].employerPersonAddress.addressTypeValueId === empPerAdd.addressTypeValueId ) {
    if (PersonAddress[i].employerPersonAddress.addressLine1 === empPerAdd.addressLine1 &&
      PersonAddress[i].employerPersonAddress.cityId === +empPerAdd.cityId ) {
        return false;
      }
    }
  }
  return true;
}

checkAddressUpdate(PersonAddress: any, empPerAdd: any) {
  for (let i = 0; i < PersonAddress.length; i++) {
    if (PersonAddress[i].employerPersonAddress.addressTypeValueId === empPerAdd.addressTypeValueId ) {
        if (PersonAddress[i].employerPersonAddress.addressId !== empPerAdd.addressId) {
            if (PersonAddress[i].employerPersonAddress.addressLine1 === empPerAdd.addressLine1 &&
              PersonAddress[i].employerPersonAddress.cityId === empPerAdd.cityId) {
            return false;
         }
      }
    }
  }
return true;
}

  empPerAddressSubmit(event) {
    event.target.disabled = true;
    const checkAddressInfo = this.inArray1(this.PersonAddress, this.empPerAdd);
    if (checkAddressInfo) {
    this.createdPersonAddress =  {
      'employerPersonId': this.personDetails[0].employerPersonId,
      'addressTypeValueId': this.empPerAdd.addressTypeValueId,
      'addressLine1': this.empPerAdd.addressLine1,
      'addressLine2': this.empPerAdd.addressLine2,
      'addressLine3': this.empPerAdd.addressLine3,
      'postalId': this.empPerAdd.postalId,
      'cityId': +this.empPerAdd.cityId,
      'stateCode': this.empPerAdd.stateCode,
      'countryCode': this.empPerAdd.countryCode,
      'primaryInd': 'N',
      'createUserId': this.personDetails[0].createUserId,
      'updateUserId': this.personDetails[0].updateUserId,
      'companyId':  this.personDetails[0].companyId
    };
    // console.log('done' + JSON.stringify(this.createdPersonAddress));

      this.empPerson.empAddCreate(this.createdPersonAddress).subscribe(data => {this.EmpaddData = data;
        if (this.EmpaddData) {
          // alert('Address Submitted Succesfully');
          this.toastr.success('Address Successfully Created!', 'Success!');
          event.target.disabled = true;
          console.log(JSON.stringify(this.EmpaddData));
          this.showEditAddress = false;
          this.EmpaddData = {};
          this.adBtnAddress = false;
          this.getAddress();
        }
      },
      error => {
        // alert('Invalid Login Credentials');
        this.toastr.error('Invalid Entry!', 'Oops!');
        event.target.disabled = false;
        console.log('error', error);
      });
    }else {
      this.toastr.warning('Address Information Already Exists', 'Alert!');
      event.target.disabled = false;
    }
  }

// function for address submit ends

  // ---- functionality for edit address
  editAddress(data, j) {
    // salert('kldsl');
    // alert(JSON.stringify(data));
    this.showEditAddress = true;
    this.getStateDet(data.employerPersonAddress.countryCode);
    this.getCityDet(data.employerPersonAddress.stateCode);
    this.totalPerAdress = data;
    this.empPerAdd = data.employerPersonAddress;
    this.eduPerAddNew = [];
    this.eduPerAddNew.push(this.empPerAdd);
    this.btnaddressreadonly = true;
    this.adBtnAddress = true;
  }

  updatePerAddressSubmit() {
    const checkAddressInfo = this.checkAddressUpdate(this.PersonAddress, this.empPerAdd);
    if (checkAddressInfo) {
    this.showEditAddress = false;
    if (this.empPerAdd.postalId === '' || this.empPerAdd.postalId === undefined || this.empPerAdd.postalId == null) {
      this.empPerAdd.postalId = null;
    } else {
      this.empPerAdd.postalId = +this.empPerAdd.postalId;
    }
    console.log('up----', JSON.stringify(this.empPerAdd));
    this.updatedPersonAddress =  {
      'addressId': this.totalPerAdress.addressId,
      'employerPersonId': this.personDetails[0].employerPersonId,
      'addressTypeValueId': this.empPerAdd.addressTypeValueId,
      'addressLine1': this.empPerAdd.addressLine1,
      'addressLine2': this.empPerAdd.addressLine2,
      'addressLine3': this.empPerAdd.addressLine3,
      'postalId': this.empPerAdd.postalId,
      'cityId': +this.empPerAdd.cityId,
      'stateCode': this.empPerAdd.stateCode,
      'countryCode': this.empPerAdd.countryCode,
      'primaryInd': this.totalPerAdress.primaryInd,
      'createUserId': this.personDetails[0].createUserId,
      'updateUserId': this.personDetails[0].updateUserId,
      'companyId':  this.personDetails[0].companyId
    };
    console.log('submitted data :::::::::::::::::::::;' + JSON.stringify(this.updatedPersonAddress));

    this.empPerson.updatePersonAddress(this.updatedPersonAddress).subscribe((data: any) => {
        console.log('Updated data' + JSON.stringify(data));
        this.updatedAddressData = data.data;
        if (this.updatedAddressData) {
          this.toastr.success('Address Successfully Updated!', 'Success!');
          console.log('my vod::' + JSON.stringify(this.updatedAddressData));
          this.adBtnAddress = false;
          this.btnaddressreadonly = false;
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

uploadImage(fileInput: any) {

  this.oldImageName = this.empPer.pictureUrl;
  const fileDetails = fileInput.target.files[0];
  this.formData.append('fileDetails', fileDetails, fileDetails.name);
  this.containerName = 'scora-employer-person-profile-picture';
  if (this.empPer.pictureUrl) {
    const filename = this.empPer.pictureUrl.replace(/^.*[\\\/]/, '');
    // deleting existing image
        this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
        .subscribe(
        (data: any) => {
          this.toastr.success('Picture Uploaded Successfully!', 'Success!');
          this.empPer.pictureUrl = 'Attachments/' +
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
      this.empPer.pictureUrl = 'Attachments/' +
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
 
  // start campus uploads
  // uploadDatasource(fileInput: any) {

  //   console.log('this is empPer initially' + JSON.stringify(this.empPer));
  //   const fileDetails = fileInput[0];
  //   console.log('this is fileInput' + JSON.stringify( fileInput[0]));
  //   console.log('This is fileDetails' + JSON.stringify(fileDetails));
  //   console.log('This is fileDetails.name' + JSON.stringify(fileDetails.name));
  //   this.formData.append('fileDetails', fileDetails, fileDetails.name);
  //   console.log('this is formData after append' + JSON.stringify(this.formData));
  //   this.containerName = 'employer-person-profile-picture';
  //   console.log( 'this is the pic url' + this.empPer.pictureUrl);
  //   if (this.empPer.pictureUrl) {
  //     const filename = this.empPer.pictureUrl.replace(/^.*[\\\/]/, '');
  //     console.log('this is the new file name' +  filename);
  //     // deleting existing image
  //     this.uiAttachmentsService.deleteAttachment(filename, this.containerName)
  //     .subscribe(
  //       data => {
  //         alert('this is in method1 ');
  //         // this.toastr.success('Existed Picture Successfully Deleted!', 'Success!');
  //         this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
  //         .subscribe(
  //         data => {
  //           alert('this is in method2 ');
  //           // alert('employer-person-profile-picture uploaded Successfully');
  //           this.toastr.success('Profile Picture Uploaded Successfully!', 'Success!');
  //           console.log('This is  data after deletion' + JSON.stringify(data));
  //           // this.empPer.pictureUrl = data.data.result.files.fileDetails[0].name;
  //           this.empPer.pictureUrl = 'Attachments/' +
  //           data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //          console.log('This is emper.pictureUrl' + this.empPer.pictureUrl);
  //           this.formData = new FormData();
  //         },
  //         error => {
  //           this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
  //           console.log('error', error);
  //         });
  //       },
  //       error => {
  //         alert('this is in method3 ');
  //         this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
  //         .subscribe(
  //         data => {
  //           // alert('employer-person-profile-picture uploaded Successfully');
  //           console.log('this is formData' , this.formData);
  //           this.toastr.success('Picture Uploaded Successfully!', 'Success!');
  //           console.log('data' + JSON.stringify(data));
  //           this.empPer.pictureUrl = 'Attachments/' +
  //           data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //          console.log('this is pictureUrl in method3' + this.empPer.pictureUrl );
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
  //     data => {
  //       alert('this is in else ');
  //       // alert('employer-person-profile-picture uploaded Successfully');
  //       this.toastr.success('Profile Picture Uploaded Successfully!', 'Success!');
  //       console.log('data' + JSON.stringify(data));
  //       this.empPer.pictureUrl = 'Attachments/' +
  //       data.data.result.files.fileDetails[0].container + '/download/' + data.data.result.files.fileDetails[0].name;
  //       this.formData = new FormData();
  //     },
  //     error => {
  //       this.toastr.error('Profile Picture Not Uploaded,Container Not Found!', 'Oops!');
  //       console.log('error', error);
  //     });
  //   }
  // }

}

