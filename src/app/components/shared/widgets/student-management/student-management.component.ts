import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { CompanySearchService } from '../../../../services/shared/widgets/company-search/company-search.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { CampusEventStudentListService } from '../../../../services/shared/widgets/eventStudentList/campus-event-student-list.service';
import { StudentForm } from './student-management.model';
import { EmptyResponseService } from '../../../../services/shared/empty-response/empty-response.service';
import { Router } from '@angular/router';
import { StudentManagementService } from './student-management.service';
// import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html'
})
export class StudentManagementComponent implements OnInit, OnChanges {
  depId: any;
  @Input() selectedEventData;
  @Input() getSelectedStudents;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  StudentListSearch: FormGroup;
  loginData: any;
  searchData: any = [];
  departments: any = [];
  studentData: StudentForm[];
  studentIdArray: any = [];
  programmes: any = [];
  selectedStudents: any;
  searchFlag = false;
  studentArray: StudentForm[] = [];
  rows: any = [];
  selected = [];
  campusId: number;
  eventsName: string;
  noResultStatus = false;

  constructor(
    private companySearch: CompanySearchService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private studentEvent: CampusEventStudentListService,
    private viewContainerRef: ViewContainerRef,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private emptyResponseService: EmptyResponseService,
    private studentManagement: StudentManagementService
  ) {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.createForm();
    this.campusId = this.getCampusId();
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
    // this.StudentListSearch.get('departmentId').value
    this.studentEvent
      .getDepartments(this.loginData.campusId)
      .subscribe((response: any) => {
        this.departments = response.data;
        this.departments.sort(this.studentEvent.compareDepartmentDetails);
      });
    this.studentEvent
      .getProgramDetails(this.loginData.campusId)
      .subscribe((response: any) => {
        this.programmes = response.data;
        this.programmes.sort(this.studentEvent.compareProgramDetails);
      });
  }

  ngOnChanges() {

  }

  createForm() {
    this.StudentListSearch = this.fb.group({
      campusId: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      programId: '',
      cgpa: '',
    });
  }

  getPrograms() {
    this.depId = this.StudentListSearch.get('departmentId').value;
    this.studentEvent
      .getProgramDetailsWithDepartmentId(this.loginData.campusId, this.depId)
      .subscribe((response: any) => {
        this.programmes = response.data;
        this.programmes.sort(this.studentEvent.compareProgramDetails);
        this.StudentListSearch.patchValue({
          programId: ''
        });
      });
  }
  // The function is to override the default behavior provide by HTML-5 reset button
  // In order to set the values, calling to createForm again with empty values
  reset() {
    this.StudentListSearch.reset({
      campusId: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      programId: '',
      cgpa: '',
    });
    this.searchFlag = false;
  }

  searchStudents(): void {
    if (this.emptyResponseService.objectIsEmpty(this.StudentListSearch.value)) {
      const campusId = this.getCampusId();
      const flag = 'Y';
      let responseStatus = false;
      this.noResultStatus = false;
      this.studentEvent
        .studentSearch(this.StudentListSearch.value, campusId, flag)
        .subscribe(response => {
          this.searchData = response;
          responseStatus = this.emptyResponseService.checkResponse(
            this.searchData
          );
          if (responseStatus === true) {
            this.studentData = this.studentManagement.formatfunction(
              this.searchData
            );
            this.searchFlag = true;
          } else {
            this.noResultStatus = true;
            this.searchFlag = false;
            this.toastr.warning('No Data Found!');
          }
        });
    } else {
      this.toastr.warning('Please select atleast one search criteria !');
    }
  }
  // Will set the data to be passed in student-table
  setStudentData(data) {
    this.studentData = data;
  }

  // get function for retrieving list of students
  getStudentData() {
    return this.studentData;
  }

  // function to fetch the current campusId
  getCampusId() {
    return this.loginData.campusId;
  }

}
