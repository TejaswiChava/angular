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
import { NgModule } from '@angular/core';
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
import { Router } from '@angular/router';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
import { StudentManagementService } from '../student-management/student-management.service';
import { EmptyResponseService } from '../../../../services/shared/empty-response/empty-response.service';
// import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-event-student-management',
  templateUrl: './event-student-management.component.html',
  styleUrls: ['./event-student-management.component.css']
})
export class EventStudentManagementComponent implements OnInit, OnChanges {
  departmentIdData: any;
  hideCheckbox = false;
  @Input() selectedEventData;
  // @Input() driveId;
  @Input() getSelectedStudents;
  @Output() getSelectedStudentsChange = new EventEmitter();
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  StudentListSearch: FormGroup;
  loginData: any;
  searchFilter = false;
  searchData: any = [];
  departments: any = [];
  data: any = [];
  studentIdArray: any = [];
  programmes: any = [];
  selectedStudents: any;
  departmentIdSelected: any;
  campusId: number;
  studentArray: StudentForm[] = [];
  rows: any = [];
  selected = [];
  studentInput: any = [];
  skills: any = [];
  interests: any = [];
  noResultStatus = false;
  selectedAll: any;
  private searchCount = 0;
  public searchFlag = false;
  public filterCount = 0;
  public filterCountFlag = false;
  public globalData: any = [];
  private depId: number;

  constructor(
    private companySearch: CompanySearchService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private studentEvent: CampusEventStudentListService,
    private lookUp: LookUpGetAndSetLocalSrorage,
    private lookUpValue: LookupvalueService,
    private studentSearchService: StudentManagementService,
    private emptyResponseService: EmptyResponseService,
    private viewContainerRef: ViewContainerRef,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
  ) {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.campusId = this.loginData.campusId;
    this.createForm();
  }

  ngOnInit() {
    // this.studentEvent.getDriveDetails(this.loginData.campusId, this.driveId).subscribe((res: any) => {
    //   this.departmentIdData = res.data[0].departmentId;
    //   this.StudentListSearch.patchValue({
    //     departmentId: this.departmentIdData});
    // });
    this.studentEvent.getDepartments(this.loginData.campusId)
      .subscribe((response: any) => {
        this.departments = response.data;
        // this.studentEvent.getProgramDetails(this.loginData.campusId)
        // .subscribe((programResponse: any) => {
        //   for (let i = 0; i < programResponse.data.length; i++) {
        //     console.log('resssssssssssssss', programResponse.data[i]);
        //     if (programResponse.data[i].departmentId === this.departmentIdData) {
        //       this.programmes.push(programResponse.data[i]);
        //     }
        //   }
        //   this.programmes.sort(this.studentEvent.compareProgramDetails);
        // });
      });
    if (window.location.href.indexOf('campus/StudentManagement') > -1) {
      this.hideCheckbox = true;
    }
    this.getSkills();
    this.getInterest();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedEventData) {
      this.studentEvent
        .getStudentDetailsByEventId(this.selectedEventData.campusEventId)
        .subscribe(data => {
          this.selectedStudents = data;
        });
    }
  }
  createForm() {
    this.StudentListSearch = this.fb.group({
      campusId: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      programId: '',
      cgpa: ''
    });
  }

  searchCampus(campusId) {
    if (this.selectedEventData) {
      console.log('hear');
      this.studentEvent
        .getStudentDetailsByEventId(this.selectedEventData.campusEventId)
        .subscribe(sampleData => {
          this.selectedStudents = sampleData;
    //     });
    // }
    if (this.emptyResponseService.objectIsEmpty(this.StudentListSearch.value)) {
      this.resetFilter();
      this.filterQuery = '';
      this.searchFilter = true;
      this.studentEvent
        .studentSearch(this.StudentListSearch.value, this.campusId)
        .subscribe(data => {
         this.noResultStatus = false;
          this.searchData = data;
         // console.log('dataaaaaaaaa' +  JSON.stringify(this.searchData));
          if (this.emptyResponseService.checkResponse(this.searchData)) {
          // this.selectedStudents = this.selectedStudents.push(this.searchData);
            console.log('this is selected event data', this.selectedStudents);
            // if (this.selectedStudents.length === 0) {
            //   this.data = this.searchData;
            // }
            if (this.selectedStudents.length > 0 ) {
              for (let i = 0; i < this.selectedStudents.length; i++) {
                const editModeData = this.selectedStudents[i];
                console.log('these are selected data', editModeData);
                const index = this.searchData.findIndex(
                  // tslint:disable-next-line:no-shadowed-variable
                  (data) => {
                    console.log('aa', data.studentDetails.studentId);
                    return data.studentDetails.studentId === editModeData.studentInfo.studentId;
                  }
                );
                if (index > -1) {
                  this.searchData.splice(index, 1);
                }
                this.data = this.searchData;
                this.setSearchCount(this.data.length);
                this.searchFlag = true;
                this.filterCountFlag = false;
              }
            } else {
              this.globalData = data;
              this.data = data;
              this.setSearchCount(this.data.length);
              this.searchFlag = true;
              this.filterCountFlag = false;
            }
          } else {
            this.noResultStatus = true;
            // this.data = [];
            this.setSearchCount(this.data.length);
            this.filterCountFlag = false;
            this.toastr.warning('No Data Found!');
          }
        });
    } else {
      this.toastr.warning('Please select atleast one search criteria !');
    }
  });
} else {
  console.log('not hear');
  if (this.emptyResponseService.objectIsEmpty(this.StudentListSearch.value)) {
    this.filterQuery = '';
    this.searchFilter = true;
    this.studentEvent
      .studentSearch(this.StudentListSearch.value, this.campusId)
      .subscribe(data => {
        this.noResultStatus = false;
        this.searchData = data;
        if (this.emptyResponseService.checkResponse(this.searchData)) {
            this.data = this.searchData;
            this.setSearchCount(this.searchData.length);
            this.searchFlag = true;
            this.filterCountFlag = false;
        } else {
          this.noResultStatus = true;
          this.setSearchCount(this.data.length);
          this.filterCountFlag = false;
          this.toastr.warning('No Data Found!');
        }
      });
  } else {
    this.toastr.warning('Please select atleast one search criteria !');
  }
}
  }

  selectAll(event) {
    this.studentIdArray = [];
    if (event.target.checked) {
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].selected = this.selectedAll;
      const studId = this.data[i].studentDetails.studentId;
      const depId = this.data[i].studentDetails.departmentId;
      const studentData = {
        'studentId' : studId,
        'departmentId' : depId
      };
      this.studentIdArray.push(studentData);
      }
    } else {
      this.studentIdArray = [];
      for (let i = 0; i < this.data.length; i++) {
      this.data[i].selected = this.selectedAll;
      }
    }
    this.getSelectedStudents = this.studentIdArray;
    this.getSelectedStudentsChange.emit(this.studentIdArray);
  }

  selectedStudent(data, event) {
    console.log('this data is sent for filtering the data', data);
    const studId = data.studentDetails.studentId;
    const depId = data.studentDetails.departmentId;
    if (event.target.checked) {
      const studentData = {
        'studentId' : studId,
        'departmentId' : depId
      };
      this.studentIdArray.push(studentData);
      console.log('selected', this.studentIdArray);
    } else {
      const studentData = {
        'studentId' : studId,
        'departmentId' : depId
      };
      const index = this.studentIdArray.findIndex(data => data.studentId === studId);
      this.studentIdArray.splice(index, 1);
    }
    this.selectedAll = this.data.every(function(student: any) {
      return student.selected === true;
    });
    console.log('qwerty' + JSON.stringify(this.studentIdArray));
    this.getSelectedStudents = this.studentIdArray;
    this.getSelectedStudentsChange.emit(this.studentIdArray);

  }

  getSkills() {
    this.skills = this.lookUp.getLookUpData('SKILL_TYPE_CODE', null);
    this.skills = this.lookUpValue.loadArrayLookups(this.skills);
  }

  getInterest() {
    this.interests = this.lookUp.getLookUpData('INTEREST_TYPE_CODE', null);
    this.interests = this.lookUpValue.loadArrayLookups(this.interests);
  }

  getInputSkills() {
    return this.studentInput.skills;
  }

  getInputInterests() {
    return this.studentInput.interest;
  }

  setStudentDetials(newStudentDetails) {
    this.data = newStudentDetails;
  }

  getSearchCount() {
    return this.searchCount;
  }

  setSearchCount(value: number) {
    this.searchCount = value;
  }

  getSearchData() {
    return this.data;
  }

  setFilterSearchCount(value) {
    this.filterCount = value;
  }

  getFilterSearchCount() {
    return this.filterCount;
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
    this.noResultStatus = false;
  }

  searchFilterFunction() {
    let result = this.searchData;
    let inputSkills = this.getInputSkills();
    inputSkills = this.emptyResponseService.sterilize(inputSkills);
    let inputInterest = this.getInputInterests();
    inputInterest = this.emptyResponseService.sterilize(inputInterest);
    if (inputSkills.length > 0) {
      result = this.studentSearchService.filterSkills(result, inputSkills);
    }
    if (inputInterest.length > 0) {
      result = this.studentSearchService.filterInterestfunction(result, inputInterest
      );
    }
    if ( inputSkills.length === 0 &&  inputInterest.length === 0) {
      this.filterCountFlag = false;
  }else {
    this.filterCountFlag = true;
  }
    this.setStudentDetials(result);
    this.setFilterSearchCount(result.length);
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

  resetFilter() {
    this.studentInput = {};
    this.data = this.searchData;
    this.setFilterSearchCount(0);
    this.filterCountFlag = false;
  }
}
