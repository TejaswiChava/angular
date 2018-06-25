import { id } from '@swimlane/ngx-charts/release/utils';
import { Component, OnChanges, SimpleChanges, SimpleChange, Inject, Input, OnInit } from '@angular/core';
import { StudentForm, EventInfo, StudentFilterInput } from '../student-management.model';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccordionModule } from 'ng2-accordion';
import { LookupvalueService } from '../../../../../services/shared/lookupvalue.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../../lookup.service';
import { StudentManagementService } from '../student-management.service';
import { EmptyResponseService } from '../../../../../services/shared/empty-response/empty-response.service';
import {CookieService} from 'angular2-cookie/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-student-search-result',
  templateUrl: './student-search-result.component.html',
  styleUrls: ['./student-search-result.component.css']
})
export class StudentSearchResultComponent implements OnInit, OnChanges {
  selectedRow: any;
  studentEventsFlag: boolean;
  eventsLength: any;
  loginData: any;
  candidateValue: boolean;
  decideRemove: any;
  offeredStatusId: any;
  status: any;
  dataFilter: any;
  data: any[];
  previousId: any[];

  @Input() studentSearchResult: StudentForm[];
  @Input() campusId: number;
  @Input() searchData: any;
  latestSearchResult = this.studentSearchResult;
  studentDetails: StudentForm[];
  selectedStudentEventDetails: any;
  // studentDetails = this.studentSearchResult;
  inProgressId: any;
  eventsInfo: any;
  skills: any = [];
  interests: any = [];
  programs: any = [];
  studentInput: any = {};
  studentName: string;
  value: any;
  events = true;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  private searchCount: number;
  private filterSearchCount = 0;
  public setFilterCount = false;

  constructor(
    private lookUpValue: LookupvalueService,
    private lookUp: LookUpGetAndSetLocalSrorage,
    private studentSearchService: StudentManagementService,
    private emptyResponseService: EmptyResponseService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');

    this.getSkills();
    this.getInterest();
    this.getProgram(this.campusId);
  }

  ngOnChanges(changes: SimpleChanges) {
    const data1: SimpleChange = changes.studentSearchResult;
    this.data = data1.currentValue;
    this.resetFilter();
    this.setSearchCount(this.data.length);
  }
  onSelect(studentName, events: EventInfo, selectedIndex): void {
    this.eventsInfo = events;
    this.selectedStudentEventDetails = this.searchData[selectedIndex].eventDetails.events;
    // console.log('this.selectedStudentDetails', this.selectedStudentEventDetails);
    this.noEvent();
    this.selectedRow = selectedIndex;
    this.setStudentName(studentName);
    this.events = true;
    this.candidateValue =  this.studentSearchService.removeButton(this.eventsInfo);
  }
  // Method to display message if student is not part of any event
  noEvent() {
    this.eventsLength = this.eventsInfo.length;
    if (this.eventsLength === 0) {
      this.studentEventsFlag = true;
    } else {
      this.studentEventsFlag = false;
    }
  }

  getSearchCount() {
    return this.searchCount;
  }

  setSearchCount(value: number) {
    this.searchCount = value;
  }

  getFilterSearchCount() {
    return this.filterSearchCount;
  }

  setFilterSearchCount(value: number) {
    this.filterSearchCount = value;
  }

  getInputSkills() {
    return this.studentInput.skills;
  }

  getInputInterests() {
    return this.studentInput.interest;
  }

  getInputProgram() {
    return this.studentInput.programType;
  }

  setStudentName(studentName) {
    this.studentName = studentName;
  }


  filter() {
    let result = this.studentSearchResult;
    let inputSkills = this.getInputSkills();
    inputSkills = this.emptyResponseService.sterilize(inputSkills);
    let inputInterest = this.getInputInterests();
    inputInterest = this.emptyResponseService.sterilize(inputInterest);
    let inputProgram = this.getInputProgram();
    inputProgram = this.emptyResponseService.sterilize(inputProgram);
    if (inputSkills.length > 0) {
      result = this.studentSearchService.filterSkills(result, inputSkills);
    }
    if (inputInterest.length > 0) {
      result = this.studentSearchService.filterInterestfunction(result, inputInterest);
    }
    if (inputProgram.length > 0) {
      result = this.studentSearchService.filterProgramfunction(result, inputProgram);
    }
    this.setStudentDetials(result);
      if ( inputSkills.length === 0 && inputInterest.length === 0 && inputProgram.length === 0 ) {
        this.setFilterCount = false;
      }
  }

  removeFromEvent(events, index) {

    const  dialogRef = this.dialog.open(RemoveStudentsDialogComponent, {
      hasBackdrop: true,
      width: '275px',
      data: { message:
        `This will change the student\'s Availability Status to Unavailable and this action can\'t be Reverted.
         Are you sure you want to Proceed?`}
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        console.log(JSON.stringify(events));
        const eventDetails = {
        'studentListId': events.studentListId,
        'employerEventId': events.employerEventId,
        'campusId': events.campusId,
        'campusEventId': events.eventId,
        'educationPersonId': this.loginData.educationPersonId,
        'userId': this.loginData.userId
      };
      this.studentSearchService.removeFromEvents(eventDetails).subscribe(data => {
      console.log('res', data);
      this.selectedStudentEventDetails[index].campusPublishInd = 'N';
      // this.eventsInfo.splice(index, 1);
      this.noEvent();
    });
        // });
    }
    // dialogRef = null;
   });
  }

  resetFilter() {
    this.studentInput = {};
    this.data = this.studentSearchResult;
    this.events = false;
    this.setFilterSearchCount(0);
    this.setFilterCount = false;
  }


  setStudentDetials(newStudentDetails) {
    this.data = newStudentDetails;
    this.setFilterSearchCount(this.data.length);
    this.setFilterCount = true;
  }

getSkills() {
  this.skills = this.lookUpValue.getLookupSorted('SKILL_TYPE_CODE');
}

getInterest() {
  this.interests = this.lookUpValue.getLookupSorted('INTEREST_TYPE_CODE');
}


getProgram(campusId: number) {
  this.studentSearchService.getProgramEvents(campusId)
    .subscribe(
    (res: any) => {
      this.programs = res.data;
    },
    (error) => console.log(error)
    );
}

}

@Component({
  selector: 'app-remove-students-dialog',
  template: `
    <p> {{ data.message }} </p>
    <button mat-button color="primary"  [mat-dialog-close]="data">
      Yes
    </button>
    <button mat-button color="primary" (click)="onNoClick()">
    No
  </button>
    `
})
export class RemoveStudentsDialogComponent {
  constructor(public dialogRef: MatDialogRef<RemoveStudentsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
   }

}
