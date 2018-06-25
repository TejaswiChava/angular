import { Component, OnInit , ViewContainerRef, OnChanges, SimpleChange } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {saveAs as importedSaveAs} from 'file-saver';
// import {CompanyDataUploadComponent} from '../../company/company-data-upload/company-data-upload.component';

import {CampusUploadDocService} from './campus-upload-doc.service';
// import { ToastsManager } from 'ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { LookupvalueService } from '../../../services/shared/lookupvalue.service';

@Component({
  selector: 'app-campus-data-upload',
  templateUrl: './campus-data-upload.component.html',
  styleUrls: ['./campus-data-upload.component.css'],
})
export class CampusDataUploadComponent implements OnInit {
  DocumentTypeLookup: any;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';

  data: any = [];
  option: string;
  option1: string;
  readonly = true;
  onSelect1: any;
  massupload: any = {};
  showDocumentview = true;
  sampleChildData: any = [];
  loginData: any= {};
  // getCampusUploadedList: any;
  // campusDocList: any = [];
  constructor(private campusUploadDocService: CampusUploadDocService, private cookieService: CookieService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    private lookupvalueService: LookupvalueService,
    private viewContainerRef: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(viewContainerRef);
    }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.getCampusUploadedList();

    // getting campus documentType data from look up table
    this.DocumentTypeLookup = this.lookupvalueService.getCampusDocumentTypeLookup();
  }

  getCampusUploadedList() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.campusUploadDocService.getCampusUploadedDocs(this.loginData.campusId)
    .subscribe(
      resp => {
        // console.log('ffffffff' + JSON.stringify(resp));
        // this.data = [];
        this.data = resp;
        this.option = '';
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].csvFileLocation) {
            const filename = this.data[i].csvFileLocation.replace(/^.*[\\\/]/, '');
            this.data[i].csvFileLocation = filename;
          }
        }
        // this.campusDocList = this.data;
      },
      error => {
        this.toastr.error('Error Getting Uploaded Docs!', 'Oops!');
        console.log('error', error);
      });
  }

  downloadCampusDoc(location) {
    console.log('ooo' + location);
    const updateLocation = location.substr(2);
    const fileName = location.replace(/^.*[\\\/]/, '');
    console.log('uuu' + updateLocation);
    this.campusUploadDocService.downloadFile(updateLocation)
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

  onSelect(option: string) {
    this.option = option;
  }

}
