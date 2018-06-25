import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventStudentListService } from '../../../../services/shared/widgets/studentList/event-student-list.service';
import { CookieService } from 'angular2-cookie/core';
import {
  StudentEventStatus,
  OfferDropDownModel
} from './student-event-status.model';
// import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ToastrService } from 'ngx-toastr';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import {CampusUploadDocService} from '../../../campus/campus-data-upload/campus-upload-doc.service';
import {saveAs as importedSaveAs} from 'file-saver';
@Component({
  selector: 'app-event-student-list',
  templateUrl: './event-student-list.component.html',
  styleUrls: ['./event-student-list.component.css'],
})
export class EventStudentListComponent implements OnInit, OnChanges {
  showStatus: boolean;
  newvalue: any;
  intrestData: any;
  skillsData: any;
  lookupData: any;
  oldValue: any;
  @Input() empEvent;
  data: any;
  empDriveStat: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  compensationValue: number;
  compensationDetail: any = [];
  sentData: any;
  studentId: any;
  empDriveStatus: any = [];
  filteredDriveStatus: any = [];
  showStudentExportBtn =  false;
  loginData: any;

  constructor(
    private campusUploadDocService: CampusUploadDocService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private viewContainerRef: ViewContainerRef,
    private eventStudentList: EventStudentListService,
    public dialog: MatDialog,
    public lookUp: LookUpGetAndSetLocalSrorage
  ) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
 }

  ngOnInit() {
    // Fetch employee event status
    this.lookupData = this.lookUp.getLookUpData('CANDIDATE_STATUS_TYPE', null);
    this.skillsData = this.lookUp.getLookUpData('SKILL_TYPE_CODE', null);
    this.intrestData = this.lookUp.getLookUpData('INTEREST_TYPE_CODE', null);
    if (this.empEvent.eventStatusValueId !== 321) {
    this.eventStudentList.getEmpStatusCode().subscribe(data => {this.empDriveStatus = data;
      console.log('....ded' + this.empEvent.eventStatusValueId + ';;;;' + JSON.stringify(this.empDriveStatus));
    this.filteredDriveStatus = this.eventStudentList.getCandidateStatusArray(this.empDriveStatus, this.empEvent.eventStatusValueId);
    });
    this.loginData = this.cookieService.getObject('loginResponce');
  }
  }

  ngOnChanges(changes: SimpleChanges) {
    // The statement will fetch the studentlist based on emp-eventId
    this.eventStudentList
    .getCollegeListDetails(this.empEvent.empEventId)
    .subscribe(
      data => {
        this.data = data;
        if (this.data.length > 0) {
            this.showStudentExportBtn = true;
        } else {
          this.showStudentExportBtn = false;
        }
      },
      error => {
        console.log('error', error);
      }
    );
  this.filteredDriveStatus = this.eventStudentList.getCandidateStatusArray(
    this.empDriveStatus,
    this.empEvent.eventStatusValueId
  );
  if (this.empEvent.eventStatusValueId !== 321) {
    this.eventStudentList.getEmpStatusCode().subscribe(data => {this.empDriveStatus = data;
      this.filteredDriveStatus = this.eventStudentList.getCandidateStatusArray(this.empDriveStatus, this.empEvent.eventStatusValueId);
    });
   }
  }
  /**
   * This function is responsible for exporting the student list
   */
  exportStudentList() {
    this.eventStudentList.getExportStudentPath(this.empEvent.empEventId).subscribe((data: any) => {
      console.log(JSON.stringify(data));
      if (data) {
        const location = data.exportPath;
        const updateLocation = location.substr(1);
        const containerName = 'scora-company-upload';
        const fileName = location.replace(/^.*[\\\/]/, '');

        this.campusUploadDocService.exportStudentListFile(fileName, containerName)
        .subscribe(
          resp => {
            this.toastr.success('File Successfully Downloaded!', 'Success!');
            importedSaveAs(resp, fileName);
          },
          error => {
            this.toastr.error('File Not Found!', 'Oops!');
            console.log('error', error);
          });
      }
    });
  }

  /**
   * A wrapper function for statusUpdate
   * It differentitate whether the status update is for 'OFFER' vs other status updates
   *
   * @param {any} status Status is the object that contains input for {compensationpackage, employerEventId, StudentListID, CompanyId}
   * @memberof EventStudentListComponent
   */
  changeStatus(status) {
    // flag to differentiate whether the status update is for offer vs other
    const compensationFlag = false;
    this.showStatus = true;
    // If not offered then call the statusUpdate function
    if (status.candidateStatusValueId !== 381) {
      this.statusUpdate(status, compensationFlag);
    } else {
      // If offered then fetch compensation package details and then call pop-up box
      this.eventStudentList
        .getCompensationDetails(status.employerEventId, status.companyId)
        .subscribe((res: any) => {
          this.compensationDetail = res.data;
          this.compensationDetail = this.compensationDetail.map(function(
            compensationItem
          ) {
            return {
              compensationName: compensationItem.compPackageName,
              compensationValueId: compensationItem.compPackageId,
            };
          });

          // Calling pop up box to open
          this.openDialog(status, this.compensationDetail);
        });
    }
  }
  /**
   * This function is responsible for updating the status of a student
   *
   * @param {any} status Status is the object that contains input for {compensationpackage, employerEventId, StudentListID, CompanyId}
   * @param {any} compensationFlag Differentiate between offerStatus update vs other StatusUpdate
   * @memberof EventStudentListComponent
   */
  statusUpdate(status, compensationFlag) {
    const statusDataToSend = {};
    if (compensationFlag === true) {
      statusDataToSend['compPackageId'] = status.compPackageId;
    }
    statusDataToSend['studentListId']  = status.studentListId;
    statusDataToSend['studentId']  = status.studentId;
    statusDataToSend['employerEventId'] = status.employerEventId;
    statusDataToSend['companyId'] = status.companyId;
    statusDataToSend['status'] = status.candidateStatusValueId;
    statusDataToSend['userId'] = this.loginData.userId;
    statusDataToSend['employerPersonId'] = this.loginData.employerPersonId;
    statusDataToSend['campusEventId'] = status.campusEventId;

    this.eventStudentList.updateEventAction(statusDataToSend).subscribe(data => {
      this.sentData = data;
      if (this.sentData) {
        this.eventStudentList.getCollegeListDetails(this.empEvent.empEventId)
        .subscribe(
          studentData => {
           this.data = studentData;
           this.toastr.success('Student Status Updated Successfully!', 'Success!');
          });
      }
    },
      error => {
        console.log('error', error);
      }
    );
  }

  /**
   * Will open a popup when the candidate status is selected as Offered
   *
   * @param {any} status
   * @param {any} compensationDetail
   * @memberof EventStudentListComponent
   */
  openDialog(status, compensationDetail): void {
    const dialogRef = this.dialog.open(OfferDropDownComponent, {
      width: '450px',
      data: compensationDetail
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      status.compPackageId = result;
      let  compensationFlag = true;
      this.statusUpdate(status, compensationFlag);
      }else {
        this.eventStudentList
    .getCollegeListDetails(this.empEvent.empEventId)
    .subscribe(
      data => {
        this.data = data;
        if (this.data.length > 0) {
            this.showStudentExportBtn = true;
        } else {
          this.showStudentExportBtn = false;
        }
      },
      error => {
        console.log('error', error);
      }
    );
    }
    });
  }
}
// The following component is responsible for pop-up when candidate status is selected as offered
@Component({
  selector: 'app-offer-drop-down',
  templateUrl: './offer-drop-down.html'
  // providers: [EventStudentListComponent]
})
export class OfferDropDownComponent {
  selectedCompensationValue: string;

  constructor(
    public dialogRef: MatDialogRef<OfferDropDownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();

  }
}
