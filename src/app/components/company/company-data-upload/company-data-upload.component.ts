import { Component, OnInit , EventEmitter, ChangeDetectorRef, NgZone, ViewContainerRef} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {saveAs as importedSaveAs} from 'file-saver';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
// import {CampusDataUploadComponent} from '../../campus/campus-data-upload/campus-data-upload.component';
import {CampusUploadDocService} from '../../campus/campus-data-upload/campus-upload-doc.service';
import {CompanyUploadDocService} from './company-upload-doc.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-data-upload',
  templateUrl: './company-data-upload.component.html',
  styleUrls: ['./company-data-upload.component.css'],
})
export class CompanyDataUploadComponent implements OnInit {

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';

  data: any= [];
  option: string;
  option1: string;
  readonly = true;
  onSelect1: any;
  massupload: any = {};
  showDocumentview = true;
  loginData: any= {};

  constructor(private ref: ChangeDetectorRef, public zone: NgZone, private cookieService: CookieService,
    private companyUploadDocService: CompanyUploadDocService, 
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
    }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.getCompanyUploadedList();
  }

  getCompanyUploadedList() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.companyUploadDocService.getCompanyUploadedDocs(this.loginData.companyId)
    .subscribe(
      resp => {
        this.data = resp;
        this.option = '';
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].csvFileLocation) {
            const filename = this.data[i].csvFileLocation.replace(/^.*[\\\/]/, '');
            this.data[i].csvFileLocation = filename;
          }
        }
      },
      error => {
        this.toastr.error('Error Getting Uploaded Docs!', 'Oops!');
        console.log('error', error);
      });
  }

  downloadCampusDoc(location): void {
    console.log(location);
    const updateLocation = location.substr(1);
    const fileName = updateLocation.replace(/^.*[\\\/]/, '');
    console.log(fileName);
    console.log(updateLocation);
    console.log('.substr(1)' + updateLocation.substr(1));
    this.companyUploadDocService.downloadFile(updateLocation.substr(1))
    .subscribe(
      resp => {
        this.toastr.success('File Successfully Downloaded!', 'Success!');
        // console.log('do' + JSON.stringify(resp));
        importedSaveAs(resp, fileName);
      },
      error => {
        this.toastr.error('File Not Found!', 'Oops!');
        console.log('error', error);
      });

  }

}
