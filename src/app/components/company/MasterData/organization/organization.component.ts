import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../../services/company/MasterData/organization/organization.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { userdata } from '../../../../../../../data';
import { PatternValidator } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import {
  AppSettings
} from '../../../../apiUrl';
import { NgForm } from '@angular/forms';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
import { json } from 'd3';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],

})
export class OrganizationComponent implements OnInit {
  selectedAddress: any;
  primaryCatch: any;
  checkStatusName: boolean;
  stateCacheList: any;
  countryCacheList: any;
  cityData: any;
  sampleCityData: any;
  orgId: any;
  addressLookupArray: any[];
  addOrd: any;
  organisation: any = [];
  org: any = {};
  orgAdd: any;
  orgAddr: any = {};
  orgsCont: any = {};
  orgAddData: any;
  orgContData: any;
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
  readonlyAddCountry = true;
  adBtnCnt = false;
  adMain = false;
  organisationAdd: any = [];
  organisationContNew: any = [];
  orgContact: any;
  organisationList: any;
  btnreadonly = false;
  readonly = false;
  updateOrganisationdata: any;
  updateOrganisationProfile: any;
  clickOrgDetails: any;
  orgAddressList: any = [];
  OrganAddress: any;
  updatedOrganAddressData: any;
  btnaddressreadonly = false;
  btnContactreadonly = false;
  totalOrgAdress: any;
  orgContactList: any;
  totalOrgContact: any;
  showEditDetails = false;
  showEditAddress = false;
  showEditContact = false;
  updateShow = false;
  data: any= [];
  loginData: any;
  getOrgList: any;
  showImagDisable = true;
  getOrgCont: any;
  getOrgAdd: any;
  btnedit = false;
  btnsave = false;
  updatedData: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  labelData: any;
  orgListDup:any=[];

  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  updatedAddData: any;
  apiEndPoint: any;
  constructor(private router: Router, private cmpOrg: OrganizationService, private uiAttachmentsService: UiAttachmentsService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookupvalueService: LookupvalueService,
    private viewContainerRef: ViewContainerRef,
    private cookieService: CookieService) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  option: string;
  onSelect(option: string) {
    this.option = option;
  }
  onBlur(option: string) {
    this.option = option;
  }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.apiEndPoint = AppSettings.API_ENDPOINT;
    // ----------service call to get dynamic labels list
    // this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.AddressLookup = this.lookupvalueService.getAddressLookup();
    this.loadAdderssArrayLookups();
    this.sampleCityData = JSON.parse(localStorage.getItem('allData'));
    this.cityData = this.sampleCityData.City;
    if (this.sampleCityData) {
      this.countryCacheList = this.sampleCityData.Country;
      this.stateCacheList = this.sampleCityData.State;
    }

    this.cmpOrg.getContactLookup().subscribe(data => this.ContactLookups = data);
    // this.cmpOrg.getAddressLookup().subscribe(data => this.AddressLookup = data);
    this.cmpOrg.getCountryList().subscribe(data => this.countryList = data);
    this.getOrgList = function () {
      this.cmpOrg.getOrganisationDetails(this.loginData.companyId).subscribe(data => {
        this.data = data['data'];
        this.copyorganizationlisttodupArray(this.data, this.orgListDup);
      });
    };
    this.getOrgList();
    this.getOrgAdd = function () {

      if (this.clickOrgDetails) {
        this.cmpOrg.getOrgAddressListByOrgID(
          this.loginData.companyId, this.clickOrgDetails.organizationId).subscribe(data => {

            this.orgAddressList = data.data;
            console.log('my deptContactList dept dataa after click::' + JSON.stringify(this.orgAddressList));
          });
      } else {
        this.cmpOrg.getOrgAddressListByOrgID(
          this.orgData.companyId, this.orgData.organizationId).subscribe(data => {
            this.orgAddressList = data.data;
            console.log('my deptContactList dept dataa after save::' + JSON.stringify(this.orgAddressList));
          });
      }
    };

    this.getOrgCont = function () {
      if (this.clickOrgDetails) {
        this.cmpOrg.getOrgContactListByOrgID(this.loginData.companyId, this.clickOrgDetails.organizationId)
        .subscribe((data: any) => { this.orgContactList = data.data; });
      } else {
        this.cmpOrg.getOrgContactListByOrgID(this.orgData.companyId, this.orgData.organizationId)
        .subscribe((data: any) => { this.orgContactList = data.data; });
      }
    };

    //  this.cmpOrg.getOrgAddressListByOrgID(this.loginData.companyId).subscribe(data =>{ this.orgAddressList = data.data});

    // this.getOrgAdd();
    // this.getOrgCont = function(){
    // this.cmpOrg.getOrgContactListByOrgID(this.loginData.companyId).subscribe(data =>{ this.orgContactList = data.data});
    // }
    // this.getOrgCont();
    this.addOrd = function () {
      this.adBtnAddress = true;
      this.adBtnCnt = true;
      this.organisation = [];
      this.orgs = {};
      this.orgAddressList = [];
      this.showEditAddress = false;
      this.orgContactList = [];
      this.showEditContact = false;
      this.showEditDetails = true;
      // console.log(this.org);
      this.organisation.push(this.org);
      this.adMain = true;
      this.btnreadonly = true;
      this.btnsave = true;
      this.btnedit = false;
      this.readonly = false;

    }
    this.orgAdd = function () {
      this.orgAddressList = [];
      this.orgAddr = {};
      this.orgAddr.countryCode = 'IN';
      this.getStateDet(this.orgAddr.countryCode);
      this.showEditAddress = true;
      this.organisationAdd = [];
      this.organisationAdd.push(this.orgAddr);
      this.adBtnAddress = true;
      this.btnaddressreadonly = false;

    }
    this.orgContact = function () {
      this.showEditContact = true;
      this.orgsCont = {};
      this.organisationContNew = [];
      this.orgsCont.contactTypeValueId = '';
      this.onSelect('Contact Type');
      this.option = 'Contact Type';
      this.organisationContNew.push(this.orgsCont);
      this.adBtnCnt = true;
      this.btnContactreadonly = false;
    }

  }
  copyorganizationlisttodupArray(TotalOrgData, DupOrgData){
    if (TotalOrgData.length > 0) {
      for (let k = 0; k < TotalOrgData.length; k++) {
        DupOrgData[k] = TotalOrgData[k];
      }
    }
  };
  getStateDet(countryDet) {
    this.countrySelect = countryDet;
    this.cmpOrg.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
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


  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.cmpOrg.getCityList(this.stateSelect).subscribe(data => {
      this.cityList = data;
      this.cityList.sort(function (a, b) {
        if (a.cityName < b.cityName) {return -1; }
        if (a.cityName > b.cityName) {return 1; }
        return 0;
      });
    });
  }

  // getPostalDet(cityDet) {
  //   this.citySelect = cityDet;
  //   this.cmpOrg.getPostalList(this.citySelect).subscribe(data => this.postalList = data);
  // }
  cancelOrg() {
    this.showEditDetails = false;
    this.adMain = false;
    this.organisation = [];
    this.readonly = true;
    this.getOrgList();
    this.filterQuery = '';
  }

  cancelOrgAdd() {
    this.adBtnAddress = false;
    this.showEditAddress = false;
    this.getOrgAdd();
  }

  cancelOrgCont() {
    this.adBtnCnt = false;
    this.showEditContact = false;
    this.getOrgCont();
  }
  OrgEdit(orgDetails) {
    this.btnsave = false;
    this.btnedit = true;
    this.btnreadonly = true;
    this.showEditDetails = true;
    this.readonly = true;
    this.organisation.push(this.org);
    this.adMain = true;
    this.clickOrgDetails = orgDetails;
    this.adBtnAddress = false;
    this.adBtnCnt = false;

    this.getOrgAdd();
    this.getOrgCont();
    this.orgs = this.clickOrgDetails;
  }
  editAddress(data, j) {
    this.adBtnAddress = true;
    this.showEditAddress = true;
    this.totalOrgAdress = data;
    this.getStateDet(data.organizationAddress.countryCode);
    this.getCityDet(data.organizationAddress.stateCode);
    this.orgAddr = data.organizationAddress;
    this.organisationAdd = [];
    this.organisationAdd.push(this.orgAddr);
    this.btnaddressreadonly = true;
    console.log(JSON.stringify(data));
    this.selectedAddress = data;
    console.log(JSON.stringify("Teja"+this.selectedAddress.primaryInd));

  }

  editContact(data, k) {
    this.adBtnCnt = true;
    this.showEditContact = true;
    this.totalOrgContact = data;
    this.orgsCont = data.organizationContact;
    this.organisationContNew = [];
    if (this.orgsCont.contactTypeValueId) {
      this.onSelect(this.orgsCont.contactTypeValueId);
      this.option = this.orgsCont.contactTypeValueId;

    }
    this.organisationContNew.push(this.orgsCont);
    this.option = this.orgsCont.contactTypeValueId;
    // alert(this.option);
    //  this.option = option
    this.btnContactreadonly = true;

  }
  onBlurMethod() {
    //  alert("this.option");
  }
  // --------------------Organisation Profile Start
  OrganisationSubmit(event) {
    event.target.disabled = true;
    this.orgs.companyId = this.loginData.companyId;
    this.orgs.createUserId = this.loginData.userId;
    if (this.data.length > 0) {
      for (let k = 0; k < this.data.length; k++) {
        if (this.data[k].name.toLowerCase() === this.orgs.name.toLowerCase()) {
          this.toastr.warning('Organization Already Exists!', 'Alert!');
          this.checkStatusName = false;
          event.target.disabled = false;
          break;
        } else {
          this.checkStatusName = true;
        }
      }
    } else {
      this.checkStatusName = true;
    }
    if (this.checkStatusName) {
    this.cmpOrg.orgCreate(this.orgs).subscribe((data: any) => {
      // console.log("Updated data' + JSON.stringify(data.data));
      event.target.disabled = true;
      this.orgData = data.data;
      this.btnedit = true;
      this.btnsave = false;
      this.adBtnCnt = false;
      this.adBtnAddress = false;
      // this.btnreadonly = false;
      this.btnreadonly = true;
      this.orgId = data.data.organizationId;
      this.toastr.success('Organization Successfully Created!', 'Success!');
      // if (data.status == 'success') {

      //   console.log(JSON.stringify(this.orgData));
      // }
    },
      error => {
        this.toastr.error('Server Not Found!', 'Oops!');
        event.target.disabled = false;
        console.log('error', error);
      });
    this.btnreadonly = true;
    this.readonly = true;
  }
}
  editOrganisationSubmit() {
    this.btnedit = false;
    this.readonly = false;
    this.btnreadonly = false;
  }
  cancelOrganisationSubmit() {
    this.readonly = true;
    this.btnreadonly = true;
    this.btnedit = true;
    console.log(this.orgs.organizationId);
    const organId = this.orgs.organizationId ? this.orgs.organizationId : this.orgId;
    this.cmpOrg.getOrgDetailsByOrgID(this.loginData.companyId, organId)
    .subscribe((data: any) => {
      this.orgs = data.data[0];
    });
    // this.getOrgList();
  }

  cancelOrgnazation(organisationform: NgForm) {
    this.orgs = {};
    organisationform.resetForm();
  }

  updateOrganisationSubmit() {
    // var postCampAdress = {
    //   campusId: this.campAdressId,
    //   // campusId: this.campusId,
    //    this.campusAdd
    // }
   console.log(JSON.stringify(this.orgs));
    if (this.orgListDup.length > 0) {
      for (let k = 0; k < this.orgListDup.length; k++) {
        if (this.orgListDup[k].organizationId !== this.orgs.organizationId) {
          if (this.orgListDup[k].name.toLowerCase() === this.orgs.name.toLowerCase()) {
            this.toastr.warning('Organization Already Exists!', 'Alert!');
            this.checkStatusName = false;
            // event.target.disabled = false;
            break;
          }
        } else {
          this.checkStatusName = true;
        }
      };
    }

    if (this.checkStatusName){
      if (this.clickOrgDetails) {
        this.orgs.companyId = this.loginData.companyId;
        this.orgs.organizationId = this.clickOrgDetails.organizationId;
      } else {
        this.orgs.companyId = this.loginData.companyId;
        this.orgs.organizationId = this.orgData.organizationId;
      }
  
      this.orgs.createUserId = this.loginData.userId;
   
      // this.campusAdd.primaryInd='Y';
      this.cmpOrg.updateOrganisationProfile(this.orgs).subscribe(data => {
        this.updateOrganisationdata = data;
        if (this.updateOrganisationdata) {
          this.updateShow = true;
          this.btnedit = true;
          this.readonly = true;
          this.btnreadonly = true;
          this.adBtnAddress = false;
          this.adBtnCnt = false;
          this.toastr.success('Organization Successfully Updated!', 'Success!');
          // alert('Organisation Data Updated');
        }
      },
        error => {
          this.toastr.error('Server Not Found!', 'Oops!');
          console.log('error', error);
        });
    }
    
  }

  validateAddressSave(orgAddressList, orgAddData) {
    if (orgAddressList) {
      for (let i = 0; i < orgAddressList.length; i++) {
        console.log('its undefined' + orgAddressList[i].organizationAddress.addressTypeValueId);
        console.log('its undefined2' + orgAddData.addressTypeValueId);
        if(orgAddressList[i].organizationAddress.addressTypeValueId === orgAddData.addressTypeValueId) {
         if (orgAddressList[i].organizationAddress.addressLine1 === orgAddData.addressLine1 &&
          orgAddressList[i].organizationAddress.cityId === orgAddData.cityId) {
          return false;
        }
      }
      }
    }
    return true;
  }


  validateAddressUpdate(orgAddressList, orgAddData) {
    if (orgAddressList) {
      for (let i = 0; i < orgAddressList.length; i++) {
        console.log('its undefined' + orgAddressList[i].organizationAddress.addressTypeValueId);
        console.log('its undefined2' + orgAddData.addressTypeValueId);
        if(orgAddressList[i].organizationAddress.addressTypeValueId === orgAddData.addressTypeValueId) {
          if(orgAddressList[i].organizationAddress.addressId !== orgAddData.addressId) {
          if (orgAddressList[i].organizationAddress.addressLine1 === orgAddData.addressLine1 &&
          orgAddressList[i].organizationAddress.cityId === orgAddData.cityId) {
          return false;
        }
      }
    }
      }
    }
    return true;
  }


  // --------------- Organisation Address
  OrganisationAddressSubmit(event) {
      console.log('------------------------------------------>AddressLIST' + JSON.stringify(this.orgAddressList));
      console.log('------------------------------------------>orgAddr' + JSON.stringify(this.orgAddr));
      const validateAddress = this.validateAddressSave(this.orgAddressList, this.orgAddr);
     console.log('this is validateAddress' + validateAddress);
  // const validateAddress = true;
    if(validateAddress) {
    event.target.disabled = true;
    if (this.clickOrgDetails) {
      this.orgAddr.companyId = this.loginData.companyId;
      this.orgAddr.organizationId = this.clickOrgDetails.organizationId;
    } else {
      this.orgAddr.companyId = this.loginData.companyId;
      this.orgAddr.organizationId = this.orgData.organizationId;
    }
    
    if (this.orgAddressList.length === 0) {
      this.orgAddr.primaryInd = 'Y';
    } else {
      this.orgAddr.primaryInd = 'N';
    }
    if (this.orgAddr.postalId === '' || this.orgAddr.postalId === undefined || this.orgAddr.postalId == null) {
      this.orgAddr.postalId = null;
    } else {
      this.orgAddr.postalId = +this.orgAddr.postalId;
    }
  //  this.orgAddr.companyId=this.loginData.companyId;
    this.orgAddr.createUserId = this.loginData.userId;
 //   this.orgAddr.organizationId=this.orgData.organizationId;
    console.log('++++',JSON.stringify(this.orgAddr));
    this.cmpOrg.orgAddCreate(this.orgAddr).subscribe(data => {
      // console.log('Org Add data' + JSON.stringify(data));
      event.target.disabled = true;
      this.orgAddData = data;
      console.log('------>this is orgAddDATA' + JSON.stringify(this.orgAddData));
      console.log('tjis is address list' + JSON.stringify(this.orgAddressList));
      this.toastr.success('Address Successfully Created!', 'Success!');
      this.getOrgAdd();
      this.showEditAddress = false;
      if (this.orgAddData) {
        this.adBtnAddress = false;


        console.log(JSON.stringify(this.orgAddData));
      }
    },
      error => {
        this.toastr.error('Server Not Found', 'Oops!');
        event.target.disabled = false;
        console.log('error', error);
      });
    } else {
      this.toastr.warning('Address Information Already Exists.', 'Alert!');
      event.target.disabled = false;
    }
  }


  updateOrganisationAddressSubmit() {
   
    const validateAddress = this.validateAddressUpdate(this.orgAddressList, this.orgAddr);
   
    if(validateAddress) {
    this.showEditAddress = false;

    this.orgAddr.organizationId = this.totalOrgAdress.organizationId;
    this.orgAddr.companyId = this.totalOrgAdress.companyId;
    console.log(this.orgAddr.postalId);
    if (this.orgAddr.postalId === '' || this.orgAddr.postalId === undefined || this.orgAddr.postalId == null) {
      this.orgAddr.postalId = null;
    } else {
      this.orgAddr.postalId = +this.orgAddr.postalId;
    }

if (this.selectedAddress.primaryInd === 'Y') {
    this.orgAddr.primaryInd = 'Y';
} else {
  this.orgAddr.primaryInd = this.totalOrgAdress.primaryInd;
}
    console.log('dsddddd', JSON.stringify(this.orgAddData));
    this.orgAddr.addressId = this.totalOrgAdress.addressId;

   // console.log('submitted data :::::::::::::::::::::;' + JSON.stringify(this.orgAddr));
    this.cmpOrg.updateOrganisationAddress(this.orgAddr).subscribe((data: any) => {
      console.log('Updated data' + JSON.stringify(data));
      this.updatedOrganAddressData = data.data;
  //    if (this.updatedOrganAddressData) {
        this.adBtnAddress = false;
        this.showEditAddress = false;
        this.btnreadonly = true;
        this.btnedit = true;
        this.readonly = true;
        this.toastr.success('Address Successfully Updated!', 'Success!');
        this.getOrgAdd();
       // console.log('my vod::' + JSON.stringify(this.updatedOrganAddressData));
   //   }
    },
      error => {
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      });
  } else {
    this.toastr.warning('Address Information Already Exists.', 'Alert!');
  }
    }


  /*******************Primary Address indication functionality starts****************************/
  primary(cmpData, k) {
    console.log(JSON.stringify(cmpData));
    cmpData.organizationAddress.primaryInd = 'Y';

    console.log('sus' + JSON.stringify(this.orgAddressList));
    for (let i = 0; i < this.orgAddressList.length; i++) {
      if (i != k) {
        if (this.orgAddressList[i].organizationAddress.primaryInd == 'Y' || this.orgAddressList[i].organizationAddress.primaryInd == null) {
          this.orgAddressList[i].organizationAddress.primaryInd = 'N';
          this.orgAddressList[i].organizationAddress.organizationId = this.orgAddressList[i].organizationId;
          this.orgAddressList[i].organizationAddress.companyId = this.loginData.companyId;
          this.cmpOrg.updateOrganisationAddress(this.orgAddressList[i].organizationAddress).subscribe(data => {
            this.updatedAddData = data;
            this.primaryCatch = this.orgAddressList[i];
            this.getOrgAdd();
          });
        }

      }

    }

    this.toastr.success('Marked Address as Primary!', 'Success!');

    // delete this.orgAddressList['cityDetails'];
    cmpData.organizationAddress.organizationId = cmpData.organizationId;
    cmpData.organizationAddress.companyId = this.loginData.companyId;
    // console.log("changed to cmpData::::::::::::::;;" + JSON.stringify(this.orgAddressList));
    this.cmpOrg.updateOrganisationAddress(cmpData.organizationAddress).subscribe(data => {
      this.updatedAddData = data;
      
    //  this.toastr.success('Marked Address as Primary!', 'Success!');
      this.orgAddressList['cityDetails'] = {};
      // /  this.getorgAddressList();
      // console.log("changed to yes" + JSON.stringify(this.updatedAddData));
    });
    console.log(this.getOrgAdd);
    }

  /*******************Primary Address indication functionality ends****************************/


  /******func for not allowing duplicate contacts while saving starts********/  
  inArray(orgContactList, orgsCont) {
    console.log('aaaaa' + JSON.stringify(orgContactList));
    console.log('ccccc' + JSON.stringify(orgsCont));
    for (let i = 0; i < orgContactList.length; i++) {
      console.log('know objectttttt' + JSON.stringify(orgContactList[i]));
      if (orgContactList[i].organizationContact.contactInfo === orgsCont.contactInfo) {
        return false;
      }
    }
    return true;
  }
  /******func for not allowing duplicate contacts while saving ends********/  


  // func for not allowing duplicate contacts while updating starts
  inArrayUpdate(orgContactList, orgsCont) {
    for (let i = 0; i < orgContactList.length; i++) {
      console.log('companyContactList' + JSON.stringify(orgContactList[i]));
      console.log('companyCont' + JSON.stringify(orgsCont));
      if (orgContactList[i].organizationContact.contactId !== orgsCont.contactId) {
        if (orgContactList[i].organizationContact.contactInfo === orgsCont.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }

// func for not allowing duplicate contacts while updating ends


  // ---------------- Organisation Contact
  OrganisationContactSubmit(event) {
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.orgContactList, this.orgsCont);
    if (this.clickOrgDetails) {
      this.orgsCont.companyId = this.loginData.companyId;
      this.orgsCont.organizationId = this.clickOrgDetails.organizationId;
    } else {
      this.orgsCont.companyId = this.loginData.companyId;
      this.orgsCont.organizationId = this.orgData.organizationId;
    }
    if (checkContactInfo) {
      // this.orgsCont.companyId=this.loginData.companyId;
      this.orgsCont.createUserId = +this.loginData.userId;
      this.orgsCont.contactTypeValueId = this.orgsCont.contactTypeValueId;
      this.orgsCont.primaryInd = 'N';
      // this.orgsCont.organizationId=this.orgData.organizationId;
      console.log('++++', JSON.stringify(this.orgsCont));
      this.cmpOrg.orgContCreate(this.orgsCont).subscribe(data => {
        console.log('Org Cont data' + JSON.stringify(data));
        event.target.disabled = true;
        this.orgContData = data;
        this.showEditContact = false;
        this.adBtnCnt = false;
        this.toastr.success('Contact Successfully Created!', 'Success!');
        this.getOrgCont();
      },
        error => {
          this.toastr.error('Server Not Responding!', 'Oops!');
          event.target.disabled = false;
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Contact Information Already Exits.', 'Alert!');
      event.target.disabled = false;
    }

  }

  updateOrganisationContactSubmit() {
    this.orgsCont.createUserId = this.loginData.userId;
    this.orgsCont.primaryInd = 'Y';

    const checkContactInfo = this.inArrayUpdate(this.orgContactList, this.orgsCont);
    if (checkContactInfo) {
      this.orgsCont.contactId = this.totalOrgContact.contactId;
      this.orgsCont.organizationId = this.totalOrgContact.organizationId;
      this.orgsCont.companyId = this.totalOrgContact.companyId;
      console.log('++++', JSON.stringify(this.orgsCont));
      this.cmpOrg.updateOrganisationContact(this.orgsCont).subscribe(data => {
        this.showEditContact = false;
        this.adBtnCnt = false;
        this.getOrgCont();
        this.updatedData = data;
        this.toastr.success('Contact Successfully Updated!', 'Success!');
      //  if (this.updatedData) {
     //   }
      },
        error => {
          this.toastr.error('Error While Updating!', 'Oops!');
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Contact Information Already Exits.', 'Alert!');
    }

  }

  // start campus uploads
  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-organization-logo';
    if (this.orgs.logo) {
      // deleting existing image
      this.uiAttachmentsService.deleteAttachment(this.orgs.logo, this.containerName)
      .subscribe(
        data => {
          // this.toastr.success('Existed Campus Logo Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            // alert('organization-logo uploaded Successfully');
            this.toastr.success('Organization Logo Successfully Uploaded !', 'Success!');
             console.log('imgg data' + JSON.stringify(data));
            this.orgs.logo = this.apiEndPoint + 'Attachments/' +
              data.data.result.files.fileDetails[0].container + '/download/' +
              data.data.result.files.fileDetails[0].name;
            this.formData = new FormData();
          },
          error => {
            this.toastr.error('Error File Upload!', 'Oops!');
            console.log('error', error);
          });
        },
        error =>  {
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            // alert('company-logo uploaded Successfully');
            this.toastr.success('Organization Logo Successfully Uploaded !', 'Success!');
         //   console.log('data' + JSON.stringify(data));
            this.orgs.logo = this.apiEndPoint + 'Attachments/' +
              data.data.result.files.fileDetails[0].container + '/download/' +
              data.data.result.files.fileDetails[0].name;
            this.formData = new FormData();
          },
          error1 => {
            this.toastr.error('Error File Upload!', 'Oops!');
            console.log('error', error1);
          });
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
      .subscribe(
      (data: any) => {
        // alert('organization-logo uploaded Successfully');
        this.toastr.success('Organization Logo Successfully Uploaded !', 'Success!');
        // console.log('data' + JSON.stringify(data));
        this.orgs.logo = this.apiEndPoint + 'Attachments/' +
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
    this.containerName = 'scora-organization-branding-image';
    if (this.orgs.brandingImage) {
      this.uiAttachmentsService.deleteAttachment(this.orgs.brandingImage, this.containerName)
      .subscribe(
        data => {
          // this.toastr.success('Existed Campus brandingImage Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            // alert('organization-branding-image uploaded Successfully');
            this.toastr.success('Organization Branding image Successfully Uploaded !', 'Success!');
            // console.log('data success' + JSON.stringify(data));
            this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
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
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            // alert('company-logo uploaded Successfully');
            this.toastr.success('Organization Branding Successfully Uploaded !', 'Success!');
         //   console.log('data' + JSON.stringify(data));
            this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
              data.data.result.files.fileDetails[0].container + '/download/' +
              data.data.result.files.fileDetails[0].name;
            this.formData = new FormData();
          },
          error1 => {
            this.toastr.error('Error File Upload!', 'Oops!');
            console.log('error', error1);
          });
        });
    } else {
      this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
      .subscribe(
      (data: any) => {
        // alert('organization-branding-image uploaded Successfully');
        this.toastr.success('Organization Branding image Successfully Uploaded !', 'Success!');
        // console.log('data success' + JSON.stringify(data));
        this.orgs.brandingImage = this.apiEndPoint + 'Attachments/' +
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

  // end campus uplods

}
