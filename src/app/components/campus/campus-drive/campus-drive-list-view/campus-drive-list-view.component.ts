

import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { CampusDriveService } from '../../../../services/campus/campus-drive/campus-drive.service';
import { Http, Response, RequestOptions } from '@angular/http';
import { LookUpGetAndSetLocalSrorage } from '../../../../lookup.service';
// import { employerDriveModel } from '../drive-data-model';
@Component({
  selector: 'app-campus-drive-list-view',
  templateUrl: './campus-drive-list-view.component.html',
  styleUrls: ['./campus-drive-list-view.component.css'],
})
export class CampusDriveListViewComponent implements OnInit , OnChanges{
  allDrives: any;
  educationStatus: any;
  getCampusList: any;
  constructor(private CampusDriveService: CampusDriveService, private cookieService: CookieService,
  private localStorage: LookUpGetAndSetLocalSrorage) { }
 // public filterQuery = '';
 @Input() filterQuery;
 @Input() showFilter: any;
 @Output() showFilterChange = new EventEmitter<any>();
 

  public rowsOnPage = 10;
  public sortBy = 'createDatetime';
  public sortOrder = 'desc';
  selectedDrive: any;
  loginData: any;
  isSearchActive=false;
  data: any = [];
  showAddBtn: any;

  ngOnInit() {
    // get job role details from services functionality starts
    // ----------service call to get campus List
    this.educationStatus = this.localStorage.getLookUpData('EDUCATION_DRIVE_STATUS_CODE', null);
    this.getCampusList = function() {
      this.loginData = this.cookieService.getObject('loginResponce');
      this.CampusDriveService.getCampusDriveDetails(
        this.loginData.campusId).subscribe(data => {
          this.allDrives = data.data;
          this.data = this.allDrives;
          this.data = this.data.filter(function(drives){
            return drives.driveStatusValueId !== 234;
          });
        });
    };
    this.getCampusList();
  }
  ngOnChanges(changes: SimpleChanges) {
    }
    showInactiveDrives(event) {
      if (event.target.checked) {
        this.data = this.allDrives;
     } else {
       this.data =  this.allDrives.filter( function(events) {
         return events.driveStatusValueId !== 234;
        });
     }
    }
  onSelect(driveList): void {
    this.selectedDrive = driveList;
    this.selectedDrive.readonly = true;
    this.showAddBtn = true;
    this.showFilter = false;
    this.isSearchActive=true;
    this.showFilterChange.emit(this.showFilter);
  }
}
