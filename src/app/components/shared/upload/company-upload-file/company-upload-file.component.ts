import { Component, Directive, OnInit , ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {FormControl, FormGroup, Validators,  FormBuilder , NgForm} from '@angular/forms';
// import {companyUploadService} from './upload.service';
import {CompanyUploadService} from '../../../../services/shared/upload/company-upload/company-upload.service';
import {CompanyDataUploadComponent} from '../../../company/company-data-upload/company-data-upload.component';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {saveAs as importedSaveAs} from 'file-saver';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';

@Component({
  selector: 'app-company-upload-file',
  templateUrl: './company-upload-file.component.html',
  styleUrls: ['./company-upload-file.component.css'],
})
export class CompanyUploadFileComponent implements OnInit {

  companyUploadDocTypes: any= [];
  option: number;
  loginData: any;
  upObj: any= {};
  comapnyUpObj: any= {};
  fileName: string;
  companyEvents: any= [];
  cmpUploadRes: any;

  formData: FormData = new FormData();

  constructor(private cookieService: CookieService,
    public companyDataUploadComponent: CompanyDataUploadComponent,
    private _router: Router,
    private lookUpGet: LookUpGetAndSetLocalSrorage,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private companyUploadService: CompanyUploadService) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
     }

  ngOnInit() {
    // to get current user Data
    this.loginData = this.cookieService.getObject('loginResponce');
    this.fileName = '';

      this.companyUploadService.getCompanyDocumentTypeValue().subscribe(data => this.companyUploadDocTypes = data);
      this.getCompanyEventLists();

  }

  onSelect(option: number) {
    this.option = option;
  }



  getCompanyEventLists() {
    this.companyUploadService.getCompanyEvents(this.loginData.companyId).subscribe(data => {
      this.companyEvents = data;
    });
  }

  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    // this.fileName = '';
    this.fileName = fileDetails.name;

    // const fileDetails = fileInput[0];
    // console.log('fileDetails success'+JSON.stringify(fileDetails));
    // const inputfile = fileInput.target.className;
    // console.log('classname--' + inputfile);
    // const label	 = fileInput.target.nextElementSibling, labelVal = label.innerHTML;
    // console.log('label--' + label);

    // if ( this.fileName ) {
    //   label.querySelector( 'div' ).innerHTML = this.fileName;
    // } else {
    //   label.querySelector( 'div' ).innerHTML = 'Click Here For';
    // }

    // console.log('fileName........'+this.fileName);
    this.formData.append('fileDetails', fileDetails, fileDetails.name);
  }

  // To Extract the file Extension from File Name.
  getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }


  // cancel uploading file
  cancelSubmitFile(campusUploadform: NgForm) {
    campusUploadform.resetForm();
    // this.fileName = '';
    this.fileName = '';
    this.formData = new FormData();
    this.option = null;
  }

  submitCompanyFile(companyUploadform: NgForm) {
    // console.log('llllllllllllllll'+JSON.stringify(this.comapnyUpObj));
    this.comapnyUpObj.companyId = this.loginData.companyId;
    const fileExt = this.getFileExtension(this.fileName);
      // should accept following file names only..
      if (fileExt === 'csv') {
        this.companyUploadService.uploadCompanyDatasource(this.formData)
        .subscribe(
          response => {
            // console.log('company uploading success'+JSON.stringify(response));
            this.toastr.success('File Successfully Uploaded!', 'Success!');
            this.cmpUploadRes = response;
            this.comapnyUpObj.fileDetails = {
              name: this.cmpUploadRes.data.result.files.fileDetails[0].name,
              originalFileName: this.cmpUploadRes.data.result.files.fileDetails[0].originalFilename,
              container: this.cmpUploadRes.data.result.files.fileDetails[0].container
            };
            // console.log('commmmm doc'+JSON.stringify(this.comapnyUpObj));
            if (this.comapnyUpObj.compUploadTypeValueId === 374) {
              // sending csv file request to api
              this.companyUploadService.sendTestScoreCsvRequest(this.comapnyUpObj)
              .subscribe(
                resp => {
                  // console.log('comapnyUpObj resp'+JSON.stringify(resp));
                  this.toastr.success('Records Successfully Inserted!', 'Success!');
                  // alert('Document uploaded successfully');
                  this.option = null;
                  this.fileName = '';
                  this.formData = new FormData();
                  companyUploadform.resetForm();
                  this.companyDataUploadComponent.getCompanyUploadedList();
                },
                error => {
                  console.log('error' + JSON.stringify(error));
                  if (error.status === 422) {
                    this.toastr.warning('Invalid Records Found,Change Unique Fields& Try Again!', 'Alert!');
                  } else if (error.status === 500) {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  } else {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  }
                  // alert('error');
                });
            } else if (this.comapnyUpObj.compUploadTypeValueId === 375) {
              this.companyUploadService.sendHiringAggregatesCsvRequest(this.comapnyUpObj)
              .subscribe(
                resp => {
                  // console.log('aggreagatesss'+JSON.stringify(resp));
                  this.toastr.success('Records Successfully Inserted!', 'Success!');
                  // alert('Document uploaded successfully');
                  this.option = undefined;
                  this.fileName = '';
                  this.formData = new FormData();
                  companyUploadform.resetForm();
                  this.companyDataUploadComponent.getCompanyUploadedList();
                },
                error => {
                  if (error.status === 422) {
                    this.toastr.warning('Invalid Records Found,Change Unique Fields& Try Again!', 'Alert!');
                  } else if (error.status === 500) {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  } else {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  }
                  // alert('error');
                });
            } else if (this.comapnyUpObj.compUploadTypeValueId === 394) {
              // this.comapnyUpObj.employerEventId = this.comapnyUpObj.empEventId;
              this.comapnyUpObj.createUserId = this.loginData.userId;
              this.comapnyUpObj.updateUserId = this.loginData.userId;
              // delete this.comapnyUpObj.empEventId;
              this.companyUploadService.sendEventStudentsCsvRequest(this.comapnyUpObj)
              .subscribe(
                resp => {
                  // console.log('event students'+JSON.stringify(resp));
                  this.toastr.success('Records Successfully Inserted!', 'Success!');
                  // alert('Document uploaded successfully');
                  this.option = undefined;
                  this.fileName = '';
                  this.formData = new FormData();
                  companyUploadform.resetForm();
                  this.companyDataUploadComponent.getCompanyUploadedList();
                },
                error => {
                  if (error.status === 422) {
                    this.toastr.warning('Invalid Records Found,Change Unique Fields& Try Again!', 'Alert!');
                  } else if (error.status === 500) {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  } else {
                    this.toastr.error('Server Not Found,Please Try After Some Time!', 'Oops!');
                  }
                  // alert('error');
                });
            } else {
              this.toastr.error('File Not Uploaded!', 'Oops!');
            }
          },
          error => {
            this.toastr.error('Container Not Found!', 'Oops!');
            console.log('error', error);
          });
      } else {
        this.toastr.error('Must Select CSV File!', 'Alert!');
        // alert ('Choose file');
      }
  }
  downloadFile() {
    if (this.comapnyUpObj.compUploadTypeValueId) {
      const typeValue = this.comapnyUpObj.compUploadTypeValueId;
      const lookUpdata = this.lookUpGet.getLookUpData('COMPANY_UPLOAD_TYPE', undefined);
      const fileNameData = lookUpdata[typeValue].lookupValue;
      this.companyUploadService.downloadSampleCsv(fileNameData).subscribe((responseData) => {
        this.toastr.success('File Downloaded Sucessfully');
        importedSaveAs(responseData, fileNameData + '.csv');
      });
    } else {
      this.toastr.error('Please choose a document Type');
    }
  }
}
