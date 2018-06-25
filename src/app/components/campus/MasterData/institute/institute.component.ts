import { Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators,  FormBuilder , NgForm} from '@angular/forms';
import { Router} from '@angular/router';
import {NgModule} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import {
  CookieService
} from 'angular2-cookie/core';
import {
  AppSettings
} from '../../../../apiUrl';
import {
  InstituteService
} from '../../../../services/campus/MasterData/institute/institute.service';
import {
  UiAttachmentsService
} from '../../../../services/shared/ui-attachments/ui-attachments.service';
// import {
//   ToastsManager
// } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']

})
export class InstituteComponent implements OnInit {
  campusAddDumy: any;
  lookupData: any = [];

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];
  filteredOptions: Observable<string[]>;
  univList: any;
  cityList: any;
  stateList: any = [];
  countryList: any;
  postalList: any;
  CreateCampusData: string;
  campusData: any;
  showImagDisable = true;
  showContactImagDisable = true;
  showContactForm = false;
  university: any;
  uListData: any;
  itemList: any = [];
  campusList: any;
  campusId: any;
  campus: any = {};
  countrySelect: any;
  ContactLookups: any;
  AddressLookup: any;
  campusAddNew: any = [];
  campusContNew: any = [];
  stateSelect: any;
  citySelect: any;
  campusaddData: any;
  campusAdd: any = {};
  campuscontData: any;
  campusCont: any = {};
  readonly = false;
  btnreadonly = true;
  adBtnAddress = false;
  btnaddressreadonly = false;
  adBtncontact = false;
  showAddImagDisable = true;
  btnContactreadonly = false;
  showEditAddress = false;
  data: any = [];
  myValue;
  AddressData: any = [];
  updatedCampusData: any;
  CampusAddList: any;
  cmpsData;
  duplicateCampAddress: any;
  campAdressId: any;
  CampusContactList: any;
  contactList: any;
  campusDetails: any;
  address: any = [];
  contact: any;
  contactShow = false;
  addressShow = false;
  addressDataShow = false;
  contactDataShow = false;
  getAddress: any;
  getContact: any;
  campContId: any;
  btnedit = true;
  btncancel = false;
  btnupdate = false;
  getCampus: any;
  updatedAddData: any;
  loginData: any;
  labelData: any;
  countryReadonly = true;
  disableDate = true;
  // maxdate = new Date();
  minDate = new Date(1970, 0, 1);
  maxDate = new Date();
  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  attachmentName: string;
  apiEndPoint: any;
  option: string;
  cacheLookUp: any;
  cacheDataForLookup: any;
  addressLookups: any;
  countryCacheList: any;
  stateCacheList: any;
  addressLookupArray: any = [];
  contactLookupArray: any = [];
  constructor(private router: Router, private createCampus: InstituteService,
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
  // _keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //   const inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    console.log(this.loginData);
    this.apiEndPoint = AppSettings.API_ENDPOINT;
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // this.cacheLookUp = JSON.parse(localStorage.getItem('cacheLookUp'));
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    // if (this.cacheLookUp) {
    //   this.AddressLookup = this.cacheLookUp[0].ADDRESS_TYPE_CODE;
    // }
    if (this.cacheDataForLookup) {
      this.countryCacheList = this.cacheDataForLookup.Country;
      this.stateCacheList = this.cacheDataForLookup.State;
      this.univList = this.cacheDataForLookup.University;
    }
    this.AddressLookup = this.lookupvalueService.getAddressLookup();
    this.loadAdderssArrayLookups();
    this.ContactLookups = this.lookupvalueService.getContactLookup();
    this.loadContactArrayLookups();

    this.onSelect = function (option: string) {
      // alert('out');
      this.option = option;
    };
    // ----------service call to get university List
    // this.createCampus.getUnivList().subscribe(data => this.univList = data);

    // ----------service call to get country List
    this.createCampus.getCountryList().subscribe(data => this.countryList = data);
    // ----------service call to get contact type lookup List
    // this.createCampus.getContactLookup().subscribe(data => this.ContactLookups = data);

    this.campusAdd.countryCode = 'IN';
    this.getStateDet(this.campusAdd.countryCode);
    // --- Service call to get the particular entity details by login Id(static presently)

    this.getCampus = function () {
      this.createCampus.getCampusDetailsByLogin(
        this.loginData.campusId).subscribe(
        data => {
          this.campusDetails = data.data;
          // console.log("dgd"+JSON.stringify(this.campusDetails));
          this.campus = this.campusDetails[0];

          this.readonly = true;
          // ----Service call to get the particular entity's address details
          this.getAddress = function () {
            this.createCampus.getAddress(this.loginData.campusId)
              // tslint:disable-next-line:no-shadowed-variable
              .subscribe(data => {
                if (data.addressDetails === undefined){
                  this.address = [];
                } else {
                  this.address = data.addressDetails;
                }
                // this.address[0]['campusId'] = data.campusId;

                    // console.log("addressfff::::::::::::::::"+JSON.stringify(this.address));
              });
          };
          // ----Service call to get the particular entity's contact details
          this.getContact = function () {
            this.createCampus.getContact(this.campus.campusId)
              // tslint:disable-next-line:no-shadowed-variable
              .subscribe(data => this.contact = data.data);
          };
          this.getAddress();
          this.getContact();
        });
    };
    this.getCampus();

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.univList.slice());
  }

  // ----- Add button functionality for adding contact
  addNewContact() {
    // alert('i');
    this.campusCont = {};
    this.campusContNew = [];
    this.campusContNew.push(this.campusCont);
    this.adBtncontact = true;
    this.btnContactreadonly = false;
    this.contactShow = true;
    this.contactDataShow = true;
    this.showContactForm = true;
    // this.campusCont.contactTypeValueId='';
    this.campusCont.contactTypeValueId = '';
    this.onSelect('Contact Type');
    this.option = 'Contact Type';
  };

  // ----- Add button functionality for adding address
addNewCampus(addressform: NgForm) {
  this.campusAdd = {};
  addressform.resetForm();
  this.campusAddNew = [];
  this.campusAdd.countryCode = 'IN';
  this.getStateDet(this.campusAdd.countryCode);
  this.campusAddNew.push(this.campusAdd);
  this.adBtnAddress = true;
  this.addressShow = true;
  this.showAddImagDisable = false;
  this.addressDataShow = true;
  this.showEditAddress = true;
}

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

  onSelect(option: string) {
    this.option = option;
    this.campusCont.contactInfo = '';

  }

  filter(val: string): string[] {
    return this.univList.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // ----- functionality for getting the state details with country details
  getStateDet(countryDet) {
    this.stateList = [];
    if (this.stateCacheList) {
      for (let i = 0; i < this.stateCacheList.length; i++) {
        if (this.stateCacheList[i].countryCode === countryDet) {
          this.stateList.push(this.stateCacheList[i]);
        }
      }
    }
    // console.log('stateList' + JSON.stringify(this.stateList));
    // this.createCampus.getStateList(this.countrySelect).subscribe(data => {
    //   this.stateList = data;
    //   console.log('stateList' + JSON.stringify(this.stateList));
    // });
  }

  // ----- functionality for getting the city details with state details
  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.createCampus.getCityList(this.stateSelect).subscribe(data => {
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

  // ---------------------------------campus--------------------------------//
  // CampusSubmit() {
  //   this.readonly=true;
  //   this.btnreadonly=true;
  //   console.log("Campus++++++++++++" + JSON.stringify(this.campus));
  //   console.log("enter" + JSON.stringify(this.campusAdd));
  //   console.log("enter" + JSON.stringify(this.campusCont));
  //   // ----campus create form
  //   this.campus['createUserId'] = '12345';

  //   this.createCampus.campusCreate(this.campus).subscribe(data => {

  //     this.campusData = data.data;
  //     alert(':::::::::::::::::::::' + JSON.stringify(this.campusData));
  //     if (data.status == 'success') {


  //     }
  //   },
  //     error => alert(error), () => console.log("done" + JSON.stringify(this.campusData))
  //   );
  //   // -------------campus create form end
  // }
  // --- edit functionality for campus data
  editCampusSubmit() {
    this.readonly = false;
    this.disableDate = false;
    this.btnedit = false;
    this.btnupdate = true;
    this.btncancel = true;
  }

  // --- cancel functionality for campus data
  cancelSubmit() {
    this.readonly = true;
    this.btnedit = true;
    this.btnupdate = false;
    this.btncancel = false;
    this.getCampus();
  }

  cancelCampsContact() {
    this.showContactForm = false;
    this.adBtncontact = false;
    this.getContact();
  }

  // ----- Update campus functionality
  updateCampusSubmit() {
    //  this.campus = this.campusDetails;
    delete this.campus['universityDetails'];
    delete this.campus.rating;
    delete this.campus.rank;
    delete this.campus.tier;
    delete this.campus.campusStatusValueId;
    // console.log('this.campus.establishedDate before:::'+ this.campus.establishedDate);
    const date = new Date();
    // this.campus.establishedDate = new Date(this.campus.establishedDate);
    // console.log('this.campus after:::'+ this.campus);
    // this.campus.establishedDate.setMinutes((date.getTimezoneOffset() * -1));
    if (this.attachmentName) {
      this.campus.logo = this.attachmentName;
    }
    console.log('this.campus.campusLogo; after:::' + this.campus.logo);
    console.log('this.campus.campusDetails; after:::' + JSON.stringify(this.campus));
    this.createCampus.updateCmps(this.campus).subscribe(data => {
      this.updatedCampusData = data;
      if (this.updatedCampusData) {
        this.toastr.success('Institute Profile Successfully Updated!', 'Success!');
        this.readonly = true;
        this.showAddImagDisable = true;
        this.btnedit = true;
        this.btnupdate = false;
        this.btncancel = false;
        this.adBtnAddress = false;
        console.log(JSON.stringify(this.showAddImagDisable));
      }
    },
      error => {
        this.toastr.error('invalid input parameters!', 'Oops!');
        console.log('error', error);
      });
  }
  // ---------------------------------campus--------------------------------//
  // ---------------------------------campus Addresss Start--------------------------------//

/**
 * Check Address Info Exist or not
 * @param {any} address All addresses
 * @param {any} campusAdd Cureent address
 * @returns boolean(true/false)
 * @memberof InstituteComponent
 */
  checkAddress(address: any, campusAdd: any) {
    if (address) {
      // console.log('my Address object::' + JSON.stringify(this.address));
      for (let i = 0; i < address.length; i++) {
        console.log( address[i].addressTypeValueId + '==' + campusAdd.addressTypeValueId);
        if(address[i].addressTypeValueId === campusAdd.addressTypeValueId ) {
          if (address[i].addressLine1 === campusAdd.addressLine1 &&
          address[i].cityId === campusAdd.cityId) {
          return false;
        }
      }
      }
    }
    return true;
  }

/**
 * function to validate the existing address for update
 * @param {*} address All address saved before
 * @param {*} campusAdd  current address edited
 * @returns true if no address already exist
 * @memberof InstituteComponent
 */
checkAddressUpdate(address: any, campusAdd: any) {
      if (address) {
      // console.log('my Address object::' + JSON.stringify(this.address));
        for (let i = 0; i < address.length; i++) {
          if (address[i].addressTypeValueId === campusAdd.addressTypeValueId ) {
              if (address[i].addressId !== campusAdd.addressId) {
                  if (address[i].addressLine1 === campusAdd.addressLine1 &&
                  address[i].cityId === campusAdd.cityId) {
                  return false;
               }
            }
          }
        }
      }
    return true;
  }



/** Creating Institute Address
 * @memberof InstituteComponent
 */
CampusAddressSubmit(event) {
  // disable the button
  event.target.disabled = true;
  // return true or False- check The address Info Existed or not
  console.log('add', this.address, this.campusAdd);
    const checkAddressInfo = this.checkAddress(this.address, this.campusAdd);
    if (checkAddressInfo) {
      this.campusId = this.loginData.campusId;
      console.log('addresssssss ---> ' + this.address.length);

      if (this.address.length === 0) {
        this.campusAdd.primaryInd = 'Y';
      } else {
        this.campusAdd.primaryInd = 'N';
      }

      const postdata = {
        campusId: this.campusId,
        addresses: this.campusAddNew,
      };

      postdata.addresses[0]['createUserId'] = this.loginData.userId;

      this.showEditAddress = false;
      console.log('post data ----> ' + JSON.stringify(postdata));
      this.createCampus.campAddCreate(postdata).subscribe(data => {
        event.target.disabled = true;
        this.campusaddData = data;
        this.toastr.success('Address successfully Created!', 'Success!');
        this.getAddress();
        this.adBtnAddress = false;
        this.campusAdd = {};
        this.showEditAddress = false;
        this.showAddImagDisable = true;
        this.campusAdd = {};
      },
        error => {
          this.toastr.error('Error While Creating!', 'Oops!');
          event.target.disabled = false;
        }
      );
      this.createCampus.getCampusAddList(this.loginData.campusId).subscribe((data: any) => {
        this.CampusAddList = data.data;
      });
      this.campusAddNew = [];
    } else {
      // If address Info Existed, throwing Error
      this.toastr.warning('Address Information Already Exits!', 'Alert!');
      event.target.disabled = false;
    }

  }

  /*******************Primary Address indication functionality starts****************************/
  primary(cmpData, k) {
    //  alert(JSON.stringify(cmpData));
    cmpData.primaryInd = 'Y';
    cmpData['campusId'] = this.loginData.campusId;
    for (let i = 0; i < this.address.length; i++) {
      if (i !== k) {
        if (this.address[i].primaryInd === 'Y' || this.address[i].primaryInd == null) {
          this.address[i].primaryInd = 'N';

          this.address[i].campusId = this.loginData.campusId;
          this.createCampus.updateCmpsAdd(this.address[i]).subscribe(data => {
            this.updatedAddData = data;
            // console.log('changed to no' + JSON.stringify(this.updatedAddData));
            console.log('changed to no' + JSON.stringify(this.updatedAddData));
            this.toastr.success('Marked Address as Primary!', 'Success!');
          });
        }
      }
    }
    delete this.address['cityDetails'];
    // console.log("changed to cmpData::::::::::::::;;" + JSON.stringify(this.address));
    this.createCampus.updateCmpsAdd(cmpData).subscribe(data => {
      this.updatedAddData = data;
      // this.toastr.success('Succesfully Updated!', 'Success!');
      this.address['cityDetails'] = {};
      this.getAddress();
      // console.log("changed to yes" + JSON.stringify(this.updatedAddData));
    });
  }

  /*******************Primary Address indication functionality ends****************************/

  // ---- edit address functionality
  editAddress(data, j) {

    data.campusId = this.loginData.campusId;
    // console.log('data to data ::::::::::::::;;' + JSON.stringify(data));
    this.campusAdd = {};
    this.campusAddNew = [];
    this.adBtnAddress = true;
    this.addressShow = true;
    this.campAdressId = this.loginData.campusId;
    this.campusAdd = data;
    this.getStateDet(data.countryCode);
    this.getCityDet(data.stateCode);
    // this.getPostalDet(data.cityName);
    // console.log('changed to cmpData::::::::::::::;;' + JSON.stringify(this.campusAdd));
    this.duplicateCampAddress = data;
    this.campusAddNew.push(this.campusAdd);
    this.btnaddressreadonly = true;
    this.addressDataShow = true;
    this.showEditAddress = true;
    this.showAddImagDisable = false;

  }

  // ---- cancel button functionality for Addresss
  cancelCampsAddress() {
    this.addressDataShow = false;
    this.showAddImagDisable = true;
    this.addressShow = false;
    this.getAddress();
    this.btnaddressreadonly = false;
    // this.campusAdd = this.duplicateCampAddress;
    this.adBtnAddress = false;
    this.showEditAddress = false;
    // console.log('dumy:' + JSON.stringify(this.duplicateCampAddress));
  }

  // ----- Update campus Address Functionality
  updateCampusAddressSubmit() {

    const checkAddressInfo = this.checkAddressUpdate(this.address, this.campusAdd);

    if(checkAddressInfo) {
    this.campusAdd.campusId = this.loginData.campusId;
    // this.campusAdd.primaryInd = 'N';
    this.campusAddDumy = this.campusAdd['cityDetails'];
    delete this.campusAdd['cityDetails'];
    if (this.campusAdd.postalId === '' || this.campusAdd.postalId === undefined || this.campusAdd.postalId == null) {
      this.campusAdd.postalId = null;
    } else {
      this.campusAdd.postalId = +this.campusAdd.postalId;
    }
    console.log('addresssssssssssss:::::::::::::', JSON.stringify(this.campusAdd));
    // this.campusAdd.postalId = +this.campusAdd.postalId;
    this.createCampus.updateCmpsAdd(this.campusAdd).subscribe(data => {
      console.log('Updated data' + JSON.stringify(data));
      this.campusAdd['cityDetails'] = this.campusAddDumy;
      this.getAddress();
      this.btnaddressreadonly = false;
      //  this.campusAdd['cityDetails'].cityName ='';
      this.updatedCampusData = data;
      this.showEditAddress = false;
      this.adBtnAddress = false;
      if (this.updatedCampusData) {
        this.toastr.success('Address Successfully Updated!', 'Success!');
        this.addressDataShow = false;
        this.addressShow = false;
        this.showAddImagDisable = true;

        console.log('my vod::' + JSON.stringify(this.updatedCampusData));
      }
    },
      error => {
        this.toastr.error('Error While Update!', 'Oops!');
        console.log('error', error);
      });
    } else {
      this.toastr.warning('Address Information Already Exits!', 'Alert!');
    }
    }

  // ---------------------------------campus Addresss End--------------------------------//
  // ---------------------------------campus Contact start--------------------------------//

  inArray(contact, campusCont) {
    if (contact) {
      for (let i = 0; i < contact.length; i++) {
        if (contact[i].campusContact.contactInfo === campusCont.contactInfo) {
          console.log('contacttttttt' + JSON.stringify(contact[i]));
          console.log('campusCont' + JSON.stringify(campusCont));
          return false;
        }
      }
    }
    return true;
  }

  inArrayUpdate(contact, campusCont) {
    for (let i = 0; i < contact.length; i++) {
   //   console.log('companyContactList' + JSON.stringify(programContactList[i]));
   //   console.log('companyCont' + JSON.stringify(companyCont));
      if (contact[i].campusContact.contactId !== campusCont.contactId) {
        if (contact[i].campusContact.contactInfo === campusCont.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }

  CampusContactSubmit(event) {
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.contact, this.campusCont);
    if (checkContactInfo) {
      this.campusId = this.loginData.campusId;
      const postCont = {
        campusId: this.campusId,
        contacts: this.campusContNew
      };
      postCont.contacts[0]['createUserId'] = this.loginData.userId;
      // if (this.campusData.campusId) {
      // if (this.campusId) {
      this.createCampus.campusContCreate(postCont).subscribe(data => {
        console.log('data.data' + JSON.stringify(data));
        event.target.disabled = true;
        this.campuscontData = data;
        if (this.campuscontData) {
          this.toastr.success('Contact Successfully Created!', 'Success!');
          this.contactShow = false;
          this.contactDataShow = false;
          this.showContactForm = false;
          this.getContact();
          this.adBtncontact = false;
          console.log(JSON.stringify(this.campuscontData));
        }
      },
        error => {
          this.toastr.error('errror while creating!', 'Oops!');
          event.target.disabled = true;
          console.log('error', error);
        });
      // }
      this.createCampus.getCampusContact(this.loginData.campusId).subscribe((data: any) => this.contactList = data.data);
      this.campusContNew = [];
    } else {
      this.toastr.warning('Contact Information Already Exits!', 'Alert!');
      event.target.disabled = false;
    }
  }

  // edit Campus Contact Submit
  editCampusContact(data, j) {
    this.showContactForm = true;
    this.adBtnAddress = true;
    this.campusCont = {};
    this.adBtncontact = true;
    this.campusAddNew = [];
    this.campusContNew = [];
    this.campContId = data.campusId;
    this.campusCont = data.campusContact;
    // this.campusContNew.push(this.campusCont);
    this.btnContactreadonly = true;
    this.contactDataShow = true;
    this.contactShow = true;
    if (this.campusCont.contactTypeValueId) {
      this.onSelect(this.campusCont.contactTypeValueId);
      this.option = this.campusCont.contactTypeValueId;
      // alert('thhhh' + this.option);
    }
  }

  // Updating the Campus Contact Submit
  updateCampusContactSubmit1() {
    const checkUpdateContactInfo = this.inArrayUpdate(this.contact, this.campusCont);
    if (checkUpdateContactInfo) {
      this.campusCont.campusId = this.loginData.campusId;
      this.campusCont.primaryInd = 'Y';
      this.createCampus.updateCampusContact(this.campusCont)
        .subscribe(
        data => {
          this.adBtncontact = false;
          this.showContactForm = false;
          this.adBtnAddress = false;
          this.showAddImagDisable = true;
          this.updatedCampusData = data;
          if (this.updatedCampusData) {
            this.contactShow = false;
            this.contactDataShow = false;
            this.getContact();
            this.toastr.success('Contact Successfully Updated!', 'Success!');
          }
        },
        error => {
          this.toastr.error('Error While Updating!', 'Oops!');
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Contact Information Already Exits!', 'Alert!');
      this.getContact();
    }
  }

  // ---------------------------------campus Contact End--------------------------------//

  // start campus uploads
  uploadDatasource(fileInput: any): void {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-campus-logo';
    if (this.campus.logo) {
      // deleting existing image
      this.uiAttachmentsService.deleteAttachment(this.campus.logo, this.containerName)
        .subscribe(
        data => {
          // this.toastr.success('Existed Campus Logo Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            (data: any) => {
              this.toastr.success('Institue Logo Successfully Uploaded!', 'Success!');
              console.log('dataimagesssssssssssssss' + JSON.stringify(data));
              console.log('data Name' + JSON.stringify(data.data.result.files.fileDetails[0].name));
              this.campus.logo = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.attachmentName =  this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error => {
              this.toastr.error('Error File Upload!', 'Oops!');
              console.log('error', error);
            });
        },
        error => {
          // this.toastr.error('Error File Deleting!', 'Oops!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Institute Logo Successfully Uploaded!', 'Success!');
              console.log('data' + JSON.stringify(data));
              console.log('data Name' + JSON.stringify(data.data.result.files.fileDetails[0].name));
              this.campus.logo = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.attachmentName = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error1 => {
              this.toastr.error('Error File Upload!', 'Oops!');
              console.log('error', error1);
            });
          console.log('error', error);
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
        .subscribe(
        (data: any) => {
          this.toastr.success('Institute Logo Successfully Uploaded!', 'Success!');
          console.log('data' + JSON.stringify(data));
          console.log('data Name' + JSON.stringify(data.data.result.files.fileDetails[0].name));
          this.campus.logo = this.apiEndPoint + 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' +
            data.data.result.files.fileDetails[0].name;
          this.attachmentName = this.apiEndPoint + 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' +
            data.data.result.files.fileDetails[0].name;
          this.formData = new FormData();
        },
        error => {
          this.toastr.error('Error File Upload!', 'Oops!');
          console.log('error', error);
        });
    }

  }

  uploadBrandLogo(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-campus-branding-image';
    if (this.campus.brandingImage) {
      this.uiAttachmentsService.deleteAttachment(this.campus.brandingImage, this.containerName)
        .subscribe(
        data => {
          // this.toastr.success('Existed Campus brandingImage Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            (data: any) => {
              this.toastr.success('Institute Branding Image Successfully Uploaded!', 'Success!');
              console.log('data success' + JSON.stringify(data));
              this.campus.brandingImage = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error => {
              this.toastr.error('Error File Upload!', 'Oops!');
              console.log('error', error);
            });
        },
        error => {
          // this.toastr.error('Error File Deleting!', 'Oops!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
            .subscribe(
            (data: any) => {
              this.toastr.success('Institute Branding Image Successfully Uploaded!', 'Success!');
              console.log('data success' + JSON.stringify(data));
              this.campus.brandingImage = this.apiEndPoint + 'Attachments/' +
                data.data.result.files.fileDetails[0].container + '/download/' +
                data.data.result.files.fileDetails[0].name;
              this.formData = new FormData();
            },
            error1 => {
              this.toastr.error('Error File Upload!', 'Oops!');
              console.log('error', error1);
            });
          // console.log('error', error);
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
        .subscribe(
        (data: any) => {
          this.toastr.success('Institute Branding Image Successfully Uploaded!', 'Success!');
          console.log('data success' + JSON.stringify(data));
          this.campus.brandingImage = this.apiEndPoint + 'Attachments/' +
            data.data.result.files.fileDetails[0].container + '/download/' +
            data.data.result.files.fileDetails[0].name;
          this.formData = new FormData();
        },
        error => {
          this.toastr.error('Error File Upload!', 'Oops!');
          console.log('error', error);
        });
    }

  }

  // end campus uploads
}
