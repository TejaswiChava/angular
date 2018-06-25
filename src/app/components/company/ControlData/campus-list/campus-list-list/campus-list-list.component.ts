import { Component, OnInit , Input, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { CampusListService } from '../../../../../services/company/ControlData/campusList/campus-list.service';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-campus-list-list',
  templateUrl: './campus-list-list.component.html',
  styleUrls: ['./campus-list-list.component.css']
})
export class CampusListListComponent implements OnInit, OnChanges {
  @Input() ClistStatus;
  @Output() ClistStatusChange  = new EventEmitter<boolean>();
  @Input() statusCheck;
  @Output() statusCheckChange = new EventEmitter<boolean>();
  @Input() filterQuery;
  @Input() showFilter;
  @Output() showFilterChange = new EventEmitter<any>();

  loginData: any;
  data: any;
  selectedCampusList: any;
  list = false;
  constructor(private campusList: CampusListService, private cookieService: CookieService) { 
    this.loginData = this.cookieService.getObject('loginResponce');
  }
 // public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'listName';
  public sortOrder = 'asc';
  addClist = false;

  ngOnInit() {
    this.getCampusList();
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (!this.list) {
      this.getCampusList();
    }
  }

  getCampusList() {
    this.campusList.getCompanyCampusListDetails(
      this.loginData.companyId).subscribe((data: any) => { this.data = data.data; });
  }

  viewCampusList(clist) {
    this.statusCheck = true;
    this.statusCheckChange.emit(this.statusCheck);
    // this.addClist = true;
    // this.ClistStatus = true;
    // this.ClistStatusChange.emit(this.ClistStatus);
    this.list = true;
    // this.listChange.emit(this.list);
    this.selectedCampusList = clist;
    this.showFilter = true;
    this.showFilterChange.emit(this.showFilter);
   // console.log(JSON.stringify(this.selectedCampusList));
  }

}
