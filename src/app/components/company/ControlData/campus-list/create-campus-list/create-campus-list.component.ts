import { values } from 'd3';
// import { debug } from 'util';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CampusListService } from '../../../../../services/company/ControlData/campusList/campus-list.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-campus-list',
  templateUrl: './create-campus-list.component.html',
  styleUrls: ['./create-campus-list.component.css'],
})
export class CreateCampusListComponent implements OnInit, OnChanges {
 
  packages = new FormControl();
 
  checkStatusName: boolean;
  campusListNames: any;
  @Input() clickedCampusList;
  @Input() getCListStatus;
  @Output() getCListStatusChange = new EventEmitter<boolean>();
  // @Input() aftersave;
  // @Output() aftersaveChange = new EventEmitter<boolean>();
  employerCampusList: any = {};
  compensationPackages: any = [];
  jobRoles: any;
  listData: any = [];
  lableList: any;
  loginData: any;
  labelData: any;
  CmpApprovalLookups: any;
  campusListForm: FormGroup;
  AddCompensationForm: FormGroup;
  getJobRoles: any;
  compensationDataSelect: any = [];
  compensationData: any = {};
  btnCompensation = false;
  btnCollege = false;
  campusData: any = [];
  campusDataSelect: any = [];
  campusListResponce: any;
  selectedCompensationData: any = [];
  selected = false;
  headerResponse: any;
  empDetailsResponce: any;
  compPackageResponce: any;
  compPackageArray: any = [];
  PackageArray: any = [];
  compensationPackage: any = [];
  selectedList = false;
  updateCampusDet: any = [];
  arrayDisp: any = [];
  sendNewCompPckg: any = [];
  addedNewCompPckgData: any;
  addedNewCampData: any;
  btnSubmit = false;
  statusReadOnly = true;
  readonly = false;
  btnEdit = false;
  label001 = [];
  newData: any = [];
  // list = true;
  constructor(
    private campusList: CampusListService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    // private cListSearch: CampusListSearchComponent
  ) {
    this.loginData = this.cookieService.getObject('loginResponce');
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.createForm();
    this.compensationForm();
  }
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  updatedCampusListResponse: any;
  addNewCompensationDataInEdit: any = [];

  ngOnInit() {
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // ------getting compensation package  details
    this.campusList
      .getCompensationPckg(this.loginData.companyId)
      .subscribe(data => {
        this.compensationPackages = data;
      });
    // ------getting Job Role  details
    this.getJobRoles = function() {
      this.campusList.getJobRole(this.loginData.companyId).subscribe(data => {
        this.jobRoles = data.data;
      });
    };
    this.getJobRoles();
    // ------- to get the Approval status value
    this.campusList.getApprovalStatusLookup().subscribe(data => {
      this.CmpApprovalLookups = data;
    });
 console.log('------->' + this.AddCompensationForm.value.compPackageId);
  }

  createForm() {
    this.campusListForm = this.fb.group({
      companyId: this.loginData.companyId,
      jobRoleId: '',
      listName: '',
      description: '',
      compApprovalStatusValueId: 333,
      createUserId: this.loginData.userId,
      updateUserId: '',
      listId: ''
    });
  }
  compensationForm() {
    this.AddCompensationForm = this.fb.group({
      compPackageId: ''
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.getCListStatus) {
    //   const status = this.getCListStatus ;
    //   this.statusCheck = status;
    //   this.statusCheckChange.emit(status);
    //   alert(status );
    // }
    this.campusList.getCompanyCampusListDetails(this.loginData.companyId).subscribe(data => {
      this.campusListNames = data;
      console.log('campusListNamessssssssssss' + data['data'].listName);
    });
    if (this.clickedCampusList) {
      this.btnEdit = true;
      this.readonly = true;
      this.btnSubmit = true;
      this.campusList
        .getCListHeaderDetails(this.clickedCampusList.listId)
        .subscribe((data: any) => {
          this.headerResponse = data.data[0];
          this.campusListForm.patchValue(this.headerResponse);
        });
      this.campusList
        .getCListDtls(this.clickedCampusList.listId)
        .subscribe((data: any) => {
          this.empDetailsResponce = data.data;
          this.selectedList = true;
        });
      this.campusList
        .getCompPackage(this.clickedCampusList.listId)
        .subscribe((data: any) => {
          this.compPackageResponce = data.data;
          // console.log('asdfgh' + JSON.stringify(this.compPackageResponce));
          for (let i = 0; i < this.compPackageResponce.length; i++) {
            delete this.compPackageResponce[i].employerCampusListCompPkgCompany;
            delete this.compPackageResponce[i]
              .employerCampusListCompPkgEmployerCampusListHdr;
            delete this.compPackageResponce[i].startDate;
            delete this.compPackageResponce[i].endDate;
            delete this.compPackageResponce[i].createDatetime;
            delete this.compPackageResponce[i].updateDatetime;
            const compPackage = this.compPackageResponce[i];
            this.compPackageArray.push({ compPackageId: compPackage });
            this.PackageArray.push(compPackage);
            // console.log('abhi' + JSON.stringify(this.PackageArray));
          }
          for (let j = 0; j < this.PackageArray.length; j++) {
            this.arrayDisp.push(
              this.PackageArray[j].employerCampusListCompPkgCompensationPkg
            );
            delete this.PackageArray[j]
              .employerCampusListCompPkgCompensationPkg;
            this.compensationPackage.push(this.PackageArray[j]);
            // console.log('csdf1 Comp details' + JSON.stringify(this.arrayDisp));
            // console.log('csdf2' + JSON.stringify(this.compensationPackage));
          }
          // console.log('csdf' + JSON.stringify(this.arrayDisp));
          this.btnCompensation = true;
          this.selectedCompensationData = this.arrayDisp;
          // console.log('lkjhg' + JSON.stringify(this.compensationPackage));
          for (let i = 0; i < this.selectedCompensationData.length; i++) {
            const pckgId = this.selectedCompensationData[i].compPackageId;
            // console.log('zxcv -' + pckgId);
            const index = this.compensationPackages.findIndex(
              data => data.compPackageId === pckgId
            );
            // console.log('iiiiiiiiiiiii' + index);
            this.compensationPackages.splice(index, 1);
            // console.log('12345' + JSON.stringify(this.compensationPackages));
          }
        });
    }
  }
  deleteComp(comDetails, index) {

    this.selectedCompensationData.splice([index], 1);
     this.newData.push(comDetails);
   // function to add in the select view after delete
   const duplicate = this.stopPackageDuplicates(comDetails);
   const duplicateSelected = this.compensationPackages.findIndex(

    data =>  data.compPackageId  === comDetails.compPackageId
  );
  if(duplicateSelected > -1) {
      this.compensationPackages.splice(duplicateSelected , 1);
  }
   if(duplicate) {
     this.compensationPackages.unshift(comDetails);
   }
    this.deselect( comDetails );
  }

  stopPackageDuplicates(comDetails) {
    const duplicate = this.selectedCompensationData.findIndex(
      data => data.compPackageId === comDetails.compPackageId
    );
    if( duplicate === -1 ) {
      return true;
    } else {
      return false;
    }
  }

  deselect(topping) {
    // Remove from form control value
    const value = this.AddCompensationForm.value.compPackageId;
    const selectedIndex = value && value.indexOf(topping);
    if (selectedIndex > -1) {
      const newCompValue = value.slice();
      if (newCompValue) {
        newCompValue.splice(selectedIndex, 1);
      this.AddCompensationForm.setValue({
        compPackageId : newCompValue
      });
    }
    }

  }

  cancelClist(status) {
    this.getCListStatus = status;
    this.getCListStatusChange.emit(this.getCListStatus);
    this.router.navigated = false;
        // for (let i = 0; i < this.compensationPackage.length; i++) {
    //   if (comDetails.compPackageId === this.compensationPackage[i].compPackageId) {
    //       this.campusList.deleteComp(this.compensationPackage[i].listCompPkgId).subscribe(data => {
    //         this.toastr.success('Compensation Deleted Sucessfully');
    //       });
    //   }
    // }

    this.router.navigate([this.router.url]);
  }
  cancelCampusList() {
    this.campusListForm.reset({
      listName: '',
      jobRoleId: '',
      description: ''
    });
    this.btnCompensation = false;
    this.btnCollege = false;
    this.selectedCompensationData = [];
  }

  editCampusList() {
    this.btnEdit = false;
    this.readonly = false;
    this.btnCompensation = true;
  }
  addCollege() {
    // alert(123);
    this.btnCollege = true;
  }

  // compensationSelect(event, data) {
  //   if (event.isTrusted) {
  //     this.compensationDataSelect.push(data);
  //   } else {
  //     this.compensationDataSelect.pop(data);
  //   }
  //   // this.compensationDataSelect.push(data);
  //   alert(JSON.stringify(this.compensationDataSelect));
  // }
  // add Compensation Package
  addCompensationPackage() {
    this.btnCompensation = true;
  }

  selectedCompensation(cData, event) {
   
    // this.compensationPackage = cData;
    if (
      this.selectedCompensationData.find(
        data => data.compPackageId === cData.compPackageId
      )
    ) {
      // alert(123);
      const uncheckData = this.selectedCompensationData.findIndex(
        data => data.compPackageId === cData.compPackageId
      );
      this.selectedCompensationData.splice(uncheckData, 1);
      const uncheckEditNewCompPckg = this.addNewCompensationDataInEdit.findIndex(
        data => data.compPackageId === cData.compPackageId
      );
      this.addNewCompensationDataInEdit.splice(uncheckEditNewCompPckg, 1);
    } else {
      this.selectedCompensationData.push(cData);
      this.addNewCompensationDataInEdit.push(cData);
    }
    console.log('train' + JSON.stringify(this.addNewCompensationDataInEdit));
  }

  cancelCList(status) {
    this.getCListStatus = status;
    this.getCListStatusChange.emit(status);

  }

  // --------Campus List Submit
  campusListSubmit(event) {
    event.target.disabled = true;
    console.log('qwerty' + JSON.stringify(this.compensationPackage));
    const compValue = this.AddCompensationForm.value;
    console.log('1234' + JSON.stringify(compValue));
    this.removeDuplicates();
    if ( this.checkStatusName) {
    for (let i = 0; i < compValue.compPackageId.length; i++) {
      const compPackageId = compValue.compPackageId[i].compPackageId;
      // alert(compPackageId);
      const compObject = {
        companyId: this.loginData.companyId,
        endReason: '',
        compPackageId: compPackageId,
        createUserId: this.loginData.userId
      };
      this.compensationDataSelect.push(compObject);
    }
    for (let j = 0; j < this.campusData.length; j++) {
      const campusId = this.campusData[j].campusId;
      const CampObject = {
        companyId: this.loginData.companyId,
        endReason: '',
        campusId: campusId,
        createUserId: this.loginData.userId
      };
      this.campusDataSelect.push(CampObject);
    }
    this.listData.push(this.campusListForm.value);
    console.log(this.listData);
    delete this.listData[0].listId;
    const postCampusListData = {
      companyId : this.loginData.companyId,
      empHdr: this.listData,
      empDtl: this.campusDataSelect,
      empListCompPkg: this.compensationDataSelect
    };
    console.log('asdffsdgf' + JSON.stringify(postCampusListData));
    if (
      (this.campusDataSelect === '' || this.campusDataSelect == null) &&
      (this.compensationDataSelect === '' || this.compensationDataSelect == null)
    ) {
      // if ( this.campusDataSelect === null && this.compensationDataSelect === null) {
      alert('Please Add Compensation Packages & Campuses');
    } else {
      this.campusList.postCampusList(postCampusListData).subscribe(data => {
        event.target.disabled = true;
        this.campusListResponce = data;
        if (this.campusListResponce) {
          this.toastr.success('Campus List Saved Successfully! ', 'Success!');
          this.getCListStatus = false;
          this.getCListStatusChange.emit(this.getCListStatus);
          this.router.navigated = false;
          this.router.navigateByUrl('company/controlData/campusList');
          // this.aftersave = false;
          // this.aftersaveChange.emit(this.aftersave);
        }
      }, error => {
        if (error.status === 500) {
          this.toastr.error('Server Not Found!', 'Error!');
        }
        event.target.disabled = false;
      });
    }
  }
}
  campusListUpdate() {
    // console.log('compppppp' + this.campusListForm.value.listName);
   console.log('this is in update-->' + JSON.stringify(this.compensationPackage));
    this.removeDuplicates();
    if(this.checkStatusName){
    this.listData.push(this.campusListForm.value);
    console.log('qwe' + JSON.stringify(this.listData));
    if (this.newData.length > 0) {
      for (let i = 0; i < this.newData.length; i++) {
        for (let j = 0; j < this.compensationPackage.length; j++) {
          if (this.newData[i].compPackageId === this.compensationPackage[j].compPackageId) {
              this.campusList.deleteComp_1(this.compensationPackage[j].listCompPkgId).subscribe(data => {
                // this.toastr.success('Compensation Deleted Sucessfully');
              });
          }
        }

      }
    }


    for (let i = 0; i < this.empDetailsResponce.length; i++) {
      // console.log('14====' + JSON.stringify(this.empDetailsResponce[i]));
      delete this.empDetailsResponce[i].employerCampusListDTLCompany;
      delete this.empDetailsResponce[i].employerCampusListHdrData;
      delete this.empDetailsResponce[i].employerCampusListDtlCampus;
      delete this.empDetailsResponce[i].startDate;
      delete this.empDetailsResponce[i].endDate;
      delete this.empDetailsResponce[i].createDatetime;
      delete this.empDetailsResponce[i].updateDatetime;
      // console.log('15====' + JSON.stringify(this.empDetailsResponce[i]));

      this.updateCampusDet.push(this.empDetailsResponce[i]);
      // console.log('13====' + JSON.stringify(this.updateCampusDet));
      // console.log('13====' + JSON.stringify(this.updateCampusDet));
    }
    const updateCampusList = {
      companyId : this.loginData.companyId,
      empHdr: this.listData,
      empDtl: this.updateCampusDet,
      empListPkg: this.compensationPackage
    };
    // console.log('123456' + JSON.stringify(updateCampusList));
    this.campusList.updateCampusList(updateCampusList).subscribe(data => {
      this.updatedCampusListResponse = data;
      // console.log('mnbv' + JSON.stringify(this.updatedCampusListResponse));
    });
    for (let i = 0; i < this.addNewCompensationDataInEdit.length; i++) {
      const addComp = {
        listId: this.listData[0].listId,
        companyId: this.addNewCompensationDataInEdit[i].companyId,
        compPackageId: this.addNewCompensationDataInEdit[i].compPackageId,
        endReason: '',
        createUserId: this.loginData.userId,
        updateUserId: this.loginData.userId
      };
      this.sendNewCompPckg.push(addComp);
    }
    console.log('sus' + JSON.stringify(this.sendNewCompPckg));
    for (let j = 0; j < this.campusData.length; j++) {
      const campusId = this.campusData[j].campusId;
      const CampObject = {
        listId: this.listData[0].listId,
        companyId: this.loginData.companyId,
        endReason: '',
        campusId: campusId,
        createUserId: this.loginData.userId
      };
      this.campusDataSelect.push(CampObject);
    }
    if (this.campusDataSelect.length !== 0) {
      // console.log('this.campusDataSelect --> ' + JSON.stringify(this.campusDataSelect));
      const sampleObject = {
        'companyId' : this.loginData.companyId,
        'data' : this.campusDataSelect,
      };
      this.campusList
        .addCampusInUpdate(sampleObject)
        .subscribe(data => {
          this.toastr.success('Campus List Updated Successfully! ', 'Success!');
          this.addedNewCampData = data;
          // console.log('122' + JSON.stringify(this.addedNewCampData));
        });
    }
    if (this.sendNewCompPckg.length !== 0) {
      const sampleObject = {
        'companyId' : this.loginData.companyId,
        'data' : this.sendNewCompPckg,
      }
      this.campusList
        .addCompPckgInUpdate(sampleObject)
        .subscribe(data => {
          this.addedNewCompPckgData = data;
          // console.log('123' + JSON.stringify(this.addedNewCompPckgData));
        });
    }

    this.getCListStatus = false;
    this.getCListStatusChange.emit(this.getCListStatus);
    
    this.router.navigated = false;
    this.router.navigateByUrl('company/controlData/campusList');
  }
}
removeDuplicates(){
  if(this.campusListNames.data.length === 0) {
    this.checkStatusName = true;
  }
  if (this.campusListNames.data.length > 0) {
    for (let k = 0; k < this.campusListNames.data.length; k++) {
      if(this.campusListNames['data'][k].listId !== this.campusListForm.value.listId){
      if (this.campusListNames['data'][k].listName.toLowerCase() === this.campusListForm.value.listName.toLowerCase()) {
        this.toastr.warning('CampusList Already Exists!', 'Alert!');
        this.checkStatusName = false;
       // event.target.disabled = false;
        break;
      }else{
        this.checkStatusName = true;
      }
    }else {
      this.checkStatusName = true;
    }
  }
}
}
}
