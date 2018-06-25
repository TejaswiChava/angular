import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ScoraEnrollService } from '../../../services/scora-admin/enroll/scora-enroll.service';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-scora-enroll-campus',
  templateUrl: './scora-enroll-campus.component.html',
  styleUrls: ['./scora-enroll-campus.component.css'],
})
export class ScoraEnrollCampusComponent implements OnInit {

  campus: any = {};
  indicators: any = [];
  campusUniversityList: any = [];
  option: any;
  constructor(private scoraEnrollService: ScoraEnrollService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
     }


  ngOnInit() {

    // get role type looktype values
    this.getRoleTypeValues();

    // get campus university lists
    this.getCampusUniversityList();

  }

  // setting the role type value to option, based on value displaying enroll input fields
  onSelect(option) {
    this.option = option;
  }

  // defining function for to get role type values
  getRoleTypeValues() {
    this.scoraEnrollService.getRoleTypes().subscribe(data => {
      this.indicators = data;
      console.log('inddd' + JSON.stringify(this.indicators));
    });
  }

  // defining function for to get role type values
  getCampusUniversityList() {
    this.scoraEnrollService.getCampusUniversities().subscribe(data => {
      this.campusUniversityList = data;
      console.log('univerrrrrrrrrr' + JSON.stringify(this.campusUniversityList));
    });
  }

  enrollSubmit(enrollForm: NgForm, event) {
    event.target.disabled = true;
    console.log('ddd', JSON.stringify(this.campus));
    this.scoraEnrollService.createEnrollment(this.campus)
      .subscribe(
      (resp: any) => {
        console.log('createEnrollment resp' + JSON.stringify(resp));
        // alert( + ' sucessfully enrolled');
        this.toastr.success(resp.data.entityName + ' Successfully Enrolled!', 'Success!');
        event.target.disabled = true;
        enrollForm.resetForm();
        this.option = undefined;
      },
      (error: any) => {
        console.log(error);
        // const error1 = JSON.parse(error);
        // console.log(JSON.stringify(j1));
        // const j1: any = JSON.stringify(error);
        // console.log(JSON.stringify(j1));
        this.toastr.error('Email/Institute/Company Already Exists', 'Oops!');
        event.target.disabled = false;
      });

  }

  camcelEnroll(enrollForm: NgForm) {
    enrollForm.resetForm();
    this.option = undefined;
  }
}
