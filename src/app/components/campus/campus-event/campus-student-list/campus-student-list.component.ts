import { Component, OnChanges, OnInit, Input, Output, SimpleChanges, Inject,
  ViewContainerRef, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {CampusEventStudentListService} from '../../../../services/shared/widgets/eventStudentList/campus-event-student-list.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import { LookupvalueService } from './../../../../services/shared/lookupvalue.service';
import {CampusUploadDocService} from '../../campus-data-upload/campus-upload-doc.service';
import {saveAs as importedSaveAs} from 'file-saver';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-campus-student-list',
  templateUrl: './campus-student-list.component.html',
  styleUrls: ['./campus-student-list.component.css'],
})
export class CampusStudentListComponent implements OnInit, OnChanges {
  totalcount: any;
  deleteArrayData: any = [];
  statusDisplay: boolean;
  intrestsData: any;
  skillsData: any;
  intrests: any;
  skills: any;
  sentData: any;
  compensationDetail: any;
  filteredDriveStatus: any;
  updatedData: any;
  studentStatus: any;
  showStudentExportBtn =  false;
  loginData: any;
  studentStatusObject: any;
  @Input() selectedEventData;
  @Input() deleteButton;
  @Output() searchResult: EventEmitter<any> = new EventEmitter();
  @Output() disableShareButton = new EventEmitter<boolean>();
  data: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'firstName';
  public sortOrder = 'asc';
  constructor(
    private studentEvent: CampusEventStudentListService,
    private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private campusUploadDocService: CampusUploadDocService,
    private lookupValue: LookupvalueService,
    public dialog: MatDialog,
    private status: LookUpGetAndSetLocalSrorage){ }

  ngOnInit() {
    this.studentStatusObject = this.status.getLookUpData('CANDIDATE_STATUS_TYPE', null);
    this.skillsData = this.status.getLookUpData('SKILL_TYPE_CODE', null);
    this.intrestsData = this.status.getLookUpData('INTEREST_TYPE_CODE', null);
    this.studentStatus = this.lookupValue.getLookupArray('CANDIDATE_STATUS_TYPE');
    this.loadFilterDriveStatus();
    this.loginData = this.cookieService.getObject('loginResponce');
  }

  loadFilterDriveStatus() {
    this.filteredDriveStatus = this.studentEvent.getCampusCandidateStatusArray(
      this.studentStatus, this.selectedEventData.eventStatusValueId);
  }

  //removeFromEvent(dataOfStudent, index) {
  //  this.openModal(dataOfStudent, index);
    // if(true){
    // console.log('removeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', dataOfStudent);
    // // this.studentEvent.removeStudentFromEvent(dataOfStudent.status.studentListId).subscribe(updatedData => {
    //   // this.updatedData = updatedData;
    //   this.statusDisplay = false;
    //   this.searchResult.emit(false);
    //   this.deleteArrayData.push(this.data[index].status);
    //   this.data.splice(index, 1);
    //   this.studentEvent.setDeleteStudents(this.deleteArrayData);
    // // });
    // }
 // }
  ngOnChanges(changes: SimpleChanges) {
    console.log('deleteee', this.deleteButton);
    if (this.selectedEventData) {
    //  alert(JSON.stringify(this.selectedEventData));
      this.studentEvent.getStudentDetailsByEventId(this.selectedEventData.campusEventId).subscribe(data => {
        this.data = data;
        if (this.data.length > 0) {
          this.disableShareButton.emit(false);
          this.showStudentExportBtn = true;
      } else {
        this.disableShareButton.emit(true);
        this.showStudentExportBtn = false;
      }
        console.log('selectedEventData' + JSON.stringify(this.selectedEventData));
        console.log('qwe' + JSON.stringify(this.data));
        this.totalcount=this.data.length;
      });
      this.studentStatus = this.lookupValue.getLookupArray('CANDIDATE_STATUS_TYPE');
      this.loadFilterDriveStatus();
    }
   }

   // To export student list
  exportStudentList() {
    this.studentEvent.getExportStudentPath(this.selectedEventData.campusEventId).subscribe((data: any) => {
      console.log(JSON.stringify(data));
      if (data) {
        const location = data.exportPath;
        const updateLocation = location.substr(1);
        const containerName = 'scora-campus-upload';
        // const fileName = location.replace(/^.*[\\\/]/, '');
        const fileName = location;
// console.log('filenameeeeeeeeeeeeeeeeeee ', fileName);
        this.campusUploadDocService.exportStudentListFile(fileName, containerName)
        .subscribe(
          resp => {
            // console.log('do' + JSON.stringify(resp));
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

  changeStatus(status) {
        // flag to differentiate whether the status update is for offer vs other
        let compensationFlag = false;
        console.log('status' + JSON.stringify(status));
        // If not offered then call the statusUpdate function
        if (status.candidateStatusValueId !== 381) {
          this.statusUpdate(status, compensationFlag);
        } else {

        // If offered then fetch compensation package details and then call pop-up box
        // this.studentEvent.getCompensationDetails(status.campusEventId, status.campusId)
        // .subscribe(res => {
        //   this.compensationDetail = res.data;
        //   this.compensationDetail = this.compensationDetail.map(function(compensationItem) {
        //     return { compensationName: compensationItem.compPackageName, compensationValue: compensationItem.compPackageId };
        //   });
        // });

        // Calling pop up box to opens
        this.openDialog(status);

      }
    }

      statusUpdate(status, compensationFlag) {
        let statusDataToSend = {};
        // if(compensationFlag===true){

        // }

        statusDataToSend['studentListId']  = status.studentListId;
        statusDataToSend['totalCompValue'] = status.totalCompValue;
        statusDataToSend['campusId'] = status.campusId;
        statusDataToSend['candidateStatusValueId'] = status.candidateStatusValueId;
        statusDataToSend['userId'] = this.loginData.userId;
        statusDataToSend['educationPersonId'] = this.loginData.educationPersonId;

        this.studentEvent.updateEventAction(statusDataToSend).subscribe(data => {
          this.sentData = data;
            this.toastr.success('Student Status Successfully Updated!', 'Success!');
        },
          error => {
            console.log('error', error);
          }
        );

      }

      openDialog(status): void {
        const  dialogRef = this.dialog.open(CampusOfferDropDownComponent, {
          width: '450px',
          // data: compensationDetail,
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            status.totalCompValue = result;
            let compensationFlag = true;
            this.statusUpdate(status, compensationFlag);
          } else {
            this.studentEvent.getStudentDetailsByEventId(this.selectedEventData.campusEventId).subscribe(data => {
              this.data = data;
              if (this.data.length > 0) {
                this.showStudentExportBtn = true;
            } else {
              this.showStudentExportBtn = false;
            }
              console.log('selectedEventData' + JSON.stringify(this.selectedEventData));
              console.log('qwe' + JSON.stringify(this.data));
              this.totalcount=this.data.length;
            });
          }
        });
      }
      openModal(dataOfStudent, index) {
        const  dialogRef = this.dialog.open(DeleteDialogComponent, {
          hasBackdrop: true,
          width: '260px',
          data: { message: 'Are you sure you want to delete ?'}
        });
        dialogRef.afterClosed().subscribe((result: string) => {
          if (result) {
            console.log('removeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', dataOfStudent);
            // this.studentEvent.removeStudentFromEvent(dataOfStudent.status.studentListId).subscribe(updatedData => {
              // this.updatedData = updatedData;
              this.statusDisplay = false;
              this.searchResult.emit(false);
              this.deleteArrayData.push(this.data[index].status);
              this.data.splice(index, 1);
              this.studentEvent.setDeleteStudents(this.deleteArrayData);
            // });
            }
        // dialogRef = null;
       });
     }
}


// The following component is responsible for pop-up when candidate status is selected as offered
@Component({
  selector: 'app-offer-drop-down',
  templateUrl: './offer-drop-down.html',

})
export class CampusOfferDropDownComponent {
  totalCompValue: number;

  constructor(
    public dialogRef: MatDialogRef<CampusOfferDropDownComponent>,
    ) { }
// @Inject(MAT_DIALOG_DATA) public data: any;
  onNoClick(): void {
   this.dialogRef.close();
  }

}
@Component({
  selector: 'app-delete-dialog',
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
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
   }
 

}
