import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../../services/company/MasterData/company/company.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { CookieService } from 'angular2-cookie/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UiAttachmentsService } from '../../../../services/shared/ui-attachments/ui-attachments.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  cityCacheList: any;
  AddressLookupArray: any[];
  cacheDataForLookup: any;
  readonly = true;
  btnreadonly = true;
  btnaddressreadonly = false;
  btnaddressreadonly1 = false;
  adBtnAddress = false;
  adBtncontact = false;
  btnContactreadonly = false;
  company: any = {};
  companyData: any;
  companySize: any = [];
  companyType: any;
  companyIndustryType: any;
  companyAddNew: any = [];
  companyContNew: any = [];
  companyAddList: any;
  companyId: any;
  companyaddData: any;
  companyAdd: any = {};
  contactList: any;
  countryList: any;
  companyList: any;
  ContactLookups: any;
  AddressLookup: any;
  companyCont: any = {};
  companyContData: any;
  stateSelect: any;
  citySelect: any;
  countrySelect: any;
  cityList: any;
  stateList: any;
  readonlyAddCountry = true;
  companyContactList: any;
  companydupContactList : any;
  companyAdressId; any;
  postalList: any;
  btnSaveReadonly: any;
  updateBtn = true;
  getCompanyContactDetails: any;
  disabled = false;
  showContactForm = false;
  readonlyAdd = false;
  showEditAddress = false;
  companyData1: any = [];
  updatedAddData: any;
  getCompanyAddDetails: any;
  getCompanyProfileDetails: any;
  showImagDisable = true;
  showAddImagDisable = true;
  showContactImagDisable = true;
  disableBtn = true;
  loginData: any;
  labelData: any;
  image: any = {};
  loadImg: any = {};
  formData: FormData = new FormData();
  containerName: string;
  apiEndPoint: any;
  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer,
    private uiAttachmentsService: UiAttachmentsService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private createCompany: CompanyService,
    private _http: Http,
    private lookupvalueService: LookupvalueService,
    private cookieService: CookieService) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   };
  }
  option: string;

  onSelect(option: string) {
    // alert('in');
    // this.companyCont.contactInfo = '';
    this.option = option;
  }
  autocompleListFormatter = (data: any) => {
    const html = `<span style='color:red'>${data.lookupValue}  </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
         console.log('loginnnnnnnn:::' + JSON.stringify(this.loginData ));

    this.apiEndPoint = AppSettings.API_ENDPOINT;
    // ----------service call to get dynamic labels list
    // this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // this.lookupData = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    this.cacheDataForLookup = JSON.parse(localStorage.getItem('cacheDataForLookup'));
    if (this.cacheDataForLookup) {
      this.cityCacheList = this.cacheDataForLookup.City;
    }
    this.onSelect = function (option: string) {
      // alert('out' + option);
      this.option = option;
    };
    this.createCompany.getCompanySizeLookup().subscribe(data => this.companySize = data); // getting company size data from look up table
    this.createCompany.getCompanyTypeLookup().subscribe(data => this.companyType = data); // getting company type data from look up table
    // getting industry type data from look up table
    this.createCompany.getCompanyIndustryLookup().subscribe(data => this.companyIndustryType = data);
    // getting country list data
    this.createCompany.getCountryList().subscribe(data => this.countryList = data);
    // getting contact list data
    this.createCompany.getContactLookup().subscribe(data => {
      this.ContactLookups = data;
    });
    // this.createCompany.getAddressLookup().subscribe(data => {
    //   this.AddressLookup = data;
    // });

    this.AddressLookup = this.lookupvalueService.getLookup('ADDRESS_TYPE_CODE');
    // convert program lookup to array
    this.AddressLookupArray = this.lookupvalueService.loadArrayLookups(this.AddressLookup);

    this.companyAdd.countryCode = 'IN';
    this.getStateDet(this.companyAdd.countryCode);

    // getting company contact details starts
    this.getCompanyContactDetails = function () {
      this.createCompany.getCompanyContact(this.loginData.companyId).subscribe(
        data => {
          this.companydupContactList = data.data;
          this.companyContactList = data.data;
          // console.log('companyContactList:::' + JSON.stringify(this.companyContactList));
        });
    };
    // getting company contact data details ends
    // getting company data details starts
    this.getCompanyProfileDetails = function () {
      this.createCompany.getCompanyProfileData(this.loginData.companyId).subscribe(
        data => {
          this.company = data.data[0];
          // console.log('--------' + JSON.stringify(this.company));
          this.disableBtn = true;
          this.btnSaveReadonly = true;
          this.btnreadonly = true;
          this.readonly = true;
          this.companyData1.push(this.companyData);

        });
    };

    // getting company data details ends
    this.getCompanyProfileDetails();
    // getting company address data details starts
    this.getCompanyAddDetails = function () {
      this.createCompany.getCompanyAddList(
        this.loginData.companyId).subscribe(data => {
          if (data.addressDetails) {
          this.companyAddList = data.addressDetails;
          } else {
            this.companyAddList = 0;
          }
          // this.companyAddList
          // console.log('companyadd' + JSON.stringify(this.companyAddList));
        });
    };
    // getting company address data details ends
    this.getCompanyAddDetails();
    this.getCompanyContactDetails();
  }

  // getting state data details starts
  getStateDet(countryDet) {
    this.countrySelect = countryDet;
    this.createCompany.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
  }
  // getting state data details ends
  // getting city data details starts

  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.createCompany.getCityList(this.stateSelect).subscribe(data => this.cityList = data);
  }
  // getting city data details ends
  // getting postal data details starts
  // getPostalDet(cityDet) {
  //   this.citySelect = cityDet;
  //   this.createCompany.getPostalList(this.citySelect).subscribe(data => {this.postalList = JSON.parse(data)});
  // }


  getPostalDet(cityDet) {
    this.citySelect = cityDet;
    // this.createCampus.getPostalList(this.citySelect).subscribe(data => this.postalList = data );
    this.createCompany.getPostalList(this.citySelect)
      .subscribe(
      data => {
        this.postalList = data;
        console.log('Campus++++++++++++' + JSON.stringify(this.postalList));
      },
      error => {
        console.log('error', error);
      });

  }
  // getting postal data details ends

  /******************edit campany strt************************** */
  editcompanySubmit() {
    this.readonly = false;
    this.updateBtn = false;
    this.btnSaveReadonly = true;
    this.showImagDisable = false;
    this.disableBtn = false;

  }
  /******************edit campany ends************************** */

  /******************update campany strt************************** */
  updateCompanySubmit() {
    console.log('Default intership Ind ----> ' + this.company.internshipInd);
    if (this.company.internshipInd == 'Y' || this.company.internshipInd == 'N') {
      delete this.company['rating'];
    this.company['companyId'] = this.loginData.companyId;
    this.createCompany.updateCompany(this.company).subscribe(data => {
      // this.updatedCampusData = data;
      this.updateBtn = true;
      this.disableBtn = true;
      this.readonly = true;
      this.btnreadonly = true;
      this.showImagDisable = true;
      if (data) {
        this.toastr.success('Company Profile Successfully Updated!', 'Success!');
        // alert('updated successfully');
      }
    },
      error => {
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      });

    } else {
      this.toastr.error('Select Internship offered field', 'Warning');
    }
    //  this.company['companyId'] =  this.companyData.companyId;
    //  this.getCompanyContactDetails();
  }
  /******************update campany end************************** */
  // cancel button functionality for total screen starts
  cancelCompanySubmit() {
    this.readonly = true;
    this.getCompanyProfileDetails();
    this.updateBtn = true;
    this.showImagDisable = true;
  }
  // cancel button functionality for total screen ends

  /********Total company Address details starts*******/
  // add functionality for  company starts
  addCompanyAddress(companyAddress: NgForm) {
    this.companyAdd = {};
    companyAddress.resetForm();
    this.companyAddNew = [];
    this.companyAdd.countryCode = 'IN';
    this.getStateDet(this.companyAdd.countryCode);
    this.companyAddNew.push(this.companyAdd);
    this.adBtnAddress = true;
    this.btnaddressreadonly = false;
    this.showEditAddress = true;
    this.showAddImagDisable = false;
  }
  // add functionality for  company starts
  // company address functionality starts
/**
 
 * Funcyion to validate address existence
 * @param {any} companyAddList
 * @param {any} companyAdd
 * @returns true if no address exist
 * @memberof CompaniesComponent
 */
inArraySave(companyAddList, companyAdd) {
    if (companyAddList) {
      for (let i = 0; i < companyAddList.length; i++) {
        if(companyAddList[i].addressTypeValueId === companyAdd.addressTypeValueId) {
        if (companyAddList[i].addressLine1 === companyAdd.addressLine1 &&
          companyAddList[i].cityId === companyAdd.cityId) {
          return false;
        }
      }
      }
    }
    return true;
  }

/**
 * Function to validate the address existence
 * 
 * @param {any} companyAddList 
 * @param {any} companyAdd 
 * @returns 
 * @memberof CompaniesComponent
 */
validateAddressUpdate(companyAddList, companyAdd) {
  if (companyAddList) {
    for (let i = 0; i < companyAddList.length; i++) {
      if(companyAddList[i].addressTypeValueId === companyAdd.addressTypeValueId) {
        if(companyAddList[i].addressId !== companyAdd.addressId) {
          if (companyAddList[i].addressLine1 === companyAdd.addressLine1 &&
            companyAddList[i].cityId === companyAdd.cityId) {
              return false;
            }
          }
        }
      }
    }
  return true;
}



  companyAddressSubmit(event) {
    event.target.disabled = true;
    const checkAddressInfo = this.inArraySave(this.companyAddList, this.companyAdd);
    console.log('this  is companyAddList' + this.companyAddList);
      if (this.companyAddList === 0 ) {
        this.companyAdd.primaryInd = 'Y';
      } else {
        this.companyAdd.primaryInd = 'N';
      }

    if (checkAddressInfo) {
      const postdata = {
        companyId: this.loginData.companyId,
        addresses: this.companyAddNew
      };

      console.log('this is post data ' + JSON.stringify(postdata));
      postdata.addresses[0]['createUserId'] = this.loginData.userId;
      // postdata.addresses[0]['primary'] = '123';

      console.log('fresre' + JSON.stringify(this.companyAddNew.contactTypeValueId));
      // this.btnaddressreadonly = true;
      if (postdata.companyId) {
        this.createCompany.companyAddCreate(postdata).subscribe((data: any) => {
          this.companyaddData = data;
          this.getCompanyAddDetails();
          this.toastr.success('Address Successfully Created!', 'Success!');
          this.showEditAddress = false;
          this.showAddImagDisable = true;
          event.target.disabled = true;
          if (data.id) {
            console.log(JSON.stringify(this.companyaddData));
          }
        },
          error => {
            this.toastr.error('Error whie Creating!', 'Oops!');
            event.target.disabled = false;
            console.log('error', error);
          });
      }
    } else {
      this.toastr.warning('Address Information Already Exists.', 'Alert!');
      event.target.disabled = false;
      // alert('Address Information Already Exists');
    }
  }
  // company address functionality ends

  // update company address functionality starts

  updateCompanyAddressSubmit() {
    // alert('hii');
    const addressInfoMatch = this.validateAddressUpdate(this.companyAddList, this.companyAdd);
    if(addressInfoMatch) {
    if (this.companyAdd.postalId === '' || this.companyAdd.postalId === undefined || this.companyAdd.postalId == null) {
      this.companyAdd.postalId = null;
    } else {
      this.companyAdd.postalId = +this.companyAdd.postalId;
    }

    this.companyAdd['companyId'] = this.loginData.companyId;
    // this.companyAdd.primaryInd = 'Y';
    delete this.companyAdd['cityDetails'];
    this.createCompany.updateCompanyAdd(this.companyAdd).subscribe(data => {
      this.showEditAddress = false;
      this.adBtnAddress = false;
      this.showAddImagDisable = true;
      this.toastr.success('Address Successfully Updated!', 'Success!');
      this.getCompanyAddDetails();
      this.showEditAddress = false;
    },
      error => {
        this.toastr.error('Error While Updating!', 'Oops!');
        console.log('error', error);
      });
    } else {
      this.toastr.warning('Address Information Already Exists.', 'Alert!');
    }
  }
  // update company address functionality ends





  // edit company address functionality starts

  editAddress(data, j) {
    this.companyAdd = {};
    this.companyAddNew = [];
    this.companyAdd.companyId = this.loginData.companyId;
    this.getStateDet(data.countryCode);
   this.getCityDet(data.stateCode);
    this.companyAdd = data;
    this.companyAddNew.push(this.companyAdd);
    this.btnaddressreadonly = true;
    this.showEditAddress = true;
    this.adBtnAddress = true;
    this.showAddImagDisable = false;

  }
  // edit company address functionality starts


  // cancel functionality for company address form starts
  cancelCompanyAddress() {
    this.showEditAddress = false;
    this.getCompanyAddDetails();
    this.adBtnAddress = false;
    this.showAddImagDisable = true;
  }
  // cancel functionality for company address form ends


  /*******************Primary Address indication functionality starts****************************/
  primary(cmpData, k) {
    console.log(JSON.stringify(cmpData));
    cmpData.primaryInd = 'Y';
    cmpData.companyId = this.loginData.companyId;
    for (let i = 0; i < this.companyAddList.length; i++) {
      if (i != k) {
        if (this.companyAddList[i].primaryInd == 'Y' || this.companyAddList[i].primaryInd == null) {
          this.companyAddList[i].primaryInd = 'N';
          this.companyAddList[i].companyId = this.loginData.companyId;
          delete this.companyAddList[i].cityDetails;
          this.createCompany.updateCompanyAdd(this.companyAddList[i]).subscribe(data => {
          this.updatedAddData = data;
          //  console.log('changed to no' + JSON.stringify(this.updatedAddData));
          this.toastr.success('Marked Address as Primary!', 'Success!');
          });
        }
      }
    }
    delete cmpData.cityDetails;
    this.createCompany.updateCompanyAdd(cmpData).subscribe(data => {
    this.updatedAddData = data;
   //   console.log('changed to yes' + JSON.stringify(this.updatedAddData));
    });
  }

  /*******************Primary Address indication functionality ends****************************/

  /********Total company Address details ends*******/

  /********Total company Contact details start*******/
  // adding contact starts
  addNewContact() {
    this.companyCont = {};
    this.companyContNew = [];
    this.companyCont.contactTypeValueId = '';
    this.companyContNew.push(this.companyCont);
    this.adBtncontact = true;
    this.showContactForm = true;
    this.btnContactreadonly = false;
    this.showContactImagDisable = false;
    this.onSelect('Contact Type');
    this.option = 'Contact Type';
    // alert('gfgg ' + this.option);
  }
  // adding contact ends
  // edit company contact functionality starts
  editCompanyContact(data, j) {
    this.companyCont = {};
    this.companyContNew = [];
    this.companyCont = data.companyContact;
    this.companyContNew.push(this.companyCont);
    this.btnContactreadonly = true;
    this.adBtncontact = false;
    this.showContactForm = true;
    this.showContactImagDisable = false;
    if (this.companyCont.contactTypeValueId) {
      this.onSelect(this.companyCont.contactTypeValueId);
      this.option = this.companyCont.contactTypeValueId;
      // alert('thhhh' + this.option);
    }
  }
  // edit company contact functionlity ends

  // cancel functionality for company contact form starts
  cancelCompanyContact() {
    this.showContactImagDisable = true;
    this.showContactForm = false;
    this.adBtncontact = true;
    this.getCompanyContactDetails();
    this.disableBtn = true;
    this.adBtncontact = false;
  }
  // cancel functionality for company contact form ends


  //  functionality for company contact submit form starts

  cultivoChange() {
    alert('gtggg');
  }

// func for not allowing duplicate contacts while saving starts
  inArray(companyContactList, companyCont) {
    for (let i = 0; i < companyContactList.length; i++) {
     // console.log('know objectttttt' + JSON.stringify(companyContactList[i]));
      if (companyContactList[i].companyContact.contactInfo === companyCont.contactInfo) {
        return false;
      }
    }
    return true;
  }
// func for not allowing duplicate contacts while saving ends


// func for not allowing duplicate contacts while updating starts
  inArrayUpdate(companyContactList, companyCont) {
    for (let i = 0; i < companyContactList.length; i++) {
   //   console.log('companyContactList' + JSON.stringify(companyContactList[i]));
   //   console.log('companyCont' + JSON.stringify(companyCont));
      if (companyContactList[i].companyContact.contactId !== companyCont.contactId) {
        if (companyContactList[i].companyContact.contactInfo === companyCont.contactInfo) {
          return false;
        }
      }
    }
    return true;
  }
// func for not allowing duplicate contacts while updating ends
 
  companyContactSubmit(event) {
    event.target.disabled = true;
    const checkContactInfo = this.inArray(this.companyContactList, this.companyCont);
    if (checkContactInfo) {
      const postCont = {
        companyId: this.loginData.companyId,
        contacts: this.companyContNew
      };
      console.log(JSON.stringify(this.companyContNew));
      postCont.contacts[0]['createUserId'] = this.loginData.userId;
      if (postCont.companyId) {
        // if (this.companyId) {
        this.createCompany.companyContCreate(postCont).subscribe((data: any) => {
          console.log('aftr create::::' + JSON.stringify(data));
          this.toastr.success('Contact Successfully Created!', 'Success!');
          this.companyContData = data;
          event.target.disabled = true;
          this.showContactForm = false;
          this.showContactImagDisable = true;
          // this.companyContNew = [];
          this.getCompanyContactDetails();
          if (data.id) {
          }
        },
          error => {
            this.toastr.error('Server Not Responding!', 'Oops!');
            event.target.disabled = false;
            console.log('error', error);
          });
      }
    } else {
      this.toastr.warning('Contact Information Already Exits.', 'Alert!');
      event.target.disabled = false;
    }
  }


  //  functionality for company contact submit form ends
// f
    // update functionality for company contact form starts
    updateCompanyContactSubmit() {
      const checkUpdateContactInfo = this.inArrayUpdate(this.companyContactList, this.companyCont);
      if (checkUpdateContactInfo) {
        this.companyCont.companyId = this.loginData.companyId;
        this.companyCont.primaryInd = 'Y';
        this.createCompany.updateCompanyContact(this.companyCont).subscribe(data => {
          console.log('Updated data' + JSON.stringify(data));
          this.disableBtn = true;
          // this.updatedCampusData = data;
          this.toastr.success('Contact Successfully Updated!', 'Success!');
          this.getCompanyContactDetails();
        },
          error => {
            this.toastr.error('Error While Updating!', 'Oops!');
            console.log('error', error);
          });
          this.adBtncontact = false;
          this.showContactForm = false;
          this.showContactImagDisable = true;
      } else {
        this.toastr.warning('Contact Information Already Exits.', 'Alert!');
      }
    }
    // update functionality for company contact form ends


  /*******Total company contact details ends*********/

  // start company uploads
  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    console.log('fileDetails success' + JSON.stringify(fileDetails));
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
    this.containerName = 'scora-company-logo';
    // alert(this.company.logo);
    if (this.company.logo) {
      // deleting existing image
      this.uiAttachmentsService.deleteAttachment(this.company.logo, this.containerName)
      .subscribe(
        data => {
          // this.toastr.success('Existed Campus Logo Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
          (data: any) => {
            // alert('company-logo uploaded Successfully');
            this.toastr.success('Company Logo Successfully Uploaded !', 'Success!');
          //  console.log('data' + JSON.stringify(data));
            this.company.logo = this.apiEndPoint + 'Attachments/' +
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
            this.toastr.success('Company Logo Successfully Uploaded !', 'Success!');
         //   console.log('data' + JSON.stringify(data));
            this.company.logo = this.apiEndPoint + 'Attachments/' +
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
        // alert('company-logo uploaded Successfully');
        this.toastr.success('Company Logo Successfully Uploaded !', 'Success!');
     //   console.log('data' + JSON.stringify(data));
        this.company.logo = this.apiEndPoint + 'Attachments/' +
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
    this.containerName = 'scora-company-branding-image';
    if (this.company.brandingImage) {
      this.uiAttachmentsService.deleteAttachment(this.company.brandingImage, this.containerName)
      .subscribe(
        data => {
          // this.toastr.success('Existed Campus brandingImage Successfully Deleted!', 'Success!');
          this.uiAttachmentsService.uploadAttachments(this.formData, this.containerName)
          .subscribe(
            (data: any) => {
                // alert('company-branding-image uploaded Successfully');
                this.toastr.success('Company Branding Image Successfully Uploaded !', 'Success!');
             //   console.log('data success' + JSON.stringify(data));
                this.company.brandingImage = this.apiEndPoint + 'Attachments/' +
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
                // alert('company-branding-image uploaded Successfully');
                this.toastr.success('Company Branding Image Successfully Uploaded !', 'Success!');
             //   console.log('data success' + JSON.stringify(data));
                this.company.brandingImage = this.apiEndPoint + 'Attachments/' +
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
            // alert('company-branding-image uploaded Successfully');
            this.toastr.success('Company Branding Image Successfully Uploaded !', 'Success!');
          //  console.log('data success' + JSON.stringify(data));
            this.company.brandingImage = this.apiEndPoint + 'Attachments/' +
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

  // end company uplods


}
