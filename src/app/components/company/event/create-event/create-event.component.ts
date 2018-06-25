import {
  Component,
  OnInit,
  ViewContainerRef,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  EmployerDriveService
} from '../../../../services/company/employerDrive/employer-drive.service';
import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from '@angular/forms';
import {
  Observable
} from 'rxjs/Observable';
import {
  EventService
} from '../../../../services/company/event/event.service';
import {
  Router
} from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { AmazingTimePickerService } from 'amazing-time-picker';
import {
  CookieService
} from 'angular2-cookie/core';
// import {
//   ToastsManager
// } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import {
  EventListComponent
} from '../event-list/event-list.component';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnChanges {
  checkStatusName: boolean;
  eventListNames: any;
  eventStatusNeedToChange: boolean;
  times: boolean;
  @Input() selectedEvent;
  @Input() getStatus;
  @Input() getEventStatus;
  @Output() getEventStatusChange = new EventEmitter < boolean > ();
  employerEventForm: FormGroup;
  // HostForm: FormGroup;
  // driveType: any;
  editBtnStatus: any = true;
  eventType: any;
  eventStatus: any;
  eventTypeOption: any;
  campusList = false;
  hosts = false;
  driveList: any;
  loginData: any;
  jobId: any;
  jobDesc: any;
  empDriveId: any;
  campusListData: any;
  checkListData: any = [];
  checkData: any;
  labelData: any;
  eventResponse: any;
  eventArray: any = [];
  employerEventPanel: any = [];
  totalData: any;
  countrySelect: any;
  stateSelect: any;
  citySelect: any;
  univList: any;
  stateList: any;
  cityList: any;
  postalList: any;
  list1 = false;
  addEve = false;
  eventListEnable = false;
  eventList = false;
  editEmployercampusData: any;
  employercampusData: any;
  updatedEvent: any;
  cancelBtn: any;
  updatedData: any = [];
  saveBtn = true;
  fieldreadonly = false;
  statusReadOnly = true;
  schedulereadonly = true;
  showCList: any;
  showHostDetails: any;
  readonly = false;
  btnUpdate = true;
  chList = false;
  actBtn = true;
  fieldreadonly1 = true;
  actionButton: any;
  actionData: any;
  eventActionResponce: any;
  countryList: any;
  readonly1 = true;
  actionRead = false;
  saveEvent: any;
  btnClick: any;
  eveActions: any;
  selectedCampusLists: any;
  selectedCampusArray: any = [];
  eventDataToPatch: any;
  dispHosts: any;
  switchButton: any;
  constructor(private employerDriveService: EmployerDriveService, private fb: FormBuilder, private event: EventService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    // public toastr: ToastsManager,
    public eveList: EventListComponent,
    private viewContainerRef: ViewContainerRef,
    private location: Location,
    private atp: AmazingTimePickerService,
    private router: Router) {
    this.loginData = this.cookieService.getObject('loginResponce');
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.createForm();
  }
  option: string;
  onSelect(option: string) {
    this.option = option;
  }
  ngOnInit() {
    if(this.router.url === '/company/createEvent') {
      this.cancelBtn = true;
    } else if(this.router.url === '/company/recruitment/employerEvent'){
      this.cancelBtn = false;
    }
    if (this.selectedEvent !== undefined) {
      if (this.selectedEvent.eventStatusValueId === 315 ||
        this.selectedEvent.eventStatusValueId === 319 ||
        this.selectedEvent.eventStatusValueId === 320 ||
        this.selectedEvent.eventStatusValueId === 321) {
        this.eventStatusNeedToChange = false;
      } else {
        this.eventStatusNeedToChange = true;
      }
    }
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
    this.event.eventTypeLookup().subscribe(data => this.eventType = data);

    this.event.eventStatusLookupCompany().subscribe(data => this.eventStatus = data);
    this.event.getDriveList(this.loginData.companyId).subscribe((data: any) => this.driveList = data.data);
    this.onSelect = function (option: string) {
      this.option = option;
    };
    // ----------service call to get country List
    this.event.getCountryList().subscribe(data => this.countryList = data);

    console.log('selectedEvent' + this.selectedEvent);
    this.eventDataToPatch = function () {
      this.event.getEventByIdtoPatch(this.selectedEvent.empEventId).subscribe(data => {
        this.selectedEvent = data[0];
        this.employerEventForm.patchValue({
          eventStatusValueId: this.selectedEvent.eventStatusValueId
        });
        console.log('1243 1111  ' + JSON.stringify(this.selectedEvent));
        this.switchButton();
      });
    };
    this.event.getEventList(this.loginData.companyId).subscribe( (data) => {
      this.eventListNames = data;
      console.log('eventlisttttttt' +  this.eventListNames[0].eventName);
    });
  }

  // checkCgpa(){
  //   if(this.employerEventForm.get('cgpa').value > 10) {
  //     this.toastr.warning('CGPA should not exceed more than 10', 'Alert!');      
  //   }else
  // }
  // ----- functionality for getting the state details with country details
  getStateDet(country) {
    this.countrySelect = country;
    this.event.getStateList(this.countrySelect).subscribe(data => this.stateList = data);
  }

  // ----- functionality for getting the city details with state details
  getCityDet(stateDet) {
    this.stateSelect = stateDet;
    this.event.getCityList(this.stateSelect).subscribe(data => this.cityList = data);
  }
  // ----- functionality for getting the postal codes details with city details
  getPostalDet(cityDet) {
    this.citySelect = cityDet;
    this.event.getPostalList(this.citySelect).subscribe(data => this.postalList = data);
  }

  createForm() {
    this.employerEventForm = this.fb.group({
      eventName: ['', Validators.required],
      // driveTypeValueId: ['', Validators.required],
      cgpa: '',
      eventTypeValueId: '',
      scheduledStartTime: '',
      scheduledDate: '',
      // noOfColleges: '',
      eventStatusValueId: 312,
      eventRequirement: '',
      empDriveId: '',
      hostName: '',
      hostContact: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      cityId: '',
        stateCode: '',
      countryCode: 'IN',
      postalCode: '',
      // scheduledDate: '',
      // scheduledStartTime: '',
      createUserId: this.loginData.userId,
      updateUserId: '',
      companyId: this.loginData.companyId,
      empEventId: ''
    });

  }

  clearForm() {
    this.employerEventForm.reset({
      eventName: '',
      cgpa: '',
      eventTypeValueId: '',
      scheduledStartTime: '',
      scheduledDate: '',
      eventStatusValueId: 312,
      eventRequirement: '',
      empDriveId: '',
      hostName: '',
      hostContact: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      cityId: '',
      stateCode: '',
      countryCode: 'IN',
      postalCode: '',
      createUserId: this.loginData.userId,
      updateUserId: '',
      companyId: this.loginData.companyId,
      empEventId: ''
    });
    this.showCList = false;
    this.showHostDetails = false;
    // this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedEvent) {
      this.actionRead = true;
      this.readonly = true;
      this.actBtn = false;
      this.chList = true;
      this.times = true;

      this.fieldreadonly = true;
      this.saveBtn = false;

      this.dispHosts = function () {
        if (this.selectedEvent.eventTypeValueId === 310 || this.selectedEvent.eventTypeValueId === 311) {
          this.hosts = true;
        }
      };
      this.dispHosts();
      this.eventListEnable = true;
      this.eventList = true;

      this.employerEventForm.patchValue(this.selectedEvent);
      this.onSelect(this.employerEventForm.get('eventTypeValueId').value);
      const geteve = {
        'empEventId': this.selectedEvent.empEventId,
        'empDriveId': this.selectedEvent.empDriveId
      };
      this.event.getDataByEventAndDrive(geteve).subscribe((data: any) => {
        this.selectedCampusLists = data.data;
        this.switchButton();
        // if ((this.selectedEvent.eventStatusValueId === 314 || this.selectedEvent.eventStatusValueId === 316 ||
        //   this.selectedEvent.eventStatusValueId === 318) && this.selectedCampusLists[0].campusStatusValueId === 369) {
        //   this.actionRead = false;
        // }
        for (let i = 0; i < this.selectedCampusLists.length; i++) {
          const campId = this.selectedCampusLists[i].campusId;
          this.selectedCampusArray.push({
            'campusId': campId
          });
        }
      });
      // Event Actions
      console.log(JSON.stringify(this.selectedEvent));
      this.switchButton = function () {
        switch (this.selectedEvent.eventStatusValueId) {
          case 312:
            this.actionButton = 'Share the Event';
            this.actionData = 'Event Request to Campus';
            this.eventStatusNeedToChange = true;
            this.times = false;
            break;
          case 314:
            if (this.selectedCampusLists) {
              if (this.selectedEvent.eventStatusValueId === 314 &&  this.selectedCampusLists[0].campusStatusValueId === 369) {
                this.actionButton = 'Share students shortlisted';
                this.actionBtnDisable = true;
                this.times = false;

              } else {
                this.actionButton = 'Send Reminder – to accept/reject event';
                this.actionData = 20;
                this.eventStatusNeedToChange = true;
                this.times = false;

              }
            }
            break;
          case 315:
            this.actionButton = 'Close';
            this.actionData = 'Close';
            this.eventStatusNeedToChange = false;
            break;
          case 316:
            if (this.selectedCampusLists) {
              if (this.selectedEvent.eventStatusValueId === 316 &&  this.selectedCampusLists[0].campusStatusValueId === 369) {
                this.actionButton = 'Share students shortlisted';
                this.actionBtnDisable = true;
                this.times = false;

              } else {
                this.actionButton = 'Send Reminder - Student List';
                this.actionData = 15;
                this.eventStatusNeedToChange = true;
                this.times = false;

              }
            }
            break;
          case 317:
            this.actionButton = 'Share students shortlisted';
            this.actionData = 'Share Shortlisted Students';
            this.eventStatusNeedToChange = true;
            this.times = false;

            break;
          case 318:
            if (this.selectedCampusLists) {
              if (this.selectedEvent.eventStatusValueId === 318 &&  this.selectedCampusLists[0].campusStatusValueId === 369) {
                this.actionButton = 'Schedule';
                this.actionData = 'Scheduled';
                this.times = true;
              } else {
                this.actionButton = 'Send Reminder – for scheduling the event';
                this.actionData = 16;
                this.eventStatusNeedToChange = true;
                this.times = false;

              }
            }
            break;
          case 319:
            this.actionButton = 'In Progress';
            this.actionData = 'In Progress';
            this.eventStatusNeedToChange = false;
            break;
          case 320:
            this.actionButton = 'Close';
            this.actionData = 'Close';
            this.eventStatusNeedToChange = false;
            break;
          case 321:
            this.actBtn = true;
            break;
        }
      };
      this.switchButton();
    }

  }
  editList() {
    this.editBtnStatus = false;

    if (this.selectedCampusLists[0].campusStatusValueId === 369) {
      this.schedulereadonly = false;
    }
    this.readonly = false;
    this.btnUpdate = false;
    // this.times = true;

  }
  driveId(list) {
    this.empDriveId = list.empDriveId;
    this.jobId = list.jobRoleId;
    this.event.getJobPref(this.loginData.companyId, this.jobId).subscribe((data: any) => {
      this.jobDesc = data.data;
      if (this.employerEventForm.get('cgpa').value) {
        this.employerEventForm.patchValue({
          eventRequirement: this.jobDesc[0].jobRoleName + ', CGPA/Score: ' + this.employerEventForm.get('cgpa').value
        });
      } else {
        this.employerEventForm.patchValue({
          eventRequirement: this.jobDesc[0].jobRoleName
        });
      }

      this.fieldreadonly1 = false;
      this.employerDriveService.getDriveListByDrive(this.empDriveId, true).subscribe(data => {
        this.campusListData = data;
      });
    });

  }

  getEvent(event) {
    this.eventTypeOption = event;
    switch (event) {
      case 309:
        this.campusList = true;
        this.showCList = true;
        this.hosts = false;
        break;
      case 310:
        this.hosts = true;
        this.showHostDetails = true;
        this.campusList = false;
        this.getStateDet('IN');
        break;
      case 311:
        this.hosts = true;
        this.showHostDetails = true;
        this.campusList = true;
        this.showCList = true;
        this.getStateDet('IN');
        break;
    }
  }
/**
 * To append CGPA value to eventPreference
 * @memberof CreateEventComponent
 */
appendCgpaValueToPreference() {

  if (this.employerEventForm.get('eventRequirement').value && this.employerEventForm.get('cgpa').value) {

    if (this.driveList && this.selectedEvent) {
      for (let i = 0; i < this.driveList.length; i++) {
        if (this.driveList[i].empDriveId === this.selectedEvent.empDriveId) {
          this.event.getJobPref(this.loginData.companyId, this.driveList[i].jobRoleId).subscribe((data: any) => {
            this.jobDesc = data.data;
            if (this.jobDesc) {
              this.employerEventForm.patchValue({
                eventRequirement: this.jobDesc[0].jobRoleName + ', CGPA/Score: ' + this.employerEventForm.get('cgpa').value
              });
            }
            return;
          });
        }
      }
    } else {
      this.employerEventForm.patchValue({
        eventRequirement: this.jobDesc[0].jobRoleName + ', CGPA/Score: ' + this.employerEventForm.get('cgpa').value
      });
    }
  } else if (this.employerEventForm.get('cgpa').value == '' || this.employerEventForm.get('cgpa').value == null) {
    if (this.driveList && this.selectedEvent) {
      for (let i = 0; i < this.driveList.length; i++) {
        if (this.driveList[i].empDriveId === this.selectedEvent.empDriveId) {
          this.event.getJobPref(this.loginData.companyId, this.driveList[i].jobRoleId).subscribe((data: any) => {
            this.jobDesc = data.data;
            if (this.jobDesc) {
              this.employerEventForm.patchValue({
                eventRequirement: this.jobDesc[0].jobRoleName
              });
            }
            return;
          });
        }
      }
    } else {
      if (this.jobDesc) {
        this.employerEventForm.patchValue({
          eventRequirement: this.jobDesc[0].jobRoleName
        });
      }
    }


  }

}
// function for an event cancel.changes the eventStatus
  cancelEvent(status) {
    this.getEventStatus = status;
    this.getEventStatusChange.emit(status);
    this.router.navigated = false;
    this.location.back();
    // this.router.navigateByUrl('company/recruitment/employerEvent');
    console.log(JSON.stringify(this.getEventStatus));
  }
  afterSaveOrUpdate(status){
    this.getEventStatus = status;
    this.getEventStatusChange.emit(status);
    this.router.navigated = false;
    this.router.navigateByUrl('company/recruitment/employerEvent');
  }
  removeDuplicates(){
    if(this.eventListNames.length === 0 ){
  this.checkStatusName=true;
    }
    if (this.eventListNames.length > 0) {
      for (let k = 0; k < this.eventListNames.length; k++) {
        if(this.eventListNames[k].empEventId !== this.employerEventForm.value.empEventId){
        if (this.eventListNames[k].eventName.toLowerCase() === this.employerEventForm.value.eventName.toLowerCase()) {
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
  eventSubmit(event) {
    event.target.disabled = true;
    this.totalData = this.employerEventForm.value;
    delete this.totalData.scheduledStartTime;
    delete this.totalData.scheduledDate;
    this.removeDuplicates();
   if (this.checkStatusName) {
    this.saveEvent = function () {
      console.log('adf' + this.totalData.cgpa);
      this.totalData.cgpa = JSON.parse(this.totalData.cgpa);
      this.totalData.cityId = (this.totalData.cityId) ? JSON.parse(this.totalData.cityId) : undefined;
      delete this.totalData.updateUserId;
      delete this.totalData.empEventId;
      if (this.totalData.eventTypeValueId === 309) {
        delete this.totalData.cityId;
      }
      this.eventArray.push(this.totalData);
      const postEvent = {
        companyId : this.loginData.companyId,
        employerEvent: this.eventArray,
        employerEventPanel: this.employerEventPanel
      };
      this.event.createEvent(postEvent).subscribe(data => {
        this.eventResponse = data.data;
        for (let i = 0; i < this.checkListData.length; i++) {
          const checkDataCampusId = this.checkListData[i].campusId;
          this.event.getEmployercampus(checkDataCampusId, this.totalData.empDriveId).subscribe(data => {
            this.employercampusData = data;
            const sample = this.eventResponse[0].empEventId;
            this.employercampusData[0].empEventId = sample;
            this.event.editEmployerCampus(this.employercampusData[0]).subscribe(data => {
              this.editEmployercampusData = data;
              console.log('final' + JSON.stringify(this.editEmployercampusData));
              if (this.eventResponse) {
                // this.toastr.success('Event Saved Successfully! ', 'Success!');
                this.router.navigated = false;
                this.router.navigateByUrl('company/recruitment/employerEvent');
              }

            });
          });
        }
        if (this.eventResponse !== '') {
          this.toastr.success('Event Saved Successfully! ', 'Success!');
          this.afterSaveOrUpdate(false);
        }
      }, error => {
        if (error.status === 500) {
          this.toastr.error('Server Not Found!', 'Error!');
        }
        event.target.disabled = false;
      }
    );
    };


    this.saveEvent();
    // if (this.totalData.eventTypeValueId === 309 || this.totalData.eventTypeValueId === 311) {
    //   if (this.checkListData.length === 0) {
    //     alert('Please Select the Institutes');
    //   } else {
    //     this.saveEvent();
    //   }
    // } else {
    //   this.saveEvent();
    // }
  }else{
    event.target.disabled = false;
  }
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.employerEventForm.patchValue({
        scheduledStartTime: time,
      });
      // console.log(time);
    });
  }

  eventUpdate() {
    const dataupdated = this.employerEventForm.value;
    this.removeDuplicates();
    if(this.checkStatusName){
    // delete dataupdated.eventStatusValueId;
    if (this.selectedCampusLists[0].campusStatusValueId === 369) {
      console.log('unregister campus');
      if (this.selectedEvent.eventStatusValueId === 318) {
        if (dataupdated.scheduledDate) {
          dataupdated.scheduledDate = new Date(dataupdated.scheduledDate).getMonth() + 1  + '/' +
          new Date(dataupdated.scheduledDate).getDate() + '/' + new Date(dataupdated.scheduledDate).getFullYear();
        }
      }
    } else if (this.selectedCampusLists[0].campusStatusValueId === 367) {
      delete dataupdated.scheduledStartTime;
      delete dataupdated.scheduledDate;
    }
    delete dataupdated.cityId;
    this.updatedData.push(dataupdated);
    const updateData = {
      companyId : this.loginData.companyId,
      employerEvent: this.updatedData
    };
    this.event.updateEvent(updateData).subscribe((data: any) => {
      this.updatedEvent = data.data;
      if (this.updatedEvent) {
        this.toastr.success('Event Updated Successfully! ', 'Success!');
        this.eveList.eventTotData();
        this.afterSaveOrUpdate(false);
      }
    });
  }
}



  // event communication code starts

  actions() {

    switch (this.selectedEvent.eventStatusValueId) {
      case 312:
        this.eveActions = {
          'employerEventId': this.selectedEvent.empEventId,
          'action': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'employerPersonId': this.loginData.employerPersonId
        };
        break;
      case 314:
        this.eveActions = {
          'empEventId': this.selectedEvent.empEventId,
          'notificationName': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'role': this.loginData.role,
          'employerPersonId': this.loginData.employerPersonId,
          'campusList': this.selectedCampusArray
        };

        break;
      case 315:
        this.eveActions = {
          'employerEventId': this.selectedEvent.empEventId,
          'action': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'employerPersonId': this.loginData.employerPersonId
        };
        break;
      case 316:
        this.eveActions = {
          'empEventId': this.selectedEvent.empEventId,
          'notificationName': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'role': this.loginData.role,
          'employerPersonId': this.loginData.employerPersonId,
          'campusList': this.selectedCampusArray
        };
        break;
      case 317:
        this.eveActions = {
          'employerEventId': this.selectedEvent.empEventId,
          'action': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'employerPersonId': this.loginData.employerPersonId
        };
        break;
      case 318:
        if (this.selectedCampusLists[0].campusStatusValueId === 367) {
          this.eveActions = {
            'empEventId': this.selectedEvent.empEventId,
            'notificationName': this.actionData,
            'userId': this.loginData.userId,
            'companyId': this.loginData.companyId,
            'role': this.loginData.role,
            'employerPersonId': this.loginData.employerPersonId,
            'campusList': this.selectedCampusArray
          };
        } else if (this.selectedCampusLists[0].campusStatusValueId === 369) {
          if (this.selectedEvent.scheduledDate != null && this.selectedEvent.scheduledStartTime != null) {
              this.eveActions = {
                'employerEventId': this.selectedEvent.empEventId,
                'action': this.actionData,
                'userId': this.loginData.userId,
                'companyId': this.loginData.companyId,
                'employerPersonId': this.loginData.employerPersonId
              };
          } else {
            this.toastr.warning('Scheduled Date/StartTime Should Not be Empty!', 'Alert!');
            return;
          }
        }
        break;
      case 319:
        this.eveActions = {
          'employerEventId': this.selectedEvent.empEventId,
          'action': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'role': this.loginData.role,
          'employerPersonId': this.loginData.employerPersonId,
          'campusList': this.selectedCampusArray
        };
        break;
      case 320:
      const todayDate = new Date();
      // need to add one to get current month as it is start with 0
      const todayDateText = todayDate.getMonth() + 1 + '/' +  todayDate.getDate() + '/' + todayDate.getFullYear();
      // Convert both input to date type
      const inputToDate = Date.parse(this.selectedEvent.scheduledDate);
      const todayToDate = Date.parse(todayDateText);
      console.log(inputToDate);
      if (todayToDate > inputToDate) {
        this.eveActions = {
          'employerEventId': this.selectedEvent.empEventId,
          'action': this.actionData,
          'userId': this.loginData.userId,
          'companyId': this.loginData.companyId,
          'role': this.loginData.role,
          'employerPersonId': this.loginData.employerPersonId
        };
      } else {
        this.toastr.warning('You Can Not Close The Event!', 'Alert!');
        return;
      }
        break;
    }

    if (this.selectedEvent.eventStatusValueId === 314 ||
        this.selectedEvent.eventStatusValueId === 316 ||
        (this.selectedEvent.eventStatusValueId === 318 && this.selectedCampusLists[0].campusStatusValueId !== 369)) {
      this.event.notify(this.eveActions).subscribe(data => {
        this.eventActionResponce = data;
        if (this.eventActionResponce) {
          this.toastr.success('Notification Sent Successfully! ', 'Success!');
          this.eventDataToPatch();
        }
      });
    } else {
      this.event.eventActions(this.eveActions).subscribe(data => {
        this.eventActionResponce = data;
        if (this.eventActionResponce) {
          this.toastr.success('Event Updated Successfully! ', 'Success!');
          this.eventDataToPatch();
        }
      });
    }
  }
}

