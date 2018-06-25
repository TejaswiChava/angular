import { Component, OnInit, ViewContainerRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EmployerDriveService } from '../../../../services/company/employerDrive/employer-drive.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../../../../services/company/event/event.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/core';
import { CampusEventService } from '../../../../services/campus/event/campus-event.service';
// import { ToastsManager } from 'ng2-toastr';
import { CampusEventStudentListService } from '../../../../services/shared/widgets/eventStudentList/campus-event-student-list.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-campus-event',
  templateUrl: './create-campus-event.component.html',
  styleUrls: ['./create-campus-event.component.css']
})
export class CreateCampusEventComponent implements OnInit, OnChanges {
  disablestudents= true;
  checkStatusName: boolean;
  eventNames: any;
  selectedTime: any;
  editBtnStatus: any = true;
  campusDriveId: any;
  deleteArray: any;
  disableShareBtn: boolean;
  eventStatusForButton: boolean;
  @Input() acceptedEmpEventId;
  @Input() acceptedEvent;
  @Input() selectedEvent;
  @Input() getEventStatus;
  @Output() getEventStatusChange = new EventEmitter<boolean>();
  @Input() notVisible: boolean;
  @Output() hideShowSA = new EventEmitter<boolean>();
  campusEventForm: FormGroup;
  // HostForm: FormGroup;
  // driveType: any;
  private today: Date;
  postStudents: any = {};
  eventType: any;
  eventStatus: any;
  eventTypeOption: any;
  driveList: any;
  loginData: any;
  labelData: any;
  cancelBtn: any;
  list1 = false;
  addEve = false;
  saveBtn = true;
  fieldreadonly = false;
  statusReadOnly = true;
  readonly = false;
  btnUpdate = true;
  chList = false;
  // ---
  btnCompany = false;
  btnStudents = false;
  totalData: any;
  afterSelect = false;
  selectedCampus: any;
  postEventResponse: any;
  updateData: any;
  updateEventResponse: any;
  studentList: any = [];
  postStudentArray: any = [];
  studentResponse: any;
  eventEdit = false;
  chngeCmp = true;
  eventNot = false;
  actionButton: any;
  actionData: any;
  actionRead = false;
  eveActions: any;
  eventActionResponce: any;
  studentData: any;
  studArray: any = [];
  companyArray: any = [];
  eventDataToPatch: any;
  acceptedCompanyEventDetails: any;
  switchButtonText: any;
  eventData: any;
  actionBtnDisable: any;
  constructor(private employerDriveService: EmployerDriveService,
    private _location: Location,
    private atp: AmazingTimePickerService,
    private fb: FormBuilder,
    private event: EventService,
    private studentEvent: CampusEventStudentListService,
    private cookieService: CookieService,
    private cEventService: CampusEventService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private router: Router) {
    this.loginData = this.cookieService.getObject('loginResponce');
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.createForm();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   };
  }
  // onSelectDropDown(driveId) {
  //   this.campusDriveId = driveId;
  //   this.btnStudents = false;
  // }
  ngOnChanges(changes: SimpleChanges) {
    console.log('12345' + this.acceptedEvent);
    if (this.acceptedEvent) {
      alert('accepted Event ' + this.acceptedEvent);
      alert(123);

    }
    // Depending on the selected event the functions are called to get the corresponding employer details and student details
    if (this.selectedEvent) {
      this.actionRead = true;
      this.eventEdit = true;
      this.readonly = true;
      this.campusDriveId = this.selectedEvent.campusDriveId;
      console.log('this.selectedEvent11' + JSON.stringify(this.selectedEvent));
      this.campusEventForm.patchValue(this.selectedEvent);
      this.saveBtn = false;
      this.btnUpdate = false;
      if (this.selectedEvent.employerEventId !== null) {
        this.cEventService.getEmployerEventDetails(this.selectedEvent.employerEventId).subscribe((event: any) => {
          console.log('event', event.data[0]);
          this.eventData = event.data[0];
        });
      }

      this.cEventService.getCompanyById(this.selectedEvent.companyId).subscribe(data => {
        this.selectedCampus = data[0];
        this.companyArray.push({ 'companyId': this.selectedCampus.companyId });
        this.afterSelect = true;
        this.chngeCmp = false;
      });
      this.cEventService.getStudentDetailsByEventId(this.selectedEvent.campusEventId).subscribe(data => {
        this.studentData = data;
          for (let i = 0; i < this.studentData.length; i++) {
          const studId = this.studentData[i].studentInfo.studentId;
          this.studArray.push({ 'studentId': studId });
        }
      });
      this.switchButtonText = function() {
        console.log('this.selectedEvent22' + JSON.stringify(this.selectedEvent));
      // if (this.selectedEvent.eventStatusValueId == 240 && this.selectedEvent.employerEventId == null) {
      //   this.selectedEvent.eventStatusValueId = 242;
      // }

      switch (this.selectedEvent.eventStatusValueId) {
        case 238:
          this.actionButton = 'Share with Students';
          this.actionData = 'Published';
          this.eventStatusForButton = true;
          break;
        case 239:
          this.actionButton = 'Close – only after schedule date is passed';
          this.actionData = 'Closed';
          this.eventStatusForButton = false;
          break;
        case 240:
          if (this.selectedEvent.eventStatusValueId === 240 && this.selectedEvent.employerEventId == null) {
            this.actionButton = 'Schedule';
            this.actionBtnDisable = true;
          } else {
            this.actionButton = 'Send Reminder – for shortlisted students';
            this.actionData = 17;
            this.eventStatusForButton = true;
          //  this.disablestudents = false;
          }
          break;
        case 241:
          this.actionButton = 'Share with Employer';
          this.actionData = 'Share Student List with Company';
          this.eventStatusForButton = true;
          break;
        case 241:
          this.actionButton = 'Share student shortlist';
          this.disablestudents = false;
          break;
        case 242:
          this.actionButton = 'Schedule';
          this.actionData = 'Scheduled';
          this.eventStatusForButton = true;
          break;
        case 243:
          this.actionButton = 'In Progress';
          this.actionData = 'In Progress';
          this.eventStatusForButton = false;
          break;
        case 244:
        this.eventStatusForButton = false;
          this.actionRead = false;
          break;
      }
    };
    this.switchButtonText();
    }

  }
  ngOnInit() {
    if(this.router.url === '/campus/createEvent') {
      this.cancelBtn = true;
    } else if(this.router.url === '/campus/placement/campusEvent'){
      this.cancelBtn = false;
    }
    this.settodaysdate();
    this.eventStatusForButton = true;
    if (this.selectedEvent !== undefined) {
      if (this.selectedEvent.eventStatusValueId === 239 ||
        this.selectedEvent.eventStatusValueId === 243 ||
        this.selectedEvent.eventStatusValueId === 244) {
        this.eventStatusForButton = false;
      }else if( this.selectedEvent.eventStatusValueId === 242) {
          this.disablestudents = false;
      }else {
        this.eventStatusForButton = true;
      }
    }
    this.selectedCampus = {};
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.event.eventTypeLookup().subscribe(data => this.eventType = data);
    this.event.eventStatusLookup().subscribe(data => this.eventStatus = data);
    this.cEventService.getDriveList(this.loginData.campusId).subscribe((data: any) => this.driveList = data.data);
    console.log('this acc', this.acceptedEmpEventId);
    if (this.acceptedEmpEventId) {
      this.eventStatusForButton = true;
      this.acceptedEmpEventId = JSON.parse(this.acceptedEmpEventId);
      const acceptedEventId = { 'empEventId': this.acceptedEmpEventId };
      this.cEventService.getEveAcceptedCompanyDet(acceptedEventId).subscribe((data: any) => {
        this.acceptedCompanyEventDetails = data.data;
        this.cEventService.getEmployerEventDetails(this.acceptedEmpEventId).subscribe((event: any) => {
            this.selectedCampus = this.acceptedCompanyEventDetails.companyDetails[0];
            this.afterSelect = true;
            this.chngeCmp = false;
            this.eventData = event.data[0];
          });
      });
    } else {
      this.acceptedEmpEventId = '';
      this.selectedCampus = '';
    }

    this.eventDataToPatch = function () {
      this.cEventService.getEventByIdtoPatch(this.selectedEvent.campusEventId).subscribe(data => {
      this.selectedEvent = data[0];
        this.campusEventForm.patchValue({ eventStatusValueId: this.selectedEvent.eventStatusValueId });
        this.switchButtonText();
      });
    };
    this.cEventService.getEventList(this.loginData.campusId).subscribe((data) => {
      this.eventNames = data;
      console.log('namessssssss' + this.eventNames[0].eventName);
    });
  }
/**
 * In the create form all the attributes are declared that are required for a form to access
 * @memberof CreateCampusEventComponent
 */
createForm() {
    this.campusEventForm = this.fb.group({
      eventName: ['', Validators.required],
      // driveTypeValueId: ['', Validators.required],
      scheduledDate: '',
      eventTypeValueId: '',
      // noOfColleges: '',
      scheduledStartTime: '',
      eventStatusValueId: 238,
      description: '',
      campusDriveId: '',
      createUserId: this.loginData.userId,
      updateUserId: '',
      companyId: '',
      employerEventId: '',
      campusId: this.loginData.campusId,
      duration: '',
      campusEventId: '',
      eventRequirement: ''

    });

  }

  clearForm(){
    this.campusEventForm.reset({
      eventName: '',
      // driveTypeValueId: ['', Validators.required],
      scheduledDate: '',
      eventTypeValueId: '',
      // noOfColleges: '',
      scheduledStartTime: '',
      eventStatusValueId: 238,
      description: '',
      campusDriveId: '',
      createUserId: this.loginData.userId,
      updateUserId: '',
      companyId: '',
      employerEventId: '',
      campusId: this.loginData.campusId,
      duration: '',
      campusEventId: '',
      eventRequirement: ''
    });
    this.btnCompany = false;
    this.btnStudents = false;
    this.afterSelect = false;
  }

  editEvent() {
    this.editBtnStatus = false;
    this.readonly = false;
  }
  addCompany() {
    this.btnCompany = true;
  }
  addStudents() {
    this.btnStudents = true;
  }

  cancelCompany() {
    this.btnCompany = false;
  }
  cancelStudents() {
    this.btnStudents = false;
  }

  disableStudents() {
    this.btnStudents = false;
  }

  cancelEvent(status) {
    this.getEventStatus = status;
    this.getEventStatusChange.emit(status);
    console.log(JSON.stringify(this.getEventStatus));
    this.router.navigated = false;
    // this.router.navigate([this.router.url]);
    const sampleArray = [];
    this.studentEvent.setDeleteStudents(sampleArray);
    this._location.back();
  //  this.router.navigateByUrl('/campus/placement/campusEvent');
  }
  removeEventDuplicates(){
    if(this.eventNames.length === 0){
     this.checkStatusName=true;
    }
    if (this.eventNames.length > 0) {
      for (let k = 0; k < this.eventNames.length; k++) {
        if(this.eventNames[k].campusEventId !== this.campusEventForm.value.campusEventId) {
        if (this.eventNames[k].eventName.toLowerCase() === this.campusEventForm.value.eventName.toLowerCase()) {
          console.log('event exists');
          this.toastr.warning('Event Already Exists!', 'Alert!');
          this.checkStatusName = false;
          break;
        } else {
          this.checkStatusName = true;
        }
      }else {
        this.checkStatusName = true;
      }
    }
  }
  }
  /**
   * The eventSubmit function is called once the event gets submitted.It takes the total data of the employer
    depending on the compnyId and finally emits the eventStatus.
   * @memberof CreateCampusEventComponent
   */
  eventSubmit(event) {
    event.target.disabled = true;
    this.totalData = this.campusEventForm.value;
    this.removeEventDuplicates();
    if (this.checkStatusName) {
    this.totalData.scheduledDate = new Date(this.totalData.scheduledDate).getMonth() + 1  + '/' +
    new Date(this.totalData.scheduledDate).getDate() + '/' + new Date(this.totalData.scheduledDate).getFullYear();
    this.totalData.employerEventId = this.acceptedEmpEventId;
    this.totalData.companyId = this.selectedCampus.companyId;
    console.log('asds' + JSON.stringify(this.totalData));
    if (this.totalData.employerEventId == '' || this.totalData.employerEventId == null) {
      delete this.totalData.employerEventId;
    }
    this.cEventService.postCampusEvent(this.totalData).subscribe((data: any) => {
      this.postEventResponse = data.data;
      console.log('asdf' + JSON.stringify(this.postEventResponse));

      for (let i = 0; i < this.studentList.length; i++) {
        const postStudents = {
          campusId: this.loginData.campusId,
          campusEventId: this.postEventResponse.campusEventId,
          createUserId: this.loginData.userId,
          companyId: this.selectedCampus.companyId,
          studentId: this.studentList[i].studentId,
          departmentId : this.studentList[i].departmentId,
          candidateStatusValueId: 514,
          eligibilityInd: 'Y',
          studentSubscribeInd: 'Y',
          registrationInd: 'Y',
          campusPublishInd: 'Y'
        };
        this.postStudentArray.push(postStudents);
      }
      const postStudentObject = {
                campusId : this.loginData.campusId,
                data : this.postStudentArray
              };
      console.log(JSON.stringify(this.postStudentArray));
      this.cEventService.campusStudentList(postStudentObject).subscribe(data => {
        this.studentResponse = data;
        if (this.studentResponse) {
          this.getEventStatus = false;
          this.toastr.success('Event Saved Successfully! ', 'Success!');
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
          this.getEventStatusChange.emit(this.getEventStatus);
        }
        this.router.navigateByUrl('/campus/placement/campusEvent');
        console.log('this is getEventSTatus' + this.getEventStatus);
        this.getEventStatusChange.emit(this.getEventStatus);
      });
    }, error => {
      if (error.status === 500) {
        this.toastr.error('Server Not Found!', 'Error!');
      }
      event.target.disabled = false;
    });
  }else{
    event.target.disabled = false;
  }
  }


  changeComp() {
    this.afterSelect = false;
  }
  /**
   *when the event is updated it gets the eventstatus change and emits the new event.
   * @memberof CreateCampusEventComponent
   */
  eventUpdate() {
    this.updateData = this.campusEventForm.value;
    this.removeEventDuplicates();
    console.log('123' + JSON.stringify(this.updateData));
    if(this.checkStatusName){
      this.updateData.scheduledDate = new Date(this.updateData.scheduledDate).getMonth() + 1  + '/' +
      new Date(this.updateData.scheduledDate).getDate() + '/' + new Date(this.updateData.scheduledDate).getFullYear();
    this.deleteArray = this.studentEvent.getDeleteStudents();
    this.cEventService.deleteSetOfStudents((this.deleteArray) ? {
      'campusId' : this.loginData.campusId, 'data' : this.deleteArray} : {
      'campusId' : this.loginData.campusId, 'data' : []}).subscribe(dataToDelete => {
      this.cEventService.updateCampusEvent(this.updateData).subscribe((data: any) => {
        this.updateEventResponse = data.data;
        console.log('studentsssss', this.studentList);

        for (let i = 0; i < this.studentList.length; i++) {
          this.postStudents = {};
          console.log('student', this.studentList);
           this.postStudents = {
            campusId: this.loginData.campusId,
            campusEventId: this.updateData.campusEventId,
            createUserId: this.loginData.userId,
            companyId: this.updateData.companyId,
            studentSubscribeInd: 'Y',
            registrationInd: 'Y',
            campusPublishInd: 'Y',
            studentId: this.studentList[i].studentId,
            departmentId : this.studentList[i].departmentId,
            candidateStatusValueId: 514,
          };
          if (this.selectedEvent.eventStatusValueId === 240) {
            this.postStudents.candidateStatusValueId = 376;
            }
          console.log('selected event data', this.selectedEvent);
          if (this.selectedEvent.eventStatusValueId === 240 || this.selectedEvent.eventStatusValueId === 242) {
            this.postStudents.employerEventId = this.selectedEvent.employerEventId;
            console.log('hearrrrrrrrrrrrrrr is the update modification');
          }
          // postStudents.studentId = this.studentList[i];
          // alert(JSON.stringify(postStudents.studentId));
          this.postStudentArray.push(this.postStudents);
          // console.log(JSON.stringify(this.postStudentArray));
        }
        console.log('1234' + JSON.stringify(this.postStudentArray));
        if (this.postStudentArray.length > 0) {
          const updateStudentObject = {
            campusId : this.loginData.campusId,
            data : this.postStudentArray
          };
          this.cEventService.campusStudentList(updateStudentObject).subscribe(data => {
            this.studentResponse = data;
            console.log('dataaaaaa', this.studentResponse);
            if (this.updateEventResponse !== '') {
              this.toastr.success('Event Updated Successfully! ', 'Success!');
              this.getEventStatus = false;
              console.log('heaaarrrrrrrrrr');
              this.router.navigated = false;
              const sampleArray = [];
              this.studentEvent.setDeleteStudents(sampleArray);
              this.router.navigate([this.router.url]);
              // this.router.navigateByUrl('campus/placement/campusEvent');
              console.log('this is getEventSTatus' + this.getEventStatus);
              this.getEventStatusChange.emit(this.getEventStatus);
            }
          }, error => {
            this.toastr.error('Event Not Updated');
          }
        );
        } else {
          this.toastr.success('Event Updated Successfully! ', 'Success!');
          this.getEventStatus = false;
          console.log('heaaarrrrrrrrrr');
          this.router.navigated = false;
          const sampleArray = [];
          this.studentEvent.setDeleteStudents(sampleArray);
          this.router.navigate([this.router.url]);
          // this.router.navigateByUrl('campus/placement/campusEvent');
          console.log('this is getEventSTatus' + this.getEventStatus);
          this.getEventStatusChange.emit(this.getEventStatus);
        }

    });
    });
    this.acceptedEmpEventId = '';
    this.selectedCampus = '';
  }
}


  // event actions coding starts here

  actions() {
    switch (this.selectedEvent.eventStatusValueId) {
      case 238:
        this.eveActions = {
          'campusEventId': this.selectedEvent.campusEventId,
          'Action': this.actionData,
          'userId': this.loginData.userId,
          'campusId': this.loginData.campusId,
          'role': this.loginData.role,
          'empEventId': this.selectedEvent.employerEventId,
          'studentList': this.studArray,
          'educationPersonId': this.loginData.educationPersonId
        };
        break;
      case 239:
        this.actionButton = 'Close – only after schedule date is passed';
        this.eveActions = {
          'campusEventId': this.selectedEvent.campusEventId,
          'Action': this.actionData,
          'scheduledDate': this.selectedEvent.scheduledDate
        };
        break;
      case 240:
        this.actionButton = 'Send Reminder – for shortlisted students';
        this.eveActions = {
          'empEventId': this.selectedEvent.employerEventId,
          'notificationName': this.actionData,
          'userId': this.loginData.userId,
          'campusId': this.loginData.campusId,
          'role': this.loginData.role,
          'educationPersonId': this.loginData.educationPersonId,
          'companyList': this.companyArray,
        };
        break;
      case 241:
        this.actionButton = 'Share with Employer';
        this.eveActions = {
          'campusEventId': this.selectedEvent.campusEventId,
          'Action': this.actionData,
          'userId': this.loginData.userId,
          'campusId': this.loginData.campusId,
          'role': this.loginData.role,
          'empEventId': this.selectedEvent.employerEventId,
          'educationPersonId': this.loginData.educationPersonId
          // 'companyList': this.companyArray
        };
      //  this.disablestudents = false;
        break;
      case 241:
        this.actionButton = 'Share student shortlist';
        break;
      case 242:
        this.actionButton = 'Schedule';
        this.eveActions = {
          'campusEventId': this.selectedEvent.campusEventId,
          'Action': this.actionData,
          'userId': this.loginData.userId,
          'campusId': this.loginData.campusId,
          'educationPersonId': this.loginData.educationPersonId,
          'role': this.loginData.role,
          'empEventId': this.selectedEvent.employerEventId,
          'scheduledDate': this.selectedEvent.scheduledDate,
          'scheduledStartTime': this.selectedEvent.scheduledStartTime
        };
        break;
      case 243:
        this.actionButton = 'In Progress';
        this.eveActions = {
          'campusEventId': this.selectedEvent.campusEventId,
          'Action': this.actionData,
          'userId': this.loginData.userId,
          'campusId': this.loginData.campusId,
          'educationPersonId': this.loginData.educationPersonId,
          'role': this.loginData.role
        };
        this.disableStudents();
        break;
      case 244:
        // this.actionButton = 'In Progress';
        break;
    }
    if (this.eveActions.notificationName == 17) {
      this.cEventService.pushNotification(this.eveActions).subscribe(data => {
        this.eventActionResponce = data;
        if (this.eventActionResponce) {
          this.toastr.success('Remainder Sent! ', 'Success!');
          this.eventDataToPatch();
        }
        console.log(JSON.stringify(this.eventActionResponce));
      });
    } else {
      if (this.eveActions.empEventId == null || this.eveActions.empEventId == '') {
        delete this.eveActions.empEventId;
      }
      this.cEventService.eventAction(this.eveActions).subscribe(data => {
        this.eventActionResponce = data;
        if (this.eventActionResponce) {
          this.toastr.success('Event Updated Successfully! ', 'Success!');
          this.eventDataToPatch();
        }
        console.log(JSON.stringify(this.eventActionResponce));
      });
    }
  }
 /**
  * The settodaysdate and gettodaysdate functions will get the present day's date which is used to disable
    the pastdates in the calender
  * @memberof CreateCampusEventComponent
  */
 settodaysdate () {
    this.today = new Date();
  }
 gettodaysdate() {
   return this.today;
 }
 toggleShareButton(status: boolean) {
  if (this.selectedEvent.eventStatusValueId === 240 && this.selectedEvent.employerEventId == null) {
    this.actionBtnDisable = true;
  } else {
    this.actionBtnDisable = status;
    console.log('This is in toggle function --------> ' + this.disableShareBtn);
  }
 }

  // event actions coding ends here

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.campusEventForm.patchValue({
        scheduledStartTime: time,
      });
      console.log(time);
    });
  }
}

