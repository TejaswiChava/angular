import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompensationPackageService } from '../../../../services/company/ControlData/compensation-package/compensation-package.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/core';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { id } from '@swimlane/ngx-charts/release/utils';
@Component({
  selector: 'app-compensation-package',
  templateUrl: './compensation-package.component.html',
  styleUrls: ['./compensation-package.component.css']
})
export class CompensationPackageComponent implements OnInit {
  checkStatusName: boolean;
  oldAmount: any;
  packageid: any;
  PackageItemName: any;
  flagForAdd: boolean;
  count: number;
  compensationList: any = [];
  typeValueList: any = [];
  placeCurrency: string;
  currencyData: any;
  allData: any;
  totalCompValue: number;
  disableStatus: boolean;
  // editStatus: boolean;
  enableStatus: boolean;
  addedComp: any;
  readonly = false;
  compensationPackage: any = {};
  compensationPackageItem: any = {};
  addCompensation: any;
  addPackage: any;
  displayStatus: boolean;
  compensationPkg: any = [];
  updateCompensationPkg: any = [];
  compensationPkgItem: any = [];
  getCmpPckgeLookup: any;
  CmpPckgLookups: any;
  showCompPckg = false;
  showTotalPckg = false;
  showPckg = false;
  addingStatus = true;
  compensationData: any;
  CmpApprovalLookups: any;
  CmpPckgsList: any;
  showEditDetails = false;
  packageDetails: any;
  compensationPackage1: any = {};
  compensation: any = {};
  getpackageList: any;
  CmpPckgsItemList: any = [];
  itemData: any;
  btnreadonly = false;
  itemListArray: any = [];
  addItems = false;
  updateItem = false;
  compenstionSubmitShow = false;
  compenstionUpdateShow = false;
  showPckgDetails = false;
  updateIndex: any;
  compensationUpdatedData: any;
  getPackageDetails: any;
  showAddPackage = false;
  cancelAddPackage = false;
  cancelItemPackage = false;
  PackageItem: any = [];
  updatePackageItem: any = [];
  data: any = [];
  deleteData: any = [];
  loginData: any;
  labelData: any;
  compArray: any = [];
  enableShow: boolean;
  read = true;
  CmpPckgCurrency: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'compPackageName';
  public sortOrder = 'asc';
  pckgAmount = 0;
  constructor(
    private router: Router,
    private cmpPckg: CompensationPackageService,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }
  ngOnInit(): void {
    this.placeCurrency = 'Currency';
    this.disableStatus = false;
    this.enableShow = false;
    this.enableStatus = false;
    this.compensationPackage.totalCompPkgValue = 0;
    this.totalCompValue = 0;
    this.loginData = this.cookieService.getObject('loginResponce');
    // ----------service call to get dynamic labels list
    // this.labelData = this.cookieService.getObject('labelData');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.allData = JSON.parse(localStorage.getItem('allData'));
    this.currencyData = this.allData.Currency;
    // ------- to get the compensation package lookup value
    this.cmpPckg.getCmpPckgeLookup().subscribe(data => this.CmpPckgLookups = data);
    // ------- to get the compensation package currency
    this.cmpPckg.getCmpPckgeCurrency().subscribe(data => this.CmpPckgCurrency = data);
    // ------- to get the Approval status value
    this.cmpPckg.getApprovalStatusLookup().subscribe(data => {
    this.CmpApprovalLookups = data;
      JSON.stringify(this.CmpApprovalLookups);
    });
    // ------- to get the compensation package list value
    this.getpackageList = function () {
      this.cmpPckg.getPckges(this.loginData.companyId).subscribe(data => {
        this.data = data.data;
      });
    };
    this.getpackageList();
    // -------------Add button functionality for total compensation package
    this.addCompensation = function (compensationPackageForm: NgForm) {
      this.addingStatus = false;
      this.enableShow = true;
      this.disableStatus = false;
      this.enableStatus = true;
      this.compenstionUpdateShow = false;
      this.compensationPkg = [];
      this.compensationPkgItem = [];
      this.updateCompensationPkg = [];
      this.PackageItem = [];
      this.compensationPackageItem = {};
      this.compensationPackage = {};
      this.showAddPackage = true;
      this.cancelAddPackage = true;
      this.showEditDetails = true;
      this.showTotalPckg = true;
      this.compenstionSubmitShow = false;
      this.adMain = true;
      this.labelData.currencyType = 'INR';
      this.btnreadonly = false;
      compensationPackageForm.resetForm();
    };
    this.addPackage = function (packageItemForm: NgForm) {
      this.displayStatus = true;
      this.updateItem = false;
      this.disableStatus = true;
      this.showPckg = true;
      this.showCompPckg = true;
      this.adMain = true;
      this.showPckgDetails = true;
      this.addItems = false;
      this.compensationPackageItem = {};
      packageItemForm.resetForm();
    };
  }
  addItem() {
    if (this.count === 2) {
      const packageName = this.getPackageItemName(this.packageid);
      this.toastr.warning('Package Item ' + packageName  + ' already Exist', 'Alert!');
    } else {
    this.updateItem = false;
    this.addItems = true;
    this.showPckg = false;
    this.showCompPckg = false;
    this.cancelAddPackage = true;
    this.showPckgDetails = false;
    this.showAddPackage = true;
    this.compensationPackageItem['companyId'] = this.loginData.companyId;
    this.compensationPackageItem['createUserId'] = this.loginData.userId;
    // this.compensationPackageItem['currencyCode'] = 'india';
    // console.log('addddd status', this.addingStatus);
    if (this.addingStatus) {
      this.compensationPackageItem['compPackageId'] = this.compensationPackage.compPackageId;
      this.compensationPackageItem['indicator'] = 'C';
      this.compensationPkgItem.push(this.compensationPackageItem);
          this.updateTotalCompValue(this.compensationPkgItem);
          this.disableStatus = true;
    } else {
      this.compensationPackage.totalCompPkgValue =
      Number(this.compensationPackage.totalCompPkgValue) + Number(this.compensationPackageItem.amount);
      this.compensationPkgItem.push(this.compensationPackageItem);
      this.updateTotalCompValue(this.compensationPkgItem);
      this.disableStatus = true;
    }
  }
  // when it becomes true , the compensationPackageTypeId should be validated  from compensationPkgItem array
  this.flagForAdd = true;
  }
  viewPckg(pckgData) {
    this.disableStatus = true;
    this.updatePackageItem = [];
    this.compensationPkgItem = [];
    this.itemListArray = [];
    this.itemData = {};
    this.showAddPackage = true;
    this.enableStatus = false;
    this.cancelAddPackage = true;
    this.compenstionSubmitShow = true;
    this.compenstionUpdateShow = false;
    this.compensationPackage = pckgData;
    this.getPackageDetails = function () {
      this.cmpPckg.getPckgItem(this.compensationPackage.companyId, this.compensationPackage.compPackageId)
        .subscribe(data => {
        this.CmpPckgsItemList = data.data;
        this.compensationList = data.data;
        // this.oldAmountPkgId = this.CmpPckgsItemList;
        // this.oldAmount = this.CmpPckgsItemList[0].amount;

        if (this.CmpPckgsItemList.length > 0) { this.disableStatus = true; }
          for (let i = 0; i < this.CmpPckgsItemList.length; i++) {
            this.itemData = this.CmpPckgsItemList[i];
            delete this.itemData['compensationPackage'];
            delete this.itemData.createDatetime;
            delete this.itemData.updateDatetime;
            this.disableStatus = true;
            this.itemData.indicator = 'I';
            this.compensationPkgItem.push(this.itemData);
            
          }
        });
    };
    this.getPackageDetails();
    this.showTotalPckg = true;
    this.showEditDetails = true;
    this.readonly = true;
    this.btnreadonly = true;
  }
/**
 *  function to check if the compensationType already exist.
 * validate the id from response with the id which is obtained on dropdown change
 * @param {any} id
 * @memberof CompensationPackageComponent
 */
checkForPackage(id) {

  if ( this.flagForAdd  ) {
    // after clicking on add button perform validations by this method.
    this.validatePackageType( id, this.compensationPkgItem);
} else {
  // Before clicking on add button perform validations by this method.
  this.validatePackageType(id, this.compensationList);
}
}
/**
 * function to validate the dropDown id with compensationTypeId from the response.

 * @param {any} id
 * @param {any} compensationList
 * @memberof CompensationPackageComponent
 */
validatePackageType(id, compensationList) {
  this.packageid = id;
  this.count = 1;
    for ( let i = 0; i < compensationList.length; i++) {
        if ( id ===  compensationList[i].compPackageTypeValueId ) {
            this.count ++;
          }
    }
  }
/**
 * Function to get the name of the selected Package  Item which will be displayed in toastr.
 * 
 * @param {any} id 
 * @returns 
 * @memberof CompensationPackageComponent
 */
getPackageItemName(id) {
  this.CmpPckgLookups.forEach((item) => {
    if ( id === item.lookupValueId) {
    this.PackageItemName = item.lookupValue;
    }
  });
  return this.PackageItemName;
}

  editItem(k) {
    this.updateIndex = k;
    this.showPckgDetails = true;
    this.showPckg = true;
    this.showCompPckg = true;
    this.addingStatus = true;
    this.addItems = true;
    this.updateItem = true;
    this.compensationPackageItem = this.compensationPkgItem[k];
    delete this.compensationPackageItem.createDatetime;
    delete this.compensationPackageItem.updateDatetime;
    //this.CmpPckgsItemList.amount;
    //console.log(this.compensationPackageItem.amount);
    this.oldAmount=this.compensationPackageItem.amount;
  }
  // ----------------------Cancel fucnctionality for compensation package
  cancelPckg() {
    this.enableShow = false;
    this.showAddPackage = false;
    this.showTotalPckg = false;
    this.cancelAddPackage = false;
    this.showEditDetails = false;
    // this.showTotalPckg = false;
    this.compensationPackage = {};
    this.compensationPkgItem = [];
    this.deleteData = [];
    this.getpackageList();
  }
  // ----------------------Cancel fucnctionality for compensation package Item
// clear compensation
clearCompensationPckg(compensationPackageForm: NgForm) {
    this.compensationPackageItem = {};
    this.compensationPkgItem = [];
    this.compensationPackage = {};
    if (this.compensationPkgItem.length === 0) { this.disableStatus = false; }
    compensationPackageForm.resetForm();
  }
  // clear compensation
  cancelPackageItem() {
    // alert(1);
    this.compenstionSubmitShow = true;
    this.compenstionUpdateShow = true;
    this.showPckgDetails = false;
    this.disableStatus = true;
    this.showPckg = false;
    this.showCompPckg = false;
    console.log(this.oldAmount);
    this.compensationPackageItem.amount=this.oldAmount;
    this.cmpPckg.getPckgItem(this.compensationPackage.companyId, this.compensationPackage.compPackageId)
      .subscribe((data: any) => { this.CmpPckgsItemList = data.data; });
  }
  // ------------------Update Functionality for Compensation Package Item Array
  updatePckgItem() {
   if (this.count > 2) {
   const packageName = this.getPackageItemName(this.packageid);
    this.toastr.warning('Package type ' + packageName + ' already Exist', 'Alert!');
   } else {
    this.showPckgDetails = false;
    this.showCompPckg = false;
    this.showPckg = false;
    // this.updateTotalCompValue(this.compensationPackageItem);
    this.compensationPackageItem['indicator'] = 'U';
    // console.log('this is for updating the data', this.compensationPackageItem);
    this.compensationPkgItem[this.updateIndex] = this.compensationPackageItem;
    this.updateTotalCompValue(this.compensationPkgItem);
    // this.updatePackageItem[this.updateIndex] = this.compensationPackageItem;
    // console.log('comp data is over hear', this.compensationPackageItem);
    // if (this.addingStatus) {
    //   this.compensationPackageItem['indicator'] = 'U';
    // }
    // this.compArray.push(this.compensationPackageItem);
    this.updateItem = false;
  }
}
  changePkagView(x) {
    // alert(x);
    if (x) {
      this.showCompPckg = false;
    } else {
      // this.showCompPckg = true;
    }
  }
  // -------------------- submit data ------------
  compensationSubmit(event) {
    event.target.disabled = true;
    this.removeDuplicates();
    this.compensationPkg[0] = this.compensationPackage;
    this.compensationPkg[0].companyId = this.loginData.companyId;
    this.compensationPkg[0].createUserId = this.loginData.userId;
    this.compensationPkg[0].compApprovalStatusValueId = 333;
    this.compensationPkgItem.totalCompPkgValue =
    JSON.stringify(this.compensationPkgItem.totalCompPkgValue);
     console.log('sdfhj' + JSON.stringify(this.compensationPkg));
    const postCompensation = {
      'companyId' : this.loginData.companyId,
      'compensationPkg': this.compensationPkg,
      'compensationPkgItem': this.compensationPkgItem
    };
    if(this.checkStatusName){
    this.cmpPckg.createCompensationPackage(postCompensation).subscribe(data => {
      console.log('compensationData' + JSON.stringify(data));
      event.target.disabled = true;
      this.compensationData = data;
      if (this.compensationData) {
        this.showTotalPckg = false;
        this.showEditDetails = false;
        this.cancelAddPackage =  false;
        this.showAddPackage = false;
        this.getpackageList();
        this.toastr.success('Compensation Package Saved Succesfully! ', 'Success!');
        this.compensationPackageItem = [];
      } else {
        this.toastr.success('Please Check the Details! ', 'Error!');
      }
    },
    error => {
      this.toastr.error('Server Not Found!', 'Error!');
      event.target.disabled = false;
    }
      // error => alert(error), () => console.log('done' + JSON.stringify(this.compensationData))
    );
  }else{
    event.target.disabled = false;
  }
 }
  editCompensation() {
  if (this.compensationPkgItem.length > 0) { this.disableStatus = true; }
  if (this.compensationPkgItem.length === 0) { this.disableStatus = false; }
  this.enableStatus = true;
  this.enableShow = true;
    this.readonly = false;
    this.addingStatus = true;
    this.compenstionUpdateShow = true;
    this.btnreadonly = false;
  }
  // ------------Update Total Compensation Package Data
  compensationUpdate() {
    delete this.compensationPackage['compensationPackageCompany'];
    delete this.compensationPackage['compensationPackageApprovalStatus'];
    delete this.compensationPackage.createDatetime;
    delete this.compensationPackage.updateDatetime;
    this.removeDuplicates();
    if(this.checkStatusName){
    if (this.compensationPackage.description != null) {
      this.updateCompensationPkg[0] = this.compensationPackage;
    } else {
      this.compensationPackage.description = '';
      this.updateCompensationPkg[0] = this.compensationPackage;
    }
    if (this.PackageItem !== '') {
      // console.log('234' + JSON.stringify(this.PackageItem));
      for ( let i = 0; i < this.PackageItem.length; i++) {
        if (this.PackageItem[i].description) {
          this.PackageItem[i].description =  (this.PackageItem[i].description) ? this.PackageItem[i].description : '';
        } else {
          this.PackageItem[i].description = '';
        }
      }
    }
    for ( let i = 0; i < this.compensationPkgItem.length; i++) {
      if (this.compensationPkgItem[i].description) {
        this.compensationPkgItem[i].description =  (this.compensationPkgItem[i].description) ? this.compensationPkgItem[i].description : '';
      } else {
        this.compensationPkgItem[i].description = '';
      }
    }
    console.log('this is comp value upadate for testing', this.compensationPkgItem);
    if (this.compensationPkgItem.length !== 0 ) {this.updateTotalCompValue(this.compensationPkgItem); }
    const updateData = {
      'companyId' : this.loginData.companyId,
      'compensationPkg': this.updateCompensationPkg,
      'compensationPkgItem': this.compensationPkgItem,
      'delete': this.deleteData
    };
    this.cmpPckg.updateCompensationPackage(updateData).subscribe(data => {
      console.log('compensation Updated Data' + JSON.stringify(data));
      this.compensationUpdatedData = data;
      if (this.compensationUpdatedData) {
        this.showTotalPckg = false;
        this.showEditDetails = false;
        this.cancelAddPackage = false;
        this.compensationPackageItem = [];
        this.compArray = [];
        this.compenstionUpdateShow = false;
        this.showAddPackage = false;
        this.PackageItem = [];
        this.updateCompensationPkg = [];
        this.deleteData = [];
        this.compensationPackage = {};
        this.getpackageList();
       this.toastr.success('Compensation Package Updated Successfully! ', 'Success!');
      } else {
        alert('Please check the Details');
      }
    },
      error => alert(error), () => console.log('done' + JSON.stringify(this.compensationData))
    );
  }
}
  deleteComp(comDetails, index) {
    console.log('deeeeeeelete area', index, comDetails);
    this.deleteData.push(this.compensationPkgItem[index].compPackageItemId);
    this.compensationPackage.totalCompPkgValue =
        Number(this.compensationPackage.totalCompPkgValue) - Number(this.compensationPkgItem[index].amount);
    this.compensationPkgItem.splice(index, 1);
    if (this.compensationPkgItem.length === 0) { this.disableStatus = false; }
  }
  updateTotalCompValue(totalArray) {
    this.compensationPackage.totalCompPkgValue = 0;
    for (let i = 0; i < totalArray.length; i++) {
      (this.compensationPackage.totalCompPkgValue) =
      Number(this.compensationPackage.totalCompPkgValue) + Number(totalArray[i].amount);
    }
  }
  removeDuplicates(){
    if(this.data.length === 0) {
      this.checkStatusName = true;
       }
    if (this.data.length > 0) {
      for (let k = 0; k < this.data.length; k++) {
        if(this.data[k].compPackageId!==  this.compensationPackage.compPackageId){
        if (this.data[k].compPackageName.toLowerCase() ===  this.compensationPackage.compPackageName.toLowerCase()) {
          this.toastr.warning('Compensation  Already Exist!', 'Alert!');
          this.checkStatusName = false;
          break;
        } else {
          this.checkStatusName = true;
        }
      } else {
        this.checkStatusName = true;
      }
    }
   }
  }
}
