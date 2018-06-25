import { Component, Directive, OnInit , ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {FormControl, FormGroup, Validators,  FormBuilder , NgForm} from '@angular/forms';
// import {campusUploadService} from '../upload.service';
import {CampusUploadService} from '../../../../services/shared/upload/campus-upload/campus-upload.service';
import {CampusDataUploadComponent} from '../../../campus/campus-data-upload/campus-data-upload.component';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LookupvalueService } from '../../../../services/shared/lookupvalue.service';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
import {saveAs as importedSaveAs} from 'file-saver';
@Component({
  selector: 'app-campus-upload-file',
  templateUrl: './campus-upload-file.component.html',
  styleUrls: ['./campus-upload-file.component.css'],
})
export class CampusUploadFileComponent implements OnInit {
  unregisteredEvents: any;
  DocumentTypeLookup: any;

  campusUploadDocTypes: any= [];
  campusProgramType: any= [];
  option: number;
  loginData: any;
  upObj: any= {};
  fileName: string;
  campusDepartments: any= [];
  campusPrograms: any= [];
  uploadRes: any= {};

  formData: FormData = new FormData();

  constructor(private cookieService: CookieService,
    public campusDataUploadComponent: CampusDataUploadComponent,
    private _router: Router,
    private lookupvalueService: LookupvalueService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookUpGet: LookUpGetAndSetLocalSrorage,
    private viewContainerRef: ViewContainerRef,
    private campusUploadService: CampusUploadService) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
     }

  ngOnInit() {
    // to get current user Data
    this.loginData = this.cookieService.getObject('loginResponce');
    this.fileName = '';

      // getting campus documentType data from look up table
      this.DocumentTypeLookup = this.lookupvalueService.getCampusDocumentTypeLookup();
      this.loadDocumentTypeArrayLookups();
      // this.campusUploadService.getCampusDocumentTypeValue().subscribe(data => this.campusUploadDocTypes = data);
      this.campusUploadService.getCampusProgramTypeValue().subscribe(data => this.campusProgramType = data);
      this.getCampusDepartments();
      this.getCampusUnregisteredEvents();
      // this.getCampusDeptPrograms();

  }

  loadDocumentTypeArrayLookups() {
    if (this.DocumentTypeLookup) {
      this.campusUploadDocTypes = [];
      for (const key in this.DocumentTypeLookup) {
       if (this.DocumentTypeLookup.hasOwnProperty(key)) {
         this.campusUploadDocTypes.push(this.DocumentTypeLookup[key]);
       }
      }
    }
  }

  onSelect(option: number) {
    this.option = option;
  }

  getCampusDepartments() {
    this.campusUploadService.geDepartmentDetails(this.loginData.campusId).subscribe((data: any) => {
      this.campusDepartments = data.data;
    });
  }

  getCampusDeptPrograms(deptId) {
    this.campusUploadService.getProgramDetails(this.loginData.campusId, deptId).subscribe((data: any) => {
      this.campusPrograms = data.data;
    });
  }

  getCampusUnregisteredEvents() {
    this.campusUploadService.getUnregisteredEvents(this.loginData.campusId).subscribe((res: any) => {
      this.unregisteredEvents = res.data;
    });
  }

  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    this.fileName = fileDetails.name;
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
  }
  downloadFile() {
    if (this.upObj.campusUploadTypeValueId) {
    const typeValue = this.upObj.campusUploadTypeValueId;
    const lookUpdata = this.lookUpGet.getLookUpData('CAMPUS_UPLOAD_TYPE', undefined);
    const fileNameData = lookUpdata[typeValue].lookupValue;
    this.campusUploadService.downloadSampleCsv(fileNameData).subscribe((responseData) => {
      this.toastr.success('File Downloaded Sucessfully');
      importedSaveAs(responseData, fileNameData + '.csv');
    });
  } else {
    this.toastr.error('Please choose a document Type');
  }
  }
  // To Extract the file Extension from File Name.
  getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  // method to submit uploaded file
  submitFile(campusUploadform: NgForm) {
    this.upObj.campusId = this.loginData.campusId;
    const fileExt = this.getFileExtension(this.fileName);

    // should accept csv file extension only..
    if (fileExt === 'csv') {
      this.campusUploadService.uploadCampusDatasource(this.formData)
      .subscribe(
        response => {
          console.log('UPLOADING success' + JSON.stringify(response));
          this.toastr.success('File Successfully Uploaded!', 'Success!');
          this.uploadRes = response;
          this.upObj.fileDetails = {
            name: this.uploadRes.data.result.files.fileDetails[0].name,
            originalFileName: this.uploadRes.data.result.files.fileDetails[0].originalFilename,
            container: this.uploadRes.data.result.files.fileDetails[0].container
          };
          if (this.upObj.campusUploadTypeValueId === 371) {
            // sending csv file request to api
            this.campusUploadService.sendStudentEnrollementCsvRequest(this.upObj)
            .subscribe(
              resp => {
                this.toastr.success('Records Successfully Inserted!', 'Success!');
                this.option = undefined;
                this.fileName = '';
                this.formData = new FormData();
                campusUploadform.resetForm();
                this.campusDataUploadComponent.getCampusUploadedList();
              },
              error => {
                console.log('error', error);
                if (error.status === 422) {
                  this.toastr.error('Invalid Records Found,Change Unique Fields& Try Again!', 'Oops!');
                } else if (error.status === 500) {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                } else {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                }
                // alert('error');
              });
          } else if (this.upObj.campusUploadTypeValueId === 372) {
            this.campusUploadService.sendStudentAssessmentCsvRequest(this.upObj)
            .subscribe(
              resp => {
                this.toastr.success('Assessment File Successfully Uploaded!', 'Success!');
                this.option = undefined;
                this.fileName = '';
                this.formData = new FormData();
                campusUploadform.resetForm();
                this.campusDataUploadComponent.getCampusUploadedList();
              },
              error => {
                if (error.status === 422) {
                  this.toastr.error('Invalid Records Found,Change Unique Fields& Try Again!', 'Oops!');
                } else if (error.status === 500) {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                } else {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                }
              });
          } else if (this.upObj.campusUploadTypeValueId === 373) {
            this.campusUploadService.sendPlacementAggregatesCsvRequest(this.upObj)
            .subscribe(
              resp => {
                this.toastr.success('Aggregates File Successfully Uploaded!', 'Success!');
                this.option = undefined;
                this.fileName = '';
                this.formData = new FormData();
                campusUploadform.resetForm();
                this.campusDataUploadComponent.getCampusUploadedList();
              },
              error => {
                if (error.status === 422) {
                  this.toastr.error('Invalid Records Found,Change Unique Fields& Try Again!', 'Oops!');
                } else if (error.status === 500) {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                } else {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                }
              });
          } else if (this.upObj.campusUploadTypeValueId === 513) {
            console.log('.....' + JSON.stringify(this.upObj));
            this.upObj.userId = this.loginData.userId;
            this.upObj.educationPersonId = this.loginData.educationPersonId;
            this.campusUploadService.sendEventStudentShortlistCsvRequest(this.upObj)
            .subscribe(
              resp => {
                this.toastr.success('Event Student Shortlist Successfully Uploaded!', 'Success!');
                this.option = undefined;
                this.fileName = '';
                this.formData = new FormData();
                campusUploadform.resetForm();
                this.campusDataUploadComponent.getCampusUploadedList();
              },
              error => {
                if (error.status === 422) {
                  this.toastr.error('Invalid Records Found,Change Unique Fields& Try Again!', 'Oops!');
                } else if (error.status === 500) {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                } else {
                  this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                }
              });
          } else {
              alert('----------');
          }
        },
        error => {
          this.toastr.warning('Container Not Found!', 'Alert!');
          console.log('error', error);
        });
    } else {
      this.toastr.warning('Must Select CSV File!', 'Alert!');
    }

  }

  // cancel uploading file
  cancelSubmitFile(campusUploadform: NgForm) {
    campusUploadform.resetForm();
    this.fileName = '';
    this.formData = new FormData();
    this.option = null;
  }

}

