import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { CampusListService } from '../../../../services/company/ControlData/campusList/campus-list.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css'],
})
export class CampusListComponent implements OnInit,  OnChanges {
  @Input() addClistStatus;
  @Input() showFilter: boolean;
  employerCampusList: any = {};
  compensationPackages: any;
  jobRoles: any;
  listData: any = [];
  lableList: any;
  loginData: any;
  labelData: any;
  filterQuery: any;
  CmpApprovalLookups: any;
  campusListForm: FormGroup;
  list = true;
  addClist = false;
  changeStatus: any;
  constructor(private router: Router,
    private campusList: CampusListService,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     };
  }
  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    // ------getting compensation package  details
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.addClistStatus) {
    //  console.log('afdds' + this.addClistStatus);
    // }
  }

  addCList() {
    this.list = false ;
    this.addClist = false;
    this.showFilter = true;
  }
  cancelClist() {
    this.list = true;
    this.addClist = true;
    this.showFilter = false;
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

// --------Campus List Submit
}
